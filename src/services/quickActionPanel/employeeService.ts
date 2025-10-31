import type { Employee } from "../models/Employee";

const mockData: Employee[] = [
  {
    id: 1,
    name: "Aarav Nair",
    exitDate: "23/09/2025",
    designation: "Video Editor",
    status: "Resigned",
    avatarUrl: "https://i.pravatar.cc/80?img=2",
    description: "employee left voluntarily",
    email: "aaravnair@example.com",
    phone: "1234567890",
  },
  {
    id: 2,
    name: "Rohann Sharma",
    exitDate: "14/07/2024",
    designation: "Project Lead",
    status: "Terminated",
    avatarUrl: "https://i.pravatar.cc/80?img=1",
    description: "employee was let go",
    email: "rohannsharma@example.com",
    phone: "1234567890",
  },
  {
    id: 3,
    name: "Meera Menon",
    exitDate: "12/04/2023",
    designation: "UI/UX Designer",
    status: "Retired",
    avatarUrl: "https://i.pravatar.cc/80?img=3",
    description: "employee retired from service",
    email: "meeramenon@example.com",
    phone: "1234567890",
  },
  {
    id: 4,
    name: "Kavya Iyer",
    exitDate: "04/09/2025",
    designation: "Graphic Designer",
    status: "Contract Ended",
    avatarUrl: "https://i.pravatar.cc/80?img=5",
    description: "temporary/contracted employee completed term",
    email: "kavya.iyer@example.com",
    phone: "1234567890",
  },
];

export const getEmployees = async (): Promise<Employee[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
};