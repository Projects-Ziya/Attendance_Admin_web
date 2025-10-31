export interface EmployeeBasic {
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
    profilePicUrl?: string | null;
}


export interface EmployeeBank {
    accountNumber: string;
    accountNumberMasked?: string; 
    ifscCode: string;
    branchName: string;
    accountHolderName: string;
}


export interface EmployeePersonal {
    address?: string;
    phone?: string;
    emergencyPhone?: string;
    gender?: string;
    dob?: string;
    nationality?: string;
    bloodGroup?: string;
}


export interface Employee {
    id: string;
    basic: EmployeeBasic;
    personal: EmployeePersonal;
    bank: EmployeeBank;
}