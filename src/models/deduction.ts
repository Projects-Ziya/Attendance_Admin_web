// src/model/deduction.model.ts

// DeductionCard model
export type DeductionCard = {
  title: string;
  rate: string;
  amount: string;
  description: string;
  contribution: string;
  employerContribution: string;
  example: string;
  colorTheme: "blue" | "green" | "orange" | "red";
};

// API response type for salary component
export type SalaryComponentResponse = {
  component_type: string;
  title: string;
  rate_type: "PERCENTAGE" | "FIXED";
  rate_value: number;
  description: string;
  employee_contribution: string;
  employer_contribution: string;
  example_text: string;
};

// Other types
export type ImportantNote = {
  title: string;
  description: string;
  dotColor: string;
};

export type SalaryDeduction = {
  label: string;
  amount: string;
};

export type SalaryBreakdown = {
  grossSalary: string;
  deductions: SalaryDeduction[];
  netSalary: string;
};
