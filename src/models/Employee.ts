export interface Employee {
    id: string;
    date: string;
    name: string;
    designation: string;
    department: string;
    workMode: "WFH" | "WFO" | "INT";
    punchIn: string;
    punchOut: string;
    late: string;
    productionHrs: string;
    avatar?: string;
    joiningYear: number; 
  }

  export interface EmployeeList {
  id: string;
  name: string;
  designation: string;
  workMode: 'WFO' | 'WFH' | 'Hybrid' | string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | string;
  department: string;
  avatar: string;
  joiningYear: number;
  isOnline: boolean;
}
  