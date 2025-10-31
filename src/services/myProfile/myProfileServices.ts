// services/myProfile/myProfileServices.ts
import Cookies from "js-cookie";
import api from "../../Api/api";




// 🔹 Fetch Admin Profile API
export async function fetchProfile() {
  try {
    const token = Cookies.get("access");
    if (!token) throw new Error("No access token found");

    const response = await api.get("/api/adminprofile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const d = response.data.data;
    if (response.data.success && d) {
      return {
        name: `${d.first_name} ${d.last_name}`,
        employeeId: d.employee_id,
        designation: d.designation,
        department: d.department,
        avatarUrl: d.profile_pic,
      };
    } else {
      throw new Error("Invalid profile data");
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
}
