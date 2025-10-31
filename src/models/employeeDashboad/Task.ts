import task1 from "../../assets/task-img1.jpg";
import task2 from "../../assets/task-img2.jpg";
import task3 from "../../assets/task-img3.jpg";
import task4 from "../../assets/task-img4.jpg";
import task5 from "../../assets/task-img5.jpg";
import task6 from "../../assets/task-img6.jpg";
import task7 from "../../assets/task-img7.jpg";
import task8 from "../../assets/task-img8.jpg";
import task9 from "../../assets/task-img9.jpg";
import task10 from "../../assets/task-img10.jpg";
import task11 from "../../assets/task-img11.jpg";
import task12 from "../../assets/task-img12.jpg";

export type TaskStatus = "On hold" | "InProgress" | "Completed" | "Pending";

export interface Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
  avatars: string[];
}

// Static fallback data for tasks
export const fallbackTasks: Task[] = [
  {
    id: "1",
    title: "Fix API Endpoint Errors",
    desc: "Debug and resolve broken API calls.",
    status: "On hold",
    avatars: [
      task1,
      task2,
      task3
    ]
  },
  {
    id: "2",
    title: "Optimize Database Queries",
    desc: "Improve query performance to reduce load times.",
    status: "InProgress",
    avatars: [
      task4,
      task5,
      task6
    ]
  },
  {
    id: "3",
    title: "Implement Role-Based Access Control",
    desc: "Add permissions for different user roles.",
    status: "Completed",
    avatars: [
      task7,
      task8,
      task9
    ]
  },
  {
    id: "4",
    title: "Update UI Components",
    desc: "Refactor outdated components to match the latest design system.",
    status: "Pending",
    avatars: [
      task10,
      task11,
      task12
    ]
  }
];
