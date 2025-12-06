import React from "react";

interface Props {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleNext: () => void; // 👈 added for navigation
}

const BasicInformation: React.FC<Props> = ({ formData, handleChange, handleNext }) => {
  return (
    <>
      {/* Upload Logo */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6 flex items-center gap-4 w-[72.344vw] h-[19.537vh]">
       <div className="w-[6.25vw] h-[11.111vh] rounded-full overflow-hidden bg-gray-200">
  {formData.project_logo ? (
    <img
      src={URL.createObjectURL(formData.project_logo)}
      alt="logo"
      className="w-full h-full object-cover"
    />
  ) : (
    <img
      src="https://via.placeholder.com/50"
      alt="placeholder"
      className="w-full h-full object-cover"
    />
  )}
</div>

        <div>
          <p className="text-gray-600">Upload Project Logo</p>
          <p className="text-xs text-gray-400">Image should be below 4 MB</p>
          <div className="flex gap-2 mt-2">
            <input
              type="file"
              name="project_logo"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
              id="logoUpload"
            />
            <label
              htmlFor="logoUpload"
              className="bg-[#00A0E3] hover:bg-blue-500 text-white px-4 text-[1.125rem] py-1 rounded cursor-pointer w-[6.51vw] h-[3.889vh] flex items-center justify-center"
            >
              Upload
            </label>
            <button
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "project_logo", value: null },
                } as any)
              }
              className="border px-4 py-1 rounded text-[1.125rem] w-[6.51vw] h-[3.889vh]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 text-[1rem] font-medium mb-1 text-ziyablack">
        {/* Project Name */}
        <label>Project Name</label>
        <input
          type="text"
          name="project_name"
          value={formData.project_name}
          onChange={handleChange}
          className="w-full h-[7.407vh] border rounded p-2"
        />

        {/* Client */}
        <label>Client</label>
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          className="w-full h-[7.407vh] border rounded p-2"
        />

        {/* Row 1 */}
        <div className="flex gap-[0.781vw]">
          <div className="flex-1">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            />
          </div>

          <div className="flex-1">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            />
          </div>

          <div className="flex-1">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex-1">
            <label>Project Value</label>
            <input
              type="number"
              name="project_value"
              value={formData.project_value}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-[0.781vw]">
          <div className="flex-1">
            <label>Total Working Hours</label>
            <input
              type="number"
              name="total_working_hours"
              value={formData.total_working_hours}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            />
          </div>
          <div className="flex-1">
            <label>Extra Time (hours)</label>
            <input
              type="number"
              name="extra_time"
              value={formData.extra_time}
              onChange={handleChange}
              className="w-full h-[5.556vh] border rounded p-2"
            />
          </div>
        </div>

        {/* Description + Attachment */}
        <label className="block">Description</label>
        <div className="border rounded-lg h-[31.389vh]">
          <div className="flex gap-[0.417vw] items-center border-b p-2 justify-between">
            <div className="flex items-center gap-2">
              <select className="border rounded p-1 w-[5.365vw] h-[3.796vh] text-sm">
                <option>14</option>
                <option>16</option>
                <option>18</option>
              </select>
              <label
                htmlFor="attachmentUpload"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 border px-2 py-1 rounded cursor-pointer w-[10vw] h-[3.796vh] text-sm"
              >
                📎 Attach File
              </label>
              <input
                type="file"
                name="attachment"
                id="attachmentUpload"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            {formData.attachment && (
              <span className="text-xs text-gray-600">
                Attached: {formData.attachment.name}
              </span>
            )}
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={9}
            placeholder="Enter project description..."
            className="p-2 outline-none w-full h-full"
          ></textarea>
        </div>
      </div>

      {/* ✅ Next Step Button */}
      <button
        type="button"
        onClick={handleNext}
        className="mt-14 px-6 py-2 ml-[1200px] bg-blue-500 hover:bg-blue-600 text-white font-medium rounded"
      >
        Add Team Member
      </button>
    </>
  );
};

export default BasicInformation;
