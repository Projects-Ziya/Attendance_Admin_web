import { useEffect, useState, useMemo } from "react";
import { TASK_ITEMS } from "../models/taskModel";
import { FiRefreshCw, FiClock, FiPause, FiAlertCircle } from "react-icons/fi";

// Map icon keys to actual React Icons
const iconMap = {
  refresh: FiRefreshCw,
  clock: FiClock,
  pause: FiPause,
  alert: FiAlertCircle,
};

export const useTaskProgressViewModel = () => {
  const [rawTasks, setRawTasks] = useState([]);

  const twoDigit = (n) => (n < 10 ? `0${n}` : `${n}`);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Replace with your backend endpoint
        const res = await fetch("http://localhost:5000/api/tasks");
        if (!res.ok) throw new Error("Backend not reachable");
        const data = await res.json();
        setRawTasks(data);
      } catch (error) {
        console.warn("Using mock data due to backend issue:", error.message);
        setRawTasks(TASK_ITEMS);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Memoize the transformation so it only runs when rawTasks changes
  const tasks = useMemo(() => {
    return rawTasks.map((task) => ({
      ...task,
      Icon: iconMap[task.icon],
      formattedValue: `${twoDigit(task.value)}%`,
    }));
  }, [rawTasks]);

  return { tasks };
};
