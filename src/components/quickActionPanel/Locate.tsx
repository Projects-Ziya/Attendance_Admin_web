import { useState } from "react";
import plus from "../../assets/plus.png";
import type { Employee } from "../../models/quickActionPanel/Employee";
import trash from "../../assets/trash.svg";
import RemoveModal from "../../components/quickActionPanel/RemoveModal";
import NotificationPopup from "../../components/quickActionPanel/NotificationPopup";
import api from "../../Api/api";
import toast from "react-hot-toast";

type LocateProps = {
  employee: Employee | null;
  onRemove: () => void;
};

const Locate = ({ employee, onRemove }: LocateProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmRemove = async (status: string, description: string) => {
    if (!employee) return;

    if (!status) {
      toast("Please select a status before removing the employee.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/employee-remove/", {
        employee_id: employee.id,
        emp_status: status.trim(), // ✅ changed key from `status` → `emp_status`
        reason: description.trim(),
      });

      if (response.status === 200) {
        onRemove();
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        console.error("Failed to remove employee:", response.data);
      }
    } catch (error) {
      console.error("Error removing employee:", error);
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#FCFCFC] w-[1469px] rounded-2xl">
      {employee ? (
        <div className="pt-[40px] h-[348px] pb-[40px]">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-t border-b h-[80px]">
                <td className="p-0 pl-[40px] text-[#4D4D4D] text-[18px] font-normal align-middle">
                  ID: {employee.id}
                </td>
                <td className="p-0 pl-[100px]">
                  <div className="flex items-center gap-3 text-[#4D4D4D]">
                    {employee.avatarUrl && (
                      <img
                        src={employee.avatarUrl}
                        alt={employee.name}
                        className="w-[45px] h-[45px] rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-[18px] pl-[20px] text-[#4D4D4D] font-semibold">
                        {employee.name}
                      </span>
                      <span className="text-[16px] pl-[20px] pt-[8px] font-normal text-[#4D4D4D]">
                        {employee.designation}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-0 pl-[48px] font-normal w-[170px] text-[#4D4D4D] text-[16px] align-middle">
                  {employee.email}
                </td>
                <td className="p-0 pl-[115px] font-normal text-[#4D4D4D] text-[18px] align-middle">
                  {employee.phone}
                </td>
                <td className="p-0 pl-[56px] text-right align-middle">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-md text-[18px] font-medium ${
                      loading
                        ? "bg-gray-300 text-gray-500"
                        : "bg-[#FFF6F6] text-[#DB5252]"
                    }`}
                    disabled={loading}
                  >
                    <img src={trash} alt="Remove" className="w-[16px] h-5" />
                    {loading ? "Removing..." : "Remove Employee"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <RemoveModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmRemove}
            employeeName={employee.name}
            employeeRole={employee.designation}
            employeeId={employee.id.toString()}
            employeeImage={employee.avatarUrl || "/default-avatar.png"}
          />
        </div>
      ) : (
        <div className="pt-[80px] pb-[80px] shadow-metrics">
          <div className="flex flex-col items-center">
            <img src={plus} alt="add-icon" className="w-[100px] h-[100px]" />
            <p className="text-[18px] leading-[24px] tracking-[0.08em] pt-[35px] text-center text-[#DB5252]">
              Locate the right employee before proceeding.
              <br />
              <span className="block pt-[25px]">
                Handle with care — employee records are sensitive.
              </span>
            </p>
          </div>
        </div>
      )}

      {showNotification && (
        <NotificationPopup
          message={`${employee?.name ?? "Employee"} removed successfully!`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Locate;
