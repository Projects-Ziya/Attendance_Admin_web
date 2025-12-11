import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import toast from "react-hot-toast";
import api from '../../../Api/api';

interface LeaveRequestForm {
  employeeName: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  attachment?: File | null;
}

type LeaveRequestErrors = Partial<Record<keyof LeaveRequestForm, string>>;

const AddLeaveRequest: React.FC = () => {
  const [formData, setFormData] = useState<LeaveRequestForm>({
    employeeName: '',
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
    attachment: null,
  });

  const [errors, setErrors] = useState<LeaveRequestErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const validate = (data: LeaveRequestForm): LeaveRequestErrors => {
    const newErrors: LeaveRequestErrors = {};
    if (!data.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required.';
    } else if (data.employeeName.trim().length < 2) {
      newErrors.employeeName = 'Employee name must be at least 2 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(data.employeeName)) {
      newErrors.employeeName = 'Employee name should only contain letters and spaces.';
    }

    if (!data.leave_type) {
      newErrors.leave_type = 'Please select a leave type.';
    }

    if (!data.start_date) {
      newErrors.start_date = 'From date is required.';
    }
    if (!data.end_date) {
      newErrors.end_date = 'To date is required.';
    }
    if (data.start_date && data.end_date) {
      const from = new Date(data.start_date);
      const to = new Date(data.end_date);
      if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        if (isNaN(from.getTime())) newErrors.start_date = 'Invalid from date.';
        if (isNaN(to.getTime())) newErrors.end_date = 'Invalid to date.';
      } else if (from > to) {
        newErrors.end_date = 'To date must be on or after the from date.';
      }
    }

    if (!data.reason.trim()) {
      newErrors.reason = 'Reason is required.';
    } else if (data.reason.trim().length < 4) {
      newErrors.reason = 'Reason must be at least 4 characters.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('employeeName', formData.employeeName);
      data.append('leave_type', formData.leave_type);
      data.append('start_date', formData.start_date);
      data.append('end_date', formData.end_date);
      data.append('reason', formData.reason);
      if (formData.attachment) {
        data.append('attachment', formData.attachment);
      }

      await api.post('/api/leave-applying/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Leave request submitted successfully',{id: "unique-toast-id",});
      setFormData({
        employeeName: '',
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
        attachment: null,
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit leave request',{id: "unique-toast-id",});
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    'w-full h-[60px] border px-3 py-2 rounded text-sm border-gray-300 sm:text-base';
  const inputReason =
    'w-full h-[285px] border px-3 py-2 rounded text-sm border-gray-300 sm:text-base';
  const errorText = 'mt-1 text-xs text-red-600';
  const invalidClass = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className="mt-[40px] pb-[40px] ">
      <div className="max-w-[1469px] w-full mx-auto bg-white rounded shadow sm:p-6">
        <h2 className="text-[1.3rem] text-ziyablack font-semibold mb-4 mt-8">
          Add Leave Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-[1.0rem] mt-10 text-ziyablack">
              Employee Name
            </label>
            <input 
            title='employee name'
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className={`${inputBase} ${errors.employeeName ? invalidClass : ''}`}
              required
            />
            {errors.employeeName && <p className={errorText}>{errors.employeeName}</p>}
          </div>

          <div>
            <label className="block text-[1.0rem] font-medium mb-1 text-ziyablack">
              Leave Type
            </label>
            <select
            title='leave type'
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              className={`${inputBase} ${errors.leave_type ? invalidClass : ''}`}
              required
            >
              <option value="">Select</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Vacation">Vacation</option>
            </select>
            {errors.leave_type && <p className={errorText}>{errors.leave_type}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block font-medium mb-1 text-[1.0rem] text-ziyablack">
                From
              </label>
              <input
              title='date'
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`${inputBase} ${errors.start_date ? invalidClass : ''}`}
                required
              />
              {errors.start_date && <p className={errorText}>{errors.start_date}</p>}
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block font-medium mb-1 text-[1.0rem] text-ziyablack">
                To
              </label>
              <input
              title='date'
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={`${inputBase} ${errors.end_date ? invalidClass : ''}`}
                required
              />
              {errors.end_date && <p className={errorText}>{errors.end_date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-ziyablack text-[1.0rem] font-medium mb-1">
              Reason
            </label>
            <textarea
            title='reason'
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`${inputReason} ${errors.reason ? invalidClass : ''}`}
              rows={5}
              required
            ></textarea>
            {errors.reason && <p className={errorText}>{errors.reason}</p>}
          </div>

          <div className="relative">
            <label className="block text-ziyablack text-[1.0rem] font-medium mb-1">
              Add Attachments
            </label>
            <div className="relative">
              <input
                type="file"
                name="attachment"
                onChange={handleFileChange}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="flex items-center h-[60px] gap-2 w-full border border-gray-300 px-3 py-2 rounded text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer text-sm sm:text-base"
              >
                <FaPaperclip className="text-gray-400" />
                <span>
                  {formData.attachment
                    ? formData.attachment.name
                    : 'Attachment (optional)'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-10 pb-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  employeeName: '',
                  leave_type: '',
                  start_date: '',
                  end_date: '',
                  reason: '',
                  attachment: null,
                })
              }
              className="px-6 py-2 text-sm border border-gray-300 rounded w-full sm:w-auto hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-cyan-500 text-white text-sm rounded hover:bg-cyan-600 w-full sm:w-auto"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveRequest;
