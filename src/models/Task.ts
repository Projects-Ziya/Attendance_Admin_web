export class Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  assignees: string[];
  status: string;

  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    dueDate: Date,
    assignees: string[],
    status: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.dueDate = dueDate;
    this.assignees = assignees;
    this.status = status;
  }
}
