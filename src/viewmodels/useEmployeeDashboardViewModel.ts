import { useEffect, useState } from "react";
// import { employeeService } from "../services/employeeService";
import type { Employee } from "../types/employee";
import type { DashStats, LeaveSummary } from "../types/dashboard";

import { sampleEmployee, sampleLeaves, sampleStats } from "../services/sampleData";

export const useEmployeeDashboardViewModel = (employeeId: string) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [leaves, setLeaves] = useState<LeaveSummary | null>(null);
    const [stats, setStats] = useState<DashStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);

        // api based

                // const [emp, lvs, st] = await Promise.all([
                //     employeeService.getEmployeeById(employeeId),
                //     employeeService.getEmployeeLeaves(employeeId),
                //     employeeService.getEmployeeStats(employeeId),
                // ]);
                // if (!mounted) return;
                // const statsWithTimeline: DashStats = {
                //     ...st,
                //     timeline: st.timeline ?? [],
                // };
                // setEmployee(emp);
                // setLeaves(lvs);
                // setStats(statsWithTimeline);

        // sample array based
                if (!mounted) return;

                setEmployee(sampleEmployee);
                setLeaves(sampleLeaves);
                setStats(sampleStats);
                
                setLoading(false);

            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message ?? "Failed to load employee dashboard");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [employeeId]);


    return { employee, leaves, stats, loading, error };
};