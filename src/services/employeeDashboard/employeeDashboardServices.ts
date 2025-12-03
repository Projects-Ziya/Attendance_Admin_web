import type { Notification } from "../../models/employeeDashboad/Notification";
import type { Project } from "../../models/employeeDashboad/Project";
import type { Task } from "../../models/employeeDashboad/Task";

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const res = await fetch("/api/notification-list-admin/");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.data; // assuming your backend wraps notifications inside `data`
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    return []; // no fallback
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch("/api/projects");
    return await res.json();
  } catch {
    const { fallbackProjects } = await import("../../models/employeeDashboad/Project");
    return fallbackProjects;
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch("/api/tasks");
    return await res.json();
  } catch {
    const { fallbackTasks } = await import("../../models/employeeDashboad/Task");
    return fallbackTasks;
  }
};
