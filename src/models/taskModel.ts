// Model: Responsible for holding task data
export const TASK_ITEMS = [
  { id: 1, label: 'Ongoing', value: 78, color: '#16a34a', icon: 'refresh' },
  { id: 2, label: 'Pending', value: 25, color: '#f59e0b', icon: 'clock' },
  { id: 3, label: 'On Hold', value: 32, color: '#2563eb', icon: 'pause' },
  { id: 4, label: 'Overdue', value: 8,  color: '#ef4444', icon: 'alert' },
];



/**
 * Fetch task data from backend API
 * @returns {Promise<Array>}
 */
export async function fetchTasksFromAPI() {
  try {
    const response = await fetch('http://localhost:5000/api/tasks'); // Replace with your backend URL
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Return static data as fallback
    return TASK_ITEMS;
  }
}