// src/api/auth.ts
import api from "../Api/api";
import type { LoginResponse } from "../models/auth";
import Cookies from "js-cookie";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post("/api/login/", { email, password });
  const data = response.data;

  if (data.success) {
    Cookies.set("access", data.access, { expires: 1 });
    Cookies.set("refresh", data.refresh, { expires: 7 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
  }

  return data;
}
