import React, { useEffect, useState } from "react";

interface EmployeeFormProps {
  data: any;
  setEmployeeData: (data: any) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ data, setEmployeeData }) => {
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    employee_id: "",
    job_type: "",
    department: "",
    designation: "",
    user_type: "",
    reporting_manager: "",
    salary: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!data) return;
    setFormData((prev: any) => ({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      employee_id: data.employee_id || "",
      job_type: data.job_type || "",
      department: data.department || "",
      designation: data.designation || "",
      user_type: data.user_type || "",
      reporting_manager: data.reporting_manager || "",
      salary: data.salary || "",
      email: data.user?.email || data.email || "",
      // keep whatever the user is typing
      password: prev.password ?? "",
      confirmPassword: prev.confirmPassword ?? "",
    }));
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setEmployeeData({ ...data, [name]: value });
  };

  return (
    <div className="flex flex-col gap-4 mt-[20px]">
      {/* First Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Employee ID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Employee ID
          </label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Job Type
          </label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Senior Backend Developer">
              Senior Backend Developer
            </option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-[15px]">
        {/* User Type */}
        <div className="flex-shrink-0">
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            User Type
          </label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="mt-1 block w-[336px] h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        {/* Rep Mgr / TL */}
        <div className="flex-shrink-0">
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Rep Mgr / TL
          </label>
          <select
            name="reporting_manager"
            value={formData.reporting_manager}
            onChange={handleChange}
            className="mt-1 block w-[336px] h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          >
            <option value="">Select</option>
            <option value="Ramesh Kumar">Ramesh Kumar</option>
            <option value="Manager A">Manager A</option>
            <option value="Manager B">Manager B</option>
          </select>
        </div>

        {/* Salary */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Employee Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Create Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>

        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
