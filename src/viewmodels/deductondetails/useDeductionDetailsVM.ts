// src/viewmodel/useDeductionDetailsVM.ts
import { useState } from "react";
import type { DeductionCard, ImportantNote, SalaryBreakdown } from "../../models/deduction";
import blueexampleicon from "../../assets/icons/deductiondetails/bluexample.svg";
import greenexampleicon from "../../assets/icons/deductiondetails/greenexample.svg";
import redexampleicon from "../../assets/icons/deductiondetails/redexample.svg";
import orangeexampleicon from "../../assets/icons/deductiondetails/orangeexample.svg";
import blueediticon from "../../assets/icons/deductiondetails/editicon.svg";
import greenediticon from "../../assets/icons/deductiondetails/greenedit.svg"
import orangeediticon from "../../assets/icons/deductiondetails/orangeedit.svg"
import redediticon from "../../assets/icons/deductiondetails/rededit.svg"


// Export themeStyles so components can import it directly
// useDeductionDetailsVM.ts
export const themeStyles = {
  blue: {
    headerBg: "#DAF1FB",
    iconBg: "#1B84FF",
    exampleBg: "#DAF1FB",
    exampleBorderColor: "#1B84FF",
    exampleIcon: blueexampleicon,
    borderColor: "#00A0E3",
    editIcon: blueediticon,
  },
  green: {
    headerBg: "#D6F5E6",
    iconBg: "#03C96F",
    exampleBg: "#D6F5E6",
    exampleBorderColor: "#03C96F",
    exampleIcon: greenexampleicon,
    borderColor: "#6DDA86",
    editIcon: greenediticon,
  },
  orange: {
    headerBg: "#FFF3DA",
    iconBg: "#D97000",
    exampleBg: "#FFFBEA",
    exampleBorderColor: "#D97000",
    exampleIcon: orangeexampleicon,
    borderColor: "#D97000",
    editIcon: orangeediticon,
  },
  red: {
    headerBg: "#FFE1E1",
    iconBg: "#F11515",
    exampleBg: "#FFE1E1",
    exampleBorderColor: "#F11515",
    exampleIcon: redexampleicon,
    borderColor: "#F34040",
    editIcon: redediticon,
  },
};


export function useDeductionDetailsVM() {
  // deductions array only needs colorTheme
const [deductions] = useState<DeductionCard[]>([
  {
    title: "Provident Fund (PF)",
    rate: "12%",
    amount: "₹6,000",
    description: "Employee Provident Fund is a retirement savings scheme",
    contribution: "12% of Basic Pay",
    employerContribution: "12% of Basic Pay",
    example: "If Basic Pay is ₹50,000, then PF deduction = ₹6,000",
    colorTheme: "blue",
  },
  {
    title: "Employee State Insurance (ESI)",
    rate: "0.75%",
    amount: "₹375",
    description: "Medical and cash benefit scheme for employees.",
    contribution: "0.75% of Gross Salary",
    employerContribution: "3.25% of Gross Salary",
    example: "If Gross Salary is ₹50,000, then ESI deduction = ₹375",
    colorTheme: "green",
  },
  {
    title: "Professional Tax",
    rate: "₹200",
    amount: "₹200",
    description: "State-level tax on professions. Varies by state.",
    contribution: "Fixed ₹200",
    employerContribution: "0%",
    example: "Professional Tax = ₹200 per month",
    colorTheme: "orange",
  },
  {
    title: "Income Tax (TDS)",
    rate: "—",
    amount: "₹5,000",
    description: "Tax deducted based on income slabs.",
    contribution: "As per IT Slabs",
    employerContribution: "0%",
    example: "If annual income is ₹6,00,000, monthly TDS ≈ ₹5,000",
    colorTheme: "red",
  },
]);


  const [notes] = useState<ImportantNote[]>([
    { title: "Provident Fund", description: "Both employer and employee contribute equally...", dotColor: "#1B84FF" },
    { title: "ESI", description: "Applicable only if monthly salary is below ₹21,000...", dotColor: "#03C96F" },
    { title: "Professional Tax", description: "State-specific tax. Maximum ₹2,500 per year...", dotColor: "#FD7F20" },
    { title: "Income Tax", description: "Calculated based on annual income...", dotColor: "#F11515" },
  ]);

  const [salaryBreakdown] = useState<SalaryBreakdown>({
    grossSalary: "₹50,000",
    deductions: [
      { label: "Provident Fund (12%)", amount: "₹6,000" },
      { label: "ESI (0.75%)", amount: "₹375" },
      { label: "Professional Tax", amount: "₹200" },
      { label: "Income Tax (TDS)", amount: "₹5,000" },
    ],
    netSalary: "₹38,425",
  });

  return {
    deductions,
    notes,
    salaryBreakdown,
  };
}
