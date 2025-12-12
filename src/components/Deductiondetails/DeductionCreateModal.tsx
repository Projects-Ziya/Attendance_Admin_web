import React, { useState, useEffect } from "react";
import api from "../../Api/api";

const DeductionCreateModal = ({ isOpen, onClose, onCreated }) => {
  const [show, setShow] = useState(false); // controls animation
  const [form, setForm] = useState({
    component_type: "PF",
    title: "",
    rate: "",
    description: "",
    contribution: "",
    employerContribution: "",
    example: "",
  });

  // Trigger animation on open
  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 300); // wait for animation before unmount
  };

  const handleCreate = async () => {
  try {
    const payload = {
      component_type: form.component_type,
      title: form.title,
      rate_type: "PERCENTAGE",
      rate_value: Number(form.rate.replace("%", "")),
      description: form.description,
      employee_contribution: form.contribution,
      employer_contribution: form.employerContribution,
      example_text: form.example,
    };

    const res = await api.post("/api/salary-component-create/", payload);

    console.log("STATUS:", res.status);

    // SUCCESS: any 2xx response
    if (res.status >= 200 && res.status < 300) {
      onCreated();   // refresh parent
      handleClose(); // close modal with animation

      setForm({
        component_type: "PF",
        title: "",
        rate: "",
        description: "",
        contribution: "",
        employerContribution: "",
        example: "",
      });
    }

  } catch (err) {
    console.error("CREATE FAILED", err);
  }
};


  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 
        bg-black/50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white w-[600px] rounded-[14px] p-8 transform transition-all duration-300
          ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <h2 className="text-[24px] font-semibold mb-6">Add New Deduction</h2>

        <div className="flex flex-col gap-4">
          <select
            className="border p-3 rounded-lg"
            value={form.component_type}
            onChange={(e) => setForm({ ...form, component_type: e.target.value })}
          >
            <option value="PF">PF</option>
            <option value="ESI">ESI</option>
            <option value="TDS">TDS</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Rate (e.g. 12%)"
            className="border p-3 rounded-lg"
            value={form.rate}
            onChange={(e) => setForm({ ...form, rate: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg h-[80px]"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Employee Contribution"
            className="border p-3 rounded-lg"
            value={form.contribution}
            onChange={(e) => setForm({ ...form, contribution: e.target.value })}
          />

          <input
            type="text"
            placeholder="Employer Contribution"
            className="border p-3 rounded-lg"
            value={form.employerContribution}
            onChange={(e) => setForm({ ...form, employerContribution: e.target.value })}
          />

          <textarea
            placeholder="Example"
            className="border p-3 rounded-lg h-[80px]"
            value={form.example}
            onChange={(e) => setForm({ ...form, example: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-5 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeductionCreateModal;
