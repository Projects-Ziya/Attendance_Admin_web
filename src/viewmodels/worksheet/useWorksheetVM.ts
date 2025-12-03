import { useEffect, useState } from "react";
import api from "../../Api/api";

export function useWorksheetVM() {
  const [worksheets, setWorksheets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorksheet, setEditingWorksheet] = useState<any | null>(null);

  // =====================
  // 📌 FETCH WORKSHEETS API
  // =====================
  const fetchWorksheets = async () => {
    try {
      const res = await api.get("/api/worksheet_list/");

      if (res.data.success) {
        const formatted = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          uploadedBy: item.uploaded_by,
          date: new Date(item.uploaded_at).toLocaleDateString(),
          sizeMB: item.file_size.replace(" MB", ""),
          fileUrl: item.file_url,
        }));

        setWorksheets(formatted);
      }
    } catch (error) {
      console.error("Error fetching worksheet list:", error);
    }
  };

  useEffect(() => {
    fetchWorksheets();
  }, []);

  // =====================
  // 📌 Upload Click
  // =====================
  const onUploadClick = () => {
    console.log("Upload clicked");
  };

  // =====================
  // 📌 Download
  // =====================
  const onDownload = (id: number) => {
    const file = worksheets.find((w) => w.id === id);
    if (file) {
      window.open(file.fileUrl, "_blank");
    }
  };

  // =====================
  // 📌 Delete
  // =====================
  const onDelete = (id: number) => {
    setWorksheets((prev) => prev.filter((w) => w.id !== id));
  };

  // =====================
  // 📌 Edit
  // =====================
  const onEditClick = (worksheet: any) => {
    setEditingWorksheet({ ...worksheet });
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorksheet(null);
  };

  const onChangeEditingName = (newName: string) => {
    if (!editingWorksheet) return;
    setEditingWorksheet({ ...editingWorksheet, title: newName });
  };

  const onSaveEdit = () => {
    if (!editingWorksheet) return;
    setWorksheets((prev) =>
      prev.map((w) => (w.id === editingWorksheet.id ? editingWorksheet : w))
    );
    setIsModalOpen(false);
  };

  return {
    worksheets,
    onUploadClick,
    onDownload,
    onDelete,
    isModalOpen,
    editingWorksheet,
    onEditClick,
    onCloseModal,
    onChangeEditingName,
    onSaveEdit,
  };
}
