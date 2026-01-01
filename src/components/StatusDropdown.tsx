// components/common/StatusDropdown.tsx
import React, { useState, useRef } from "react";
import dropdownicon from "../../assets/dropdownicon.svg";

interface Option {
  value: string;
  label: string;
}

interface StatusDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggleOpen = () => setOpen(!open);

  const onOptionClick = (idx: number) => {
    onChange(options[idx].value);
    setOpen(false);
  };

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
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
            {value === "" ? "Select status" : options.find((o) => o.value === value)?.label}
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
            {options.map((opt, idx) => {
              const isHighlighted = idx === highlighted;
              const isSelected = opt.value === value;
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
  );
};

export default StatusDropdown;
