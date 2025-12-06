import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProjectCard from "../../components/projectTaskTracker/ProjectCard";
import TaskCard from "../../components/projectTaskTracker/TaskCard";
import { IoMdArrowDropright } from "react-icons/io";
import ProjectHeading from "../../assets/images/icons/ProjectTracker.svg";
import api from "../../Api/api";

interface Coordinator {
  id: number;
  user_id: number;
  name: string;
  designation: string;
  profile_pic: string | null;
}

interface MemberDetails {
  team_leader_details?: Coordinator | null;
  project_manager_details?: Coordinator | null;
  tags_details?: Coordinator | null;
}

interface Task {
  id: number;
  title: string;
  description: string;
  end_date: string | null;
  status: string;
  start_date: string;
  hours_worked: number | null;
  project_name: string;
  coordinator: Coordinator;
  assigned_by_name: string;
  assignee_name: string | null;
  assigned_by_pic: string | null;
  assignee: string | null;
}

interface Project {
  id: number;
  project_name: string;
  start_date: string;
  end_date: string;
  status: string;
  coordinator: Coordinator;
  members: MemberDetails[];
  tasks: {
    task_hours: number | null;
    current_progress: string | null;
    assigned_employee: Coordinator;
  }[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProjectListView = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeButton, setActiveButton] = useState<"projects" | "tasks">("projects");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          api.get("/api/new-list-projects/"),
          api.get("/api/list-all-tasks/")
        ]);

        if (projectsRes.data.success && Array.isArray(projectsRes.data.projects)) {
          setProjects(projectsRes.data.projects);
        }

        if (tasksRes.data.success && Array.isArray(tasksRes.data.data)) {
          setTasks(tasksRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Filters
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.project_name.toLowerCase().includes(search.toLowerCase());
    let matchesSortBy = true;
    if (selectedSortBy === "last7days") {
      const projectDate = new Date(proj.start_date);
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      matchesSortBy = projectDate >= sevenDaysAgo && projectDate <= today;
    }
    const matchesStatus = !selectedStatus || proj.status === selectedStatus;
    return matchesSearch && matchesSortBy && matchesStatus;
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    let matchesSortBy = true;
    if (selectedSortBy === "last7days") {
      const taskDate = new Date(task.start_date);
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      matchesSortBy = taskDate >= sevenDaysAgo && taskDate <= today;
    }
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    return matchesSearch && matchesSortBy && matchesStatus;
  });

  const dataToShow = activeButton === "projects" ? filteredProjects : filteredTasks;
  const totalPages = Math.ceil(dataToShow.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = dataToShow.slice(startIndex, startIndex + itemsPerPage);

  return (
    <motion.div
      className="p-6 bg-[#F6F5FA] min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div className="flex items-center mb-7" variants={itemVariants}>
        <img src={ProjectHeading} alt="Project/Task Tracker" className="w-9 h-9 mr-3" />
        <h2 className="text-lg text-ziyablack">Project/Task Tracker</h2>
      </motion.div>

      {/* Buttons */}
      <motion.div className="flex gap-6 mb-7" variants={itemVariants}>
        <div className="flex-1">
          <button
            className={`w-full font-medium py-4 rounded-md shadow-sm cursor-pointer ${
              activeButton === "projects"
                ? "bg-ziyablue text-white"
                : "border border-ziyablue text-ziyablue bg-white"
            }`}
            onClick={() => setActiveButton("projects")}
          >
            Total Number of Projects
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`w-full font-medium py-4 rounded-md shadow-sm cursor-pointer ${
              activeButton === "tasks"
                ? "bg-ziyablue text-white"
                : "border border-ziyablue text-ziyablue bg-white"
            }`}
            onClick={() => setActiveButton("tasks")}
          >
            Total Number of Tasks
          </button>
        </div>
      </motion.div>

      {/* Search + Filters */}
      <motion.div className="flex items-center justify-between bg-white rounded-t-[10px] shadow-sm px-7 py-8 text-sm" variants={itemVariants}>
        <SearchBar value={search} onSearch={setSearch} />
        <div className="flex gap-3 text-ziyablack">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
            value={selectedSortBy}
            onChange={(e) => setSelectedSortBy(e.target.value)}
          >
            <option value="">Sort By :</option>
            <option value="last7days">Sort By : Last 7 days</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 h-10"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="On Going">On Going</option>
            <option value="On Hold">On Hold</option>
            <option value="Overdue">Overdue</option>
            <option value="Completed">Completed</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </motion.div>

      {/* Headers */}
      <motion.div className={`${
        activeButton === "projects"
          ? "grid grid-cols-[170px_1.2fr_0.8fr_0.7fr_0.8fr_240px]"
          : "grid grid-cols-[170px_1.2fr_0.9fr_0.9fr_0.8fr_100px]"
      } bg-[#F4F4F4] font-semibold text-ziyablack px-7 py-4`} variants={itemVariants}>
        {activeButton === "projects" ? (
          <>
            <div>Proj / Date</div>
            <div>Coordinators</div>
            <div>Team</div>
            <div>Deadline</div>
            <div>Tasks / Hrs</div>
            <div>Status</div>
          </>
        ) : (
          <>
            <div>Tasks / Date</div>
            <div>Coordinators</div>
            <div>Assignee</div>
            <div>End Date</div>
            <div>Hours</div>
            <div>Status</div>
          </>
        )}
      </motion.div>

      {/* List */}
      <motion.div className="bg-white rounded-b-[10px] shadow mb-3" variants={itemVariants}>
        {paginatedData.map((item: any) => (
          <motion.div key={item.id} className="pt-4" variants={itemVariants}>
            {activeButton === "projects" ? <ProjectCard project={item} /> : <TaskCard project={item} />}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div className="flex justify-end py-9 pr-8" variants={itemVariants}>
        <div className="flex items-center space-x-5">
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`text-lg font-semibold cursor-pointer ${
                  currentPage === pageNum ? "text-ziyablue" : "text-gray-400 hover:text-ziyablue"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="text-ziyablue cursor-pointer"
          >
            <IoMdArrowDropright size={36} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectListView;
