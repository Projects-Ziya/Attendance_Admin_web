import api from "../Api/api";
export interface BasicDetailsPayload {
  firstName: string;
  lastName: string;
  employeeId: string;
  jobType: string;
  designation: string;
  department: string;
  userType: string;
  repMgrTl: string;
  salary: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
}

export interface PersonalDetailsPayload {
  address: string;
  phone: string;
  emergencyPhone: string;
  gender: string;
  dob: string;
  nationality: string;
  bloodGroup: string;
}

export interface BankDetailsPayload {
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  branchName: string;
  accountHolderName: string;
  documents: File[]
}

export const employeeService = {
  addEmployee: async (data: {
    basic: BasicDetailsPayload;
    personal: PersonalDetailsPayload;
    bank: BankDetailsPayload;
  }) => {
    const formData = new FormData();
console.log(formData)
    // Basic
    Object.entries(data.basic).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        formData.append(k, v as any);
      }
    });

    // Personal
    Object.entries(data.personal).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        formData.append(k, v as any);
      }
    });

    // Bank
    Object.entries(data.bank).forEach(([k, v]) => {
      if (k === "documents" && Array.isArray(v)) {
        v.forEach((file) => {
          formData.append("documents", file); 
        });
      } else if (v !== undefined && v !== null && v !== "") {
        formData.append(k, v as any);
      }
    });

    const res = await api.post(`api/employees/register/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  GetEmployeeAttendanceSummary: async () => {
    try {
      const res = await api.get(`/api/attendance-summary/`);
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch employee list:", error);
      throw error;
    }
  },
};



