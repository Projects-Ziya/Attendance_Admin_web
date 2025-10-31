import { useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import Locate from "./Locate";
import type { Employee } from "../../models/quickActionPanel/Employee";

const EmployeeManager = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleSearch = (query: string, employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
    }
  };

  const handleRemove = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-8">
      <DeleteEmployee onSearch={handleSearch} />
      <Locate employee={selectedEmployee} onRemove={handleRemove} />
    </div>
  );
};

export default EmployeeManager;
