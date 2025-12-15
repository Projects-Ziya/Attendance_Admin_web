import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import worksheeticon from "../../assets/icons/Worksicon.svg";
import uploadicon from "../../assets/icons/upload.svg";
import doc_icon from "../../assets/icons/doc.svg";
import download_icon from "../../assets/icons/download.svg";
import edit_icon from "../../assets/icons/editboxicon.svg";
import dlt_icon from "../../assets/icons/delete.svg";

import api from "../../Api/api";

import EditModal from "../../components/worksheet/worksheetModal";
import UploadNewWorksheet from "../../components/worksheet/UploadNewWorksheet";
import { useWorksheetVM } from "../../viewmodels/worksheet/useWorksheetVM";
import MainLayout from "../../components/layout/MainLayout";

function Worksheet() {
  const {
    worksheets,
    editingWorksheet,
    onEditClick,
    onCloseModal,
    onChangeEditingName,
    onSaveEdit,
    isModalOpen,
     removeWorksheetFromState, 
     refetchWorksheets,
  } = useWorksheetVM();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const onUploadClick = () => setIsUploadModalOpen(true);
  const onCloseUploadModal = () => setIsUploadModalOpen(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/api/worksheetdelete/${id}/`, {
        data: { leave_id: id },
      });

      if (res.data.success) {
        toast.success("Worksheet deleted successfully");

         removeWorksheetFromState(id);
      } else {
        toast.error("⚠️ Failed to delete");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Something went wrong while deleting");
    }
  };

  // New: download file properly
  const handleDownload = async (worksheet: any) => {
    if (!worksheet || !worksheet.fileUrl) {
      toast.error("File not found.");
      return;
    }

    try {
      const res = await fetch(worksheet.fileUrl, {
        method: "GET",
        credentials: "include",
      });
      const blob = await res.blob();
      const fileExtension = worksheet.fileUrl.split(".").pop() || "xlsx";
      const fileName = `${worksheet.title}.${fileExtension}`;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast("Downloading.....!");
    } catch (err) {
      console.error("Download Error:", err);
      toast.error("Failed to download file.");
    }
  };

  return (
    <MainLayout>
      <div
        className={`w-[1469px] sm:px-4 mb-[30px] lg:px-6 bg-[#F6F5FA] transition-filter duration-300 ${
          isUploadModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Top bar */}
         <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12">
          <h1 className="flex items-center gap-2 text-midGray text-[16px] leading-[16px] font-[500]">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img src={worksheeticon} className="w-5.5 h-5.5 object-contain filter-blue" />
            </span>
           Worksheet
          </h1>
        </div>

        {/* Main card */}
        <div className="h-auto w-[1469px] bg-[#FCFCFC] pb-[40px] border rounded-[10px] shadow-sm pl-[40px]">
          {/* Header */}
          <div className="pt-[60px]">
            <h1 className="font-[600] text-[24px]">Worksheets</h1>
            <p className="font-[500] text-[18px]">Manage team Excel sheets and documents</p>
          </div>

          {/* Upload button */}

          <div className="flex justify-end mb-[40px] mr-[40px]">
           <motion.button
  onClick={onUploadClick}
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center justify-center gap-4 mt-[40px] h-[57px] w-[379px] rounded-lg 
             bg-[#00A0E3] text-white font-semibold text-[25px]
             shadow-lg hover:shadow-md transition-transform duration-400"
>
  <motion.img
    src={uploadicon}
    alt="Upload"
    className="w-[30px] h-[30px]"
    whileHover={{ rotate: 90 }}
    transition={{ type: "spring", stiffness: 100 }}
  />
  <span className="tracking-wide">Upload Worksheet</span>
</motion.button>

          </div>

          {/* Team Worksheets */}
          <div className="h-[700px] w-[1389px] shadow-sm border border-[#DED1D1] rounded-[20px] scrollable pb-8">
            <h1 className="font-[600] text-[24px] pt-[49px] pl-[51px]">Team Worksheets</h1>

            <div className="mt-[70px] space-y-[40px] pl-[51px]">
              {worksheets.length === 0 && (
                <p className="text-center text-[20px] font-[500] text-gray-500">
                  No worksheets found
                </p>
              )}

<AnimatePresence>
              {worksheets.map((w, index) => (
               <motion.div
  key={w.id}
  className="h-[108px] w-[1297px] rounded-[20px] border border-[#C6C6C6] bg-white flex items-center justify-between px-[32px]"
  
  // ✅ Entry animation
  initial={{ opacity: 0, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  
  // ✅ Exit animation (already correct)
  exit={{ opacity: 0, y: -10, scale: 0.95 }}

  transition={{ duration: 0.25, ease: "easeOut" }}
>

                  {/* LEFT: icon + text */}
                  <div className="flex items-center gap-[16px]">
                    <div className="h-[60px] w-[61px] rounded-[16px] bg-[#C0EDBF] flex items-center justify-center">
                      <img src={doc_icon} alt="Document" className="h-[33.833px] w-[29px]" />
                    </div>
                    <div>
                      <p className="text-[22px] font-[500] text-[#000000]">{w.title}</p>
                      <p className="mt-[4px] text-[20px] font-[500] text-[#746F6F] tracking-[0.08em]">
                        Uploaded by {w.uploadedBy} • {w.date} • {w.sizeMB} MB
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: buttons */}
                  <div className="flex items-center gap-[16px]">
                   <motion.button
  onClick={() => handleDownload(w)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center justify-center gap-3 h-[50px] w-[173px] px-[20px] rounded-lg
             bg-gradient-to-r 0  font-medium text-[16px]
             shadow-md hover:shadow-xl transition-all duration-300"
>
  <motion.img
    src={download_icon}
    alt="Download"
    className="w-[22px] h-[22px]"
    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
  />
  <span>Download</span>
</motion.button>


                    <motion.button
  onClick={() => onEditClick(w)}
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center justify-center h-[50px] w-[50px] rounded-lg border border-gray-300 
             bg-white hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
>
  <img src={edit_icon} alt="Edit" className="w-[24px] h-[24px]" />
</motion.button>


                    <motion.button
  onClick={() => handleDelete(w.id)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center justify-center h-[50px] w-[50px] rounded-lg border border-red-300 
             bg-white hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md"
>
  <motion.img src={dlt_icon} alt="Delete"
  initial={{ rotate: 0 }}
  animate={{ rotate: 0 }}
   whileHover={{
    rotate: [20, -20, 0],
  }}
  transition={{
    rotate: {
      duration: 0.4,
      ease: "easeInOut",
    },
  }}
     className="w-[24px] h-[24px]" />
</motion.button>

                  </div>
                </motion.div>
                
              ))}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingWorksheet && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
            onClick={onCloseModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <EditModal
              onClose={onCloseModal}
              editingWorksheet={editingWorksheet}
              onChangeEditingName={onChangeEditingName}
              onSaveEdit={onSaveEdit}
            />
          </div>
        </>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
            onClick={onCloseUploadModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-40">
<UploadNewWorksheet 
  onClose={onCloseUploadModal}
  onUploaded={refetchWorksheets}   // ✅ ADD THIS
/>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Worksheet;
