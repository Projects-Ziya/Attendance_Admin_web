import type { Notification } from "../../models/employeeDashboad/Notification";
import type { Project } from "../../models/employeeDashboad/Project";
import type { Task } from "../../models/employeeDashboad/Task";

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const res = await fetch("/api/notifications");
    return await res.json();
  } catch {
    const { fallbackNotifications } = await import("../../models/employeeDashboad/Notification");
    return fallbackNotifications;
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
