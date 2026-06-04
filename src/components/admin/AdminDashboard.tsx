import React, { useState } from "react";
import { 
  Users, CalendarDays, DollarSign, Clock, AlertTriangle, 
  TrendingUp, TrendingDown, RefreshCw, Calendar as CalendarIcon, 
  ArrowRight, UserCheck, Activity, Brain, Star
} from "lucide-react";

interface AdminDashboardProps {
  bookings: any[];
  doctors: any[];
  services: any[];
  contacts: any[];
  activityLogs: string[];
  setActiveTabMenu: (tab: string) => void;
}

export default function AdminDashboard({ 
  bookings, 
  doctors, 
  services, 
  contacts, 
  activityLogs,
  setActiveTabMenu
}: AdminDashboardProps) {
  
  const [revenueTimeframe, setRevenueTimeframe] = useState<"weekly" | "monthly">("monthly");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Statistics calculation helpers
  const totalSlotsReserved = bookings.length;
  const emergenciesCount = bookings.filter(b => b.isEmergency).length;
  const todayString = new Date().toISOString().split("T")[0];
  const todaysAppointments = bookings.filter(b => b.date === todayString);
  const pendingAppointments = bookings.filter(b => b.status === "pending" || !b.status); // fallback default is pending

  // Estimated revenue calculation
  // Basic calculation: assign value representing average cost per booked service
  const getServiceEstimatedCost = (srvId: string): number => {
    switch (srvId) {
      case "clean": return 1500;
      case "root-canal": return 4500;
      case "braces": return 35000;
      case "implants": return 45000;
      case "whitening": return 60000;
      case "makeover": return 120000;
      case "pediatric": return 2000;
      case "surgery": return 12000;
      default: return 3000;
    }
  };

  const totalEstimatedRevenue = bookings.reduce((sum, b) => {
    if (b.status === "cancelled") return sum;
    return sum + getServiceEstimatedCost(b.serviceId);
  }, 0);

  // Growth percentages (realistic mock comparison stats)
  const calcGrowth = {
    appointments: "+14.6%",
    patients: "+8.2%",
    revenue: "+19.1%",
    emergencies: "-4.3%"
  };

  // Recent 5 bookings
  const recentBookings = bookings.slice(0, 5);

  // Custom charts mock data representation lists
  const weeklyRevenueData = [18200, 24500, 31000, 29000, 36500, 42000, 38100];
  const monthlyRevenueData = [120000, 145000, 138000, 165000, 189000, 210000];
  const currentChartRevenue = revenueTimeframe === "weekly" ? weeklyRevenueData : monthlyRevenueData;
  const revenueLabels = revenueTimeframe === "weekly" 
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "June"];

  // Popular treatments chart distribution math 
  const serviceCounts = services.map(s => {
    const qty = bookings.filter(b => b.serviceId === s.id).length;
    return { name: s.name, qty, cost: getServiceEstimatedCost(s.id) };
  }).sort((a, b) => b.qty - a.qty).slice(0, 4);

  // Quick Calendar schedule slot tracker
  const timeSlots = ["09:00 AM", "10:30 AM", "11:45 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];
  const getBookedSlotsForDate = (dateStr: string) => {
    return bookings.filter(b => b.date === dateStr);
  };
  const activeDayBookings = getBookedSlotsForDate(selectedCalendarDate);

  // SVG Chart Calculation Helpers
  const maxRev = Math.max(...currentChartRevenue) * 1.15;
  const svgWidth = 500;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getPointsStr = () => {
    const points = currentChartRevenue.map((val, idx) => {
      const x = paddingX + (idx * (svgWidth - paddingX * 2)) / (currentChartRevenue.length - 1);
      const y = svgHeight - paddingY - ((val / maxRev) * (svgHeight - paddingY * 2));
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  const getAreaPointsStr = () => {
    const linePoints = getPointsStr();
    if (!linePoints) return "";
    const firstX = paddingX;
    const lastX = svgWidth - paddingX;
    const bottomY = svgHeight - paddingY;
    return `${firstX},${bottomY} ${linePoints} ${lastX},${bottomY}`;
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Upper greetings / Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">Secure Board Terminal</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 leading-none">Operational Command Center</h1>
          <p className="text-xs sm:text-sm text-brand-text-muted">Interactive live intelligence, billing triggers, and clinical portfolio state control.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-50 border border-gray-100 p-2.5 rounded-2xl shrink-0 text-xs">
          <CalendarIcon className="w-4 h-4 text-sky-600" />
          <span className="font-semibold text-slate-700">Today: {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
        </div>
      </div>

      {/* Grid of Analytics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4" id="analytics-summary-grids">
        
        {[
          { title: "Total Bookings", val: totalSlotsReserved, suffix: "", icon: CalendarDays, growth: calcGrowth.appointments, color: "sky", desc: "Lifetime reservations" },
          { title: "Today's Intake", val: todaysAppointments.length, suffix: " slots", icon: Clock, growth: "+2", color: "emerald", desc: "Scheduled sessions" },
          { title: "Critical Trauma", val: emergenciesCount, suffix: " cases", icon: AlertTriangle, growth: calcGrowth.emergencies, color: "rose", desc: "Physician dispatches" },
          { title: "Invoice Estimates", val: "₹" + (totalEstimatedRevenue >= 100000 ? `${(totalEstimatedRevenue / 100000).toFixed(1)}L` : totalEstimatedRevenue), suffix: "", icon: DollarSign, growth: calcGrowth.revenue, color: "amber", desc: "Estimated treatments volume" },
          { title: "Pending Audits", val: pendingAppointments.length, suffix: " open", icon: Activity, growth: "Sync", color: "purple", desc: "Requires board approval" },
          { title: "Total Clinicians", val: doctors.length, suffix: " staff", icon: Users, growth: "+1", color: "teal", desc: "Active practitioners" }
        ].map((c, i) => {
          const Icon = c.icon;
          const isNegative = c.growth.startsWith("-");
          
          return (
            <div key={i} className="bg-white hover:bg-slate-50/50 border border-gray-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
              
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block truncate">{c.title}</span>
                <div className={`p-1.5 rounded-lg bg-${c.color}-50 text-${c.color}-600 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="my-3 space-y-0.5">
                <span className="block font-display font-black text-xl sm:text-2xl text-gray-900">{c.val}{c.suffix}</span>
                <span className="text-[10px] text-gray-400 block line-clamp-1">{c.desc}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-black tracking-tight px-1.5 py-0.5 rounded ${
                  isNegative ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                }`}>
                  {c.growth}
                </span>
                <span className="text-[9px] font-sans text-gray-400 uppercase tracking-widest font-black">MoM</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Dynamic Interactive Revenue Curve Graphic */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-4">
            <div className="space-y-1">
              <span className="flex items-center gap-1 text-sky-600 text-[10px] uppercase font-sans font-black tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" /> Est. Treatments Value Growth Trend
              </span>
              <h3 className="font-display font-black text-lg text-gray-900 leading-tight">Billing & Clinical Revenue Yields</h3>
            </div>

            <div className="flex gap-1.5 p-1 bg-slate-50 border border-gray-100 rounded-xl max-w-max self-start text-[11px] font-bold">
              <button 
                onClick={() => setRevenueTimeframe("weekly")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${revenueTimeframe === "weekly" ? "bg-white text-slate-900 shadow-xs" : "text-gray-450 hover:text-gray-900"}`}
              >
                Weekly Run
              </button>
              <button 
                onClick={() => setRevenueTimeframe("monthly")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${revenueTimeframe === "monthly" ? "bg-white text-slate-900 shadow-xs" : "text-gray-450 hover:text-gray-900"}`}
              >
                Monthly Curve
              </button>
            </div>
          </div>

          {/* Interactive Custom SVG Graph */}
          <div className="relative pt-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0077B6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0077B6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines horizontal */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                const y = paddingY + p * (svgHeight - paddingY * 2);
                return (
                  <line 
                    key={i} 
                    x1={paddingX} 
                    y1={y} 
                    x2={svgWidth - paddingX} 
                    y2={y} 
                    stroke="#F1F5F9" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Area Gradient */}
              <polygon points={getAreaPointsStr()} fill="url(#chartGradient)" />

              {/* Curve Line */}
              <polyline 
                points={getPointsStr()} 
                fill="none" 
                stroke="#0077B6" 
                strokeWidth="3" 
                className="transition-all duration-500 ease-in-out" 
              />

              {/* Data points */}
              {currentChartRevenue.map((val, idx) => {
                const x = paddingX + (idx * (svgWidth - paddingX * 2)) / (currentChartRevenue.length - 1);
                const y = svgHeight - paddingY - ((val / maxRev) * (svgHeight - paddingY * 2));
                return (
                  <g key={idx} className="group/dot cursor-pointer">
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="6" 
                      fill="#FFFFFF" 
                      stroke="#0077B6" 
                      strokeWidth="3.5" 
                      className="transition-all group-hover/dot:r-8" 
                    />
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="12" 
                      fill="#0077B6" 
                      fillOpacity="0" 
                      className="hover:fill-opacity-10 transition-opacity" 
                    />
                    {/* Tooltip on SVG hover */}
                    <text 
                      x={x} 
                      y={y - 12} 
                      textAnchor="middle" 
                      className="text-[10px] font-mono font-black fill-slate-900 opacity-0 group-hover/dot:opacity-100 transition-opacity bg-white px-1"
                    >
                      ₹{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {revenueLabels.map((lbl, idx) => {
                const x = paddingX + (idx * (svgWidth - paddingX * 2)) / (revenueLabels.length - 1);
                return (
                  <text 
                    key={idx} 
                    x={x} 
                    y={svgHeight - 10} 
                    textAnchor="middle" 
                    className="text-[10px] font-sans font-bold fill-gray-400"
                  >
                    {lbl}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex gap-4 text-xs font-semibold items-center justify-between text-gray-500 bg-slate-50 p-3.5 rounded-2xl border border-gray-100/60">
            <span className="flex items-center gap-1"><Brain className="w-4 h-4 text-emerald-500" /> Machine-learning projected booking count is increasing.</span>
            <button 
              onClick={() => setActiveTabMenu("billing")} 
              className="text-sky-600 hover:text-sky-700 flex items-center gap-1 font-bold text-[11px] uppercase tracking-wide cursor-pointer"
            >
              Analyze Receipts <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Treatment Popularity Breakdown */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          
          <div className="space-y-1.5 border-b border-gray-50 pb-4">
            <span className="text-[10px] uppercase font-sans font-black tracking-widest text-emerald-600 block">Distribution Audit</span>
            <h3 className="font-display font-black text-lg text-gray-900 leading-tight">Highly Demanded Specialty Services</h3>
          </div>

          <div className="my-6 space-y-4">
            {serviceCounts.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-8">Book appointments to seed active distribution graphs.</p>
            ) : (
              serviceCounts.map((srv, idx) => {
                const maxQty = Math.max(...serviceCounts.map(s => s.qty)) || 1;
                const percentage = Math.max(10, Math.min(100, Math.floor((srv.qty / maxQty) * 100)));
                const colorMap = ["bg-sky-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500"];
                
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-700 truncate max-w-36">{srv.name}</span>
                      <span className="font-mono font-black text-gray-400 bg-slate-50 px-2 py-0.5 rounded">{srv.qty} reserved</span>
                    </div>
                    {/* Micro horizontal progress bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colorMap[idx % colorMap.length]} rounded-full transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="bg-sky-50/50 border border-sky-100/60 p-4 rounded-2xl">
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-sky-600 block mb-1">Aesthetic Yield Insights</span>
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              Procedures involving Smile Makeovers and veneers currently account for high estimate shares.
            </p>
          </div>

        </div>

      </div>

      {/* Row: Active Days Interactive Schedule Widget & Recent Intakes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Core Live Calendar widget inside staff screen */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-sans font-black tracking-widest text-sky-600 block">Schedules Check</span>
              <h4 className="font-display font-bold text-base text-gray-900">Embedded Clinic Timetable</h4>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pick Inspection Date</label>
              <input 
                type="date"
                value={selectedCalendarDate}
                onChange={(e) => setSelectedCalendarDate(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-50/50 border border-gray-100/90 focus:border-sky-500 focus:outline-none rounded-xl px-4 py-3 text-xs font-sans font-semibold text-slate-800 cursor-pointer"
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-widest font-sans">Scheduled Patients ({activeDayBookings.length})</span>
              {activeDayBookings.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 border border-gray-100/80 rounded-2xl">
                  <span className="block text-2xl mb-1.5 opacity-40">📭</span>
                  <p className="text-[10px] text-gray-450 font-sans italic font-bold">No active reservations slated.</p>
                </div>
              ) : (
                activeDayBookings.map((b, idx) => {
                  const srv = services.find(s => s.id === b.serviceId);
                  const doc = doctors.find(d => d.id === b.doctorId);
                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs flex justify-between items-center relative overflow-hidden group">
                      {b.isEmergency && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-600" />}
                      <div className="space-y-0.5 truncate pl-1.5">
                        <span className="font-bold text-gray-800 block truncate leading-tight">{b.fullName}</span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {srv?.name || "General Procedure"} | Doctor {doc?.name.split(" ").slice(-1)[0] || "Staff"}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-black text-sky-700 bg-sky-50 px-2 py-1 rounded shrink-0">{b.timeSlot}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Patients Table & Action Triggers */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-sans font-black tracking-widest text-emerald-600 block">Registration Intake Logs</span>
              <h4 className="font-display font-black text-lg text-gray-900 leading-tight">Patient Reservations Inflow</h4>
            </div>
            
            <button 
              onClick={() => setActiveTabMenu("appointments")}
              className="text-[11px] font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 font-sans flex items-center gap-1 cursor-pointer自 rounded-xl"
            >
              Manage appointments <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* List recent bookings */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-gray-100 text-[9px] uppercase tracking-wider text-gray-400 font-extrabold pb-2">
                  <th className="py-2.5 font-black">Patient Contact</th>
                  <th className="py-2.5 font-black">Procedure & Clinician</th>
                  <th className="py-2.5 font-black">Slated Schedule</th>
                  <th className="py-2.5 font-black text-right">Verification ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/90">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center italic text-gray-400 font-medium">No registrations logged in current browser session.</td>
                  </tr>
                ) : (
                  recentBookings.map((b, idx) => {
                    const srv = services.find(s => s.id === b.serviceId);
                    const doc = doctors.find(d => d.id === b.doctorId);
                    
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 group transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-gray-800 leading-tight flex items-center gap-1.5">
                            {b.isEmergency && <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />}
                            {b.fullName}
                          </div>
                          <span className="text-[10px] text-gray-400 block">{b.phone}</span>
                        </td>
                        <td className="py-3">
                          <span className="font-bold text-gray-700 block">{srv?.name || "General Consultancy"}</span>
                          <span className="text-[10px] text-slate-500 block">{doc?.name || "TBD Surgeon"}</span>
                        </td>
                        <td className="py-3">
                          <span className="font-bold text-gray-700 block">{b.date}</span>
                          <span className="text-[10px] text-sky-600 font-mono font-semibold block">{b.timeSlot}</span>
                        </td>
                        <td className="py-3 text-right">
                          <code className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50/80 border border-slate-100 rounded px-2 py-0.5">{b.id}</code>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Row: Real-time system activity logging feed */}
      <div className="bg-slate-950 border border-slate-900 rounded-[32px] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase font-sans font-black tracking-widest text-teal-400 block">Session Auditing feed</span>
              <h3 className="font-display font-black text-white text-base leading-none">Security Encryption Activity Logs</h3>
            </div>
          </div>
          <span className="font-mono text-[9px] font-black text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-850 uppercase">2FA Shield Active</span>
        </div>

        <div className="space-y-2 max-h-[160px] overflow-y-auto font-mono text-[10px] text-slate-400 scrollbar-thin scrollbar-thumb-slate-800">
          {activityLogs.map((log, idx) => (
            <div key={idx} className="flex gap-4 p-2 bg-slate-900/60 rounded-xl border border-slate-900 hover:border-slate-850 hover:bg-slate-900 transition-all">
              <span className="text-emerald-500 shrink-0 select-none">❯</span>
              <div className="flex-1">
                <span className="text-slate-300 font-semibold">{log}</span>
              </div>
              <span className="text-slate-500 text-[9px] select-none shrink-0">{new Date().toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
