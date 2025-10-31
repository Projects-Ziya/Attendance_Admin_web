export interface User {
  id: number;
  email: string;
  role: string;
  employee_id: string;
  privileges: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  access: string;
  refresh: string;
}
