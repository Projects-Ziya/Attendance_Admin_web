import { useEffect, useState } from "react";
import type { Project } from "../models/Project";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //mock data
  const mockProjects: Project[] = [
    {
      id: "PRJ-001",
      projectName: "QuantumFlow",
      startDate: "01/04/2025",
      name: "Aarav Sharma",
      designation: "Software Engineer",
      role:"TH",
      status: "On Going",
      team:4,
      avatar: "https://i.pravatar.cc/150?u=a",
      deadline: "15/04/2025",
      tasksCount: 18,
      hours: 72
    },
    {
    id: "PRJ-002",
    projectName: "NexusCore",
    startDate: "25/03/2025",
    name: "Priya Patel",
    designation: "UI/UX Designer",
    role: "GD",
    status: "On Hold",
    team: 5,
    avatar: "https://i.pravatar.cc/150?u=b",
    deadline: "10/04/2025",
    tasksCount: 12,
    hours: 49
  },
  {
    id: "PRJ-003",
    projectName: "SkyForge",
    startDate: "16/09/2025",
    name: "Rohan Kumar",
    designation: "Technical Lead",
    role: "TH",
    status: "Overdue",
    team: 6,
    avatar: "https://i.pravatar.cc/150?u=c",
    deadline: "05/11/2025",
    tasksCount: 22,
    hours: 88
  },
  {
    id: "PRJ-004",
    projectName: "TerraNet",
    startDate: "01/04/2025",
    name: "Anjali Mehta",
    designation: "Graphic Designer",
    role: "GD",
    status: "Completed",
    team: 2,
    avatar: "https://i.pravatar.cc/150?u=d",
    deadline: "18/04/2025",
    tasksCount: 7,
    hours: 28
  },
  {
    id: "PRJ-005",
    projectName: "PulseSync",
    startDate: "14/09/2025",
    name: "Vikram Singh",
    designation: "Software Engineer",
    role: "PL",
    status: "On Going",
    team: 5,
    avatar: "https://i.pravatar.cc/150?u=e",
    deadline: "12/11/2025",
    tasksCount: 15,
    hours: 60
  },
  {
    id: "PRJ-006",
    projectName: "AeroNex",
    startDate: "05/04/2025",
    name: "Neha Gupta",
    designation: "Data Analyst",
    role: "DA",
    status: "On Hold",
    team: 3,
    avatar: "https://i.pravatar.cc/150?u=f",
    deadline: "20/04/2025",
    tasksCount: 9,
    hours: 36
  },
  {
    id: "PRJ-007",
    projectName: "FluxStream",
    startDate: "20/03/2025",
    name: "Rajesh Joshi",
    designation: "Project Manager",
    role: "PL",
    status: "Overdue",
    team: 7,
    avatar: "https://i.pravatar.cc/150?u=g",
    deadline: "08/04/2025",
    tasksCount: 25,
    hours: 100
  },
  {
    id: "PRJ-008",
    projectName: "NovaSphere",
    startDate: "10/04/2025",
    name: "Sneha Reddy",
    designation: "UI/UX Designer",
    role: "GD",
    status: "Completed",
    team: 3,
    avatar: "https://i.pravatar.cc/150?u=h",
    deadline: "22/04/2025",
    tasksCount: 8,
    hours: 32
  },
  {
    id: "PRJ-009",
    projectName: "CyberLens",
    startDate: "28/03/2025",
    name: "Karan Malhotra",
    designation: "Technical Architect",
    role: "TH",
    status: "On Going",
    team: 8,
    avatar: "https://i.pravatar.cc/150?u=i",
    deadline: "14/04/2025",
    tasksCount: 18,
    hours: 72
  },
  {
    id: "PRJ-010",
    projectName: "VertexDrive",
    startDate: "08/04/2025",
    name: "Ananya Das",
    designation: "Creative Designer",
    role: "GD",
    status: "On Hold",
    team: 4,
    avatar: "https://i.pravatar.cc/150?u=j",
    deadline: "25/04/2025",
    tasksCount: 11,
    hours: 44
  },
  {
    id: "PRJ-011",
    projectName: "CloudSync Pro",
    startDate: "18/03/2025",
    name: "Aarav Nair",
    designation: "Video Editor",
    role: "TH",
    status: "On Going",
    team: 2,
    avatar: "https://i.pravatar.cc/150?u=k",
    deadline: "28/03/2025",
    tasksCount: 10,
    hours: 63
  },
  {
    id: "PRJ-012",
    projectName: "ByteTrack",
    startDate: "25/03/2025",
    name: "Rohan Sharma",
    designation: "Project Lead",
    role: "PL",
    status: "On Hold",
    team: 3,
    avatar: "https://i.pravatar.cc/150?u=l",
    deadline: "02/04/2025",
    tasksCount: 12,
    hours: 49
  },
  {
    id: "PRJ-013",
    projectName: "NexaCRM",
    startDate: "12/03/2025",
    name: "Meera Menon",
    designation: "UI/UX Designer",
    role: "GD",
    status: "Overdue",
    team: 2,
    avatar: "https://i.pravatar.cc/150?u=m",
    deadline: "12/03/2025",
    tasksCount: 3,
    hours: 7
  },
  {
    id: "PRJ-014",
    projectName: "DataVault 360",
    startDate: "01/04/2025",
    name: "Kavya Iyer",
    designation: "Graphic Designer",
    role: "GD",
    status: "Completed",
    team: 5,
    avatar: "https://i.pravatar.cc/150?u=n",
    deadline: "06/04/2025",
    tasksCount: 10,
    hours: 35
  }
  ];


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const { data } = await axiosInstance.get("/projects");
        // setProjects(data);

        setProjects(mockProjects); //using mockdata
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { projects, loading };
};
