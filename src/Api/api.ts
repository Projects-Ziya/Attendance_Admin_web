// src/api/api.ts
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants/urls";
import { RSA_PUBLIC_KEY } from "../constants/publicKey";

/* ----------------- Helpers ----------------- */
function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

/* ----------------- Import server RSA public key ----------------- */
let serverRsaKey: CryptoKey | null = null;
export async function importServerPublicKey(pem: string) {
  const clean = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, "");
  const spki = base64ToArrayBuffer(clean);
  return crypto.subtle.importKey(
    "spki",
    spki,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"]
  );
}
export async function getServerRsaKey() {
  if (!serverRsaKey) serverRsaKey = await importServerPublicKey(RSA_PUBLIC_KEY);
  return serverRsaKey;
}

/* ----------------- Session AES key (in-memory) ----------------- */
let sessionAesKey: CryptoKey | null = null;
let sessionAesRaw: ArrayBuffer | null = null;
let isSessionRegistered = false;
let sessionInitPromise: Promise<void> | null = null;

/* Generate AES-GCM session key */
export async function generateSessionAesKey() {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  sessionAesKey = key;
  sessionAesRaw = await crypto.subtle.exportKey("raw", key);
  return key;
}

/* RSA encrypt AES raw key */
export async function encryptAesRawWithServerRsa(rawAes: ArrayBuffer) {
  const rsa = await getServerRsaKey();
  const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, rsa, rawAes);
  return arrayBufferToBase64(encrypted);
}

/* Register session AES key with backend */
export async function registerSessionKeyWithBackend() {
  if (isSessionRegistered) return;
  if (!sessionAesRaw) throw new Error("Session AES raw key not available");

  const encryptedSessionKey = await encryptAesRawWithServerRsa(sessionAesRaw);
  const res = await fetch(`${BASE_URL}/api/register-session-key/`, { // <-- trailing slash
    method: "POST",
     mode: "cors",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ encrypted_session_key: encryptedSessionKey }) // <-- key name fixed
  });

  if (!res.ok) throw new Error(`Session registration failed: ${res.status}`);
  isSessionRegistered = true;
}

/* Ensure session exists */
export function ensureSession() {
  if (isSessionRegistered) return Promise.resolve();
  if (sessionInitPromise) return sessionInitPromise;

  sessionInitPromise = (async () => {
    if (!sessionAesKey) await generateSessionAesKey();
    await registerSessionKeyWithBackend();
    sessionAesRaw = null; // discard raw key
  })();

  return sessionInitPromise;
}

/* AES-GCM encrypt object */
export async function encryptWithSessionAES(obj: any) {
  if (!sessionAesKey) throw new Error("Session AES key not initialized");
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(obj));
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, tagLength: 128 },
    sessionAesKey,
    encoded
  );
  const encryptedBytes = new Uint8Array(encryptedBuffer);
  const tag = encryptedBytes.slice(-16);
  const cipher = encryptedBytes.slice(0, -16);
  return {
    cipher: arrayBufferToBase64(cipher.buffer),
    nonce: arrayBufferToBase64(iv.buffer),
    tag: arrayBufferToBase64(tag.buffer),
  };
}

/* AES-GCM decrypt object */
export async function decryptWithSessionAES(encObj: { cipher: string; nonce: string; tag: string }) {
  if (!sessionAesKey) throw new Error("Session AES key not initialized");
  const cipherBuf = base64ToArrayBuffer(encObj.cipher);
  const tagBuf = base64ToArrayBuffer(encObj.tag);
  const nonceBuf = base64ToArrayBuffer(encObj.nonce);

  const combined = new Uint8Array(cipherBuf.byteLength + tagBuf.byteLength);
  combined.set(new Uint8Array(cipherBuf), 0);
  combined.set(new Uint8Array(tagBuf), cipherBuf.byteLength);

  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(nonceBuf), tagLength: 128 },
    sessionAesKey,
    combined.buffer
  );
  return JSON.parse(new TextDecoder().decode(plainBuf));
}

/* ----------------- Axios instance ----------------- */
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true
});

/* Ensure session on startup */
ensureSession().catch(e => console.warn("Session AES init failed:", e));

/* ----------------- Request interceptor ----------------- */
api.interceptors.request.use(async (config: any) => {
  try { await ensureSession(); } 
  catch (e) { console.warn("Proceeding without session AES key:", e); return config; }

  const method = config.method?.toLowerCase();
  const accessToken = Cookies.get("access") || localStorage.getItem("access");

  if (["post", "put", "patch"].includes(method)) {
    let payload = config.data ? { ...config.data } : {};
    if (accessToken) payload.access_token = accessToken;
    config.data = await encryptWithSessionAES(payload);
  } else if (method === "get" && accessToken) {
    const enc = await encryptWithSessionAES({ access_token: accessToken });
    config.params = { ...config.params, auth: JSON.stringify(enc) };
  }

  return config;
}, err => Promise.reject(err));

/* ----------------- Response interceptor ----------------- */
api.interceptors.response.use(async response => {
  try {
    const d = response.data;
    if (d?.cipher && d?.nonce && d?.tag) {
      await ensureSession();
      response.data = await decryptWithSessionAES(d);
    }
  } catch (e) { console.warn("Response decryption failed:", e); }
  return response;
}, async error => Promise.reject(error));

export default api;
