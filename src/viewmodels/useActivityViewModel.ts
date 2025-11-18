// src/viewmodels/useActivityViewModel.ts
import { useEffect, useState } from "react";
import type { Activity } from "../models/recentactivity/Activity";
import { fetchActivities } from "../services/recentactivitylist/ActivityServices";

export function useActivityViewModel() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { activities, loading, error };
}
