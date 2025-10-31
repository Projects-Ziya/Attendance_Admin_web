import { useEffect, useState } from "react";
import api from "../Api/api";

export default function useProfileData() {
  const [profileImg, setProfileImg] = useState("https://via.placeholder.com/90");
  const [userName, setUserName] = useState("Loading...");
  const [role, setRole] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("/api/pending-approval-count/");
        setProfileImg(data.data.user_data.profile_pic);
        setUserName(data.data.user_data.first_name );
        setRole(data.data.user_data.role);
      } catch {
        setProfileImg("https://via.placeholder.com/90");
        setUserName("Unknown");
        setRole("User");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { profileImg, userName, role, loading };
} 
