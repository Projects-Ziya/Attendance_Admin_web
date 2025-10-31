import { useEffect, useState } from "react";
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

const EmployeeDashboardHome = () => {
  const { employees, loading } = useEmployees();
  console.log(employees)
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [attendanceSummaryData, setAttendanceSummaryData] = useState<any>(null);
  
 useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await employeeService.GetEmployeeAttendanceSummary();
        console.log(data)
        setAttendanceSummaryData(data.data)
      } catch (err) {
        console.error("Failed to fetch attendance summary:", err);
      } 
    };

    fetchAttendance();
  }, []); // Empty dependency array runs once on mount

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) return <p>Loading...</p>;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesDesignation =
      !selectedDesignation || emp.designation === selectedDesignation;
    const matchesStatus =
      !selectedStatus || emp.status === selectedStatus;
    const matchesYear =
    !selectedYear || emp.joiningYear.toString() === selectedYear; 

    return matchesSearch && matchesDesignation && matchesStatus && matchesYear;
});


  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  
  const groupedByDepartment = paginatedEmployees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

 
  
  return (
    <div className="p-6 bg-[#F6F5FA] min-h-screen">

     
      <div className="flex items-center mb-7">
        <img src={HeadingIcon} alt="Total Active Members" className="w-8 h-8 mr-3" />
        <h2 className="text-lg font-semibold text-ziyablack">Total Employees</h2>
      </div>

      
      <div className="grid grid-cols-4 gap-5 mb-5 ">
        {attendanceSummaryData ? (
          <>
        <StatsCard title="Total Employees" value={attendanceSummaryData.total_employees} color="text-[#FFC107]" icon={<img src={UsersIcon} alt="Users" className="w-9 h-9" />} />
        <StatsCard title="Active Employees" value={attendanceSummaryData.active} color="text-[#31ED31]" icon={<img src={TrendingUpIcon} alt="Trending Up" className="w-9 h-9" />} />
        <StatsCard title="Inactive Employees" value={attendanceSummaryData.inactive} color="text-[#F34040]" icon={<img src={TrendingDownIcon} alt="Trending Down" className="w-9 h-9" />} />
        <StatsCard title="New Employees" value={attendanceSummaryData.new_employees_today} color="text-[#8A38F5]" icon={<img src={NewEmployees} alt="New Employees" className="w-9 h-9" />} />
        <StatsCard title="Online Employee" value={attendanceSummaryData.onlineemployee_count} color="text-[#00A0E3]" icon={<img src={OnlineEmp} alt="Online Employee" className="w-8 h-8" />} />
        <StatsCard title="Online Intern" value={attendanceSummaryData.onlineintern_count} color="text-[#B39DDB]" icon={<img src={OnlineInt} alt="Online Intern" className="w-8 h-8" />} />
        <StatsCard title="Offline Employee" value={attendanceSummaryData.offlineemployee_count} color="text-[#94C21A]" icon={<img src={OfflineEmp} alt="Offline Employee" className="w-8 h-8" />} />
        <StatsCard title="Offline Intern" value={attendanceSummaryData.offlineintern_count} color="text-[#B39DDB]" icon={<img src={OfflineInt} alt="Offline Intern" className="w-8 h-8" />} />
          </>
        ):(<p>Loading stats...</p>)}
      </div>

   
      <div className="flex items-center justify-between bg-white rounded-t-[10px] shadow-sm px-7 py-8 text-sm">
        <SearchBar value={search} onSearch={setSearch} />
        <div className="flex gap-3 text-ziyablack">
          <select className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}>
            <option value="">Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}>
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
      </div>

      <div className="grid grid-cols-[200px_1.4fr_1.4fr_1.0fr_100px] bg-[#F4F4F4] font-semibold text-ziyablack px-7 py-4">
          <div>Employee ID</div>
          <div>Employee Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Status</div>
      </div>
        
      <div className="bg-white rounded-b-[10px] shadow mb-3">
        {Object.entries(groupedByDepartment).map(([department, deptEmployees]) => (
          <div key={department} className="px-7 pt-4">
            <h2 className="text-ziyablue font-medium">{department}</h2>
            
            {deptEmployees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        ))}

      <div className="flex justify-end py-9 pr-8">
        <div className="flex items-center space-x-5">
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`text-lg font-semibold ${
                  currentPage === pageNum
                    ? "text-ziyablue"
                    : "text-gray-400 hover:text-ziyablue"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="text-ziyablue"
          >
            <IoMdArrowDropright size={36} />
            
          </button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default EmployeeDashboardHome;
