/**
 * VIEWMODEL LAYER
 * Business logic and state management using MobX
 * No direct UI rendering
 */


import { makeAutoObservable } from 'mobx';
import { 
  type AttendanceRecord, 
  type AttendanceFilters, 
  type StatusFilter, 
  type SortOption,
  AttendanceModel 
} from '../../models/employeeDashboad/AttendanceModel';

export class AttendanceViewModel {
  // Observable state
  private _attendanceData: AttendanceRecord[] = [];
  private _filteredData: AttendanceRecord[] = [];
  private _filters: AttendanceFilters = {
    searchTerm: '',
    statusFilter: 'all',
    sortBy: 'last7days',
    dateRange: 'last7days'
  };
  
  // Edit modal state
  private _isEditModalOpen: boolean = false;
  private _currentEditIndex: number | null = null;
  private _editFormData: Partial<AttendanceRecord> = {};

  constructor() {
    makeAutoObservable(this);
    this.loadData();
  }

  // Getters (Computed values)
  get attendanceData(): AttendanceRecord[] {
    return this._attendanceData;
  }

  get filteredData(): AttendanceRecord[] {
    return this._filteredData;
  }

  get filters(): AttendanceFilters {
    return this._filters;
  }

  get isEditModalOpen(): boolean {
    return this._isEditModalOpen;
  }

  get currentEditRecord(): AttendanceRecord | null {
    if (this._currentEditIndex === null) return null;
    return this._attendanceData[this._currentEditIndex];
  }

  get editFormData(): Partial<AttendanceRecord> {
    return this._editFormData;
  }

  // Actions
  loadData(): void {
    this._attendanceData = [...AttendanceModel.mockData];
    this._filteredData = [...this._attendanceData];
  }

  setSearchTerm(searchTerm: string): void {
    this._filters.searchTerm = searchTerm;
    this.applyFilters();
  }

  setStatusFilter(status: StatusFilter): void {
    this._filters.statusFilter = status;
    this.applyFilters();
  }

  setSortBy(sortBy: SortOption): void {
    this._filters.sortBy = sortBy;
    this.applySorting();
  }

  private applyFilters(): void {
    let filtered = [...this._attendanceData];

    // Apply search filter
    if (this._filters.searchTerm) {
      const searchLower = this._filters.searchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.date.toLowerCase().includes(searchLower) ||
        record.status.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (this._filters.statusFilter !== 'all') {
      filtered = filtered.filter(record =>
        record.status.toLowerCase() === this._filters.statusFilter.toLowerCase()
      );
    }

    this._filteredData = filtered;
    this.applySorting();
  }

  private applySorting(): void {
    const { sortBy } = this._filters;
    
    if (sortBy === 'date') {
      this._filteredData.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === 'status') {
      this._filteredData.sort((a, b) => 
        a.status.localeCompare(b.status)
      );
    }
  }

  // Modal actions
  openEditModal(index: number): void {
    this._currentEditIndex = index;
    const record = this._attendanceData[index];
    this._editFormData = { ...record };
    this._isEditModalOpen = true;
  }

  closeEditModal(): void {
    this._isEditModalOpen = false;
    this._currentEditIndex = null;
    this._editFormData = {};
  }

  updateEditFormField<K extends keyof AttendanceRecord>(
    field: K,
    value: AttendanceRecord[K]
  ): void {
    this._editFormData[field] = value;
  }

  saveEdit(): void {
    if (this._currentEditIndex === null) return;

    const updates = this._editFormData;
    const record = this._attendanceData[this._currentEditIndex];

    // Apply updates
    if (updates.checkIn) record.checkIn = updates.checkIn;
    if (updates.checkOut) record.checkOut = updates.checkOut;
    if (updates.status) record.status = updates.status;

    // Recalculate production hours
    record.productionHours = AttendanceModel.calculateProductionHours(
      record.checkIn,
      record.checkOut
    );

    this._filteredData = [...this._attendanceData];
    this.closeEditModal();
  }
}
