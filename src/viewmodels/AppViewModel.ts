import type { ApiProjectDetails, Member } from "../models/ProjectModel";
import { BASE_URL } from "../constants/urls";

export class AppViewModel {
  constructor(private apiResponse: ApiProjectDetails) {}

  /* ---------------- PROJECT CORE ---------------- */

  getProjectId() {
    return this.apiResponse.data.id;
  }

  getProjectName() {
    return this.apiResponse.data.project_name;
  }

  getClient() {
    return this.apiResponse.data.client;
  }

  getProjectValue() {
    return this.apiResponse.data.project_value;
  }

  getWorkingHours() {
    return this.apiResponse.data.total_working_hours;
  }

  getCreatedOn() {
    return this.apiResponse.data.created_at;
  }

  getStartDate() {
    return this.apiResponse.data.start_date;
  }

  getDueDate() {
    return this.apiResponse.data.end_date;
  }

  getPriority() {
    return this.apiResponse.data.priority;
  }

  getStatus() {
    return this.apiResponse.data.status;
  }

  getDescription() {
    return this.apiResponse.data.description;
  }

  /* ---------------- CREATED BY ---------------- */

  getCreatedBy(): Member {
    return {
      id: 1,
      name: this.apiResponse.data.assigned_by,
      avatar: this.apiResponse.data.assigned_by_pic
        ? `${BASE_URL}${this.apiResponse.data.assigned_by_pic}`
        : null,
    };
  }

  /* ---------------- TAGS (from members.tags[]) ---------------- */

  getTags(): Member[] {
    const tags: Member[] = [];

    this.apiResponse.data.members.forEach((m) => {
      m.tags.forEach((tag, index) => {
        tags.push({
          id: Number(`${m.id}${index}`),
          name: tag,
        });
      });
    });

    return tags;
  }

  /* ---------------- TEAM MEMBERS ---------------- */
  // Your API has no explicit "team members" list,
  // so tags are treated as members (as per your UI usage)

  getTeamMembers(): Member[] {
    return this.getTags();
  }

  /* ---------------- TEAM LEADS ---------------- */

  getTeamLeads(): Member[] {
    const map = new Map<number, Member>();

    this.apiResponse.data.members.forEach((m) => {
      if (m.team_leader) {
        map.set(m.team_leader.id, {
          id: m.team_leader.id,
          name: m.team_leader.name,
          avatar: m.team_leader.profile_pic
            ? `${BASE_URL}${m.team_leader.profile_pic}`
            : null,
        });
      }
    });

    return Array.from(map.values());
  }

  /* ---------------- PROJECT MANAGER ---------------- */

  getProjectManager(): Member {
    const pm = this.apiResponse.data.members[0]?.project_manager;

    return {
      id: pm?.id ?? 0,
      name: pm?.name ?? "N/A",
      avatar: pm?.profile_pic
        ? `${BASE_URL}${pm.profile_pic}`
        : null,
    };
  }

  /* ---------------- TASK & TIME ---------------- */

  getTimeSpentData() {
    const spent = parseFloat(this.apiResponse.data.time_spent);
    const total = Number(this.apiResponse.data.total_working_hours);

    return {
      spentHours: spent,
      totalHours: total,
    };
  }

  getTaskData() {
    return {
      completed: this.apiResponse.data.completed_tasks_count,
      total: this.apiResponse.data.tasks.length,
    };
  }

  /* ---------------- PROJECT LOGO ---------------- */

  getAvatarUrl() {
    return `${BASE_URL}${this.apiResponse.data.project_logo}`;
  }

  /* ---------------- UI CLASSES ---------------- */

  getPriorityClass(): string {
    const priority = this.getPriority();
    switch (priority) {
      case "High": return "bg-red-200 text-red-600";
      case "Medium": return "bg-yellow-100 text-yellow-600";
      default: return "bg-green-100 text-green-600";
    }
  }

  getStatusClass(): string {
    return "bg-sky-100 text-sky-500";
  }

  getStatusDotClass(): string {
    return "bg-sky-500";
  }
}
