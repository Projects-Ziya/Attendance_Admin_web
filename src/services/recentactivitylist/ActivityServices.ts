import type { Activity } from "../../models/recentactivity/Activity";

// 🔹 Temporary mock data (can be replaced with API later)
const mockActivities: Activity[] = [

];

// 🔹 Service function (mock for now)
export async function fetchActivities(): Promise<Activity[]> {
  return [...mockActivities];
}
