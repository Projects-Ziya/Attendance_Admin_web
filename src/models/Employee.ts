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
  profile_pic?: string; // ✅ replaced 'avatar' with 'profile_pic'
  joiningYear: number;
}

export interface EmployeeList {
  id: string;
  name: string;
  designation: string;
  workMode: "WFO" | "WFH" | "Hybrid" | string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | string;
  department: string;
  profile_pic?: string; // ✅ replaced 'avatar' with 'profile_pic'
  joiningYear: number;
  isOnline: boolean;
}
