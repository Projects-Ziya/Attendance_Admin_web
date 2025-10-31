export interface TimelineSegment {
  label: string; 
  value: number; 
}

export interface DashStats {
  todayHours: number;     
  weekHours: number;    
  monthHours: number;     
  overtimeHours: number;  
  timeline: TimelineSegment[];
}

export interface LeaveSummary {
  totalAllowed: number;
  taken: number;
  absentDays: number;
  requests: number;
  workedDays: number;
  lossOfPay: number;
}
