// src/viewmodels/useLeaveViewModel.ts
import { useState } from 'react';
import type { ApprovalStage, TeamMember } from '../../models/employeeDashboad/index';




export function useLeaveViewModel() {
const [stages, setStages] = useState<ApprovalStage[]>([
  { role: 'Employee', name: 'Shanid', imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg', status: 'approved' },
  { role: 'Team Lead', name: 'Karan Malhotra', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'current' },
  { role: 'Project Lead', name: 'Priya Singh', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg', status: 'pending' },
  { role: 'HR', name: 'Neha Kulkarni', imageUrl: 'https://randomuser.me/api/portraits/women/66.jpg', status: 'pending' },
  { role: 'CEO', name: 'Arjun Reddy', imageUrl: 'https://randomuser.me/api/portraits/men/83.jpg', status: 'pending' },
]);

 const [team, setTeam] = useState<TeamMember[]>([
  { id: '1', name: 'Karan Malhotra', role: 'Python Developers', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Amal Ahammed', role: 'Python Developers', imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '3', name: 'Priya Singh', role: 'MEAN Stack Developers', imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '4', name: 'Shamnas', role: 'Flutter Developers', imageUrl: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: '5', name: 'Arjun Reddy', role: 'MEAN Stack Developers', imageUrl: 'https://randomuser.me/api/portraits/men/83.jpg' },
  { id: '6', name: 'Neha Kulkarni', role: 'Python Developers', imageUrl: 'https://randomuser.me/api/portraits/women/66.jpg' },
]);

  const advanceAfterApprove = (arr: ApprovalStage[], approvedIndex: number) => {
    const copy = arr.map(a => ({ ...a }));
    if (approvedIndex + 1 < copy.length && copy[approvedIndex + 1].status === 'pending') {
      copy[approvedIndex + 1] = { ...copy[approvedIndex + 1], status: 'current' };
    }
    return copy;
  };

  const approveAt = (role: string) => {
    setStages(prev => {
      const idx = prev.findIndex(s => s.role === role || (s.status === 'current' && s.role === role));
      if (idx === -1) return prev;
      const updated = prev.map((s, i) => (i <= idx ? { ...s, status: 'approved', timestamp: new Date().toISOString() } : s));
      return advanceAfterApprove(updated, idx);
    });
  };

  const rejectAt = (role: string, _reason?: string) => {
    setStages(prev => prev.map(s => (s.role === role ? { ...s, status: 'rejected', timestamp: new Date().toISOString() } : s)));
  };

  const getCurrentStage = () => stages.find(s => s.status === 'current') ?? null;

  return {
    stages,
    team,
    approveAt,
    rejectAt,
    getCurrentStage,
    setTeam,
    setStages,
  };
}