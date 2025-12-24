// src/components/BlackModal.jsx
import React from "react";

const BlackModal = ({ onClose, fileName }) => {
  const isPDF = fileName.toLowerCase().endsWith(".pdf");
  const isImage =
    fileName.toLowerCase().endsWith(".jpg") ||
    fileName.toLowerCase().endsWith(".jpeg") ||
    fileName.toLowerCase().endsWith(".png") ||
    fileName.toLowerCase().endsWith(".gif");

  const isDocument =
    fileName.toLowerCase().endsWith(".doc") ||
    fileName.toLowerCase().endsWith(".docx") ||
    fileName.toLowerCase().endsWith(".xls") ||
    fileName.toLowerCase().endsWith(".xlsx") ||
    fileName.toLowerCase().endsWith(".txt");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-black text-white rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[50%] h-[60%] flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <span className="text-sm truncate max-w-[80%]">{fileName}</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 p-4 flex items-center justify-center overflow-auto">

          {/* ✔ PDF Preview */}
        {isPDF && (
  <a
    href={fileName}
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-white text-black rounded-md font-semibold"
  >
    Open PDF
  </a>
)}


          {/* ✔ Image Preview */}
          {isImage && (
            <img
              src={fileName}
              alt="Attachment"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          )}

          {/* ✔ Document formats (doc, docx, xls, xlsx, txt) */}
          {isDocument && (
            <div className="text-center">
              <p className="text-gray-300 mb-3">
                Preview not supported for this file type.
              </p>
              <a
                href={fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
              >
                Download & Open
              </a>
            </div>
          )}

          {/* ❗ Fallback for unknown formats */}
          {!isPDF && !isImage && !isDocument && (
            <div className="text-center">
              <p className="text-gray-300 mb-3">Unable to preview this file.</p>
              <a
                href={fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackModal;
