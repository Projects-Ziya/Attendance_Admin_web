import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Button from "./Button";
import { TaskViewModel2 } from "../../viewmodels/TaskViewModel2";
import api from "../../Api/api";
import toast from "react-hot-toast";


export default function TaskList({ ApiProject }) {
  const [vm] = useState(new TaskViewModel2());
  const [tasks, setTasks] = useState(vm.getTasks());

  const [data, setData] = useState(ApiProject);

  useEffect(() => {
    setData(ApiProject);
  }, [ApiProject]);

  
  const handleDelete = (id) => {
    const response = api.delete(`/api/delete-task/${id}/`);
    
    if(response.data.success===true){
      toast(response.data.message);
      window.location.reload()
    }
  };

  const handleEdit = (id) => {
    toast(`Edit Task ID: ${id}`);
  };

  const handleAdd = () => {
    toast("Add New Task clicked");
  };

  return (
    <div className="p-6 max-w-[76.865vw] mx-auto">
      {/* Add New Task */}
      <div className="mb-6">
        <Button label="Add New Task" onClick={handleAdd} />
      </div>

      {/* Task Cards */}
      {data?.data.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={() => handleDelete(task.id)}
          onEdit={() => handleEdit(task.id)}
        />
      ))}
    </div>
  );
}
