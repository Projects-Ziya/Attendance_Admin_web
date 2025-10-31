// src/hooks/useTaskSummary.ts
import { useState, useEffect } from "react";
import { getTaskSummary } from "../api/taskAPI";

interface TaskSummary {
  totalHours: number;
  spentHours: number;
  message: string;
}

export const useTaskSummary = () => {
  const [data, setData] = useState<TaskSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTaskSummary();
        setData(response);
      } catch (err) {
        console.error("API call failed, using mock data:", err);
        // Fallback mock data
        setData({
          totalHours: 8,
          spentHours: 3,
          message: "Mock data because backend is not ready",
        });
        setError("Using mock data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
