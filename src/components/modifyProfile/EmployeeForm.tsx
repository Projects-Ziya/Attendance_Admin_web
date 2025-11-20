import React from "react";

const EmployeeForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mt-[20px]">
      {/* First Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">First Name</label>
        <input
          type="text"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Last Name</label>
        <input
          type="text"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Employee ID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        <div> 
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Employee ID</label>
        <input
          type="text"
          className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
        </div>
     

      {/* Job Type */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Job Type</label>
        <select className="mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3">
          <option>Select</option>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>
      </div>

      {/* Department */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Department</label>
        <select className="mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3">
          <option>Select</option>
          <option>Engineering</option>
          <option>HR</option>
        </select>
      </div>

      {/* Designation */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Designation</label>
        <select className="mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3">
          <option>Select</option>
          <option>Developer</option>
          <option>Manager</option>
        </select>
      </div>
      </div>

    <div className="flex flex-wrap gap-[15px]">
  {/* User Type */}
  <div className="flex-shrink-0">
    <label className="block text-[18px] font-medium text-[#4D4D4D]">User Type</label>
    <select className="mt-1 block w-[336px] h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3">
      <option>Select</option>
      <option>Admin</option>
      <option>Employee</option>
    </select>
  </div>

  {/* Rep Mgr / TL */}
  <div className="flex-shrink-0">
    <label className="block text-[18px] font-medium text-[#4D4D4D]">Rep Mgr / TL</label>
    <select className="mt-1 block w-[336px] h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3">
      <option>Select</option>
      <option>Manager A</option>
      <option>Manager B</option>
    </select>
  </div>

  {/* Salary */}
  <div className="flex-1 min-w-[200px]">
    <label className="block text-[18px] font-medium text-[#4D4D4D]">Salary</label>
    <input
      type="number"
      className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
    />
  </div>
</div>
      {/* Email */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Employee Email Address</label>
        <input
          type="email"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Create Password</label>
        <input
          type="password"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Confirm Password</label>
        <input
          type="password"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>
      </div>
    </div>
  );
};

export default EmployeeForm;