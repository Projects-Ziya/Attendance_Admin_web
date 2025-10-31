const leaveRequests = [
  {
    id: "1",
    date: "10 AUG 2025",
    days: "2 Days",
    employeeName: "Aarav Nair",
    designation: "Video Editors",
    workMode: "WFH",
    workModeColor: "#0690f9",
    leaveType: "Sick",
    reason: "Unwell and need rest.",
    attachment: "med1.jpg",
    status: "Rejected",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "2",
    date: "02 AUG 2025",
    days: "1 Day",
    employeeName: "Rohan Sharma",
    designation: "Graphic Designers",
    workMode: "WFO",
    workModeColor: "#03C96F",
    leaveType: "Casual",
    reason: "Personal emergency",
    attachment: "xray2.png",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: "3",
    date: "05 AUG 2025",
    days: "2 Days",
    employeeName: "Meera Menon",
    designation: "UI/UX Designers",
    workMode: "WFO",
    workModeColor: "#03C96F",
    leaveType: "Earned",
    reason: "Planned vacation",
    attachment: "bt3.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: "4",
    date: "03 AUG 2025",
    days: "95 Days",
    employeeName: "Kavya Iyer",
    designation: "Graphic Designers",
    workMode: "Int",
    workModeColor: "#800080",
    leaveType: "Maternity",
    reason: "Childbirth and recovery.",
    attachment: "rx4.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=14"
  },
  {
    id: "5",
    date: "09 AUG 2025",
    days: "2 Days",
    employeeName: "Karan Malhotra",
    designation: "Python Developers",
    workMode: "WFO",
    workModeColor: "#03C96F",
    leaveType: "Comp Off",
    reason: "Worked on weekend/ holiday",
    attachment: "mri5.png",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    id: "6",
    date: "12 AUG 2025",
    days: "45 Days",
    employeeName: "Amal Ahammed",
    designation: "React Developers",
    workMode: "WFO",
    workModeColor: "#03C96F",
    leaveType: "Marriage",
    reason: "Own wedding ceremony.",
    attachment: "hc6.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=16"
  },
  {
    id: "7",
    date: "03 AUG 2025",
    days: "3 Days",
    employeeName: "Priya Singh",
    designation: "MERN Stack Developers",
    workMode: "WFH",
    workModeColor: "#0690f9",
    leaveType: "Sick",
    reason: "Unwell and need rest.",
    attachment: "lab7.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=17"
  },
  {
    id: "8",
    date: "10 AUG 2025",
    days: "2 Days",
    employeeName: "Shamnas",
    designation: "Flutter Developers",
    workMode: "WFO",
    workModeColor: "#03C96F",
    leaveType: "Casual",
    reason: "Personal emergency",
    attachment: "us8.png",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=18"
  },
  {
    id: "9",
    date: "04 AUG 2025",
    days: "1 Day",
    employeeName: "Arjun Reddy",
    designation: "MEAN Stack Developers",
    workMode: "Int",
    workModeColor: "#800080",
    leaveType: "LOP",
    reason: "No paid leaves left",
    attachment: "vac9.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=19"
  },
  {
    id: "10",
    date: "06 AUG 2025",
    days: "1 Day",
    employeeName: "Neha Kulkarni",
    designation: "Python Developers",
    workMode: "Int",
    workModeColor: "#800080",
    leaveType: "Earned",
    reason: "Planned vacation",
    attachment: "ds10.jpg",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?img=20"
  }
];

const user = {
  id: 1,
  name: "Admin User",
  profilePic: "https://i.pravatar.cc/150?img=5"
};

const notifications = [
  { id: 1, message: "Aarav Nair’s leave was rejected." },
  { id: 2, message: "Rohan Sharma applied for leave." },
  { id: 3, message: "New leave request from Meera Menon." }
];

export { leaveRequests, user, notifications };