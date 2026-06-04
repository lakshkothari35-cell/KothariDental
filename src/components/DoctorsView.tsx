/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Search, Users, GraduationCap, Clock, Award, Star, 
  Heart, Check, Calendar, ArrowRight, ShieldCheck, HelpCircle
} from "lucide-react";
import { DOCTORS } from "../data";

interface DoctorsViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedDoctorId: (id: string | null) => void;
  doctorsProp?: any[];
}

export default function DoctorsView({ setActiveTab, setSelectedDoctorId, doctorsProp }: DoctorsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const doctorsList = doctorsProp || DOCTORS;

  const specialties = [
    { id: "all", label: "All Specialists" },
    { id: "cosmetic", label: "Cosmetic & Veneers" },
    { id: "ortho", label: "Orthodontics & Aligners" },
    { id: "surgery", label: "Surgery & Implants" }
  ];

  const matchSpecialty = (doctorSpecialties: string[], filterId: string): boolean => {
    if (filterId === "all") return true;
    if (filterId === "cosmetic") {
      return doctorSpecialties.some(s => ["Cosmetic Dentistry", "Veneers", "Smile Reconstruction"].includes(s));
    }
    if (filterId === "ortho") {
      return doctorSpecialties.some(s => ["Orthodontics", "Invisalign", "Aligners & Braces", "Pediatric Ortho"].includes(s));
    }
    if (filterId === "surgery") {
      return doctorSpecialties.some(s => ["Implantology", "Oral Surgery", "Implants"].includes(s));
    }
    return false;
  };

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doctor) => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.degrees.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = matchSpecialty(doctor.specialties, selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    });
  }, [doctorsList, searchQuery, selectedSpecialty]);

  const handleBookDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-brand-bg min-h-screen py-8 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Title & Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Kothari Clinical Board
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
            Academic Dentists & Dental Surgeons
          </h1>
          <p className="text-sm sm:text-base text-brand-text-muted">
            Search our board-certified clinical dental surgeons. All physicians maintain active research associations with major global dental universities to apply advanced pain management methodologies.
          </p>
        </div>

        {/* Search, Filter Block */}
        <div className="bg-white border border-gray-100 p-5 rounded-[28px] shadow-lg shadow-gray-50/50 space-y-4" id="doctors-search-and-filters">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search physicians, credentials, universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-100 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm placeholder-gray-400 font-medium focus:outline-none transition-all"
                id="doctor-search-input"
              />
            </div>

            {/* Specialty tag toggles */}
            <div className="md:col-span-7 flex flex-wrap gap-1.5 justify-start md:justify-end" id="doctors-specialty-filters">
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedSpecialty === spec.id
                      ? "bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-50"
                      : "bg-gray-50/80 border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>

          </div>

          {/* Results summary bar */}
          <div className="text-xs text-brand-text-muted flex items-center justify-between px-2 pt-1 border-t border-gray-50">
            <span>Discovered <strong className="text-gray-900">{filteredDoctors.length}</strong> elite board practitioners</span>
            {(searchQuery || selectedSpecialty !== "all") && (
              <button 
                onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); }}
                className="text-sky-600 hover:text-sky-700 font-semibold uppercase tracking-widest text-[10px]"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        </div>

        {/* Doctors Profiles Grid with Hover Gray-to-Color, Schedule info */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="doctors-gallery-grid">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 group hover:shadow-2xl hover:shadow-sky-50/60 hover:border-sky-200/60 transition-all duration-300 flex flex-col justify-between"
                id={`doctor-card-${doctor.id}`}
              >
                <div>
                  
                  {/* Photo with Overlay & Schedule details */}
                  <div className="aspect-[1.1] relative overflow-hidden bg-slate-100 border-b border-gray-50">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Schedule Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/45 flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-extrabold font-sans">Practice Schedule</span>
                        <span className="text-xs font-bold text-gray-800 font-mono">{doctor.schedule}</span>
                      </div>
                      <Clock className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>

                    {/* Academic badge on top header */}
                    <div className="absolute top-4 left-4 bg-sky-900/80 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10 z-10 flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-wider text-sky-100">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{doctor.degrees.split("—")[1]?.trim() || "Ivy League"}</span>
                    </div>

                  </div>

                  {/* Profile Descriptions */}
                  <div className="p-6 space-y-4">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-sky-600 transition-colors">
                          {doctor.name}
                        </h3>
                        <span className="text-[10px] font-bold font-mono text-gray-400">
                          {doctor.degrees.split("—")[0]?.trim()}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-sky-700 uppercase tracking-wider">
                        {doctor.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doctor.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-sans font-bold bg-slate-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2 text-[11px] sm:text-xs text-brand-text-muted pt-2 border-t border-gray-50">
                      <li className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{doctor.experience}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Accredited Clinical Associate</span>
                      </li>
                    </ul>

                  </div>

                </div>

                {/* Booking Trigger Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-gray-50 bg-slate-50/20 flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-extrabold font-sans">Patients' Audit</span>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 rounded font-sans uppercase">
                      {doctor.satisfaction}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookDoctor(doctor.id)}
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Schedule Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-[32px] max-w-lg mx-auto space-y-4" id="no-doctors-found">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
            <h3 className="font-display font-bold text-lg text-gray-900">No board specialists discovered</h3>
            <p className="text-xs sm:text-sm text-brand-text-muted max-w-sm mx-auto">
              We couldn't locate any academic dentists aligning with "{searchQuery}". Please refine your query parameters or try another group category.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); }}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

        {/* Global Affiliations Banner */}
        <section className="bg-white border border-gray-100 rounded-[40px] p-8 text-center space-y-6" id="doctors-affiliations-banner">
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gray-400">
            Global Academic Research Partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-slate-900">STANFORD MEDICINE</span>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-slate-900">HARVARD HEALTH</span>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-slate-900">JOHNS HOPKINS</span>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-slate-900">CAMBRIDGE ORAL</span>
          </div>
        </section>

      </div>
    </div>
  );
}
