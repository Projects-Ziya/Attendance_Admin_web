
import type { ProjectDetails, Priority, Status } from '../models/ProjectModel';


export class ProjectViewModel {
  private projectDetails: ProjectDetails;

  constructor(projectDetails: ProjectDetails) {
    this.projectDetails = projectDetails;
  }

  // Getters for all properties
  getProjectId(): string { return this.projectDetails.projectId; }
  getClient(): string { return this.projectDetails.client; }
  getProValue(): string { return `$${this.projectDetails.proValue}`; }
  getWorkHours(): string { return this.projectDetails.workHours; }
  getCreatedOn(): string { return this.projectDetails.createdOn; }
  getStartOn(): string { return this.projectDetails.startOn; }
  getDueDate(): string { return this.projectDetails.dueDate; }
  getPriority(): Priority { return this.projectDetails.priority; }
  getStatus(): Status { return this.projectDetails.status; }
  getCreatedBy() { return this.projectDetails.createdBy; }
  getTags() { return this.projectDetails.tags; }
  getTeamMembers() { return this.projectDetails.teamMembers; }
  getTeamLeads() { return this.projectDetails.teamLeads; }
  getProjectManager() { return this.projectDetails.projectManager; }
  getDescription(): string { return this.projectDetails.description; }

  // Business logic methods
  getPriorityClass(): string {
    switch (this.projectDetails.priority) {
      case "High": return "bg-red-200 text-red-600";
      case "Medium": return "bg-yellow-100 text-yellow-600";
      default: return "bg-green-100 text-green-600";
    }
  }

  getPriorityDotClass(): string {
    switch (this.projectDetails.priority) {
      case "High": return "bg-red-600";
      case "Medium": return "bg-yellow-600";
      default: return "bg-green-600";
    }
  }

  getStatusClass(): string {
    return "bg-sky-100 text-sky-500";
  }

  getStatusDotClass(): string {
    return "bg-sky-500";
  }
}