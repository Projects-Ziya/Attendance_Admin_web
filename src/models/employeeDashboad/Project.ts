import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
export interface Project {
  id: string;
  title: string;
  person: string;
  personRole: string;
  avatar: string;
  extraAvatars: string[];
  tasksDone: number;
  tasksTotal: number;
  timeSpent: number;
  timeTotal: number;
  deadline: string;
}

// Static fallback data for API failure or development
export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Admin Dashboard",
    person: "Karan Malhotra",
    personRole: "Project Head",
    avatar: img2,
    extraAvatars: [
      img4,
      img5
    ],
    tasksDone: 6,
    tasksTotal: 10,
    timeSpent: 65,
    timeTotal: 120,
    deadline: "14 Sep 2025"
  },
  {
    id: "2",
    title: "Admin Dashboard",
    person: "Hemant Rangarajan",
    personRole: "Team Head",
    avatar: img1,
    extraAvatars: [
      img4,
      img5
    ],
    tasksDone: 8,
    tasksTotal: 18,
    timeSpent: 65,
    timeTotal: 120,
    deadline: "14 Sep 2025"
  }
];
