// src/viewmodels/useProjectApprovalVM.js
import { useState, useEffect } from "react";
import { projectApprovals } from "../data/projectApprovals";

export default function useProjectApprovalVM() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    setApprovals(projectApprovals);
  }, []);

  return { approvals, loading: false };
}