export type EmployeeStatus = "Resigned" | "Terminated" | "Retired" | "Contract Ended";

export interface Employee {
  id: number ; // or string | number if needed
  name: string;
  exitDate: string; // or Date if you want date operations
  designation: string;
  status: EmployeeStatus;
  avatarUrl?: string;
  description?: string;
  email?: string;
  phone?: string;
}
