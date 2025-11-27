import React from "react";

const PayrollSlip = ({ data, month }) => {

  const { company, employee, earnings, deductions } = data;

  const grossEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = grossEarnings - totalDeductions;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded text-black">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <p>{company.address}</p>
        <p>
          Phone: {company.phone} | Email: {company.email}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Salary Slip for the Month of {month}
      </h2>

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

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Earnings</h3>

          <table className="w-full text-sm">
            <tbody>
              {earnings.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td className="text-right">₹ {item.amount}</td>
                </tr>
              ))}
              <tr className="font-semibold border-t">
                <td>Gross Earnings</td>
                <td className="text-right">₹ {grossEarnings}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">Deductions</h3>

          <table className="w-full text-sm">
            <tbody>
              {deductions.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td className="text-right">₹ {item.amount}</td>
                </tr>
              ))}
              <tr className="font-semibold border-t">
                <td>Total Deductions</td>
                <td className="text-right">₹ {totalDeductions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-semibold text-lg">
        Net Pay: ₹ {netPay}
      </p>
    </div>
  );
};

export default PayrollSlip;
