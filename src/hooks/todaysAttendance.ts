import { useEffect, useState } from "react";
import type { Employee } from "../models/Employee";
import api from "../Api/api";
import { BASE_URL } from "../constants/urls";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //mock data
  const mockEmployees: Employee[] = [
    {
      id: "CD101",
      date: "10 AUG 2025",
      name: "Aarav Nair",
      designation: "Video Editors",
      department: "Design",
      workMode: "WFH",
      punchIn: "09:31 AM",
      punchOut: "--",
      late: "--",
      productionHrs: "07.25 Hrs",
      avatar: "https://i.pravatar.cc/150?u=a",
      joiningYear: 2023,
    },
    {
      id: "CD102",
      date: "10 AUG 2025",
      name: "Rohan Sharma",
      designation: "Graphic Designers",
      department: "Design",
      workMode: "WFO",
      punchIn: "09:31 AM",
      punchOut: "--",
      late: "--",
      productionHrs: "07.25 Hrs",
      avatar: "https://i.pravatar.cc/150?u=c",
      joiningYear: 2022,
    },
    {
      id: "CD103",
      date: "10 AUG 2025",
      name: "Meera Menon",
      designation: "UI/UX Designers",
      department: "Design",
      workMode: "WFO",
      punchIn: "11:31 AM",
      punchOut: "--",
      late: "02h",
      productionHrs: "05.25 Hrs",
      avatar: "https://i.pravatar.cc/150?u=b",
      joiningYear: 2024,
    },
    {
      id: "CD104",
      date: "10 AUG 2025",
      name: "Kavya Iyer",
      designation: "Graphic Designers",
      department: "Design",
      workMode: "INT",
      punchIn: "--",
      punchOut: "--",
      late: "--",
      productionHrs: "08.3 Hrs",
      avatar: "https://i.pravatar.cc/150?u=d",
      joiningYear: 2025,
    },
    {
      id: "CD105",
      date: "10 AUG 2025",
      name: "Karan Malhotra",
      designation: "Python Developers",
      department: "Development",
      workMode: "WFO",
      punchIn: "--",
      punchOut: "--",
      late: "--",
      productionHrs: "08.3 Hrs",
      avatar: "https://i.pravatar.cc/150?u=e",
      joiningYear: 2021,
    },
    {
      id: "CD106",
      date: "10 AUG 2025",
      name: "Amal Ahammed",
      designation: "React Developers",
      department: "Development",
      workMode: "WFO",
      punchIn: "--",
      punchOut: "--",
      late: "--",
      productionHrs: "08.3 Hrs",
      avatar: "https://i.pravatar.cc/150?u=e",
      joiningYear: 2023,
    },
    {
      id: "7",
      date: "10 AUG 2025",
      name: "Priya Singh",
      designation: "MERN Stack Developers",
      department: "Development",
      workMode: "WFH",
      punchIn: "09:31 AM",
      punchOut: "--",
      late: "--",
      productionHrs: "07.25 Hrs",
      avatar: "https://i.pravatar.cc/150?u=f",
      joiningYear: 2022,
    },
    {
      id: "8",
      date: "10 AUG 2025",
      name: "Shamnas",
      designation: "Flutter Developers",
      department: "Development",
      workMode: "WFO",
      punchIn: "11:31 AM",
      punchOut: "--",
      late: "02h",
      productionHrs: "05.25 Hrs",
      avatar: "https://i.pravatar.cc/150?u=f",
      joiningYear: 2024,
    },
  ];


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get(`/api/todays-all-employess-attendance/`);
        setEmployees(data.data);
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
