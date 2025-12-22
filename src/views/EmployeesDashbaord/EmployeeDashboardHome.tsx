import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatsCard from "../../components/employee/TotEmpStatsCard";
import EmployeeCard from "../../components/employee/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee } from "../../models/Employee";
import { IoMdArrowDropright } from "react-icons/io";

import HeadingIcon from "../../assets/images/icons/TEicon.svg";
import UsersIcon from "../../assets/images/icons/TE.svg";
import TrendingUpIcon from "../../assets/images/icons/AE.svg";
import TrendingDownIcon from "../../assets/images/icons/IE.svg";
import NewEmployees from "../../assets/images/icons/NEicon.svg";
import OnlineEmp from "../../assets/images/icons/OnEicon.svg";
import OnlineInt from "../../assets/images/icons/OnIntern.svg";
import OfflineEmp from "../../assets/images/icons/OffEicon.svg";
import OfflineInt from "../../assets/images/icons/OffIntern.svg";
import { employeeService } from "../../services/employeeService";
import api from "../../Api/api";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const EmployeeDashboardHome = () => {
  const { employees, loading } = useEmployees();
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [attendanceSummaryData, setAttendanceSummaryData] = useState<any>(null);
  const [designations, setDesignations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // ✅ RESET PAGE WHEN FILTERS CHANGE (FIX)
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDesignation, selectedStatus, selectedYear]);

  // Fetch attendance
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await employeeService.GetEmployeeAttendanceSummary();
        setAttendanceSummaryData(data.data);
      } catch (err) {
        console.error("Failed to fetch attendance summary:", err);
      }
    };
    fetchAttendance();
  }, []);

  // Fetch Designations
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

  // -----------------------------
  // FILTER EMPLOYEES
  // -----------------------------
  const filteredEmployees = employees.filter((emp: any) => {
    const name = emp.name ? emp.name.toLowerCase() : "";
    const matchesSearch = name.includes(search.toLowerCase());

    const empDesignationTitle = emp.designation || "";
    const empStatus = emp.status;
    const empJoinYear = emp.joiningYear ?? emp.joining_year;

    const matchesDesignation =
      !selectedDesignation || empDesignationTitle === selectedDesignation;

    const matchesStatus =
      !selectedStatus || empStatus === selectedStatus;

    const matchesYear =
      !selectedYear ||
      (empJoinYear != null &&
        empJoinYear.toString() === selectedYear);

    return matchesSearch && matchesDesignation && matchesStatus && matchesYear;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const groupedByDepartment = paginatedEmployees.reduce((acc, emp: any) => {
    const dept = emp.department || "Unknown";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  return (
    <motion.div
      className="p-6 bg-[#F6F5FA] min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="flex items-center mb-7" variants={itemVariants}>
        <img src={HeadingIcon} alt="Total Active Members" className="w-8 h-8 mr-3" />
        <h2 className="text-lg font-semibold text-ziyablack">Total Employees</h2>
      </motion.div>

      {/* Stats cards */}
      <motion.div className="grid grid-cols-4 gap-5 mb-5" variants={itemVariants}>
        {attendanceSummaryData ? (
          <>
            <StatsCard title="Total Employees" value={attendanceSummaryData.total_employees} color="text-[#FFC107]" icon={<img src={UsersIcon} className="w-9 h-9" />} />
            <StatsCard title="Active Employees" value={attendanceSummaryData.active} color="text-[#31ED31]" icon={<img src={TrendingUpIcon} className="w-9 h-9" />} />
            <StatsCard title="Inactive Employees" value={attendanceSummaryData.inactive} color="text-[#F34040]" icon={<img src={TrendingDownIcon} className="w-9 h-9" />} />
            <StatsCard title="New Employees" value={attendanceSummaryData.new_employees_today} color="text-[#8A38F5]" icon={<img src={NewEmployees} className="w-9 h-9" />} />
            <StatsCard title="Online Employee" value={attendanceSummaryData.onlineemployee_count} color="text-[#00A0E3]" icon={<img src={OnlineEmp} className="w-8 h-8" />} />
            <StatsCard title="Online Intern" value={attendanceSummaryData.onlineintern_count} color="text-[#B39DDB]" icon={<img src={OnlineInt} className="w-8 h-8" />} />
            <StatsCard title="Offline Employee" value={attendanceSummaryData.offlineemployee_count} color="text-[#94C21A]" icon={<img src={OfflineEmp} className="w-8 h-8" />} />
            <StatsCard title="Offline Intern" value={attendanceSummaryData.offlineintern_count} color="text-[#B39DDB]" icon={<img src={OfflineInt} className="w-8 h-8" />} />
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div className="flex items-center justify-between bg-white rounded-t-[10px] shadow-sm px-7 py-8 text-sm" variants={itemVariants}>
        <SearchBar value={search} onSearch={setSearch} />

        <div className="flex gap-3 text-ziyablack">
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
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="appearance-none border border-gray-300 underline rounded-lg px-5 py-2 w-19 h-10 text-ziyablue font-medium cursor-pointer"
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

      {/* Employee list */}
      <motion.div className="bg-white rounded-b-[10px] shadow mb-3" variants={itemVariants}>
        {Object.entries(groupedByDepartment).map(([department, deptEmployees]) => (
          <motion.div key={department} className="px-7 pt-4">
            <h2 className="text-ziyablue font-medium">{department}</h2>
            {deptEmployees.map((emp: any) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </motion.div>
        ))}

        {/* Pagination */}
        <motion.div className="flex justify-end py-9 pr-8">
          <div className="flex items-center space-x-5">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`text-lg font-semibold ${
                    currentPage === pageNum ? "text-ziyablue" : "text-gray-400 hover:text-ziyablue"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="text-ziyablue"
            >
              <IoMdArrowDropright size={36} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EmployeeDashboardHome;
