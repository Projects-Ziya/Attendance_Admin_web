
export type Priority = "High" | "Medium" | "Low";
export type Status = "In Progress" | "Completed" | "Pending";

export interface Member {
  id: number;
  name: string;
  avatar: string;
}

export interface ProjectDetails {
  projectId: string;
  client: string;
  proValue: string;
  workHours: string;
  createdOn: string;
  startOn: string;
  dueDate: string;
  priority: Priority;  
  status: Status;      
  createdBy: Member;
  tags: Member[];
  teamMembers: Member[];
  teamLeads: Member[];
  projectManager: Member;
  description: string;
}