import { useState } from "react";
import type { WorksheetItem } from "../../models/worksheet/Worksheet"
import { Mock_data } from "../../services/worksheetdata";


export function useWorksheetVM() {
  const [worksheets, setWorksheets] = useState<WorksheetItem[]>(Mock_data);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingWorksheet, setEditingWorksheet] = useState<WorksheetItem | null>(null);

  const onUploadClick = () => {
    console.log("Upload Worksheet clicked");
  };

  const onDownload = (id: string) => {
    const file = worksheets.find((w) => w.id === id);
    console.log("Download:", file);
  };

  const onDelete = (id: string) => {
    setWorksheets((prev) => prev.filter((w) => w.id !== id));
  };

  const onEditClick = (worksheet: WorksheetItem) => {
    setEditingWorksheet(worksheet);
    setModalOpen(true);
  };

const onChangeEditingName = (newName: string) => {
  setEditingWorksheet((prev) =>
    prev ? { ...prev, title: newName } : prev
  );
};

const onSaveEdit = () => {
  if (!editingWorksheet) return;
  setWorksheets((prev) =>
    prev.map((w) =>
      w.id === editingWorksheet.id ? editingWorksheet : w
    )
  );
  setModalOpen(false);
  setEditingWorksheet(null);
};


  const onCloseModal = () => {
    setModalOpen(false);
    setEditingWorksheet(null);
  };

  return {
    worksheets,
    onUploadClick,
    onDownload,
    onDelete,
    isModalOpen,
 editingWorksheet,
    onEditClick,
    onChangeEditingName,
    onSaveEdit,
    onCloseModal,
  };
}
