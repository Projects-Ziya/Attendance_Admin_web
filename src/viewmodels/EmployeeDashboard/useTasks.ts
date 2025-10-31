import { useState, useEffect } from "react";
import type { Task } from "../../models/employeeDashboad/Task";
import { fallbackTasks } from "../../models/employeeDashboad/Task";
import { fetchTasks } from "../../services/employeeDashboard/employeeDashboardServices";

export function useTasksVM() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchTasks()
      .then((data) => {
        if (isMounted) setTasks(data);
      })
      .catch(() => {
        if (isMounted) setTasks(fallbackTasks);
        setError("Failed to load tasks from API.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { tasks, loading, error };
}
