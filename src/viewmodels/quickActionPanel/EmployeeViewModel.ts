import { useState, useEffect } from "react";
import type { Employee } from "../../models/quickActionPanel/Employee";
import { getEmployees } from "../../services/quickActionPanel/employeeService";

export const useEmployeeViewModel = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(filter.toLowerCase()) &&
    (statusFilter ? e.status === statusFilter : true)
  );

  return {
    employees: filteredEmployees,
    setFilter,
    setStatusFilter,
  };
};