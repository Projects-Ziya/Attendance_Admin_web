// src/models/Activity.ts
export interface Activity {
  id: string;
  personName: string;
  role: string;
  team: string;
  status: string;
  description: string;
  time: string;
  error : string | null;
}
