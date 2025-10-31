
import { useEffect, useState } from "react";
import type { TaskProgress } from "../models/tastStatus";
import { fetchTaskProgress } from "../services/taskProgressApi";

export const useTaskProgress = () => {
  const [data, setData] = useState<TaskProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTaskProgress();
        setData(result);
      } catch (error) {
        console.error("Failed to load task progress", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};
