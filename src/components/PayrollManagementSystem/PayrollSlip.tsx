import React from "react";

const PayrollSlip = ({ data, month }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Salary Slip for the Month of {month}
      </h2>

      {/* ✅ PDF VIEWER */}
      <div className="w-full h-[600px] border rounded overflow-hidden">
        <iframe
          src={data.pdfUrl}
          title="Salary Slip PDF"
          className="w-full h-full"
        />
      </div>

      {/* ✅ DOWNLOAD BUTTON */}
      <div className="text-center mt-4">
        <a
          href={data.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Download Salary Slip
        </a>
      </div>
    </div>
  );
};

export default PayrollSlip;
