import React, { useState, useEffect, useRef } from "react";
import search from "../../assets/search.svg";
import List from "../../components/quickActionPanel/List";
import dropdownicon from "../../assets/dropdown.svg";

type EmployeeListProps = {};

const STATUS_OPTIONS = [
  { value: "", label: "Select Status" },
  { value: "Resigned", label: "Resigned" },
  { value: "Terminated", label: "Terminated" },
  { value: "Retired", label: "Retired" },
];

const EmployeeList = ({}: EmployeeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // dropdown state
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!open) setHighlighted(-1);
    else setHighlighted(STATUS_OPTIONS.findIndex((o) => o.value === statusFilter));
  }, [open, statusFilter]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHasSearched(true);
    }
  };

  const toggleOpen = () => setOpen((s) => !s);

  const onOptionClick = (idx: number) => {
    const opt = STATUS_OPTIONS[idx];
    setStatusFilter(opt.value);
    setOpen(false);
    setHasSearched(true);
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
        listRef.current
          ?.querySelectorAll("li")
          [Math.min(highlighted + 1, STATUS_OPTIONS.length - 1)]?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
        listRef.current
          ?.querySelectorAll("li")
          [Math.max(highlighted - 1, 0)]?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && highlighted >= 0) {
        e.preventDefault();
        onOptionClick(highlighted);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
  };

  return (
    <div className="bg-[#FCFCFC] rounded-[10px] w-[1469px] shadow-[0px_0px_2px_0px_#00000040]  pl-[40px] pr-[37px]">
      <h2 className="font-semibold text-[#4D4D4D] pt-[40px] text-[22px]">
        Past Employee List
      </h2>

      <div className="flex justify-between">
        {/* Search Box */}
        <div className="w-[532px] pl-[2px] pb-[49px] pt-[72px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search employee..."
              className="border-2 rounded-lg w-full h-10 pl-10 pr-24"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHasSearched(true); // live search
              }}
              onKeyDown={handleKeyDown}
            />

            <img
              src={search}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EAECEC] text-[#4D4D4D] px-3 py-1 rounded-md font-medium text-[12px]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Inline custom dropdown (keeps original sizing/alignment) */}
        <div className="relative mt-[50px]">
          <div className="relative flex">
            <button
              ref={buttonRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={toggleOpen}
              onKeyDown={onButtonKeyDown}
              className="flex items-center border border-gray-200 rounded-[10px] w-[336px] h-[61px] pl-[15px] pr-[40px] bg-white text-[16px] text-midGray"
            >
              <span className="flex-1 truncate">
                {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label || STATUS_OPTIONS[0].label}
              </span>

              <img
                src={dropdownicon}
                alt="dropdown"
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
                  const isSelected = opt.value === statusFilter;
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
                        <span className={`${isSelected ? "font-semibold text-[#222]" : "font-normal text-midGray"}`}>
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

      {/* Show list only if a search or filter is used */}
      {hasSearched && (searchTerm.trim() || statusFilter) && (
        <List searchTerm={searchTerm} statusFilter={statusFilter} />
      )}
    </div>
  );
};

export default EmployeeList;
