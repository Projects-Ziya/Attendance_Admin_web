import { useState } from "react";
import type { loginUser, LoginPayload } from "../../services/AuthService";

export const useLoginVM = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(payload);

      // ✅ Save token for future requests
      localStorage.setItem("authToken", response.token);

      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
