import { Task } from "../models/Task";

export class TaskViewModel2 {
  tasks: Task[];
  constructor() {
    this.tasks = [
      new Task(
        1,
        "Task Creation UI",
        "Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae ",
        new Date("12/05/2025"),
        new Date("14/05/2025"),
        ["/avatars/user1.jpg", "/avatars/user2.jpg","/avatars/user3.jpg"],
        "On Progress"
      ),
      new Task(
        2,
        "Calendar Integration",
        "Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae elit nunc...Donec non sem sit amet mi hendrerit ultrices quis ac sem. Quisque vitae ",
        new Date("12/05/2025"),
        new Date("14/05/2025"),
        ["/avatars/user1.jpg", "/avatars/user2.jpg","/avatars/user3.jpg"],
        "On Hold"
      ),
    ];
  }

  getTasks() {
    return this.tasks;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  addTask(task : Task) {
    this.tasks.push(task);
  }
}
