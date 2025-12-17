export interface Member {
  id: number;
  name: string;
  avatar?: string | null;
}

export type Priority = "High" | "Medium" | "Low";

export type Status = "In Progress" | "Completed" | "On Hold" | "Cancelled";

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
  createdBy: { avatar: string; name: string };
  tags: string[];
  teamMembers: Member[];
  teamLeads: Member[];
  projectManager: Member;
  description: string;
}

export interface ApiProjectDetails {
  success: boolean;
  data: {
    id: number;
    project_logo: string;
    project_name: string;
    client: string;
    created_at: string;
    assigned_by: string;
    assigned_by_pic: string;
    start_date: string;
    end_date: string;
    priority: string;
    project_value: string;
    total_working_hours: string;
    time_spent: string;
    completed_tasks_count: number;
    extra_time: string;
    description: string;
    status: string;
    attachment: string | null;

    members: {
      id: number;
      team_leader: {
        id: number;
        name: string;
        profile_pic: string | null;
      };
      project_manager: {
        id: number;
        name: string;
        profile_pic: string | null;
      };
      tags: string[];
    }[];

    tasks: {
      id: number;
      title: string;
      status: string;
      task_hours: number;
    }[];
  };
}
