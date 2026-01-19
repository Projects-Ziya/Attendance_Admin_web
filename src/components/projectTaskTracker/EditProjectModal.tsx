import React, { useState } from "react";
import api from "../../Api/api";
import { X, FileText, ListChecks, Users } from "lucide-react"; // ✅ lucide-react icons

type TaskItem = {
  title: string;
  dueDate: string;
};

type ProjectData = {
  id: number;
  name?: string;
  client?: string;
  start_date?: string;
  due_date?: string;
  priority?: string;
  project_value?: number | string;
  working_hours?: number | string;
  extra_time?: number | string;
  description?: string;
  team_lead?: string;
  project_manager?: string;
  tags?: string[];
  tasks?: TaskItem[];
};

type EditProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectData;
  onUpdated: () => void;
};

type FormState = {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  priority: string;
  value: number | string;
  hours: number | string;
  extraTime: number | string;
  description: string;
  teamLead: string;
  projectManager: string;
  tags: string[];
  tasks: TaskItem[];
};

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  projectData,
  onUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<"basic" | "tasks" | "members">("basic");

  const [form, setForm] = useState<FormState>({
    name: projectData?.name || "",
    client: projectData?.client || "",
    startDate: projectData?.start_date || "",
    endDate: projectData?.due_date || "",
    priority: projectData?.priority || "",
    value: projectData?.project_value ?? "",
    hours: projectData?.working_hours ?? "",
    extraTime: projectData?.extra_time ?? "",
    description: projectData?.description || "",
    teamLead: projectData?.team_lead || "",
    projectManager: projectData?.project_manager || "",
    tags: projectData?.tags || [],
    tasks: projectData?.tasks || [],
  });

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/api/update-project/${projectData.id}`, form);
      onUpdated(); // refresh parent
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!isOpen) return null; // ✅ don't render if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg w-[800px] p-8 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Project</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === "basic" ? "bg-[#00A0E3] text-white" : "bg-gray-100"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Basic Info</span>
          </button>

         

          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === "members" ? "bg-[#00A0E3] text-white" : "bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Members</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              placeholder="Project Name"
              className="input"
            />
            <input
              type="text"
              value={form.client}
              onChange={e => handleChange("client", e.target.value)}
              placeholder="Client"
              className="input"
            />
            <input
              type="date"
              value={form.startDate}
              onChange={e => handleChange("startDate", e.target.value)}
              className="input"
            />
            <input
              type="date"
              value={form.endDate}
              onChange={e => handleChange("endDate", e.target.value)}
              className="input"
            />
            <select
              value={form.priority}
              onChange={e => handleChange("priority", e.target.value)}
              className="input"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="number"
              value={form.value}
              onChange={e => handleChange("value", e.target.value)}
              placeholder="Project Value"
              className="input"
            />
            <input
              type="number"
              value={form.hours}
              onChange={e => handleChange("hours", e.target.value)}
              placeholder="Working Hours"
              className="input"
            />
            <input
              type="number"
              value={form.extraTime}
              onChange={e => handleChange("extraTime", e.target.value)}
              placeholder="Extra Time"
              className="input"
            />
            <textarea
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              placeholder="Project Description"
              className="input col-span-2"
            />
          </div>
        )}

      

        {activeTab === "members" && (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={form.teamLead}
              onChange={e => handleChange("teamLead", e.target.value)}
              placeholder="Team Lead"
              className="input"
            />
            <input
              type="text"
              value={form.projectManager}
              onChange={e => handleChange("projectManager", e.target.value)}
              placeholder="Project Manager"
              className="input"
            />
            <input
              type="text"
              value={form.tags.join(", ")}
              onChange={e =>
                handleChange(
                  "tags",
                  e.target.value.split(",").map(tag => tag.trim())
                )
              }
              placeholder="Tags (comma separated)"
              className="input col-span-2"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-6 gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#00A0E3] text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
