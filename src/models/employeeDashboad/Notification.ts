import img1 from "../../assets/img1.jpg";
export type NotificationStatus = "success" | "warning" | "error" | "info";

export interface Notification {
  id: string;
  avatar: string;
  message: string;
  statusColor: string;
  secondary: string;
  action: string;
  actionHref?: string;
}

// Static fallback data for API failure fallback
export const fallbackNotifications: Notification[] = [
  {
    id: "1",
    avatar: img1,
    message: "Hemant Rangarajan late punch-in recorded today.",
    statusColor: "text-[#FFA500]",
    secondary: "Need to make corrections?",
    action: "Edit Log"
  },
  {
    id: "2",
    avatar: img1,
    message: "Hemant Rangarajan No punch-in record found for today.",
    statusColor: "text-[#FF0000] 2xl:w-[80%]",
    secondary: "Need to make corrections?",
    action: "Edit Log"
  },
  {
    id: "3",
    avatar: img1,
    message: "Hemant Rangarajan Punch-in missing for today.",
    statusColor: "text-[#FF5722]",
    secondary: "Mark Attendance",
    action: "Edit Log"
  }
];
