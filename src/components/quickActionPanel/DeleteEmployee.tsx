import React, { useState, useEffect, useRef } from "react";
import search from "../../assets/search.svg";
import dropdownicon from "../../assets/dropdown.svg";
import type { Employee } from "../../models/quickActionPanel/Employee";
import api from "../../Api/api";

type DeleteEmployeeProps = {
  onSearch: (query: string, employee?: Employee) => void;
};

const STATUS_OPTIONS = [
  { value: "", label: "Select Status" },
  { value: "Resigned", label: "Resigned" },
  { value: "Terminated", label: "Terminated" },
  { value: "Retired", label: "Retired" },
  { value: "Contract Ended", label: "Contract Ended" },
];

const DeleteEmployee = ({ onSearch }: DeleteEmployeeProps) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<Employee[]>([]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // 🔎 Fetch search suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await api.get(`/api/active-employee-search/?letters=${query}`);

        // ✅ Fix: use "employees" instead of "data"
        if (response.data?.success && Array.isArray(response.data.employees)) {
          const mappedData: Employee[] = response.data.employees.map((item: any) => ({
            id: item.employee_id,
            name: `${item.first_name} ${item.last_name}`,
            designation: item.designation,
            department: item.department,
            avatarUrl: item.profile_pic
              ? item.profile_pic
              : "/default-avatar.png",
            status: item.emp_status || "",
            exitDate: item.emp_exit_date || "",
            email: item.email || "",
            phone: item.phone || "",
          }));

          setSuggestions(mappedData);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
      setSuggestions([]);
    }
  };

  const toggleOpen = () => setOpen((s) => !s);

  const onOptionClick = (idx: number) => {
    const opt = STATUS_OPTIONS[idx];
    setStatus(opt.value);
    setOpen(false);
  };

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, STATUS_OPTIONS.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter" && highlighted >= 0) {
        e.preventDefault();
        onOptionClick(highlighted);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
  };

  return (
    <div className="bg-[#FCFCFC] shadow-[0px_0px_2px_0px_#00000040]  w-[1469px] rounded-[10px] pt-[40px] pr-[37px] pl-[41px]">
      <h2 className="font-semibold text-[22px] leading-[180%] text-[#4D4D4D]">
        Delete Employee
      </h2>

      <div className="flex items-start justify-between flex-wrap">
        {/* Search Box with Suggestions */}
        <div className="w-[532px] pl-[2px] pb-[49px] pt-[63px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search employee..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownInput}
              className="border-2 rounded-lg w-full h-10 pl-10 pr-24"
            />

            <img
              src={search}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            />

            <button
              type="button"
              onClick={() => {
                onSearch(query);
                setSuggestions([]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EAECEC] text-[#4D4D4D] px-3 py-1 rounded-md font-medium text-[12px]"
            >
              Search
            </button>

            {/* ✅ Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
                {suggestions.map((emp) => (
                  <li
                    key={emp.id}
                    onClick={() => {
                      setQuery(emp.name);
                      setSuggestions([]);
                      onSearch(emp.name, emp); // ✅ send selected employee
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <img
                      src={emp.avatarUrl}
                      alt={emp.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{emp.name}</span>
                    <span className="text-sm text-gray-500">
                      {emp.designation}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative mt-[50px]">
          <div className="relative flex">
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={toggleOpen}
              onKeyDown={onButtonKeyDown}
              className="flex items-center border border-gray-200 rounded-[10px] w-[336px] h-[61px] pl-[15px] pr-[40px] bg-white text-[14px] text-midGray"
            >
              <span className="flex-1 truncate">
                {STATUS_OPTIONS.find((o) => o.value === status)?.label ||
                  STATUS_OPTIONS[0].label}
              </span>

              <img
                src={dropdownicon}
                alt="Dropdown icon"
                className="pointer-events-none w-[18px] h-[9px]"
              />
            </button>

            {open && (
              <ul
                ref={listRef}
                role="listbox"
                tabIndex={-1}
                className="absolute mt-2 w-[336px] max-h-[12rem] overflow-auto rounded-[6px] bg-white border border-gray-200 shadow-lg z-20"
                onKeyDown={onButtonKeyDown}
              >
                {STATUS_OPTIONS.map((opt, idx) => {
                  const isHighlighted = idx === highlighted;
                  const isSelected = opt.value === status;
                  return (
                    <li
                      key={opt.value + idx}
                      id={`status-opt-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => onOptionClick(idx)}
                      onMouseEnter={() => setHighlighted(idx)}
                      className={`cursor-pointer px-[16px] py-[12px] text-[14px] ${
                        isHighlighted ? "bg-[#F4F7FB]" : "bg-white"
                      }`}
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`${
                            isSelected
                              ? "font-semibold text-[#222]"
                              : "font-normal text-midGray"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
