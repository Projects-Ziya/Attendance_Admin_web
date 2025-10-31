// src/components/BlackModal.jsx
import React from "react";

const BlackModal = ({ onClose, fileName }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-black text-white rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[50%] h-[60%] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <span className="text-sm">{fileName}</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">This is a black modal</p>
        </div>
      </div>
    </div>
  );
};

export default BlackModal;