import React from "react";
import StatusButton from "../buttons/StatusButton";
import type { Employee } from "../../models/Employee";
import { Link } from "react-router-dom";
const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const workModeClass =
    employee.workMode === "WFO"
      ? "text-emerald-400"
      : employee.workMode === "WFH"
      ? "text-cyan-500"
      : employee.workMode === "INT"
      ? "text-violet-400"
      : "text-gray-400";

  return (
    <div className="border-b border-gray-300 -mx-4">
    <div className="grid grid-cols-[180px_minmax(0,1.4fr)_minmax(0,1.5fr)_minmax(0,0.9fr)_120px] items-center py-4 px-4 ">
      <p className="text-gray-700">ID: {employee.id}</p>
      <div className="flex items-center gap-3 min-w-0">
        <Link to={`/em/${employee.ID1}`}>
        {employee.avatar && <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />}
        </Link>
        <div className="min-w-0">
          <Link to={`/em/${employee.ID1}`} >
          <p className="font-semibold break-words">{employee.name}</p>
          </Link>
          <span className="text-sm text-gray-500 break-words">
            {employee.designation} - <span className={`font-semibold ${workModeClass}`}>{employee.workMode}</span>
          </span>
        </div>
      </div>
      <p className="text-gray-700 break-words">{employee.email}</p>
      <p className="text-gray-700 break-words">{employee.phone}</p>
      <StatusButton status={employee.status} />
    </div>
    </div>
  );
};

export default EmployeeCard;
