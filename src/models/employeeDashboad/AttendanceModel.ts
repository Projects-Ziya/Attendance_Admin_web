/**
 * MODEL LAYER
 * Pure data structures and types
 * No business logic, no state management
 */

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  status: 'Present' | 'Absent' | 'Late';
  checkOut: string;
  break: string;
  late: string;
  overtime: string;
  productionHours: number;
}


export type StatusFilter = 'all' | 'present' | 'absent' | 'late';
export type SortOption = 'last7days' | 'date' | 'status';
export type DateRange = 'last7days' | 'last30days' | 'thismonth' | 'custom';

// ⬇️ THIS WAS MISSING THE 'export' KEYWORD
export interface AttendanceFilters {
  searchTerm: string;
  statusFilter: StatusFilter;
  sortBy: SortOption;
  dateRange: DateRange;
}

export class AttendanceModel {
  // Mock data
  static readonly mockData: AttendanceRecord[] = [
    {
      date: '28 JUL 2025',
      checkIn: '09:31 AM',
      status: 'Present',
      checkOut: '06:02 PM',
      break: '1h 5m',
      late: '--',
      overtime: '--',
      productionHours: 7.28
    },
    {
      date: '27 JUL 2025',
      checkIn: '09:31 AM',
      status: 'Present',
      checkOut: '06:02 PM',
      break: '0h 48m',
      late: '--',
      overtime: '03h 15m',
      productionHours: 10.16
    },
    {
      date: '26 JUL 2025',
      checkIn: '--',
      status: 'Absent',
      checkOut: '--',
      break: '--',
      late: '--',
      overtime: '--',
      productionHours: -8.3
    },
    {
      date: '25 JUL 2025',
      checkIn: '--',
      status: 'Absent',
      checkOut: '--',
      break: '--',
      late: '--',
      overtime: '--',
      productionHours: -8.3
    },
    {
      date: '24 JUL 2025',
      checkIn: '--',
      status: 'Absent',
      checkOut: '--',
      break: '--',
      late: '--',
      overtime: '--',
      productionHours: -8.3
    },
    {
      date: '23 JUL 2025',
      checkIn: '08:31 AM',
      status: 'Present',
      checkOut: '06:02 PM',
      break: '0h 30m',
      late: '--',
      overtime: '--',
      productionHours: 7.28
    },
    {
      date: '22 JUL 2025',
      checkIn: '11:31 AM',
      status: 'Late',
      checkOut: '06:02 PM',
      break: '0h 55m',
      late: '02h',
      overtime: '--',
      productionHours: 5.35
    }
  ];

  // Utility functions
  static formatTime(time: string): string {
    if (!time) return '--';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${String(displayHour).padStart(2, '0')}:${minutes} ${period}`;
  }

  static calculateProductionHours(checkIn: string, checkOut: string): number {
    if (checkIn === '--' || checkOut === '--') return -8.3;

    const parseTime = (timeStr: string): number => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours + minutes / 60;
    };

    const checkInHours = parseTime(checkIn);
    const checkOutHours = parseTime(checkOut);
    return Math.round((checkOutHours - checkInHours - 0.083) * 100) / 100;
  }
}
