import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatsCard from "../../components/employee/AttendanceEmpStatsCard";
import EmployeeCard from "../../components/employee/TodaysAttendanceCard";
import { useEmployees } from "../../hooks/todaysAttendance";
import api from "../../Api/api";

// Icons
import AttendanceIcon from "../../assets/images/icons/Attendance.svg";
import AbsentEmp from "../../assets/images/icons/Absent_Emp.svg";
import PresentEmp from "../../assets/images/icons/Present_Emp.svg";
import LateEmp from "../../assets/images/icons/Late_Emp.svg";
import TotalEmp from "../../assets/images/icons/Total_Battery.svg";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TodaysAttendance = () => {
  const { employees, loading } = useEmployees();
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
    const [designations, setDesignations] = useState<any[]>([]);


  const [attendanceStats, setAttendanceStats] = useState({
    total_employee_count: 0,
    present_count: 0,
    late_count: 0,
    leave_count: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/api/todays-attendance-count/");
        if (data.success) {
          setAttendanceStats({
            total_employee_count: data.total_employee_count,
            present_count: data.present_count,
            late_count: data.late_count,
            leave_count: data.leave_count
          });
        }
      } catch (error) {
        console.error("Error fetching attendance stats:", error);
      }
    };
    fetchStats();
  }, []);

   useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await api.get("/api/list-designations/");
        setDesignations(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch designations:", err);
      }
    };
    fetchDesignations();
  }, []);


  if (loading) return <p>Loading...</p>;

  // ✅ FIXED FILTER — THIS IS THE KEY PART
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      !search ||
      emp.employee_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesDesignation =
      !selectedDesignation ||
      emp.designation?.trim() === selectedDesignation.trim();

    const matchesYear =
      !selectedYear ||
      (emp.joiningYear &&
        emp.joiningYear.toString() === selectedYear);

    return matchesSearch && matchesDesignation && matchesYear;
  });

  return (
    <motion.div
      className="bg-[#F6F5FA] w-[1472px] sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div className="mb-6 mt-8" variants={itemVariants}>
        <h1 className="flex items-center gap-2 text-[#4D4D4D] text-[16px] font-[500]">
          <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={AttendanceIcon} className="w-5 h-5" />
          </span>
          Today's Attendance
        </h1>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-4 gap-4 mb-5" variants={itemVariants}>
        <StatsCard title="Total Employees" value={attendanceStats.total_employee_count} icon={<img src={TotalEmp} />} />
        <StatsCard title="Present Employees" value={attendanceStats.present_count} icon={<img src={PresentEmp} />} />
        <StatsCard title="Late Employees" value={attendanceStats.late_count} icon={<img src={LateEmp} />} />
        <StatsCard
          title="Absent Employees"
          value={
            attendanceStats.total_employee_count -
            attendanceStats.present_count -
            attendanceStats.late_count -
            attendanceStats.leave_count
          }
          icon={<img src={AbsentEmp} />}
        />
      </motion.div>

      {/* Filters */}
      <motion.div className="flex justify-between bg-white p-7" variants={itemVariants}>
        <SearchBar value={search} onSearch={setSearch} />
        <div className="flex gap-3">
        <select
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
          >
            <option value="">Designation</option>
            {designations.map((d) => (
              <option key={d.id} value={d.title}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </motion.div>

      {/* List */}

      <motion.div className="grid grid-cols-[190px_150px_1.5fr_150px_120px_160px] bg-[#F4F4F4] font-semibold text-ziyablack px-4 py-4" variants={itemVariants}>
        <div>Date</div>
        <div>Punch In</div>
        <div>Employee Name</div>
        <div>Punch Out</div>
        <div>Late</div>
        <div>Production Hours</div>
      </motion.div>
      <motion.div className="bg-white rounded-b shadow" variants={itemVariants}>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <motion.div key={emp.id} className="px-4 pt-4">
              <EmployeeCard employee={emp} />
            </motion.div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">
            No data at present
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodaysAttendance;
