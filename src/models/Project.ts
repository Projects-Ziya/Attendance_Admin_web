export interface Project {
    id: string;
    projectName: string;
    startDate:string;
    name: string;
    designation: string;
    role:string;
    status: "On Going" | "On Hold"| "Overdue"| "Completed";
    team: number;
    avatar?: string;
    deadline: string;
    tasksCount: number;
    hours: number;
  }
