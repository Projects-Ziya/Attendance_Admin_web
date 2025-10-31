import React, { useState, useRef, useEffect } from "react";
import api from "../../Api/api";
import search from "../../assets/search.svg";

type InputSpec = {
  label: string;
  type: "text" | "select";
  options?: string[];
  placeholder?: string;
};

type CreateCardProps = {
  title: string;
  description: string;
  inputs: InputSpec[];
  buttonLabel: string;
  enableSearch?: boolean;
};

const CreateCard = ({
  title,
  description,
  inputs,
  buttonLabel,
  enableSearch = false,
}: CreateCardProps) => {
  const [values, setValues] = useState<string[]>(inputs.map(() => ""));
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedEmp, setSelectedEmp] = useState<{ id: string; name: string } | null>(null);
  const [newDeptId, setNewDeptId] = useState<string | null>(null); // ✅ store created dept id

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listRefs = useRef<Array<HTMLUListElement | null>>([]);

  // ✅ Fetch list APIs
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        if (title === "Create Departments") {
          const res = await api.get("/api/list-departments/");
          if (res.data?.success && res.data?.data) {
            const heads = res.data.data
              .map((item: any) => {
                if (typeof item.department_head === "string") {
                  return item.department_head;
                } else if (
                  item.department_head &&
                  typeof item.department_head === "object"
                ) {
                  return (
                    item.department_head.name || item.department_head.full_name
                  );
                }
                return null;
              })
              .filter(Boolean);

            setOptions(
              heads.length > 0
                ? heads.map((name: string, index: number) => ({
                    id: index,
                    name,
                  }))
                : [{ id: 0, name: "No heads available" }]
            );
          }
        } else if (title === "Create Designation") {
          // ✅ If department just created, fetch designations under that dept ID
          const endpoint = newDeptId
            ? `/api/list-designations/?department_id=${newDeptId}`
            : "/api/list-departments/";
          const res = await api.get(endpoint);

          if (res.data?.success && res.data?.data) {
            if (newDeptId) {
              // show designations under selected dept
              setOptions(
                res.data.data.map((item: any) => ({
                  id: item.id,
                  name: item.title || item.name,
                }))
              );
            } else {
              // show department list
              setOptions(
                res.data.data.map((item: any) => ({
                  id: item.id,
                  name: item.name,
                }))
              );
            }
          }
        }
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };
    fetchOptions();
  }, [title, newDeptId]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (openIndex === null) return;
      const b = buttonRefs.current[openIndex];
      const l = listRefs.current[openIndex];
      if (b && b.contains(e.target as Node)) return;
      if (l && l.contains(e.target as Node)) return;
      setOpenIndex(null);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  const handleChange = (index: number, val: string) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const toggleDropdown = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const onOptionClick = (inputIdx: number, optionValue: string) => {
    handleChange(inputIdx, optionValue);
    setOpenIndex(null);
  };

  // ✅ Updated backend search logic — includes employee ID & full_name
  const handleSearchQuery = async (q: string) => {
    setQuery(q);
    if (q.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const res = await api.get(`/api/ceo-cmo-search/?letter=${q}`);
      if (res.data?.success && Array.isArray(res.data.executives)) {
        const filtered = res.data.executives.map((emp: any) => ({
          id: emp.id,
          name: `${emp.full_name} `,
          originalName: emp.full_name,
        }));

        setSuggestions(filtered);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search API error:", err);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (emp: any, idx: number) => {
    setQuery(emp.name);
    setSuggestions([]);
    setSelectedEmp({ id: emp.id, name: emp.originalName });
    handleChange(idx, emp.originalName);
  };

  // ✅ Find first dropdown input index
  const firstSelectIndex = inputs.findIndex((inp) => inp.type === "select");

  // ✅ Submit handler (uses employee ID)
  const handleSubmit = async () => {
    try {
      if (title === "Create Departments") {
        if (!selectedEmp?.id) {
          alert("Please select a department head.");
          return;
        }

        const res = await api.post("/api/create-department/", {
          name: values[0],
          department_head: selectedEmp.id,
        });

        if (res.data?.success && res.data?.department_id) {
          setNewDeptId(res.data.department_id); // ✅ store new dept ID for use in Designation
        }

        alert("✅ Department created successfully!");
      } else if (title === "Create Designation") {
        const selectedDept = options.find(
          (opt: any) => opt.name === values[1]
        );
        if (!selectedDept && !newDeptId) {
          alert("Please select a valid department.");
          return;
        }

        await api.post("/api/create-designation/", {
          title: values[0],
          department_id: newDeptId || selectedDept.id, // ✅ use stored dept ID
        });
        alert("✅ Designation created successfully!");
      }

      setValues(inputs.map(() => ""));
      setQuery("");
      setSelectedEmp(null);
    } catch (err) {
      console.error("API POST error:", err);
      alert("❌ Failed to create item. Check console for details.");
    }
  };

  return (
    <div className="bg-white shadow-metrics rounded-[10px] w-[46.4375rem] mx-auto">
      <div className="pt-[3.6875rem] px-[4.3125rem] pb-[5.5rem] flex flex-col">
        <h2 className="text-[22px] font-[600] text-midGray leading-[1.15] tracking-[0.08em]">
          {title}
        </h2>

        <p className="text-[16px] text-smallGray mt-[2.125rem] mb-[5.5rem] leading-[1.5] tracking-[0.08em] max-w-[26.8125rem]">
          {description}
        </p>

        <div className="flex flex-col gap-[2.1875rem]">
          {inputs.map((input, idx) => (
            <div key={idx} className="flex flex-col w-full">
              <label className="text-[14px] font-[400] text-midGray mb-[1.125rem]">
                {input.label}
              </label>

              {input.type === "text" ? (
                <input
                  type="text"
                  value={values[idx]}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="border-[1px] border-[#D9D9D9] rounded-[5px] text-[14px] h-[2.8125rem] w-full max-w-[36.8125rem] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={input.placeholder || ""}
                />
              ) : title === "Create Departments" && idx === firstSelectIndex ? (
                // ✅ Search section ONLY for "Create Departments"
                <div className="w-[532px] pl-[2px] pb-[10px] pt-[10px]">
                  <div className="relative w-[589px]">
                    <input
                      type="text"
                      placeholder="Search employee..."
                      value={query}
                      onChange={(e) => handleSearchQuery(e.target.value)}
                      className="border-2 rounded-lg w-full h-10 pl-10 pr-24"
                    />

                    <img
                      src={search}
                      alt="search"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    />

                    <button
                      type="button"
                      onClick={() => handleSearchQuery(query)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EAECEC] text-[#4D4D4D] px-3 py-1 rounded-md font-medium text-[12px]"
                    >
                      Search
                    </button>

                    {suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
                        {suggestions.map((emp) => (
                          <li
                            key={emp.id}
                            onClick={() => handleSelectSuggestion(emp, idx)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            {emp.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                // ✅ Regular dropdown (for all others)
                <div className="relative w-full max-w-[36.8125rem]">
                  <button
                    ref={(el) => (buttonRefs.current[idx] = el)}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openIndex === idx}
                    onClick={() => toggleDropdown(idx)}
                    className="flex items-center border border-gray-300 rounded-[5px] h-[2.8125rem] w-full pl-[1.25rem] pr-[1rem] bg-white text-[14px] text-smallGray"
                  >
                    <span className="flex-1 text-left truncate">
                      {values[idx] || input.placeholder || "Select"}
                    </span>
                    <svg
                      className="w-[18px] h-[9px] ml-2 pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6 8L10 12L14 8"
                        stroke="#4D4D4D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {openIndex === idx && Array.isArray(options) && (
                    <ul
                      ref={(el) => (listRefs.current[idx] = el)}
                      role="listbox"
                      className="absolute mt-2 w-full max-h-[12rem] overflow-auto rounded-[6px] bg-white border border-gray-200 shadow-lg z-20"
                    >
                      {options.map((opt: any) => (
                        <li
                          key={opt.id}
                          onClick={() => onOptionClick(idx, opt.name)}
                          className={`cursor-pointer px-4 py-3 text-[14px] ${
                            values[idx] === opt.name
                              ? "bg-[#F4F7FB] font-semibold"
                              : "bg-white"
                          }`}
                        >
                          {opt.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-[4.6875rem]">
          <button
            className="w-full max-w-[36.8125rem] h-[2.8125rem] border-[1.5px] border-[#0EA600] text-[#0EA600] font-[400] text-[18px] rounded-[5px] hover:bg-green-50 transition"
            type="button"
            onClick={handleSubmit}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
