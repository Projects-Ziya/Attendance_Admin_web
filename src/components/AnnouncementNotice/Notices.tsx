import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/icons/editboxicon.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { TiPin } from "react-icons/ti";
import { useAnnouncementNoticeBoardViewModel } from "../../viewmodels/anouncementnoticeboard/useAnnouncementNoticeBoardViewModel";
import api from "../../Api/api";
import toast from "react-hot-toast";
import EditNoticeModal from "./NoticeEditModal";

interface Notice {
  id: number;
  title: string;
  date: string;
  department?: string;
  description: string;
  is_pinned?: boolean;
}

const SectionTitle: React.FC<{ title: string; icon?: React.ReactNode }> = ({
  title,
  icon,
}) => (
  <div className="flex items-center gap-2 pb-[25px]">
    {icon}
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
  </div>
);

const NoticeCard: React.FC<{
  id: number;
  title: string;
  date: string;
  department?: string;
  description: string;
  onDelete: (id: number) => void;
  onTogglePin: () => void;
  onEdit: () => void;
}> = ({ id, title, date, department, description, onDelete, onEdit, onTogglePin }) => (
  <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <div className="flex gap-3 items-center">
        <button onClick={onEdit}>
          <img src={EditIcon} alt="Edit" className="w-5 h-5 cursor-pointer" />
        </button>

        <TiPin
          className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={onTogglePin}
        />

        <img
          src={DeleteIcon}
          alt="Delete"
          className="w-5 h-5 cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>

    <p className="text-xs text-gray-600">
      {date}
      {department ? ` • ${department}` : ""}
    </p>

    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

const Notices: React.FC = () => {
  const {
    pinnedNotices,
    recentNotices,
    deleteNotice,
    togglePin,
    addNotice,
    setNoticesFromApi,
  } = useAnnouncementNoticeBoardViewModel();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleEditClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsEditModalOpen(true);
  };

  const fetchNotices = async () => {
    try {
      const res = await api.get("/api/create-view-notice/");
      if (res.data?.success) {
        const formatted = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          date: item.date.split("T")[0],
          description: item.description, // ✅ FIXED
          department: item.department,
          is_pinned: item.is_pinned,
        }));

        setNoticesFromApi(formatted);
      }
    } catch (error) {
      console.error("Error loading notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleConfirm = async () => {
    if (title && date && description) {
      addNotice({ title, date, description });

      try {
        await api.post("/api/create-view-notice/", {
          title,
          department: "HR Department",
          description,
          date,
        });

        fetchNotices();
        toast.success("Notice created");
      } catch (error) {
        console.error("Error creating notice:", error);
      }

      setTitle("");
      setDate("");
      setDescription("");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/api/notice-delete/${id}/`);

      if (response.data.success === true) {
        toast.success(response.data.message);
        fetchNotices();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting notice");
    }
  };

  return (
    <section className="w-[1469px] h-auto pl-[40px] pt-[45px] pb-[70px] shadow-[0px_0px_2px_0px_#00000040] bg-[#FCFCFC] mx-auto mt-[40px]">
      <h1 className="text-xl font-semibold text-[#4D4D4D]">Announcement / Notice Board</h1>
      <p className="text-[#4D4D4D] mb-[10px]">Share important updates with your team</p>

      <div className="flex gap-[40px] pt-[60px]">
        {/* Create Notice */}
        <div className="w-[600px] h-[700px] pb-5 border border-gray-200 rounded-lg p-[30px] flex flex-col gap-[30px]">
          <h2 className="text-[25px] font-[500]">Create Notice</h2>

          <div className="flex flex-col gap-4">
            <label className="text-[20px] font-[500]">Heading</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Team Operation"
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6]"
            />

            <label className="text-[20px] font-[500]">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6]"
            />

            <label className="text-[20px] font-[500]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="border border-gray-300 rounded-lg px-4 py-3 text-[18px] bg-[#F6F6F6] h-[120px]"
            />
          </div>

          <div className="flex gap-4 justify-end mt-[20px]">
            <button className="bg-[#DAF1FB] text-[#00A0E3] px-4 py-2 rounded-lg text-[16px] font-[500]">
              Are you sure you want to save this notice?
            </button>

            <button
              onClick={handleConfirm}
              className="bg-[#00A0E3] text-white px-6 py-2 rounded-lg text-[18px] font-[500]"
            >
              Confirm
            </button>

            <button
              onClick={() => {
                setTitle("");
                setDate("");
                setDescription("");
              }}
              className="bg-white border border-gray-300 px-6 py-2 rounded-lg text-[18px] font-[500]"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Notice Board */}
        <fieldset className="border w-[769px] bg-[#FCFCFC] h-[700px] border-gray-200 rounded-lg pl-[46px] pr-[35px] pt-[60px] pb-[25px]">
          <legend className="mx-auto">
            <span className="bg-[#00A0E3] text-white text-sm font-semibold px-5 py-1 rounded-full">
              Notice Board
            </span>
          </legend>

          <SectionTitle title="Pinned Notices" icon={<TiPin className="w-6 h-6 text-blue-500" />} />

          <div className="flex flex-col gap-4">
            {pinnedNotices.map((n) => (
              <NoticeCard
                key={n.id}
                id={n.id}
                title={n.title}
                date={n.date}
                department="HR Department"
                description={n.description}
                onDelete={handleDelete}
                onTogglePin={() => togglePin(n.title)}
                onEdit={() => handleEditClick(n)}
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="sticky top-0 bg-white z-10 py-2">
              <SectionTitle title="Recent Notices" />
            </div>

            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
              {recentNotices.map((n) => (
                <NoticeCard
                  key={n.id}
                  id={n.id}
                  title={n.title}
                  date={n.date}
                  department="HR Department"
                  description={n.description}
                  onDelete={handleDelete}
                  onTogglePin={() => togglePin(n.title)}
                  onEdit={() => handleEditClick(n)}
                />
              ))}
            </div>
          </div>
        </fieldset>
      </div>

      {/* ✅ Edit Modal */}
      {isEditModalOpen && selectedNotice && (
        <EditNoticeModal
          editingNotice={selectedNotice}
          onClose={() => setIsEditModalOpen(false)}
          onSaveEdit={() => {
            fetchNotices();
            setIsEditModalOpen(false);
            toast.success("Notice updated");
          }}
        />
      )}
    </section>
  );
};

export default Notices;
