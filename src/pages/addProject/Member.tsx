import React, { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import api from "../../Api/api";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setActiveTab?: (tab: string) => void;
  handleNext: () => void;
}

const Members: React.FC<Props> = ({ formData, setFormData, handleNext: goNext }) => {
  const [newLeader, setNewLeader] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newTag, setNewTag] = useState("");

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchType, setSearchType] = useState<"leader" | "manager" | "tag" | null>(null);
  const [loading, setLoading] = useState(false);

  let debounceTimer: ReturnType<typeof setTimeout>;

  // ✅ Fetch suggestions from API
  const fetchSuggestions = async (query: string, type: "leader" | "manager" | "tag") => {
    if (!query.trim()) return setSuggestions([]);

    try {
      setLoading(true);
      let url = "";
      if (type === "leader") url = `/api/team-leaders-search/?letter=${query}`;
      else if (type === "manager") url = `/api/search-project-manager/?letter=${query}`;
      else if (type === "tag") url = `/api/search-employee/?letter=${query}`;

      const res = await api.get(url);

      if (type === "leader") setSuggestions(res.data.team_leaders || []);
      else if (type === "manager") setSuggestions(res.data.data || []);
      else if (type === "tag") setSuggestions(res.data.employees || []);
    } catch (err) {
      console.error("❌ Suggestion fetch error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Debounced search
  useEffect(() => {
    clearTimeout(debounceTimer);
    let value = "";
    if (searchType === "leader") value = newLeader;
    if (searchType === "manager") value = newManager;
    if (searchType === "tag") value = newTag;

    if (value.trim()) {
      debounceTimer = setTimeout(() => {
        fetchSuggestions(value, searchType!);
      }, 400);
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(debounceTimer);
  }, [newLeader, newManager, newTag]);

  // 🧩 Add item by ID (not name)
  const handleAdd = (
    field: "teamLeaders" | "projectManagers" | "tags",
    member: { id: string; full_name: string } | null
  ) => {
    if (!member) return;
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].some((m: any) => m.id === member.id)
        ? prev[field]
        : [...prev[field], { id: member.id, name: member.full_name }],
    }));
    setSuggestions([]);
    if (field === "teamLeaders") setNewLeader("");
    if (field === "projectManagers") setNewManager("");
    if (field === "tags") setNewTag("");
  };

  // ❌ Remove item
  const handleRemove = (field: "teamLeaders" | "projectManagers" | "tags", index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  // ✅ Validate and go next
  const validateAndNext = () => {
    if (!formData.teamLeaders.length) return alert("Please add at least one Team Leader");
    if (!formData.projectManagers.length) return alert("Please add at least one Project Manager");
    if (!formData.tags.length) return alert("Please add at least one Tag");
    goNext();
  };

  // 🎨 Reusable input + list field
  const renderField = (
    label: string,
    field: "teamLeaders" | "projectManagers" | "tags",
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    type: "leader" | "manager" | "tag"
  ) => (
    <div className="relative">
      <p className="mb-2 font-medium text-gray-800">{label}</p>
      <div className="flex items-center gap-2 border rounded px-3 py-2 flex-wrap">
        {formData[field].map((item: any, idx: number) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
          >
            {item.name}
            <button
              type="button"
              onClick={() => handleRemove(field, idx)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={value}
          onFocus={() => setSearchType(type)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
          className="outline-none flex-1 h-[40px] min-w-[100px]"
        />

        <button
          type="button"
          onClick={() => {
            const match = suggestions.find(
              (s) => s.full_name.toLowerCase() === value.toLowerCase()
            );
            if (match) handleAdd(field, match);
          }}
          className="text-blue-500 hover:text-blue-600"
        >
          <PlusCircle size={18} />
        </button>
      </div>

      {/* 🔽 Suggestion dropdown */}
      {searchType === type && suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border mt-1 rounded shadow-md w-full max-h-[200px] overflow-auto">
          {loading ? (
            <li className="p-2 text-gray-500 text-sm">Loading...</li>
          ) : (
            suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleAdd(field, s)}
                className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
              >
                {s.full_name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );

  return (
    <div className="space-y-6 text-[1rem]">
      {renderField("Team Leader", "teamLeaders", newLeader, setNewLeader, "leader")}
      {renderField("Project Manager", "projectManagers", newManager, setNewManager, "manager")}
      {renderField("Tags", "tags", newTag, setNewTag, "tag")}

      {/* ✅ Next Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={validateAndNext}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Tasks
        </button>
      </div>
    </div>
  );
};

export default Members;
