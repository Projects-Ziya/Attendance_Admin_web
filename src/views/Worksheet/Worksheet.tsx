import worksheeticon from "../../assets/icons/Worksicon.svg";
import uploadicon from "../../assets/icons/upload.svg";
import doc_icon from "../../assets/icons/doc.svg";
import download_icon from "../../assets/icons/download.svg"
import edit_icon from "../../assets/icons/editboxicon.svg";
import dlt_icon from "../../assets/icons/delete.svg";
import api from "../../Api/api";
import toast from "react-hot-toast";

import EditModal from "../../components/worksheet/worksheetModal";
import { useWorksheetVM } from "../../viewmodels/worksheet/useWorksheetVM";
import MainLayout from "../../components/layout/MainLayout";

function Worksheet() {
  const {
    worksheets,
    onUploadClick,
    onDownload,
    isModalOpen,
    editingWorksheet,
    onEditClick,
    onCloseModal,
    onChangeEditingName,
    onSaveEdit,
  } = useWorksheetVM();
const handleDelete = async (id: string) => {
  try {
    const res = await api.delete(`/api/worksheetdelete/${id}/`, {
      data: { leave_id: id }  // ✅ use 'data' for DELETE request body
    });

    if (res.data.success) {
      toast.success("Worksheet deleted successfully", { id: "unique-toast-id" });
    } else {
      toast("⚠️ Failed to delete", { id: "unique-toast-id" });
    }
  } catch (err) {
    console.error("Delete Error:", err);
    toast.error("Something went wrong while deleting", { id: "unique-toast-id" });
  }
};


  return (
    <MainLayout>
      <div
        className={` w-[1579px]sm:px-4  lg:px-6 bg-[#F6F5FA] transition-filter duration-300 ${
          isModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center mb-[35px] pt-[46px]">
          <button className="text-[18px] font-[500] text-gray-500 border bg-[#FCFCFC] h-[40px] w-[130px] hover:text-gray-700">
            ← Back
          </button>
          <img className="h-[26px] w-[26px] ml-[19px]" src={worksheeticon} alt="" />
          <p className="ml-[17px] font-[500]">Worksheet</p>
        </div>

        {/* Main card */}
        <div className="h-[1601px] w-[1469px] bg-[#FCFCFC] border rounded-[10px] shadow-sm pl-[40px]">
          {/* Header text */}
          <div className="pt-[60px]">
            <h1 className="font-[600] text-[24px]">Worksheets</h1>
            <p className="font-[500] text-[18px]">
              Manage team Excel sheets and documents
            </p>
          </div>

          {/* Upload button row */}
          <div className="flex justify-end mb-[94px] mr-[40px]">
            <button
              onClick={onUploadClick}
              className="flex items-center justify-center gap-6 mt-[94px] bg-sky-500 h-[57px] w-[379px] text-[25px] font-[500] text-white hover:bg-sky-600"
            >
              <span>
                <img className="w-[30px] h-[30px]" src={uploadicon} alt="" />
              </span>
              <span>Upload Worksheet</span>
            </button>
          </div>

          {/* ===== Team Worksheets container */}
          <div className="h-[1061px] w-[1389px] shadow-sm border border-[#DED1D1] rounded-[20px]">
            <h1 className="font-[600] text-[24px] pt-[49px] pl-[51px]">Team Worksheets</h1>

            {/* list of cards */}
            <div className="mt-[70px] space-y-[40px] pl-[51px]">

              {/* ---------------- NO WORKSHEET FOUND ---------------- */}
              {worksheets.length === 0 && (
                <p className="text-center text-[20px] font-[500] text-gray-500">
                  No worksheets found
                </p>
              )}
              {/* ------------------------------------------------------ */}

              {worksheets.map((w) => (
                <div
                  key={w.id}
                  className="h-[108px] w-[1297px] rounded-[20px] border border-[#C6C6C6] bg-white flex items-center justify-between px-[32px]"
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
                    <button
                      onClick={() => onDownload(w.id)}
                      className="flex items-center justify-center gap-[10px] border border-[#C6C6C6] rounded-[12px] h-[50px] w-[173px] px-[20px] text-[16px] font-[500] text-[#282828] hover:bg-[#F4F4F4]"
                    >
                      <img src={download_icon} alt="Download" className="w-[22px] h-[22px]" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={() => onEditClick(w)}
                      className="flex items-center justify-center h-[50px] w-[40px] rounded-[12px] border border-[#C6C6C6] bg-white hover:bg-[#F4F4F4] transition"
                    >
                      <img src={edit_icon} alt="Edit" className="w-[22px] h-[22px]" />
                    </button>

                    <button
                      onClick={() => handleDelete(w.id)}
                      className="flex items-center justify-center h-[50px] w-[40px] border border-[#FFD0D0] rounded-[12px] hover:bg-[#FFF1F1]"
                    >
                      <img src={dlt_icon} alt="Delete" className="w-[22px] h-[22px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ===== End Team Worksheets container ===== */}
        </div>
      </div>

      {/* Modal and overlay */}
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
    </MainLayout>
  );
}

export default Worksheet;
