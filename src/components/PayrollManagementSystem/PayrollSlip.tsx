import React from "react";

const PayrollSlip: React.FC = () => {
  // dummy data (later replace with API)
  const company = {
    name: "Company Name",
    address: "Address, City",
    phone: "9876543210",
    email: "company@mail.com",
    month: "January 2025",
  };

  const employee = {
    name: "John Doe",
    id: "EMP1023",
    designation: "Software Engineer",
    department: "Development",
    jobType: "Full-Time",
    bank: "1234 5678 9012",
    pan: "ABCDE1234F",
    uan: "123456789012",
    workingDays: 30,
    paidDays: 28,
  };

  const earnings = [
    { title: "Basic Pay", amount: 30000 },
    { title: "House Rent Allowance (HRA)", amount: 15000 },
    { title: "Conveyance Allowance", amount: 2000 },
    { title: "Medical Allowance", amount: 1500 },
    { title: "Over Time", amount: 800 },
    { title: "Transportation Allowance", amount: 1000 },
    { title: "Special Allowance", amount: 2000 },
  ];

  const deductions = [
    { title: "Provident Fund (PF)", amount: 1800 },
    { title: "Employees' State Insurance (ESI)", amount: 500 },
    { title: "Professional Tax (PT)", amount: 200 },
    { title: "Income Tax (TDS)", amount: 2500 },
  ];

  const grossEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);

  const netPay = grossEarnings - totalDeductions;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded text-black">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <p>{company.address}</p>
        <p>
          Phone: {company.phone} | Email: {company.email}
        </p>
      </div>

      {/* Salary Slip Title */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Salary Slip for the Month of {company.month}
      </h2>

      {/* Employee Details */}
      <div className="border p-4 rounded mb-6">
        <h3 className="font-semibold text-lg mb-2">Employee Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Employee Name:</strong> {employee.name}</p>
          <p><strong>Employee ID:</strong> {employee.id}</p>

          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Department:</strong> {employee.department}</p>

          <p><strong>Job Type:</strong> {employee.jobType}</p>
          <p><strong>Bank A/C No.:</strong> {employee.bank}</p>

          <p><strong>PAN:</strong> {employee.pan}</p>
          <p><strong>UAN:</strong> {employee.uan}</p>

          <p><strong>Working Days:</strong> {employee.workingDays}</p>
          <p><strong>Paid Days:</strong> {employee.paidDays}</p>
        </div>
      </div>

      {/* Earnings & Deductions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Earnings */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Earnings</h3>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Component</th>
                <th className="text-right">Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              {earnings.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td className="text-right">{item.amount}</td>
                </tr>
              ))}

              <tr className="font-semibold border-t">
                <td>Gross Earnings</td>
                <td className="text-right">{grossEarnings}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deductions */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Deductions</h3>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Component</th>
                <th className="text-right">Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              {deductions.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td className="text-right">{item.amount}</td>
                </tr>
              ))}

              <tr className="font-semibold border-t">
                <td>Total Deductions</td>
                <td className="text-right">{totalDeductions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Pay */}
      <div className="mb-6">
        <p className="font-semibold text-lg">
          Net Pay (in words): <span className="font-normal">₹ {netPay} only</span>
        </p>
      </div>

      {/* Signature */}
      <div className="mt-10 text-center">
        <p className="mb-6">Authorized Signatory</p>
        <p className="font-semibold">Signature</p>
        <p>HR Manager</p>
        <p>{company.name}</p>
      </div>
    </div>
  );
};

export default PayrollSlip;
