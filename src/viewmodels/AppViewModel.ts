
import type { ProjectDetails } from "../models/ProjectModel";


import arjun from "../assets/avatars/arjun.jpeg";
import divya from "../assets/avatars/divya.jpeg";
import karthik from "../assets/avatars/karthik.jpeg";
import neha from "../assets/avatars/neha.jpeg";
import vivek from "../assets/avatars/vivek.jpeg";
import placeholder from "../assets/avatars/placeholder.jpeg"; 
import dysonImage from "../assets/avatars/dysonImage.png"

export class AppViewModel {
  getProjectData(): ProjectDetails {
    return {
      projectId: "TSH-1001",
      client: "Smart Vision Enterprises",
      proValue: "1400",
      workHours: "150 Hrs",
      createdOn: "12/05/2025",
      startOn: "12/05/2025",
      dueDate: "27/05/2025",
      priority: "High",
      status: "In Progress",
      createdBy: { id: 1, name: "Divya Iyer", avatar: divya },
      tags: [
        { id: 2, name: "Divya Iyer", avatar: divya },
        { id: 3, name: "Neha Verma", avatar: neha },
      ],
      teamMembers: [
        { id: 4, name: "Karthik Reddy", avatar: karthik },
        { id: 5, name: "Rahul Nair", avatar: placeholder },
      ],
      teamLeads: [
        { id: 6, name: "Vivek Krishnan", avatar: vivek },
      ],
      projectManager: {
        id: 7,
        name: "Arjun Mohan",
        avatar: arjun,
      },
      description: "Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc. Maecenas dictum sed eros fermentum convallis. Pellentesque porta mauris eu nisi dignissim, ut convallis massa finibus. Vivamus tempor, quam facilisis molestie euismod, ante augue cursus lacus, sit amet facilisis dui tortor fermentum felis. Mauris quis tortor in enim molestie dictum id nec sem. Integer vehicula eleifend sem, ut molestie ligula pharetra vitae. In hac habitasse platea dictumst. Nullam mollis, mi at luctus eleifend, velit tortor tincidunt urna, id volutpat lorem mi eget orci.",
    };
  }

  getAvatarUrl(): string {
    return dysonImage; 
  }

  getTimeSpentData(): { spentHours: number; totalHours: number } {
    return { spentHours: 25, totalHours: 120 };
  }

  getTaskData(): { completed: number; total: number } {
    return { completed: 1, total: 6 };
  }
}
