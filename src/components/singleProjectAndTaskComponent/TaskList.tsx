import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Button from "./Button";
import { TaskViewModel2 } from "../../viewmodels/TaskViewModel2";
import api from "../../Api/api";

export default function TaskList({ ApiProject }) {
  const [vm] = useState(new TaskViewModel2());
  const [tasks, setTasks] = useState(vm.getTasks());

  const [data, setData] = useState(ApiProject);

  useEffect(() => {
    setData(ApiProject);
  }, [ApiProject]);

  
  const handleDelete = (id) => {
    console.log(id)
    const response = api.delete(`/api/delete-task/${id}/`);
    console.log(response)
    if(response.data.success===true){
      alert(response.data.message);
      window.location.reload()
    }
  };

  const handleEdit = (id) => {
    alert(`Edit Task ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Add New Task clicked");
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
