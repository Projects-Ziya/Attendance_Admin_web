import { useState } from "react";
import TaskCard from "./TaskCard";
import Button from "./Button";
import { TaskViewModel2 } from "../../viewmodels/TaskViewModel2";

export default function TaskList() {
  const [vm] = useState(new TaskViewModel2());
  const [tasks, setTasks] = useState(vm.getTasks());

  const handleDelete = (id) => {
    vm.deleteTask(id);
    setTasks([...vm.getTasks()]);
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
      {tasks.map((task) => (
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
