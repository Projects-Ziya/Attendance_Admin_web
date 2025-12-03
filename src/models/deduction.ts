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
