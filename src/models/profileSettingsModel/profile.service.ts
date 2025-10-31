// models/profile.service.ts
export interface Profile {
  email: string;
  language: string;
  status: string;
}

const API_BASE_URL = "https://your-backend.com/api"; // replace with real backend

// Fetch profile data
export const getProfile = async (): Promise<Profile> => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
};

// Update password
export const updatePassword = async (newPassword: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!res.ok) {
    throw new Error("Failed to update password");
  }
};
