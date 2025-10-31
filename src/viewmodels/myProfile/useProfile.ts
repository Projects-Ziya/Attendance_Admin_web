// useProfile.ts
import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/myProfile/myProfileServices";

export interface Profile {
  name: string;
  employeeId: string;
  designation: string;
  department: string;
  avatarUrl: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        const data = await fetchProfile();
        if (mounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load profile");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return { profile, loading, error };
}
