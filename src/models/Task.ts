export class Task {
  constructor(id, title, description, createdAt, dueDate, assignees, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.assignees = assignees;
    this.status = status;
  }
}
