
import axios from "axios";

// backend base URL
const API_BASE_URL = "http://localhost:8000/api"; 

// API functions
export const fetchTaskProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/progress`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching task progress:", error);
    throw error;
  }
};
