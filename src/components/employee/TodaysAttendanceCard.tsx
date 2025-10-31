import React, { useEffect, useState } from "react";
import HoursButton from "../buttons/HoursButton";
import api from "../../Api/api";


interface Employee {
  id: number;
  name: string;
  designation?: string;
  date: string;
  punchIn: string;
  punchOut: string;
  late: string;
  productionHrs: string;
  workMode?: "WFO" | "WFH" | "INT" | string;
  avatar?: string;
}

const EmployeeCard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/todays-all-employess-attendance/");
        const data = res.data.data || [];

        // 🔹 Map backend → EmployeeCard props
        const mapped: Employee[] = data.map((emp: any) => ({
          id: emp.employee_id,
          name: emp.employee_name,
          designation: emp.designation || "Employee",
          date: emp.date,
          punchIn: emp.in_time || "--",
          punchOut: emp.out_time || "--",
          late: emp.late ? emp.late_duration : "--",
          productionHrs: emp.production_hours || "--",
          workMode: emp.work_mode || "WFO",
          avatar: emp.avatar || undefined,
        }));

        setEmployees(mapped);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if(employees.length<1) return <p>no data</p>

  return (
    <div>
      {employees.map((employee) => {
        const workModeClass =
          employee.workMode === "WFO"
            ? "text-ziyagreen"
            : employee.workMode === "WFH"
            ? "text-ziyablue"
            : employee.workMode === "INT"
            ? "text-[#B39DDB]"
            : "text-gray-400";

        let attendanceStatus: "Present" | "Late" | "Absent";
        if (employee.punchIn === "--" && employee.late === "--") {
          attendanceStatus = "Absent";
        } else if (
          employee.late &&
          employee.late !== "--" &&
          employee.late !== "0h"
        ) {
          attendanceStatus = "Late";
        } else {
          attendanceStatus = "Present";
        }

        return (
          <div
            key={employee.id}
            className="border-b border-gray-300 -mx-4"
          >
            <div className="grid grid-cols-[190px_150px_1.5fr_150px_120px_160px] items-center py-4 px-4">
              {/* Date */}
              <p className="text-ziyablack">{employee.date}</p>

              {/* Punch In */}
              <p className="text-ziyablack">{employee.punchIn}</p>

              {/* Employee Name + Avatar + Work Mode */}
              <div className="flex items-center gap-3 min-w-0">
                {employee.avatar && (
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold break-words">{employee.name}</p>
                  <span className="text-sm text-ziyablack break-words">
                    {employee.designation}{" "}
                    <span className={`font-semibold ${workModeClass}`}>
                      ·{employee.workMode}
                    </span>
                  </span>
                </div>
              </div>

              {/* Punch Out */}
              <p className="text-ziyablack">{employee.punchOut}</p>

              {/* Late */}
              <p className="text-ziyablack">{employee.late}</p>

              {/* Production Hours */}
              <HoursButton
                Hours={employee.productionHrs}
                status={attendanceStatus}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeCard;