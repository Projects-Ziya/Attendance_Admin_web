import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatsCard from "../../components/employee/StatsCard";
import EmployeeCard from "../../components/employee/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee } from "../../models/Employee";

// Import SVG files
import HeadingIcon from "../../assets/images/icons/AE.svg";
import UsersIcon from "../../assets/images/icons/TE.svg";
import TrendingUpIcon from "../../assets/images/icons/AE.svg";
import TrendingDownIcon from "../../assets/images/icons/IE.svg";

const EmployeeListView = () => {
  const { employees, loading } = useEmployees();
  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  if (loading) return <p>Loading...</p>;

  // Filter employees by search, designation and status
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesDesignation =
      !selectedDesignation || emp.designation === selectedDesignation;
    const matchesStatus =
      !selectedStatus || emp.status === selectedStatus;

    return matchesSearch && matchesDesignation && matchesStatus;
});

  // Group employees by department
  const groupedByDepartment = filteredEmployees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  // Calculate Counts
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.status === "Active").length;
  const inactiveEmployees = employees.filter((emp) => emp.status === "Inactive").length;

  return (
    <div className="p-6 bg-[#F6F5FA] min-h-screen">

      {/* Heading with Icon */}
      <div className="flex items-center mb-7">
        <img src={HeadingIcon} alt="Total Active Members" className="w-6 h-6 mr-3" />
        <h2 className="text-lg font-semibold text-ziyablack">Total Active Members</h2>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6 ">
        <StatsCard title="Total Employees" value={totalEmployees} color="text-yellow-500" icon={<img src={UsersIcon} alt="Users" className="w-8 h-8" />} />
        <StatsCard title="Active Employees" value={activeEmployees} color="text-green-500" icon={<img src={TrendingUpIcon} alt="Trending Up" className="w-8 h-8" />} />
        <StatsCard title="Inactive Employees" value={inactiveEmployees} color="text-red-500" icon={<img src={TrendingDownIcon} alt="Trending Down" className="w-8 h-8" />} />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between bg-white rounded-t-[10px] shadow-sm p-4 text-sm">
        <SearchBar value={search} onSearch={setSearch} />
        <div className="flex gap-3 text-gray-500">
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
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-[190px_1.4fr_1.4fr_1.0fr_115px] bg-[#F4F4F4]] font-semibold text-ziyablack px-4 py-4">
          <div>Employee ID</div>
          <div>Employee Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Status</div>
      </div>
        
    {/* Grouped Employee List */}
      <div className="bg-white rounded-b-[10px] shadow">
        {Object.entries(groupedByDepartment).map(([department, deptEmployees]) => (
          <div key={department} className="px-4 pt-4">
            {/* Department Title */}
            <h2 className="text-ziyablue font-medium">{department}</h2>
            {/* Employee Rows */}
            
            {deptEmployees.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListView;
