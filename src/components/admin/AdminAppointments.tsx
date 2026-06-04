import React, { useState } from "react";
import { 
  Calendar, Check, X, Search, Clock, AlertTriangle, 
  Send, User, Phone, Mail, FileText, ChevronDown, CheckCircle2,
  XCircle, Filter, Sparkles, MessageSquare
} from "lucide-react";

interface AdminAppointmentsProps {
  bookings: any[];
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
  doctors: any[];
  services: any[];
  addActivityLog: (act: string) => void;
}

export default function AdminAppointments({ 
  bookings, 
  setBookings, 
  doctors, 
  services,
  addActivityLog
}: AdminAppointmentsProps) {
  
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  
  // Rescheduling modal states
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  // Notification simulation alert box states
  const [alertNotification, setAlertNotification] = useState<{
    open: boolean;
    type: "whatsapp" | "email";
    phoneOrEmail: string;
    patientName: string;
  } | null>(null);

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          b.id.toLowerCase().includes(search.toLowerCase()) ||
                          b.phone.includes(search);
    
    const bStatus = b.status || "pending";
    const matchesStatus = selectedStatus === "all" || bStatus === selectedStatus;
    const matchesDoctor = selectedDoctorFilter === "all" || b.doctorId === selectedDoctorFilter;
    const matchesDate = !dateFilter || b.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  const updateBookingStatus = (bookingId: string, status: "confirmed" | "cancelled" | "completed") => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    });
    setBookings(updated);
    addActivityLog(`Board updated appointment ${bookingId} status to [${status.toUpperCase()}]`);
  };

  const executeReschedule = (resId: string) => {
    if (!newDate || !newSlot) return;
    
    const updated = bookings.map((b) => {
      if (b.id === resId) {
        return { ...b, date: newDate, timeSlot: newSlot, status: "confirmed" };
      }
      return b;
    });

    setBookings(updated);
    addActivityLog(`Successfully rescheduled appointment ${resId} to ${newDate} at ${newSlot}`);
    setReschedulingId(null);
  };

  const triggerNotification = (type: "whatsapp" | "email", b: any) => {
    setAlertNotification({
      open: true,
      type,
      phoneOrEmail: type === "whatsapp" ? b.phone : b.email,
      patientName: b.fullName
    });
    
    addActivityLog(`Dispatched simulated patient clinic reminder via ${type.toUpperCase()} for ${b.fullName}`);
    
    setTimeout(() => {
      setAlertNotification(null);
    }, 4500);
  };

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title block */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600">Patient Coordinator</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Clinical Appointments Registrar</h2>
          <p className="text-xs text-brand-text-muted">Approve, decline, reschedule patient timelines, and initiate dynamic reminders.</p>
        </div>
        
        <button
          onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            setDateFilter(today);
            addActivityLog("Filtered scheduler list to current date on-demand");
          }}
          className="bg-slate-50 border border-gray-100 hover:border-sky-200 text-slate-700 hover:text-sky-700 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto cursor-pointer"
        >
          Check Today's Schedule
        </button>
      </div>

      {/* Pop-up simulated API trigger notification banner */}
      {alertNotification && (
        <div className="bg-emerald-950 border border-emerald-800 p-4 rounded-2xl flex items-center gap-3.5 text-white shadow-xl animate-bounce">
          <div className="h-10 w-10 shrink-0 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
            <Send className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] uppercase font-black text-emerald-400 tracking-wider">Automated Notification API Connected</span>
            <p className="text-xs font-bold leading-tight truncate">
              {alertNotification.type === "whatsapp" ? "WhatsApp Template dispatched to " : "Interactive verification SMTP email queued for "} 
              <span className="text-sky-300 font-mono italic select-all">{alertNotification.phoneOrEmail}</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
              "Kothari Dental Clinic message loaded: Confirming session for {alertNotification.patientName}."
            </p>
          </div>
        </div>
      )}

      {/* Interaction filtering and search controls */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Patient name search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-450 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search patient, index code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border border-transparent focus:border-sky-500 hover:border-gray-200 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-800 transition-all"
            />
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-transparent hover:border-gray-200 focus:border-sky-500 focus:outline-none rounded-xl px-3.5 py-3 text-xs font-semibold text-slate-800 cursor-pointer"
            >
              <option value="all">Status: All Schedulings</option>
              <option value="pending">Pending Review Only</option>
              <option value="confirmed">Confirmed Sessions</option>
              <option value="completed">Completed Audits</option>
              <option value="cancelled">Cancelled Lists</option>
            </select>
          </div>

          {/* Practitioner selector */}
          <select
            value={selectedDoctorFilter}
            onChange={(e) => setSelectedDoctorFilter(e.target.value)}
            className="w-full bg-slate-50 border border-transparent hover:border-gray-200 focus:border-sky-500 focus:outline-none rounded-xl px-3.5 py-3 text-xs font-semibold text-slate-800 cursor-pointer"
          >
            <option value="all">Practitioner: All Doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>Dr. {d.name.split(" ").slice(-1)[0]} ({d.title})</option>
            ))}
          </select>

          {/* Date Selector */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-slate-50 border border-transparent hover:border-gray-200 focus:border-sky-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 cursor-pointer"
            />
            {dateFilter && (
              <button 
                onClick={() => setDateFilter("")}
                className="absolute right-3 top-3.5 text-[9px] font-sans font-black uppercase text-rose-500 hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Appointments Schedule Board */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50 text-[9px] uppercase tracking-wider text-slate-450 font-black">
                <th className="p-4 sm:px-6">Patient Case Contact</th>
                <th className="p-4 sm:px-6">Consultation Specialty</th>
                <th className="p-4 sm:px-6">Slated Timing</th>
                <th className="p-4 sm:px-6">Session Status</th>
                <th className="p-4 sm:px-6 text-center">Live Patient Dispatch Info</th>
                <th className="p-4 sm:px-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <span className="block text-3xl mb-2 opacity-50">📋</span>
                    <p className="text-xs text-gray-400 italic font-semibold">No patient records located matching criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const srv = services.find(s => s.id === b.serviceId);
                  const doc = doctors.find(d => d.id === b.doctorId);
                  const activeStatus = b.status || "pending";
                  
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/40 relative group transition-colors">
                      
                      {/* Patient metadata */}
                      <td className="p-4 sm:px-6">
                        <div className="space-y-0.5">
                          <div className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5 leading-tight">
                            {b.isEmergency && (
                              <span className="text-[8px] bg-rose-50 text-rose-600 font-extrabold px-1.5 py-0.5 rounded border border-rose-100 animate-pulse uppercase shrink-0">
                                Emergency
                              </span>
                            )}
                            <span>{b.fullName}</span>
                          </div>
                          <div className="flex flex-col text-[10px] text-gray-400 font-medium">
                            <span>Phone: {b.phone}</span>
                            <span>Email: {b.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Specialist and Service info */}
                      <td className="p-4 sm:px-6">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-850 block">{srv?.name || "General Dentistry"}</span>
                          <span className="text-[10px] text-slate-500 block">Assigned Doctor: {doc?.name || "Unassigned"}</span>
                        </div>
                      </td>

                      {/* Slated calendar schedule dates */}
                      <td className="p-4 sm:px-6">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800 block">{b.date}</span>
                          <span className="text-[10px] text-sky-600 font-mono font-bold block">{b.timeSlot}</span>
                        </div>
                      </td>

                      {/* Live status badge */}
                      <td className="p-4 sm:px-6">
                        <div className="flex items-center">
                          {activeStatus === "confirmed" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                              <Check className="w-3.5 h-3.5 shrink-0" /> Confirmed
                            </span>
                          )}
                          {activeStatus === "cancelled" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                              <X className="w-3.5 h-3.5 shrink-0" /> Cancelled
                            </span>
                          )}
                          {activeStatus === "completed" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Completed
                            </span>
                          )}
                          {activeStatus === "pending" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-150 animate-pulse">
                              <Clock className="w-3.5 h-3.5 shrink-0 animate-spin" /> Pending Board Approval
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Communications reminder actions */}
                      <td className="p-4 sm:px-6">
                        <div className="flex items-center justify-center gap-2">
                          
                          <button
                            onClick={() => triggerNotification("whatsapp", b)}
                            title="Simulate WhatsApp patient template"
                            className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 hover:border-emerald-200 text-emerald-700 p-2 rounded-lg transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => triggerNotification("email", b)}
                            title="Simulate SMTP clinical notification"
                            className="bg-sky-50 hover:bg-sky-100 border border-sky-100 hover:border-sky-200 text-sky-700 p-2 rounded-lg transition-colors cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                      {/* Interactive edit and control panel */}
                      <td className="p-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {activeStatus === "pending" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "confirmed")}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl transition-colors cursor-pointer"
                              title="Approve consultation request"
                            >
                              Approve
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setReschedulingId(b.id);
                              setNewDate(b.date);
                              setNewSlot(b.timeSlot);
                            }}
                            className="bg-sky-50 hover:bg-sky-100 border border-sky-100/60 text-sky-700 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Reschedule
                          </button>

                          {activeStatus !== "cancelled" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "cancelled")}
                              className="bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 text-slate-450 hover:text-rose-600 p-2 rounded-xl transition-colors cursor-pointer"
                              title="Cancel appointment"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rescheduling slider/modal overlay */}
      {reschedulingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          <div 
            onClick={() => setReschedulingId(null)} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
          />
          
          <div className="relative bg-white border border-gray-100 rounded-3xl shadow-xl p-6 max-w-sm w-full space-y-4 z-10 transition-all">
            
            <div className="border-b border-gray-50 pb-3">
              <h4 className="font-display font-bold text-base text-gray-900">Reschedule Consultation</h4>
              <p className="text-[10px] text-gray-400">Select new clinical scheduling slots below.</p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Pick Slated Date</label>
                <input
                  type="date"
                  required
                  min={getTomorrowDateString()}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl px-3 py-2.5 font-sans font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Pick Work Slot</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {["09:00 AM", "10:30 AM", "11:45 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewSlot(slot)}
                      className={`p-2 rounded-lg border text-[10px] font-sans font-semibold transition-colors cursor-pointer ${
                        newSlot === slot
                          ? "bg-sky-50 border-sky-400 text-sky-700 font-bold"
                          : "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-gray-50">
              <button
                onClick={() => setReschedulingId(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => executeReschedule(reschedulingId)}
                className="flex-1 bg-sky-600 hover:bg-sky-750 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
              >
                Save Timeline
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
