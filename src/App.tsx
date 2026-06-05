/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import DoctorsView from "./components/DoctorsView";
import BookingView from "./components/BookingView";

// Admin components
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAppointments from "./components/admin/AdminAppointments";
import AdminPatients from "./components/admin/AdminPatients";
import AdminDoctors from "./components/admin/AdminDoctors";
import AdminBilling from "./components/admin/AdminBilling";
import AdminCms from "./components/admin/AdminCms";
import AdminFeedback from "./components/admin/AdminFeedback";
import AdminSettings from "./components/admin/AdminSettings";

import { SERVICES, DOCTORS, TESTIMONIALS } from "./data";

import { 
  AlertTriangle, X, Check, PhoneCall, Award, Sparkles, 
  Clock, ShieldCheck, Heart, Stethoscope, Landmark, CalendarDays, ArrowRight,
  LogOut, LayoutDashboard, Calendar, Users2, ShieldAlert, BadgeDollarSign, FileCode, CheckSquare,
  Menu as MenuIcon, ChevronLeft, ChevronRight, Settings, MessageSquarePlus, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [bookingResetKey, setBookingResetKey] = useState<number>(0);

  // Global theme switcher state (Light/Dark)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("kothari_dental_theme");
    return (saved === "light" || saved === "dark") ? saved : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("kothari_dental_theme", next);
      return next;
    });
  };

  // Core CMS databases with initial file seed data
  const [services, setServices] = useState<any[]>(SERVICES);
  const [doctors, setDoctors] = useState<any[]>(DOCTORS);
  const [testimonials, setTestimonials] = useState<any[]>(TESTIMONIALS);

  // Dynamic hero CMS
  const [heroCms, setHeroCms] = useState<any>({
    welcomeLabel: "Accredited Academic Clinical Specialists",
    titleLine1: "Painless Treatment.",
    titleLine2: "Radiant Smiles.",
    description: "Kothari Dental integrates state-of-the-art diagnostic imaging, ultra-delicate pain management, and custom treatment planning with world-class clinician hospitality. Experience care designed around your comfort.",
    experienceCount: "15",
    patientCount: "4200",
    satisfactionRate: "99",
    phone: "+91 22 6125 7800"
  });

  // Clinic working hours state
  const [clinicHoursCms, setClinicHoursCms] = useState<string>("MON - SAT: 9AM - 6PM");

  // Gallery slider state
  const [galleryCms, setGalleryCms] = useState<any[]>([
    { id: "GAL-1", url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600", caption: "Aesthetic Dental Care Suites", category: "clinical" },
    { id: "GAL-2", url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600", caption: "3D Intraoral Diagnostics", category: "equipment" },
    { id: "GAL-3", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", caption: "Sterilization Excellence Labs", category: "staff" }
  ]);

  // Informative blog state parameters
  const [blogPostsCms, setBlogPostsCms] = useState<any[]>([
    { id: "BLOG-1", title: "Micro-Practice Anesthetics Unpacked", author: "Dr. Jenkins", readTime: "5 min read", date: "June 2, 2026", excerpt: "How digitally guided dispensers deliver a completely pinless dental numbing experience." },
    { id: "BLOG-2", title: "Invisalign vs Braces: 2026 Analysis", author: "Dr. Kothari", readTime: "8 min read", date: "May 28, 2026", excerpt: "Detailed comparison guide to choosing your optimal alignment dental therapy pathway." }
  ]);

  // Client messages & interactive contacts
  const [contacts, setContacts] = useState<any[]>([
    { id: "MSG-101", fullName: "William Peterson", email: "wpeterson@gmail.com", service: "Implants", message: "Hello, do you accept Dental Networks premium PPO plan? I need to get 2 implants planned.", read: false, date: "May 29, 2026" },
    { id: "MSG-102", fullName: "Clara Finch", email: "clara.f@outbox.com", service: "Smile Makeover", message: "Hi! Can you give an estimate of how long invisible aligners will take? Thanks!", read: true, date: "May 25, 2026" }
  ]);

  // Operational system auditable logs
  const [activityLogs, setActivityLogs] = useState<string[]>([
    "Clinic administration suite online.",
    "Database replication connection: Healthy.",
    "Role permissions configured."
  ]);

  const addActivityLog = (act: string) => {
    setActivityLogs(prev => [`[${new Date().toLocaleTimeString()}] ${act}`, ...prev]);
  };

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminStaffRole, setAdminStaffRole] = useState("Administrator");
  const [adminCurrentView, setAdminCurrentView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Unified appointments lists
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("lumina_bookings");
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    } else {
      const initialBookings = [
        {
          id: "LUM-984712",
          fullName: "Charles Xavier",
          phone: "+91 98200 88776",
          email: "professor-x@egfaculty.org",
          serviceId: "whitening",
          doctorId: "jenkins",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          timeSlot: "10:30 AM",
          isEmergency: false,
          status: "confirmed",
          createdAt: new Date().toLocaleString()
        },
        {
          id: "LUM-472013",
          fullName: "Amanda Waller",
          phone: "+91 91100 44332",
          email: "waller@argus.gov",
          serviceId: "implants",
          doctorId: "kothari",
          date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
          timeSlot: "01:30 PM",
          isEmergency: false,
          status: "pending",
          createdAt: new Date().toLocaleString()
        }
      ];
      setBookings(initialBookings);
      localStorage.setItem("lumina_bookings", JSON.stringify(initialBookings));
    }
  }, []);

  // Sync bookings changes to localStorage
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("lumina_bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  const startNewBooking = () => {
    setSelectedServiceId(null);
    setSelectedDoctorId(null);
    setBookingResetKey(prev => prev + 1);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Emergency intake modal states
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyType, setEmergencyType] = useState("severe_pain");
  const [emergencyNotes, setEmergencyNotes] = useState("");
  const [emergencySuccess, setEmergencySuccess] = useState(false);
  const [emergencyTicketId, setEmergencyTicketId] = useState("");

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyName.trim() || !emergencyPhone.trim()) {
      alert("Please ensure Name and Phone entries are completed.");
      return;
    }

    const tcktId = "EMG-" + Math.floor(100000 + Math.random() * 900000);
    setEmergencyTicketId(tcktId);
    setEmergencySuccess(true);
    
    // Save emergency to localStorage if desired
    const stored = localStorage.getItem("lumina_bookings") || "[]";
    let bookingsArray = [];
    try {
      bookingsArray = JSON.parse(stored);
    } catch {
      bookingsArray = [];
    }

    const serviceMap: Record<string, string> = {
      severe_pain: "Root Canal",
      bleeding: "Oral Surgery",
      knocked_out: "Oral Surgery",
      fracture: "Oral Surgery"
    };

    const newBooking = {
      id: tcktId,
      fullName: emergencyName,
      phone: emergencyPhone,
      email: "emergency-intake@lumina-dental.com",
      serviceId: emergencyType === "severe_pain" ? "root-canal" : "surgery",
      doctorId: "jenkins", // Dr. Sarah Jenkins is chief oral surgeon
      date: new Date().toISOString().split("T")[0],
      timeSlot: "IMMEDIATE EMERGENCY",
      isEmergency: true,
      createdAt: new Date().toLocaleString()
    };

    bookingsArray.unshift(newBooking);
    localStorage.setItem("lumina_bookings", JSON.stringify(bookingsArray));
  };

  const handleCloseEmergencyModal = () => {
    setEmergencyModalOpen(false);
    // Reset inputs
    setTimeout(() => {
      setEmergencyName("");
      setEmergencyPhone("");
      setEmergencyType("severe_pain");
      setEmergencyNotes("");
      setEmergencySuccess(false);
      setEmergencyTicketId("");
    }, 300);
  };

  const adminMenuItems = [
    { id: "dashboard", label: "Intelligence Console", desc: "Performance & CRM analytics", icon: LayoutDashboard },
    { id: "appointments", label: "Scheduler Engine", desc: "Live client reservations", icon: CalendarDays },
    { id: "patients", label: "Patient EHR", desc: "Medical historical charts", icon: Users2 },
    { id: "doctors", label: "Clinical Care Team", desc: "Physicians & specialists", icon: Stethoscope },
    { id: "billing", label: "Invoices Ledger", desc: "Transaction statements", icon: BadgeDollarSign },
    { id: "cms", label: "Website Content", desc: "CMS Marketing Editor", icon: FileCode },
    { id: "feedback", label: "Inquiries Box", desc: "Direct customer contacts", icon: MessageSquarePlus },
    { id: "settings", label: "System settings", desc: "Key clinic parameters", icon: Settings },
  ];

  if (activeTab === "admin") {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex flex-col font-sans selection:bg-sky-600/10 selection:text-sky-700">
        {/* Admin Frame Header */}
        <header className="bg-[#0f172a] text-white h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 shrink-0 z-20 shadow-lg border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            {isAdminLoggedIn && (
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="p-2 -ml-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer md:hidden"
                id="admin-mobile-sidebar-toggle"
                title="Toggle menu"
              >
                <MenuIcon className="w-5.5 h-5.5" />
              </button>
            )}
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-900/35">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-wider uppercase block">
                KOTHARI <span className="text-sky-400 font-light font-sans text-xs bg-slate-800 px-2 py-0.5 rounded-full">STAFF CORE</span>
              </span>
              <p className="text-[9px] text-gray-400 font-mono tracking-widest font-bold uppercase">Dynamic Practice Manager Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-[#00C897]/10 border border-[#00C897]/30 px-3 py-1 rounded-full text-[#00C897] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#00C897] animate-pulse" />
              {adminStaffRole}
            </span>
            
            <div className="h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono text-[#d1d5db]/75 hidden sm:inline">admin@dentalclinic.com</span>
              <button
                onClick={() => {
                  setIsAdminLoggedIn(false);
                  setActiveTab("home");
                  addActivityLog("Administrator logged out successfully.");
                }}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors border border-slate-700"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-slate-300">Exit</span>
              </button>
            </div>
          </div>
        </header>

        {/* Admin Cabin Workspace Slider */}
        {!isAdminLoggedIn ? (
          <div className="flex-1 flex items-center justify-center bg-slate-50/65 py-12 px-4 sm:px-6">
            <AdminLogin 
              onLoginSuccess={(role) => {
                setIsAdminLoggedIn(true);
                setAdminStaffRole(role);
                addActivityLog(`Authorized access as ${role}`);
              }} 
              addActivityLog={addActivityLog} 
            />
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
              <div 
                className="fixed inset-0 bg-slate-950/65 z-20 md:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}

            {/* Collapsible Left Sidebar */}
            <aside 
              className={`bg-[#0f172a] text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0
                fixed md:static inset-y-0 left-0 top-16 sm:top-20 md:top-0 z-30 md:z-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] md:h-auto
                ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                ${sidebarCollapsed ? "w-18" : "w-64"}`}
            >
              <div className="space-y-4 py-4">
                <div className="px-3 flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#00C897] font-sans pl-1">
                      System Navigation
                    </span>
                  )}
                  <button 
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto"
                    title={sidebarCollapsed ? "Expand panel" : "Collapse panel"}
                  >
                    {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>
                </div>

                <nav className="space-y-1.5 px-2">
                  {adminMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = adminCurrentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setAdminCurrentView(item.id);
                          setMobileSidebarOpen(false); // Auto-dismiss mobile menu bar
                        }}
                        className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-left transition-all group cursor-pointer ${
                          isActive
                            ? "bg-[#0077B6] text-white font-bold shadow-md shadow-sky-950/40"
                            : "hover:bg-slate-800 hover:text-slate-100 text-slate-400"
                        }`}
                        title={item.label}
                      >
                        <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-white" : "text-sky-400/80 group-hover:text-white"}`} />
                        {!sidebarCollapsed && (
                          <div className="flex flex-col">
                            <span className="text-xs tracking-wider">{item.label}</span>
                            <span className={`text-[9px] font-normal tracking-tight ${isActive ? "text-sky-100/90" : "text-slate-500 group-hover:text-slate-400"}`}>
                              {item.desc}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer info */}
              {!sidebarCollapsed && (
                <div className="p-4 border-t border-slate-850/60 bg-slate-950/40 text-center space-y-1 font-mono">
                  <p className="text-[10px] text-slate-500 font-black">SECURE PRACTICE SUITE</p>
                  <p className="text-[9px] text-slate-600">v3.0 - Offline-first Sync ready</p>
                </div>
              )}
            </aside>

            {/* Content Display container */}
            <main className="flex-grow overflow-y-auto p-4 sm:p-8 bg-[#f8fafc]">
              <div className="max-w-7xl mx-auto space-y-8 h-full animate-fade-in">
                {adminCurrentView === "dashboard" && (
                  <AdminDashboard
                    bookings={bookings}
                    doctors={doctors}
                    services={services}
                    contacts={contacts}
                    activityLogs={activityLogs}
                    setActiveTabMenu={setAdminCurrentView}
                  />
                )}
                {adminCurrentView === "appointments" && (
                  <AdminAppointments
                    bookings={bookings}
                    setBookings={setBookings}
                    doctors={doctors}
                    services={services}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "patients" && (
                  <AdminPatients
                    bookings={bookings}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "doctors" && (
                  <AdminDoctors
                    doctors={doctors}
                    setDoctors={setDoctors}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "billing" && (
                  <AdminBilling
                    bookings={bookings}
                    doctors={doctors}
                    services={services}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "cms" && (
                  <AdminCms
                    services={services}
                    setServices={setServices}
                    testimonials={testimonials}
                    setTestimonials={setTestimonials}
                    heroCms={heroCms}
                    setHeroCms={setHeroCms}
                    clinicHoursCms={clinicHoursCms}
                    setClinicHoursCms={setClinicHoursCms}
                    galleryCms={galleryCms}
                    setGalleryCms={setGalleryCms}
                    blogPostsCms={blogPostsCms}
                    setBlogPostsCms={setBlogPostsCms}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "feedback" && (
                  <AdminFeedback
                    contacts={contacts}
                    setContacts={setContacts}
                    addActivityLog={addActivityLog}
                  />
                )}
                {adminCurrentView === "settings" && (
                  <AdminSettings
                    heroCms={heroCms}
                    setHeroCms={setHeroCms}
                    clinicHoursCms={clinicHoursCms}
                    setClinicHoursCms={setClinicHoursCms}
                    addActivityLog={addActivityLog}
                  />
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col justify-between selection:bg-sky-600/10 selection:text-sky-700">
      
      {/* Dynamic Top bar with Clinic announcements */}
      <div className="bg-sky-900 text-sky-100 text-[10px] sm:text-xs py-2 px-4 text-center font-sans font-semibold tracking-wider flex items-center justify-center gap-4 border-b border-sky-950">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          Sunday Operations Restricted to Critical School Trauma
        </span>
        <span className="hidden sm:inline-block">|</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          Direct Insurances Accepted
        </span>
      </div>

      {/* Styled Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openEmergencyModal={() => setEmergencyModalOpen(true)} 
        startNewBooking={startNewBooking}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main views rendering stack with fade animation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <HomeView 
                setActiveTab={setActiveTab} 
                setSelectedServiceId={setSelectedServiceId}
                setSelectedDoctorId={setSelectedDoctorId}
                startNewBooking={startNewBooking}
                servicesProp={services}
                doctorsProp={doctors}
                testimonialsProp={testimonials}
                heroCms={heroCms}
              />
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ServicesView 
                setActiveTab={setActiveTab} 
                setSelectedServiceId={setSelectedServiceId}
                servicesProp={services}
              />
            </motion.div>
          )}

          {activeTab === "doctors" && (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <DoctorsView 
                setActiveTab={setActiveTab} 
                setSelectedDoctorId={setSelectedDoctorId}
                doctorsProp={doctors}
              />
            </motion.div>
          )}

          {activeTab === "booking" && (
            <motion.div
              key={`booking-motion-${bookingResetKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BookingView 
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
                selectedDoctorId={selectedDoctorId}
                setSelectedDoctorId={setSelectedDoctorId}
                servicesProp={services}
                doctorsProp={doctors}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating emergency action trigger sidebar */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:block" id="floating-action-trigger">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="flex items-center gap-3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-sans font-bold uppercase tracking-wider text-xs px-5 py-4 rounded-full shadow-xl shadow-rose-100 hover:shadow-2xl transition-all duration-300 animate-bounce cursor-pointer border border-rose-500"
        >
          <PhoneCall className="w-4.5 h-4.5" />
          <span>Active Practice Trauma Assistance</span>
        </button>
      </div>

      {/* Clinic Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openEmergencyModal={() => setEmergencyModalOpen(true)} 
        startNewBooking={startNewBooking}
        theme={theme}
      />

      {/* 24/7 TRAUMA EMERGENCY INTAKE MODAL SCREEN */}
      <AnimatePresence>
        {emergencyModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="emergency-modal">
            
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseEmergencyModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white border border-rose-100 rounded-[32px] shadow-2xl p-6 sm:p-9 max-w-lg w-full overflow-hidden space-y-6 z-10"
              >
                
                {/* Visual red hazard border strip */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600" />

                {/* Header elements */}
                <div className="flex items-start justify-between gap-4 border-b border-rose-50/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertTriangle className="w-5 h-5 animate-pulse" />
                      <span className="text-[10px] font-sans font-black uppercase tracking-widest text-rose-700">Critical Medical Alert</span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
                      Kothari Trauma Assistance
                    </h3>
                    <p className="text-xs text-brand-text-muted">
                      Complete this rapid protocol. The on-call surgeon will be notified instantly.
                    </p>
                  </div>
                  <button
                    onClick={handleCloseEmergencyModal}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-450 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Close emergency modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Success Screen Inside State */}
                {emergencySuccess ? (
                  <div className="text-center py-4 space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                      <Check className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                        Intake Alert Transmitted Successfully
                      </span>
                      <h4 className="font-display font-bold text-lg text-gray-900">Physician Notified Immediately</h4>
                      <p className="text-xs text-brand-text-muted leading-relaxed max-w-sm mx-auto">
                        Your trauma tracking ticket is <strong className="font-mono text-rose-700 text-sm">{emergencyTicketId}</strong>. Dr. Jenkins' on-call trauma desk has locked your session and will contact your active phone line <strong className="text-sky-700 font-semibold">{emergencyPhone}</strong> inside 15-20 minutes.
                      </p>
                    </div>
                    
                    <div className="bg-rose-50 border border-rose-100/60 p-4 rounded-2xl text-left text-xs text-rose-950 font-sans leading-relaxed space-y-2">
                      <span className="font-bold text-rose-800 block uppercase tracking-wide text-[10px]">Immediate Symptom Preservation Instructions:</span>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>Tooth Knocked Out:</strong> Do not scrub root. Preserve tooth inside cup of whole milk or child's saliva & arrive under 60m.</li>
                        <li><strong>Abrupt Localized Bleeding:</strong> Apply static compression via sterile clean gauze or tea bag for 15 minutes.</li>
                        <li><strong>Unbearable Nerve Pain:</strong> Avoid hot or ice cold fluids completely. Keep head upright.</li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleCloseEmergencyModal}
                        className="bg-slate-900 hover:bg-slate-850 text-white font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Acknowledge Protocol
                      </button>
                    </div>

                  </div>
                ) : (
                  <form onSubmit={handleEmergencySubmit} className="space-y-4">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                        Emergency Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Thorne"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                        Active Call-Back Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98200 12345"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5" id="emergency-classification-section">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                        Intake Trauma Classification *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: "severe_pain", label: "Intense Pulp Pain", icon: Stethoscope },
                          { val: "bleeding", label: "Persistent Bleeding", icon: AlertTriangle },
                          { val: "knocked_out", label: "Tooth Knocked Out", icon: Sparkles },
                          { val: "fracture", label: "Mandibular Fracture", icon: Landmark }
                        ].map((choice) => {
                          const ChoiceIcon = choice.icon;
                          const isSelected = emergencyType === choice.val;
                          
                          return (
                            <button
                              key={choice.val}
                              type="button"
                              onClick={() => setEmergencyType(choice.val)}
                              className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex gap-2 items-center ${
                                isSelected 
                                  ? "bg-rose-50 border-rose-400 text-rose-800 font-bold" 
                                  : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/60"
                              }`}
                            >
                              <ChoiceIcon className={`w-4 h-4 ${isSelected ? "text-rose-600 animate-pulse" : "text-gray-400"}`} />
                              <span className="text-[10px] sm:text-xs">{choice.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                        Detailed Trauma Symptoms (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Gums bleeding continuously for 30m, accidentally chipped molar with sports equipment..."
                        value={emergencyNotes}
                        onChange={(e) => setEmergencyNotes(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-150 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl p-3.5 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCloseEmergencyModal}
                        className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md shadow-rose-100 flex items-center justify-center gap-1.5 cursor-pointer border border-rose-500"
                        id="submit-emergency-intake"
                      >
                        <span>Dispatch Surgeon Alert</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
