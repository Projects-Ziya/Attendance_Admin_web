import type { AnalyticsStats } from "../types/productionStatus";
import api from "./api";

export const AttendanceService = {
  async fetchStats(): Promise<AnalyticsStats> {
    const res = await api.get("/attendance/stats");
    return res.data;
  },
};
