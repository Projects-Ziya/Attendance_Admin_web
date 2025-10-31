import type { Employee } from "../types/employee";
import type { LeaveSummary, DashStats } from "../types/dashboard";

export const sampleEmployee: Employee = {
    id: "EMP001",
    basic: {
        firstName: "Amal",
        lastName: "Ahammed",
        employeeId: "EMP001",
        jobType: "Offline Employee (WFO)",
        designation: "React Developer",
        department: "Software Development Department",
        userType: "Admin Team Lead",
        repMgrTl: "Project Lead",
        salary: "150000",
        email: "amal.ahammed@company.com",
        profilePicUrl: "src/assets/user.jpg"
    },
    personal: {
        address: "Noor Manzil, Near Juma Masjid, Puthanpally Road, P.O. Kuttichira, Kozhikode - 673001, Kerala, India",
        phone: "+91 98472 34567",
        emergencyPhone: "+91 96334 11223",
        gender: "Male",
        dob: "2002-05-12",
        nationality: "Indian",
        bloodGroup: "O+"
    },
    bank: {
        accountNumber: "123456789012",
        accountHolderName: "Amal Ahammed",
        ifscCode: "SBIN0001234",
        branchName: "Kuttichira, Kozhikode"
    }
};

export const sampleLeaves: LeaveSummary = {
    totalAllowed: 16,
    taken: 10,
    absentDays: 2,
    requests: 0,
    workedDays: 240,
    lossOfPay: 2
};

export const sampleStats: DashStats = {
    todayHours: 5,
    weekHours: 35,
    monthHours: 153,
    overtimeHours: 25,
    timeline: [
        { label: "Total Working hours", value: 756 },
        { label: "Productive Hours", value: 510 },
        { label: "Break hours", value: 75 },
        { label: "Overtime hours", value: 260 }
    ]
};
