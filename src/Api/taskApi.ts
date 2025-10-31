// src/api/taskAPI.js
import api from "./api";

export const getTaskSummary = async () => {
  try {
    const response = await api.get("/tasks/summary");
    return response.data; // { totalHours: 8, spentHours: 3, message: "..." }
  } catch (error) {
    console.error("Error fetching task summary:", error);
    throw error;
  }
};
