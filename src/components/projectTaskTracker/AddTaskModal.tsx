// src/components/AddTaskModal.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../Api/api";
import toast from "react-hot-toast";
import type { Task } from "../../models/Task";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (task : Task)=> void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/add-task/", {
        title,
        description,
      });

      if (response.data.success)
       {
         const newtask = response.data.data;
        toast.success("Task added successfully!");
        onTaskAdded(newtask);
        onClose();
      } else {
        toast.error(response.data.message || "Failed to add task");
      }
    } catch (err: any) {
      toast.error("Error adding task");
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-[400px] p-6"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:border-teal-500"
                required
              />
              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:border-teal-500"
                rows={4}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#00A0E3] text-white hover:bg-[#008ACC] transition"
                >
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
