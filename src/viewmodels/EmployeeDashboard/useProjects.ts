import { useState, useEffect } from "react";
import type { Project } from "../../models/employeeDashboad/Project";
import { fallbackProjects } from "../../models/employeeDashboad/Project";
import { fetchProjects } from "../../services/employeeDashboard/employeeDashboardServices";

export function useProjectsVM() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProjects()
      .then((data) => {
        if (isMounted) setProjects(data);
      })
      .catch(() => {
        if (isMounted) setProjects(fallbackProjects);
        setError("Failed to load projects from API.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, error };
}
