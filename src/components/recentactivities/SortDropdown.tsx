import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
<div className="relative pr-10 pt-10">
  <select
    value={selected}
    onChange={handleChange}
    className="appearance-none font-poppins pl-4 pr-10 font-regular text-[16px] leading-[180%] tracking-[0.08em] text-[#4D4D4D] border rounded-lg w-[335px] h-[61px] focus:outline-none"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        Sort By : {option}
      </option>
    ))}
  </select>

  {/* Custom dropdown icon */}
  <ChevronDown
    size={20}
    className="pointer-events-none absolute right-14 top-[70px] -translate-y-1/2 text-gray-500"
  />
</div>
  );
};

export default SortDropdown;
