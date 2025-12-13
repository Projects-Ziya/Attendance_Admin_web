import { useEffect, useState } from "react";
import type { EmployeeList } from "../models/Employee";
import api from "../Api/api";
import { BASE_URL } from "../constants/urls";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data (can keep as fallback)
  const mockEmployees: EmployeeList[] = [/* your mockEmployees array */];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get(`${BASE_URL}/api/employeesadminview/`);
        const employeeData= data.data
       const transformedData: EmployeeList[] = employeeData.map((emp: any) => {
  const fullPic = emp.profile_pic
    ? `${BASE_URL}${emp.profile_pic}`
    : `https://i.pravatar.cc/150?u=${emp.employee_id}`;

  return {
    ID1: emp.id,
    id: emp.employee_id,
    name: `${emp.first_name} ${emp.last_name}`,
    designation: emp.designation,
    workMode: "WFO",
    email: emp.email,
    phone: emp.phone,
    status: emp.attendance_status || "Active",
    department: emp.department,

    // FIX
    profile_pic: fullPic,
    avatar: fullPic,

    joiningYear: emp.joiningYear || new Date().getFullYear(),
    isOnline: false,
  };
});


        setEmployees(transformedData.length ? transformedData : mockEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading };
};
