import React, { useState } from "react";
import api from "../../Api/api";
import BasicInformation from "./BasicInformation";
import Members from "./Member";
import AssignTasks from "./AssignTask";

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
        alert("Please fill all required basic fields");
        return false;
      }
    }

    if (section === "members") {
      if (
        (!formData.teamLeaders || formData.teamLeaders.length === 0) ||
        (!formData.projectManagers || formData.projectManagers.length === 0) ||
        (!formData.tags || formData.tags.length === 0)
      ) {
        alert("Please add at least one Team Leader, Project Manager, and Tag");
        return false;
      }
    }

    if (section === "tasks") {
      if (!formData.tasks || formData.tasks.length === 0) {
        alert("Please assign at least one task");
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
    e?.preventDefault(); // only if event exists
    if (!validateSection("tasks")) return;

    setLoading(true);
    try {
      
const membersPayload = {
  teamLeaders: formData.teamLeaders.map((m: any) => m.id),
  projectManagers: formData.projectManagers.map((m: any) => m.id),
  tags: formData.tags.map((m: any) => m.id),
};
      const payload = new FormData();
      if (formData.project_logo) payload.append("project_logo", formData.project_logo as File);
      if (formData.attachment) payload.append("attachment", formData.attachment as File);

      payload.append("project_name", formData.project_name);
      payload.append("client", formData.client);
      payload.append("start_date", formData.start_date);
      payload.append("end_date", formData.end_date);
      payload.append("priority", formData.priority);
      payload.append("project_value", formData.project_value);
      payload.append("total_working_hours", formData.total_working_hours);
      payload.append("extra_time", formData.extra_time);
      payload.append("description", formData.description);

      // ✅ Correctly include members
      payload.append("members", JSON.stringify(membersPayload));

      // ✅ Include tasks
      payload.append("tasks", JSON.stringify(formData.tasks));

      const res = await api.post("/api/add-project/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Project created successfully!");
      console.log("Project created:", res.data);
    } catch (err) {
      console.error("❌ Error creating project:", err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow rounded-lg p-6 w-[76.51vw] h-[125.37vh] pt-[27px]">
      {/* Header */}
      <div className="mb-6 flex gap-2">
        <h2 className="text-xl font-semibold">Add Project</h2>
        <p className="text-gray-500 text-sm pt-1">Project ID : PRO-0004</p>
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
                  ? "text-blue-600 border-b-2 border-blue-600"
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
            onSubmit={handleSubmit} // ✅ Pass final submit
          />
        )}
      </form>
    </div>
  );
};

export default AddProject;
