import React, { useState, useEffect } from "react";
import { PlusCircle, ChevronUp } from "lucide-react";
import api from "../../Api/api";

interface TaskForm {
  assignedTo: string[];
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  totalWorkingHours: string;
  status: string;
}

interface AssignTasksProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void; // ✅ Final form submission
}

const AssignTasks: React.FC<AssignTasksProps> = ({
  formData,
  setFormData,
  setActiveTab,
  onSubmit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [taskData, setTaskData] = useState<TaskForm>({
    assignedTo: [],
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    totalWorkingHours: "",
    status: "Pending",
  });

  // 🔍 Fetch suggestions (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(`/api/search-employee/?letter=${searchTerm}`);
        setSuggestions(res.data?.employees?.map((emp: any) => emp.full_name) || []);
      } catch (err) {
        console.error("❌ Error fetching employee suggestions:", err);
        setSuggestions([]);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 🧠 Handle field change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // ➕ Add member
  const handleSelectSuggestion = (name: string) => {
    if (!taskData.assignedTo.includes(name)) {
      setTaskData((prev) => ({
        ...prev,
        assignedTo: [...prev.assignedTo, name],
      }));
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  // ❌ Remove member
  const handleRemoveMember = (index: number) => {
    setTaskData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((_, i) => i !== index),
    }));
  };

  // ✅ Validate & Add task
  const handleAddTask = () => {
    if (!taskData.title.trim()) return alert("Task title is required");
    if (taskData.assignedTo.length === 0)
      return alert("Please assign at least one member");
    if (!taskData.dueDate.trim()) return alert("Please select a due date");

    const updatedTasks = [...(formData.tasks || []), taskData];
    setFormData((prev: any) => ({ ...prev, tasks: updatedTasks }));

    // Reset form
    setTaskData({
      assignedTo: [],
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      totalWorkingHours: "",
      status: "Pending",
    });
    setShowForm(false);
  };

  // ✅ Final Add Project
  const handleAddProject = () => {
    if (!formData.tasks || formData.tasks.length === 0) {
      return alert("Please add at least one task before submitting.");
    }

    // ✅ Trigger parent submission (API call or parent-level save)
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Add Task Header */}
      <div
        className="border-2 border-dashed border-blue-300 bg-blue-50 rounded px-4 py-3 cursor-pointer flex justify-between items-center text-blue-600 font-medium"
        onClick={() => setShowForm(!showForm)}
      >
        <div className="flex items-center gap-2">
          <PlusCircle size={20} />
          Add New Task
        </div>
        {showForm && <ChevronUp size={18} className="text-blue-500" />}
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="border rounded-lg p-6 space-y-4 shadow-sm bg-white">
          {/* Assigned Members */}
          <div className="relative">
            <label className="block text-gray-600 mb-2">Assigned Members</label>
            <div className="flex flex-wrap gap-2 border rounded px-3 py-2">
              {taskData.assignedTo.map((member, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(idx)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Type a name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-sm py-1"
              />
            </div>

            {/* Suggestion Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectSuggestion(s)}
                    className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-600 mb-2">Task Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 mb-2">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Due Date, Priority, Hours */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Priority</label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Working Hours</label>
              <input
                type="number"
                name="totalWorkingHours"
                value={taskData.totalWorkingHours}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Add Task Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAddTask}
              type="button"
              className="px-5 py-2 bg-blue-500 text-white rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* 🧾 Added Task List */}
      {formData.tasks?.length > 0 && (
        <div className="border rounded-lg p-4 bg-white space-y-3 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Added Tasks</h3>
          {formData.tasks.map((task: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white p-3 rounded-lg border hover:shadow-md transition"
            >
              {/* Task Info */}
              <div className="flex flex-col min-w-[160px]">
                <span className="font-semibold text-gray-800">{task.title}</span>
                <span className="text-gray-500 text-sm">{task.dueDate || "—"}</span>
              </div>

              {/* Members */}
              <div className="flex -space-x-2 min-w-[120px]">
                {task.assignedTo.slice(0, 3).map((m: string, i: number) => (
                  <img
                    key={i}
                    src="https://via.placeholder.com/40"
                    alt={m}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    title={m}
                  />
                ))}
                {task.assignedTo.length > 3 && (
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs text-gray-600 font-medium border-2 border-white">
                    +{task.assignedTo.length - 3}
                  </span>
                )}
              </div>

              {/* Hours */}
              <div className="min-w-[100px] text-gray-600 text-sm text-center">
                {task.totalWorkingHours || "—"} hrs
              </div>

              {/* Status */}
              <div
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  task.status === "Pending"
                    ? "bg-gray-100 text-gray-600"
                    : task.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {task.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Final Submit */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddProject}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default AssignTasks;
