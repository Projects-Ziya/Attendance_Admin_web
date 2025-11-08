import React from 'react';
import { observer } from 'mobx-react-lite';
import { AttendanceViewModel } from '../viewmodels/AttendanceViewModel';
import { AttendanceModel } from '../models/AttendanceModel';
import searchicon from '../assets/search.svg';
import clockicon from '../assets/clock.svg';
import editicon from '../assets/edit.svg'

interface AttendanceViewProps {
    viewModel: AttendanceViewModel;
}

export const AttendanceView: React.FC<AttendanceViewProps> = observer(({ viewModel }) => {
    // Render status badge with Tailwind CSS
    const renderStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase();

        const statusStyles = {
            present: ' text-green-500 text-[18px] ',
            absent: ' text-red-500 text-[18px]',
            late: ' text-orange-500 text-[18px] '
        };

        return (
            <span className={`inline-block rounded-xl px-3 py-1 text-[13px] font-medium ${statusStyles[statusLower as keyof typeof statusStyles]}`}>
                {status}
            </span>
        );
    };

    // Render production hours badge with three-tier logic
    const renderProductionHours = (hours: number, status: string) => {
        let bgClass = '';
        let textClass = '';
        let filterStyle = '';

        if (status === 'Late' || (hours > 0 && hours < 6)) {
            bgClass = 'bg-orange-100';
            textClass = 'text-orange-600';
            filterStyle = 'brightness(0) saturate(100%) invert(55%) sepia(80%) saturate(2468%) hue-rotate(346deg) brightness(92%) contrast(90%)';
        } else if (hours < 0) {
            bgClass = 'bg-red-100';
            textClass = 'text-red-600';
            filterStyle = 'brightness(0) saturate(100%) invert(19%) sepia(98%) saturate(6943%) hue-rotate(357deg) brightness(94%) contrast(114%)';
        } else {
            bgClass = 'bg-green-100';
            textClass = 'text-green-600';
            filterStyle = 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(451%) hue-rotate(86deg) brightness(92%) contrast(87%)';
        }

        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[18px] font-medium ${bgClass} ${textClass}`}>
                <img src={clockicon} alt="Clock" className="w-4 h-4" style={{ filter: filterStyle }} />
                {Math.abs(hours).toFixed(2)} Hrs
            </span>
        );
    };

    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = AttendanceModel.formatTime(e.target.value);
        viewModel.updateEditFormField('checkIn', formatted);
    };

    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = AttendanceModel.formatTime(e.target.value);
        viewModel.updateEditFormField('checkOut', formatted);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        viewModel.updateEditFormField('status', e.target.value as any);
    };

    return (
        <div className='h-[1243px] w-[1579px] pl-[73px] pt-[234px] bg-[#F6F5FA]'>
            <div className="h-[872px] w-[1469px] bg-[#FCFCFC]">
                <div className="">

                    {/* FILTER CONTROLS */}
                    <div className="flex items-center pl-[39.5px] pt-[40px]">
                        {/* Search */}
                        <div className="flex items-center border border-gray-300 rounded-lg h-[45px] w-[300px] bg-white">
                            <img src={searchicon} alt="Search" className="w-4 h-4 ml-3" />
                            <input
                                type="text"
                                className="flex-1 px-2 text-sm focus:outline-none bg-transparent"
                                placeholder="Search here"
                                value={viewModel.filters.searchTerm}
                                onChange={(e) => viewModel.setSearchTerm(e.target.value)}
                            />
                            <button className="me-6 py-1.5 px-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200">
                                Search
                            </button>
                        </div>

                        {/* Date Range - Icon padded left from right edge */}
                        {/* Date Range with proper icon positioning */}
                        <select
                            className="border ml-[63px] pl-[15px] pr-[40px] border-gray-300 rounded-lg h-[61px] w-[336px] text-sm bg-white focus:outline-none focus:border-teal-500"
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '16px'
                            }}
                        >
                            <option value="07/09/2025 - 07/09/2024">07/09/2025 - 07/09/2024</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="last30days">Last 30 Days</option>
                            <option value="thismonth">This Month</option>
                        </select>

                        {/* Sort By with proper icon positioning */}
                        <select
                            className="border border-gray-300 rounded-lg pl-[15px] pr-[40px] h-[61px] ml-[15px] w-[336px] text-sm bg-white focus:outline-none focus:border-teal-500"
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '16px'
                            }}
                            value={viewModel.filters.sortBy}
                            onChange={(e) => viewModel.setSortBy(e.target.value as any)}
                        >
                            <option value="last7days">Sort By: Last 7 Days</option>
                            <option value="date">Sort By: Date</option>
                            <option value="status">Sort By: Status</option>
                        </select>

                        {/* Status Filter with proper icon positioning */}
                        <select
                            className="border border-gray-300 rounded-lg pl-[15px] pr-[40px] h-[61px] w-[336px] ml-[15px] mr-[39px] text-sm bg-white focus:outline-none focus:border-teal-500"
                            style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '16px'
                            }}
                            value={viewModel.filters.statusFilter}
                            onChange={(e) => viewModel.setStatusFilter(e.target.value as any)}
                        >
                            <option value="all">Select Status</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                        </select>

                    </div>

                    {/* ATTENDANCE TABLE */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="w-[1470px] mt-[40px]">
                            <thead>
                                <tr className="bg-[#F4F4F4] h-[80px] border-b border-gray-200">
                                    <th className="text-left px-[37px] text-[18px] text-[#4D4D4D] font-[600] uppercase">Date</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Check In</th>
                                    <th className="text-left px-7 text-[18px] text-[#4D4D4D] font-[600] uppercase">Status</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Check Out</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Break</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Late</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Overtime</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Production Hours</th>
                                    <th className="text-left px-4 text-[18px] text-[#4D4D4D] font-[600] uppercase">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewModel.filteredData.map((record, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 text-[18px] font-[500] transition-colors">
                                        <td className="py-4 px-[37px] text-gray-900">{record.date}</td>
                                        <td className="py-8 px-4 text-gray-600">{record.checkIn}</td>
                                        <td className="py-8 px-4">{renderStatusBadge(record.status)}</td>
                                        <td className="py-4 px-4 text-gray-600">{record.checkOut}</td>
                                        <td className="py-4 px-4 text-gray-600">{record.break}</td>
                                        <td className="py-4 px-4 text-gray-600">{record.late}</td>
                                        <td className="py-4 px-4 text-gray-600">{record.overtime}</td>
                                        <td className="py-4 px-4">{renderProductionHours(record.productionHours, record.status)}</td>
                                        <td className="py-4 px-4">
                                            {record.status === 'Absent' ? (
                                                <button   onClick={() => viewModel.openEditModal(index)} className="text-[#00A0E3] flex  underline text-sm">
                                                    <span className='pr-1'><img  src={editicon} alt="" /></span> 
                                                   <p> Edit Log</p>
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">--</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* EDIT MODAL */}
                    {viewModel.isEditModalOpen && viewModel.currentEditRecord && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && viewModel.closeEditModal()}>
                            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                                <h3 className="text-lg font-semibold mb-4">Edit Attendance Log</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50" value={viewModel.currentEditRecord.date} readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Check In</label>
                                        <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500" onChange={handleCheckInChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Check Out</label>
                                        <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500" onChange={handleCheckOutChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500" value={viewModel.editFormData.status || viewModel.currentEditRecord.status} onChange={handleStatusChange}>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                            <option value="Late">Late</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button onClick={() => viewModel.closeEditModal()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                                    <button onClick={() => viewModel.saveEdit()} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">Save</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
});
