// models/mock/projectTask.mock.ts
export const mockProjectTask = {
  projects: {
    total: 150,
    breakdown: [
      { name: "Completed projects", value: 75, color: "#03C96F" }, // green
      { name: "On-Going projects ", value: 25, color: "#43C8FF" }, // blue
      { name: "On-Pending projects", value: 35, color: "#FFC107" }, // orange
      { name: "On-Hold projects", value: 10, color: "#FD7F20" }, // gray
      { name: "Overdue projects", value: 5, color: "#F11515" }, // red
    ],
  },
  tasks: {
    total: 280,
    breakdown: [
      { name: "Completed tasks", value: 120, color: "#03C96F" },
      { name: "On-Going tasks", value: 73, color: "#43C8FF" },
      { name: "On-Pending tasks", value: 45, color: "#FFC107" },
      { name: "On-Hold tasks", value: 30, color: "#FD7F20" },
      { name: "Overdue tasks", value: 12, color: "#F11515" },
    ],
  },
};
