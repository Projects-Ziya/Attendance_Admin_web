import React, { useState } from "react";
import api from "../../Api/api";
import BasicInformation from "./BasicInformation";
import Members from "./Member";
import AssignTasks from "./AssignTask";
import toast from "react-hot-toast";

const AddProject = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "members" | "tasks">("basic");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    project_name: "",
    client: "",
    start_date: "",
    end_date: "",
    priority: "",
    project_value: "",
    total_working_hours: "",
    extra_time: "",
    description: "",
    project_logo: null,
    attachment: null,

    // 🧩 Members tab fields
    teamLeaders: [] as string[],
    projectManagers: [] as string[],
    tags: [] as string[],

    // 🧩 Tasks tab fields
    members: [] as string[],
    tasks: [] as any[],
  });

  // ✅ Validation logic for each section
  const validateSection = (section: string) => {
    if (section === "basic") {
      if (
        !formData.project_name ||
        !formData.client ||
        !formData.start_date ||
        !formData.end_date ||
        !formData.priority
      ) {
        toast("Please fill all required basic fields",{id: "unique-toast-id",});
        return false;
      }
    }

    if (section === "members") {
      if (
        (!formData.teamLeaders || formData.teamLeaders.length === 0) ||
        (!formData.projectManagers || formData.projectManagers.length === 0) ||
        (!formData.tags || formData.tags.length === 0)
      ) {
        toast("Please add at least one Team Leader, Project Manager, and Tag",{id: "unique-toast-id",});
        return false;
      }
    }

    if (section === "tasks") {
      if (!formData.tasks || formData.tasks.length === 0) {
        toast("Please assign at least one task",{id: "unique-toast-id",});
        return false;
      }
    }

    return true;
  };

  // ✅ Section transition handler
  const handleNext = (nextTab: "members" | "tasks") => {
    if (validateSection(activeTab)) {
      setActiveTab(nextTab);
    }
  };

  // ✅ Final submit
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateSection("tasks")) return;

    setLoading(true);
    try {
      const payload = new FormData();

      // ✅ Append files
      if (formData.project_logo) payload.append("project_logo", formData.project_logo);
      if (formData.attachment) payload.append("attachment", formData.attachment);

      // ✅ Append basic fields
      const basicFields = [
        "project_name",
        "client",
        "start_date",
        "end_date",
        "priority",
        "project_value",
        "total_working_hours",
        "extra_time",
        "description",
      ];

      // ✅ ✅ FIXED TYPE ERROR HERE
      basicFields.forEach((field) => {
        const key = field as keyof typeof formData;
        if (formData[key]) payload.append(key, formData[key] as any);
      });

      // ✅ Members field
      const membersPayload = {
        team_leader: formData.teamLeaders?.[0] || null,
        project_manager: formData.projectManagers?.[0] || null,
        tags: formData.tags?.map((t: any) => t.name || t) || [],
      };
      payload.append("members", JSON.stringify(membersPayload));

      // ✅ FIXED TASKS SECTION
      const formattedTasks = formData.tasks.map((task: any) => ({
        title: task.title,
        description: task.description,
        assigned_to: Array.isArray(task.assigned_to)
          ? task.assigned_to.map((id: any) => Number(id))
          : [Number(task.assigned_to)],
        due_date: task.due_date,
        priority: task.priority,
        status: task.status || "Pending",
        total_working_hours: task.total_working_hours,
      }));

      payload.append("tasks", JSON.stringify(formattedTasks));

      // ✅ API call
      const res = await api.post("/api/add-project/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Project created successfully!",{id: "unique-toast-id",});
      console.log("🎯 Final payload:", Object.fromEntries(payload.entries()));
      console.log("Response:", res.data);
    } catch (err) {
      console.error("❌ Error creating project:", err);
      toast.error("Failed to create project",{id: "unique-toast-id",});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow rounded-lg p-6 w-[76.51vw] h-[125.37vh] pt-[40px] mt-[27px]"
     style={{ boxShadow: "0px 0px 2px 0px #00000040" }}>
      {/* Header */}
      <div className="mb-6 flex gap-2 ">
        <h2 className="font-[600] pb-[20px] text-[24px] tracking-[0.08em]">Add Project</h2>
        <p className="text-gray-500 text-sm ">Project ID : PRO-0004</p>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-6 text-[min(1.125rem,18px)] text-[#4D4D4D]">
          {["basic", "members", "tasks"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`pb-2 ${
                activeTab === tab
                  ? "text-[#00A0E3] border-b-2 border-[#00A0E3]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab === "basic" && "Basic Information"}
              {tab === "members" && "Members"}
              {tab === "tasks" && "Assign Tasks"}
            </button>
          ))}
        </nav>
      </div>

      {/* Render content */}
      <form onSubmit={handleSubmit} className="h-full">
        {activeTab === "basic" && (
          <BasicInformation
            formData={formData}
            handleChange={(e) => {
              const { name, value, files } = e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                [name]: files ? files[0] : value,
              }));
            }}
            setActiveTab={setActiveTab}
            handleNext={() => handleNext("members")}
          />
        )}

        {activeTab === "members" && (
          <Members
            formData={formData}
            setFormData={setFormData}
            handleNext={() => handleNext("tasks")}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "tasks" && (
          <AssignTasks
            formData={formData}
            setFormData={setFormData}
            setActiveTab={setActiveTab}
            onSubmit={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default AddProject;
