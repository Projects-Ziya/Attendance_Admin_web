// models/index.ts
export type Role = 'Employee' | 'Team Lead' | 'Project Lead' | 'HR' | 'CEO';

export type ApprovalStage = {
    role: string;
    name?: string;
    avatarUrl?: string;
    status: 'pending' | 'approved' | 'rejected' | 'current';
    timestamp?: string;
};

export type TeamMember = {
  id: number;
  name: string;
  email?: string;
  designation?: string;
  phone_number?: string;
  profile_pic?: string | null;
};