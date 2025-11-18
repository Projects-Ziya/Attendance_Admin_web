import type { Activity } from "../../models/recentactivity/Activity";

// 🔹 Temporary mock data (can be replaced with API later)
const mockActivities: Activity[] = [
  {
    id: "1",
    personName: "Aarav Nair",
    role: "Video Editors",
    team: "TH",
    status: "Project Created",
    description: "Aarav Nair Created A New Project: E-Commerce Web App.",
    time: "09:28 AM"
  },
  {
    id: "2",
    personName: "Rohan Sharma",
    role: "",
    team: "PL",
    status: "New Task Assigned",
    description: "Rohan Sharma Assigned A New Task To David Under Project Apollo.",
    time: "10:11 AM"
  },
  {
    id: "3",
    personName: "Meera Menon",
    role: "UI/UX Designers",
    team: "TH",
    status: "Leave Request Approved",
    description: "Admin Added A New Employee: Priya Sharma To The Designing Department.",
    time: "11:36 AM"
  },
  {
    id: "4",
    personName: "Kavya Iyer",
    role: "Graphic Designers",
    team: "TH",
    status: "Project Updated",
    description: "Kavya Iyer Updated Project Milestones For CRM Development.",
    time: "12:03 PM"
  },
  {
    id: "5",
    personName: "Karan Malhotra",
    role: "",
    team: "PL",
    status: "Document Uploaded",
    description: "Karan Malhotra Uploaded New Project Documents For HRMS System.",
    time: "10:09 AM"
  },
  {
    id: "6",
    personName: "Amal Ahmammed",
    role: "React Developers",
    team: "TH",
    status: "Task Completed",
    description: "Amal Ahmammed Marked Task #15 As Completed In Project Phoenix.",
    time: "05:21 PM"
  },
  {
    id: "7",
    personName: "Priya SinAgh",
    role: "MERN Stack Developers",
    team: "TH",
    status: "Attendance Edited",
    description: "Priya SinAgh's Late Punching Edited To 09:00 AM.",
    time: "10:00 AM"
  },
  {
    id: "8",
    personName: "Shamnas",
    role: "Flutter Developers",
    team: "TH",
    status: "Employee Deleted",
    description: "Admin Removed Past Employee Record: Shamnas From The System.",
    time: "06:04 AM"
  },
  {
    id: "9",
    personName: "Arjun Reddy",
    role: "MEAN Stack Developers",
    team: "TH",
    status: "Settings Modified",
    description: "Super Admin Updated Security & Access Control Settings.",
    time: "09:05 AM"
  },
  {
    id: "10",
    personName: "Neha Kulkarni",
    role: "Python Developers",
    team: "TH",
    status: "New Employee Added",
    description: "Admin Added A New Employee: Neha Kulkarni To Developer Department.",
    time: "10:40 AM"
  },
  {
    id: "11",
    personName: "Anugrah Sivadasan",
    role: "frontend Developers",
    team: "TH",
    status: "New Employee Added",
    description: "Admin Added A New Employee: Neha Kulkarni To Developer Department.",
    time: "10:40 AM"
  }
];

// 🔹 Service function (mock for now)
export async function fetchActivities(): Promise<Activity[]> {
  return [...mockActivities];
}
