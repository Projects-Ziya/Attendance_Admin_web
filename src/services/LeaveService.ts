import type { AnalyticsStats } from "../types/productionStatus";
import api from "./api";

export const LeaveService = {
  async fetchStats(): Promise<AnalyticsStats> {
    const res = await api.get("/leaves/stats");
    return res.data;
  },
};
