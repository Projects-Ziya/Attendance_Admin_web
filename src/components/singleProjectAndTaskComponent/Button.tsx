import { FaPlus } from "react-icons/fa";

export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-start gap-2 
                 px-6 py-5 border-2 border-dashed border-blue-400 
                 text-blue-500 font-medium rounded-lg 
                 transition"
      style={{ backgroundColor: "#d8f2fd" }}
    >
      <FaPlus className="text-blue-500" />
      {label}
    </button>
  );
}
