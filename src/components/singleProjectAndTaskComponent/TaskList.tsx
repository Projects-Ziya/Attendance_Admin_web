import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Button from "./Button";
import { TaskViewModel2 } from "../../viewmodels/TaskViewModel2";
import api from "../../Api/api";
import toast from "react-hot-toast";
import AddTaskModal from "../../components/projectTaskTracker/AddTaskModal";
import { Task } from "../../models/Task";




export default function TaskList({ ApiProject }) {
  const [vm] = useState(new TaskViewModel2());
  const [tasks, setTasks] = useState(vm.getTasks());
  const [data, setData] = useState(ApiProject);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(ApiProject);
  }, [ApiProject]);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/delete-task/${id}/`);
      if (response.data.success === true) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (err: any) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (id) => {
    toast(`Edit Task ID: ${id}`);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  
   const handleTaskAdded = (newTask : Task) => {
     setTasks((prev) => [newTask, ...prev]); 
   }

  return (
    <div className="p-6 max-w-[76.865vw] mx-auto">
      {/* Add New Task */}
      <div className="mb-6">
        <Button label="Add New Task" onClick={handleAdd} />
      </div>

      {/* Task Cards */}
      {data?.data.tasks.map((task : Task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={() => handleDelete(task.id)}
          onEdit={() => handleEdit(task.id)}
        />
      ))}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}
