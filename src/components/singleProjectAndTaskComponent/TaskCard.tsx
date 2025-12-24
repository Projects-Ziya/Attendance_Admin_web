import { FaTrash, FaEdit } from "react-icons/fa";
import { HiMiniCube } from "react-icons/hi2";

export default function TaskCard({ task, onDelete, onEdit }) {
  const statusColors = {
    "On Progress": "text-blue-500",
    "On Hold": "text-red-500",
    Completed: "text-green-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-4">
      {/* HEADER ROW */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Title + Icon */}
        <div className="flex items-center gap-3 flex-shrink-0 w-60">
          {/* 👆 w-60 keeps alignment consistent */}
          <HiMiniCube className="text-gray-700 text-3xl" />
          <h2 className="text-lg font-semibold truncate">{task.title}</h2>
        </div>

        {/* Metadata + Actions */}
        {/* Metadata + Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 flex-1 text-sm text-gray-600">
          {/* Created Date */}
          <div className="leading-relaxed flex flex-col justify-start ">
            <p className="font-medium whitespace-nowrap">Task Created on :</p>
            <p className="text-[#a5a5a5] mt-2">{task.created_at}</p>
          </div>

          {/* Due Date */}
          <div className="leading-relaxed flex flex-col justify-start">
            <p className="font-medium whitespace-nowrap">Task Due Date :</p>
            <p className="mt-2 text-[#a5a5a5]">{task.due_date}</p>
          </div>


          {/* Assignees */}
          <div className="leading-relaxed flex flex-col justify-start">
            <p className="font-medium whitespace-nowrap">Assignee :</p>
            <div className="flex -space-x-3 mt-2">
              {task.assigned_to_name.map((a, idx) => (
                <img
                  key={idx}
                  src={a}
                  alt="assignee"
                  className="w-8 h-8 rounded-full border-2 border-white hover:z-10 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="leading-relaxed flex flex-col justify-start">
            <p className="font-medium whitespace-nowrap">Status </p>
            <p className={`font-medium mt-2 ${statusColors [task.status]}`}>
              {task.status}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-12">
              <button
                onClick={onEdit}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-blue-50 text-gray-600 hover:text-blue-500"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={onDelete}
                className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-600 hover:text-red-500"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        {/* 👆 was mt-8, reduced for closer spacing */}
        <p className="">Description</p>
        <p className="text-gray-500 text-sm mt-2">{task.description}</p>
      </div>
    </div>
  );
}
