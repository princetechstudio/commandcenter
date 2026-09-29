import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthDays, getWeekDays, formatTime, getStatusColor } from '../utils';
import { isSameDay, isSameMonth, format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { Booking } from '../types';

type ViewType = 'month' | 'week' | 'day' | 'agenda';

export default function CalendarPage() {
  const { state, dispatch, addAuditLog } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const monthDays = getMonthDays(currentDate);
  const weekDays = getWeekDays(currentDate);

  const getBookingsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return state.bookings.filter(b => b.date === dateStr);
  };

  const navigate = (dir: 'prev' | 'next' | 'today') => {
    if (dir === 'today') { setCurrentDate(new Date()); return; }
    const fns: Record<ViewType, (d: Date, n: number) => Date> = {
      month: dir === 'prev' ? subMonths : addMonths,
      week: dir === 'prev' ? subWeeks : addWeeks,
      day: dir === 'prev' ? subDays : addDays,
      agenda: dir === 'prev' ? subWeeks : addWeeks,
    };
    setCurrentDate(fns[view](currentDate, 1));
  };

  const handleStatusChange = (status: Booking['status']) => {
    if (!selectedBooking) return;
    const updated = { ...selectedBooking, status };
    dispatch({ type: 'UPDATE_BOOKING', payload: updated });
    setSelectedBooking(updated);
    addAuditLog('booking_updated', 'booking', selectedBooking.id, { status });
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('prev')} className="p-2 rounded-lg hover:bg-slate-100"><ChevronLeft size={18} /></button>
          <button onClick={() => navigate('today')} className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50">Today</button>
          <button onClick={() => navigate('next')} className="p-2 rounded-lg hover:bg-slate-100"><ChevronRight size={18} /></button>
          <h3 className="text-lg font-semibold ml-2">
            {view === 'month' && format(currentDate, 'MMMM yyyy')}
            {view === 'week' && `Week of ${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`}
            {view === 'day' && format(currentDate, 'EEEE, MMMM d, yyyy')}
            {view === 'agenda' && 'Upcoming Bookings'}
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          {(['month', 'week', 'day', 'agenda'] as ViewType[]).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-sm rounded-md capitalize ${view === v ? 'bg-white shadow-sm font-medium' : 'hover:bg-slate-200'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Month View */}
      {view === 'month' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="p-2 text-center text-xs font-medium text-slate-500 bg-slate-50">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((day, i) => {
              const dayBookings = getBookingsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isSameDay(day, new Date());
              return (
                <div key={i} className={`min-h-[80px] lg:min-h-[100px] border-b border-r border-slate-100 p-1 ${!isCurrentMonth ? 'bg-slate-50' : ''}`}>
                  <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isCurrentDay ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-0.5">
                    {dayBookings.slice(0, 3).map(b => {
                      const customer = state.customers.find(c => c.id === b.customerId);
                      return (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBooking(b)}
                          className={`w-full text-left text-[10px] lg:text-xs px-1 py-0.5 rounded truncate ${
                            b.status === 'completed' ? 'bg-green-100 text-green-800' :
                            b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            b.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {b.startTime} {customer?.name.split(' ')[0]}
                        </button>
                      );
                    })}
                    {dayBookings.length > 3 && (
                      <p className="text-[10px] text-slate-500 px-1">+{dayBookings.length - 3} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
          <div className="grid grid-cols-8 min-w-[700px]">
            <div className="border-r border-slate-100 p-2 bg-slate-50"><p className="text-xs font-medium text-slate-500">Time</p></div>
            {weekDays.map((day, i) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div key={i} className={`border-r border-slate-100 p-2 ${isToday ? 'bg-blue-50' : 'bg-slate-50'}`}>
                  <p className={`text-xs font-medium text-center ${isToday ? 'text-blue-600' : 'text-slate-500'}`}>{format(day, 'EEE d')}</p>
                </div>
              );
            })}
          </div>
          {Array.from({ length: 12 }, (_, i) => i + 7).map(hour => (
            <div key={hour} className="grid grid-cols-8 min-w-[700px] border-t border-slate-100">
              <div className="border-r border-slate-100 p-2"><p className="text-xs text-slate-500">{hour}:00</p></div>
              {weekDays.map((day, di) => {
                const dayBookings = getBookingsForDate(day).filter(b => parseInt(b.startTime.split(':')[0]) === hour);
                return (
                  <div key={di} className="border-r border-slate-100 p-1 min-h-[50px]">
                    {dayBookings.map(b => {
                      const customer = state.customers.find(c => c.id === b.customerId);
                      const service = state.services.find(s => s.id === b.serviceId);
                      return (
                        <button key={b.id} onClick={() => setSelectedBooking(b)} className="w-full text-left text-[10px] p-1 rounded bg-blue-100 text-blue-800 mb-0.5 hover:bg-blue-200">
                          <p className="font-medium truncate">{customer?.name}</p>
                          <p className="truncate">{service?.name}</p>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => {
            const hourBookings = getBookingsForDate(currentDate).filter(b => parseInt(b.startTime.split(':')[0]) === hour);
            return (
              <div key={hour} className="flex border-t border-slate-100 min-h-[60px]">
                <div className="w-20 p-3 border-r border-slate-100 bg-slate-50"><p className="text-sm font-medium text-slate-600">{hour}:00</p></div>
                <div className="flex-1 p-2 flex flex-wrap gap-2">
                  {hourBookings.map(b => {
                    const customer = state.customers.find(c => c.id === b.customerId);
                    const service = state.services.find(s => s.id === b.serviceId);
                    const vehicle = state.vehicles.find(v => v.id === b.vehicleId);
                    return (
                      <button key={b.id} onClick={() => setSelectedBooking(b)} className="p-3 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 text-left max-w-xs">
                        <p className="font-medium text-sm text-slate-800">{customer?.name}</p>
                        <p className="text-xs text-slate-500">{vehicle?.year} {vehicle?.make} {vehicle?.model}</p>
                        <p className="text-xs text-blue-600 mt-1">{service?.name} • {formatTime(b.startTime)} - {formatTime(b.endTime)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${getStatusColor(b.status)}`}>{b.status.replace('_', ' ')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Agenda View */}
      {view === 'agenda' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="space-y-3">
            {state.bookings
              .filter(b => b.date >= new Date().toISOString().split('T')[0])
              .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
              .slice(0, 20)
              .map(b => {
                const customer = state.customers.find(c => c.id === b.customerId);
                const vehicle = state.vehicles.find(v => v.id === b.vehicleId);
                const service = state.services.find(s => s.id === b.serviceId);
                return (
                  <button key={b.id} onClick={() => setSelectedBooking(b)} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 text-left border border-slate-100">
                    <div className="text-center min-w-[60px]">
                      <p className="text-lg font-bold text-blue-600">{formatTime(b.startTime)}</p>
                      <p className="text-xs text-slate-500">{format(new Date(b.date), 'MMM d')}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{customer?.name}</p>
                      <p className="text-sm text-slate-500">{vehicle?.year} {vehicle?.make} {vehicle?.model}</p>
                      <p className="text-sm text-blue-600">{service?.name}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(b.status)}`}>{b.status.replace('_', ' ')}</span>
                  </button>
                );
              })}
            {state.bookings.filter(b => b.date >= new Date().toISOString().split('T')[0]).length === 0 && (
              <p className="text-center text-slate-500 py-8">No upcoming bookings</p>
            )}
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 animate-fadeIn max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Booking Details</h3>
            {(() => {
              const customer = state.customers.find(c => c.id === selectedBooking.customerId);
              const vehicle = state.vehicles.find(v => v.id === selectedBooking.vehicleId);
              const service = state.services.find(s => s.id === selectedBooking.serviceId);
              return (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-xs text-slate-500">Customer</p><p className="text-sm font-medium">{customer?.name}</p></div>
                    <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm font-medium">{customer?.phone}</p></div>
                    <div><p className="text-xs text-slate-500">Vehicle</p><p className="text-sm font-medium">{vehicle?.year} {vehicle?.make} {vehicle?.model}</p></div>
                    <div><p className="text-xs text-slate-500">Plate</p><p className="text-sm font-medium">{vehicle?.plateNumber}</p></div>
                    <div><p className="text-xs text-slate-500">Service</p><p className="text-sm font-medium">{service?.name}</p></div>
                    <div><p className="text-xs text-slate-500">Price</p><p className="text-sm font-medium">GH₵{selectedBooking.price}</p></div>
                    <div><p className="text-xs text-slate-500">Date</p><p className="text-sm font-medium">{format(new Date(selectedBooking.date), 'MMM d, yyyy')}</p></div>
                    <div><p className="text-xs text-slate-500">Time</p><p className="text-sm font-medium">{formatTime(selectedBooking.startTime)} - {formatTime(selectedBooking.endTime)}</p></div>
                  </div>
                  {selectedBooking.notes && <div><p className="text-xs text-slate-500">Notes</p><p className="text-sm">{selectedBooking.notes}</p></div>}
                </div>
              );
            })()}
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1.5 text-xs rounded-lg border ${selectedBooking.status === status ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setSelectedBooking(null)} className="mt-4 w-full py-2 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
