/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, Clock, Users, Sparkles, ShieldCheck, 
  Check, Phone, Mail, User, AlertTriangle, ArrowRight, ArrowLeft, 
  Trash2, Plus, Info, RefreshCw, FileText
} from "lucide-react";
import { SERVICES, DOCTORS } from "../data";
import { Booking } from "../types";

interface BookingViewProps {
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedDoctorId: string | null;
  setSelectedDoctorId: (id: string | null) => void;
  servicesProp?: any[];
  doctorsProp?: any[];
}

export default function BookingView({ 
  selectedServiceId, 
  setSelectedServiceId, 
  selectedDoctorId, 
  setSelectedDoctorId,
  servicesProp,
  doctorsProp
}: BookingViewProps) {
  const servicesList = servicesProp || SERVICES;
  const doctorsList = doctorsProp || DOCTORS;

  // Multistep tracking
  const getInitialStep = () => {
    if (selectedServiceId) {
      return selectedDoctorId ? 3 : 2;
    }
    return 1;
  };
  const [step, setStep] = useState(getInitialStep());

  // Form states
  const [serviceId, setServiceId] = useState(selectedServiceId || "");
  const [doctorId, setDoctorId] = useState(selectedDoctorId || "");
  
  // Custom Date selection (Default to tomorrow as a safe choice)
  const getTomorrowDateString = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };
  const [selectedDate, setSelectedDate] = useState(getTomorrowDateString());
  const [selectedTime, setSelectedTime] = useState("");
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [recentlyBookedId, setRecentlyBookedId] = useState<string | null>(null);

  // Sync state if navigation pre-filled parameters of service or doctor
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      setStep(prev => prev < 2 ? 2 : prev);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
      if (serviceId || selectedServiceId) {
        setStep(prev => prev < 3 ? 3 : prev);
      }
    }
  }, [selectedDoctorId, selectedServiceId, serviceId]);

  // Load existing bookings from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("lumina_bookings");
    if (stored) {
      try {
        setBookingList(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    }
  }, []);

  const timeSlots = ["09:00 AM", "10:30 AM", "11:45 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  // Treatment advice text helper: Proportional to selected treatment
  const getPreparationGuideline = (srvId: string): string => {
    switch (srvId) {
      case "whitening":
        return "Optimum results: please avoid consuming highly acidic drinks, coffee, or staining sauces 12 hours prior. Brush and floss thoroughly.";
      case "implants":
        return "Clinical recommendation: avoid taking aspirin/ibuprofen or other blood thinners for 48 hours. Ensure you have arranged secondary transit home if sedation is preferred.";
      case "root-canal":
        return "Before endodontic micro-procedures: taking a light breakfast is permitted. Advise the dentist of any localized swelling before procedures.";
      case "clean":
        return "Hygiene optimization: standard hydration is recommended. Bring your list of active current home dental products.";
      case "braces":
        return "Initial orthodontic fitting: consume standard textured diets before arrival. Process will feature detailed scan modeling.";
      case "surgery":
        return "Surgical instruction: do not consume food or fluids for 6 hours prior to sedation surgery. A responsible caregiver must accompany your exit.";
      default:
        return "General care: please arrive 10 minutes prior to reservation to finalize medical history files. Keep fully hydrated.";
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceId || !doctorId || !selectedDate || !selectedTime || !fullName || !phone || !email) {
      alert("Please ensure all parameters are configured.");
      return;
    }

    const newBooking: Booking = {
      id: "LUM-" + Math.floor(100000 + Math.random() * 900000),
      fullName,
      phone,
      email,
      serviceId,
      doctorId,
      date: selectedDate,
      timeSlot: selectedTime,
      isEmergency,
      createdAt: new Date().toLocaleString()
    };

    const updated = [newBooking, ...bookingList];
    setBookingList(updated);
    localStorage.setItem("lumina_bookings", JSON.stringify(updated));
    setRecentlyBookedId(newBooking.id);
    
    // Reset inputs
    setStep(5); // Success step
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookingList.filter(b => b.id !== id);
    setBookingList(updated);
    localStorage.setItem("lumina_bookings", JSON.stringify(updated));
  };

  const handleResetForm = () => {
    setServiceId("");
    setDoctorId("");
    setSelectedDate(getTomorrowDateString());
    setSelectedTime("");
    setFullName("");
    setPhone("");
    setEmail("");
    setIsEmergency(false);
    setSymptoms("");
    setRecentlyBookedId(null);
    setSelectedServiceId(null);
    setSelectedDoctorId(null);
    setStep(1);
  };

  // Find object matches
  const activeServiceObj = servicesList.find(s => s.id === serviceId);
  const activeDoctorObj = doctorsList.find(d => d.id === doctorId);
  const recentlyBookedObj = bookingList.find(b => b.id === recentlyBookedId);

  return (
    <div className="bg-brand-bg min-h-screen py-8 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Main Booking Controls Module (Left Columns) */}
          <div className="lg:col-span-8 bg-white border border-gray-150 rounded-[36px] shadow-xl p-6 sm:p-10 space-y-8" id="scheduler-card">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-gray-50 pb-5">
              <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest block">
                Guided Clinical Scheduling
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900">
                Kothari Precision Appointment Setup
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-muted">
                Finalize your clinic routing step-by-step. All data is written securely to client-side localStorage.
              </p>
            </div>

            {/* Stepper Progress bar indicators */}
            {step < 5 && (
              <div className="flex items-center justify-between" id="scheduler-progress-bar">
                {[
                  { s: 1, name: "Specialization" },
                  { s: 2, name: "Clinician" },
                  { s: 3, name: "Consultation Slot" },
                  { s: 4, name: "Verification" }
                ].map((item) => (
                  <button
                    key={item.s}
                    disabled={step < item.s && !serviceId}
                    onClick={() => setStep(item.s)}
                    className="flex flex-col items-center gap-1.5 focus:outline-none flex-1 relative cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                      step >= item.s 
                        ? "bg-sky-600 text-white shadow-md shadow-sky-100" 
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {step > item.s ? <Check className="w-4 h-4" /> : item.s}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase hidden sm:inline ${
                      step === item.s ? "text-sky-700" : "text-gray-400 group-hover:text-gray-600"
                    }`}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step Content blocks */}
            <div id="step-content-display">
              
              {/* STEP 1: SELECT SPECIALIZED SERVICE */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in" id="scheduler-step1">
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-widest text-sky-800 border-l-3 border-sky-600 pl-2.5">
                    Step 1: Choose Your Requested Treatment Specialization
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin">
                    {servicesList.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setServiceId(s.id);
                          if (doctorId) {
                            setStep(3);
                          } else {
                            setStep(2);
                          }
                        }}
                        className={`text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-34 group ${
                          serviceId === s.id
                            ? "bg-sky-50/75 border-sky-400 ring-1 ring-sky-300 shadow-sm"
                            : "bg-white border-gray-100/90 hover:border-gray-200 hover:bg-gray-50/50"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`font-display font-bold text-sm sm:text-base block ${
                            serviceId === s.id ? "text-sky-800" : "text-gray-900 group-hover:text-sky-600"
                          }`}>
                            {s.name}
                          </span>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between text-[10px] pt-1.5 border-t border-slate-50 mt-1 gap-1 max-w-full">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-500" />
                            {s.duration}
                          </span>
                          {s.approxPrice && (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                              {s.approxPrice}
                            </span>
                          )}
                          <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md truncate max-w-[45%]">
                            {s.benefit}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE BOARD SPECIALIST */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in" id="scheduler-step2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-extrabold text-sm uppercase tracking-widest text-sky-800 border-l-3 border-sky-600 pl-2.5">
                      Step 2: Assign a Clinical Specialist Physician
                    </h3>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1.5">
                    {doctorsList.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setDoctorId(d.id);
                          setStep(3);
                        }}
                        className={`text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center group ${
                          doctorId === d.id
                            ? "bg-sky-50/75 border-sky-400 ring-1 ring-sky-300 shadow-sm"
                            : "bg-white border-gray-100/90 hover:border-gray-200 hover:bg-gray-50/50"
                        }`}
                      >
                        {/* Circle doctor avatar */}
                        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-200">
                          <img
                            src={d.image}
                            alt={d.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-1 overflow-hidden">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-sky-700 bg-sky-50 border border-sky-100 px-1.5 py-0.5 rounded-md inline-block">
                            {d.degrees.split("—")[1]?.trim() || "Doctor"}
                          </span>
                          <span className="font-display font-bold text-sm text-gray-900 block truncate group-hover:text-sky-600">
                            {d.name}
                          </span>
                          <p className="text-xs text-slate-400 block truncate font-sans">
                            {d.title}
                          </p>
                          <p className="text-[10px] font-mono font-medium text-teal-600 uppercase">
                            {d.satisfaction}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: PICK DATE AND TIME */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in" id="scheduler-step3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-extrabold text-sm uppercase tracking-widest text-sky-800 border-l-3 border-sky-600 pl-2.5">
                      Step 3: Pick Date & Daily Consultation Slot
                    </h3>
                    <button 
                      onClick={() => setStep(2)}
                      className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    
                    {/* Date Input Calendar Card */}
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                      <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-sky-600" />
                        Select Preferred Practice Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setSelectedTime(""); // Clear slot to force re-selection
                        }}
                        min={getTomorrowDateString()}
                        className="w-full bg-white border border-gray-200/90 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                      />
                      <p className="text-[10px] text-gray-400 italic">
                        Please note: Kothari clinicians do not hold standard non-emergency counseling on Sunday.
                      </p>
                    </div>

                    {/* Time Slots grid */}
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-600" />
                        Recommended Clinician Slots
                      </label>
                      
                      <div className="grid grid-cols-2 gap-2" id="time-grid-slots">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTime(slot);
                              setStep(4);
                            }}
                            className={`px-4.5 py-3 rounded-xl text-xs font-bold font-mono transition-all border text-center cursor-pointer ${
                              selectedTime === slot
                                ? "bg-sky-600 border-sky-600 text-white shadow-md"
                                : "bg-white border-gray-150 text-gray-700 hover:border-sky-500 hover:text-sky-600"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* STEP 4: PATIENT METADATA FORM & REVIEWS */}
              {step === 4 && (
                <form onSubmit={handleBookingSubmit} className="space-y-5 animate-fade-in" id="scheduler-step4">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <h3 className="font-display font-extrabold text-sm uppercase tracking-widest text-sky-800 border-l-3 border-sky-600 pl-2.5">
                      Step 4: Patient Credentials & Trauma Level Check
                    </h3>
                    <button 
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-sky-600" />
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-150 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sky-600" />
                        Patient Direct Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 019-2834"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-150 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-600" />
                        Patient Active Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@patientportal.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-150 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all"
                      />
                    </div>

                    {/* Notes/Symptoms/Conditions area */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-sky-600" />
                        Additional Details, Allergies, or Dental Symptoms (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Explain any localized pain, cold/sugar sensitivity, or desired alignment cosmetics..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-150 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl p-4 text-xs placeholder-gray-400 font-semibold focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Interactive Emergency check (Aesthetic color/glow response) */}
                    <div 
                      className={`sm:col-span-2 p-4 rounded-xl border transition-all ${
                        isEmergency 
                          ? "bg-rose-50 border-rose-200 shadow-sm ring-1 ring-rose-200" 
                          : "bg-gray-50/30 border-gray-100 hover:bg-gray-50/70"
                      }`}
                      id="emergency-checkbox-container"
                    >
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isEmergency}
                          onChange={(e) => setIsEmergency(e.target.checked)}
                          className="mt-1 accent-rose-600 h-4 w-4 cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <span className={`text-xs font-bold block ${isEmergency ? "text-rose-800" : "text-gray-900"}`}>
                            This appointment is for immediate, painful emergency trauma care.
                          </span>
                          <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                            If checked, the clinical receptionist team will expedite your routing and phone you within 20 minutes for direct intake sorting.
                          </p>
                        </div>
                      </label>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md shadow-sky-100 cursor-pointer"
                    >
                      <span>Finalize Clinical Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 5: BOOKING SUCCESS AND PREPARATION INSTRUCTIONS */}
              {step === 5 && (
                <div className="space-y-6 text-center py-6 animate-fade-in" id="scheduler-success-screen">
                  
                  {/* Big radiant checked icon */}
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-100">
                    <Check className="w-8 h-8 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-150 uppercase tracking-widest">
                      Reservation Officially Confirmed
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-gray-900">
                      Your Kothari Consultation is final!
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-text-muted max-w-lg mx-auto leading-relaxed">
                      Kothari Dental Clinic has generated registration ID <strong className="text-sky-750 font-mono text-sm">{recentlyBookedObj?.id}</strong>. A verification ticket with medical instructions has been directed to <strong className="text-gray-850 font-semibold">{recentlyBookedObj?.email}</strong>.
                    </p>
                  </div>

                  {/* Summary card details */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl max-w-md mx-auto p-5 text-left grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs font-sans">
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-widest font-extrabold">Assigned Specialist</span>
                      <span className="font-bold text-gray-850 truncate block">{activeDoctorObj?.name || "Kothari Dentist"}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-widest font-extrabold">Registered Procedure</span>
                      <span className="font-bold text-gray-850 truncate block">{activeServiceObj?.name || "General Checkup"}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-widest font-extrabold">Appt Date</span>
                      <span className="font-bold text-gray-850 block">{selectedDate}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-widest font-extrabold">Appt Time Slot</span>
                      <span className="font-bold text-gray-850 font-mono block">{selectedTime}</span>
                    </div>
                  </div>

                  {/* Dynamic clinician instruction banner */}
                  <div className="bg-sky-50/70 border border-sky-100/90 rounded-2xl max-w-lg mx-auto p-4.5 text-left flex gap-3.5 items-start">
                    <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase tracking-widest text-sky-800 font-extrabold">
                        Therapy Specific Preparation Instructions:
                      </span>
                      <p className="text-xs text-sky-950 font-medium leading-relaxed">
                        {getPreparationGuideline(serviceId)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-gray-700 font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Create Another Registration
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Patient Portal / Active Bookings Right Sidebar (Right Column) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-[36px] p-6 sm:p-7 space-y-6" id="patient-portal-sidebar">
            
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-extrabold text-teal-600 uppercase tracking-widest block">
                Security-Isolated Client Portal
              </span>
              <h3 className="font-display font-black text-lg text-slate-900 flex items-center gap-1.5">
                <Users className="w-5 h-5 text-sky-600" />
                Active Direct Registrations
              </h3>
              <p className="text-[11px] text-slate-500">
                Manage upcoming clinic slots stored on this client profile.
              </p>
            </div>

            {/* List current appointments or empty placeholder */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1" id="appointment-list-wrapper">
              {bookingList.length > 0 ? (
                bookingList.map((booking) => {
                  const srv = servicesList.find((s) => s.id === booking.serviceId);
                  const doc = doctorsList.find((d) => d.id === booking.doctorId);
                  
                  return (
                    <div
                      key={booking.id}
                      className={`p-4 rounded-2xl border transition-all relative ${
                        booking.isEmergency
                          ? "bg-rose-50/50 border-rose-150 hover:bg-rose-50"
                          : "bg-white border-slate-150 hover:bg-slate-50/50"
                      }`}
                      id={`booking-card-${booking.id}`}
                    >
                      <div className="pr-6 space-y-2">
                        
                        {/* Title, Category */}
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-gray-500 font-semibold select-all block">
                            TICKET: {booking.id}
                          </span>
                          <span className="font-display font-extrabold text-xs text-slate-900 block truncate">
                            {srv?.name || "General Consultation"}
                          </span>
                        </div>

                        {/* Doctor info */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          <span className="font-medium truncate">{doc?.name || "Kothari Clinician"}</span>
                        </div>

                        {/* Date-time details */}
                        <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400 bg-slate-100/70 p-1.5 rounded-lg max-w-max">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-sky-600" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                            {booking.timeSlot}
                          </span>
                        </div>

                        {/* Emergency indicator */}
                        {booking.isEmergency && (
                          <div className="flex items-center gap-1 text-[9px] font-bold text-rose-700 bg-rose-50 uppercase tracking-widest px-2 py-0.5 rounded border border-rose-100 mt-1 max-w-max">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                            Emergency Intake Priority
                          </div>
                        )}

                        <span className="block text-[8px] text-slate-400 italic pt-1.5 border-t border-slate-50 mt-1">
                          Created on {booking.createdAt}
                        </span>

                      </div>

                      {/* Cancel button */}
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="absolute top-3.5 right-3.5 text-slate-450 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50/50 transition-colors cursor-pointer"
                        title="Cancel appointment"
                        aria-label={`Cancel appointment ticket ${booking.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-white border border-slate-150/70 rounded-2xl p-4.5 space-y-3" id="patient-portal-empty">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="space-y-1">
                    <span className="font-display font-bold text-xs text-slate-800 block">No active appointments scheduled</span>
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                      Use the scheduler panel on the left to confirm your clinical routing today.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Insurance details banner in portal */}
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex gap-3 items-start text-[11px] text-indigo-950 font-sans leading-relaxed">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-indigo-900 block truncate">Healthcare Fast-Track Verified</strong>
                Direct e-file insurance setup active. Present medical profile code cards upon reception check-in.
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
