/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Star, ShieldCheck, MapPin, Award, ArrowUpRight, 
  ChevronRight, Compass, Check, Clock, Calendar, AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { SERVICES, DOCTORS, TESTIMONIALS } from "../data";

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedServiceId: (id: string | null) => void;
  setSelectedDoctorId: (id: string | null) => void;
  startNewBooking?: () => void;
  servicesProp?: any[];
  doctorsProp?: any[];
  testimonialsProp?: any[];
  heroCms?: any;
}

export default function HomeView({ 
  setActiveTab, 
  setSelectedServiceId, 
  setSelectedDoctorId,
  startNewBooking,
  servicesProp,
  doctorsProp,
  testimonialsProp,
  heroCms
}: HomeViewProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeCase, setActiveCase] = useState("whitening");
  const [statProfessionals, setStatProfessionals] = useState(0);
  const [statSatisfaction, setStatSatisfaction] = useState(0);
  const [statPatients, setStatPatients] = useState(0);

  const activeHero = heroCms || {
    welcomeLabel: "Accredited Academic Clinical Specialists",
    titleLine1: "Painless Treatment.",
    titleLine2: "Radiant Smiles.",
    description: "Kothari Dental integrates state-of-the-art diagnostic imaging, ultra-delicate pain management, and custom treatment planning with world-class clinician hospitality. Experience care designed around your comfort.",
    experienceCount: "15",
    patientCount: "4200",
    satisfactionRate: "99"
  };

  const servicesList = servicesProp || SERVICES;
  const doctorsList = doctorsProp || DOCTORS;
  const testimonialsList = testimonialsProp?.filter(t => t.approved !== false) || TESTIMONIALS;

  // Staggered counters for stats
  useEffect(() => {
    const targetProf = parseInt(activeHero.experienceCount) || 15;
    const targetSat = parseInt(activeHero.satisfactionRate) || 99;
    const targetPat = parseInt(activeHero.patientCount) || 4200;

    const pInterval = setInterval(() => {
      setStatProfessionals(prev => (prev < targetProf ? prev + 1 : targetProf));
    }, 80);
    const sInterval = setInterval(() => {
      setStatSatisfaction(prev => (prev < targetSat ? prev + 1 : targetSat));
    }, 20);
    const ptInterval = setInterval(() => {
      setStatPatients(prev => (prev < targetPat ? Math.min(targetPat, prev + 150) : targetPat));
    }, 25);

    return () => {
      clearInterval(pInterval);
      clearInterval(sInterval);
      clearInterval(ptInterval);
    };
  }, [activeHero]);

  const featuredServices = servicesList.filter(s => ["whitening", "implants", "braces"].includes(s.id) || servicesList.indexOf(s) < 3).slice(0, 3);

  const compareCases: Record<string, {
    title: string;
    description: string;
    beforeText: string;
    afterText: string;
    beforeClass: string;
    afterClass: string;
  }> = {
    whitening: {
      title: "Pro Laser Whitening Upgrade",
      description: "8 shades brighter in a single 60-minute therapeutic laser operation.",
      beforeText: "Shade A3: Extrinsic Stain Build-up",
      afterText: "Shade B1: Perfect Radiant Porcelain Glow",
      beforeClass: "contrast-75 saturate-50 hue-rotate-15 brightness-90",
      afterClass: "contrast-110 saturate-100 brightness-110 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
    },
    implants: {
      title: "Bespoke SMILE Reconstruction",
      description: "High-density restoration replacing structural tooth losses permanently.",
      beforeText: "Severe Ridge Defect & Gap Profile",
      afterText: "Flawless Fully Restored Occlusal Alignment",
      beforeClass: "grayscale brightness-75",
      afterClass: "saturate-105 brightness-105"
    },
    braces: {
      title: "Invisalign® Smartforce Therapy",
      description: "Discreet biocompatible aligners optimizing aesthetic alignment parameters.",
      beforeText: "Crowded Interior Mandibular Alignment",
      afterText: "Perfect Parabolic Dental Arch Curve",
      beforeClass: "blur-[0.5px] saturate-75 brightness-95",
      afterClass: "brightness-105"
    }
  };

  const handleBookingShortcut = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDoctorShortcut = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-brand-bg min-h-screen pb-16 font-sans">
      
      {/* 1. LUXURIOUS HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/75 via-transparent to-brand-bg pt-8 pb-16 sm:py-20 lg:py-28" id="hero-section">
        
        {/* Abstract vector backgrounds with blur */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-sky-200/30 to-teal-100/35 rounded-full filter blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero text panel */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100/95 shadow-xs" id="hero-badge">
                <Award className="w-4 h-4 text-sky-600 animate-bounce" />
                <span className="font-sans font-bold text-[10px] sm:text-xs text-sky-800 uppercase tracking-widest">
                  {activeHero.welcomeLabel}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-[1.12]" id="hero-heading">
                {activeHero.titleLine1} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-600">{activeHero.titleLine2}</span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {activeHero.description}
              </p>

              {/* Counters / Stats inside Hero */}
              <div className="grid grid-cols-3 gap-4 py-3 border-y border-gray-100 max-w-md mx-auto lg:mx-0" id="hero-stats">
                <div className="text-center lg:text-left">
                  <span className="block font-display font-black text-2xl sm:text-3xl text-sky-700 font-mono">
                    {statPatients}+
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-sans">Saved Smiles</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block font-display font-black text-2xl sm:text-3xl text-sky-700 font-mono">
                    {statSatisfaction}%
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-sans">Perfect Rate</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block font-display font-black text-2xl sm:text-3xl text-sky-700 font-mono">
                    {statProfessionals}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold font-sans">Board Surgeons</span>
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => {
                    if (startNewBooking) {
                      startNewBooking();
                    } else {
                      setActiveTab("booking");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-4 rounded-xl shadow-md shadow-sky-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  id="hero-primary-cta"
                >
                  Schedule Initial Consultation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab("services");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-4 rounded-xl shadow-xs transition-colors cursor-pointer"
                  id="hero-secondary-cta"
                >
                  <Compass className="w-4 h-4 text-gray-400" />
                  Explore Treatment Options
                </button>
              </div>

              {/* Quality Checklist */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-brand-text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-sky-600" />
                  <span>Digitally-Guided Anesthetics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-sky-600" />
                  <span>Central Clinical Heights Area</span>
                </div>
              </div>

            </div>

            {/* Hero image panel (Double overlay design) */}
            <div className="lg:col-span-5 relative" id="hero-images-wrapper">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                
                {/* Visual Accent ring */}
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-sky-400 to-teal-400 opacity-15 blur-lg" />
                
                {/* 1. Main Reception Image */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] relative z-10 bg-slate-100">
                  <img
                    src="/src/assets/images/lumina_dental_clinical_reception_1780579924923.png"
                    alt="Kothari Dental Wellness Lobby"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-white/40 flex items-center justify-between" id="reception-image-card">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-black font-sans">Exclusive Tech</span>
                      <span className="text-xs font-semibold text-gray-900 font-display">Kothari Digital CAD Suite</span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                </div>

                {/* 2. Overlaid Patient Smile Image */}
                <div className="absolute -bottom-8 -left-10 lg:-left-12 w-48 sm:w-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-square z-20 hidden sm:block animate-float bg-slate-100">
                  <img
                    src="/src/assets/images/radiant_smile_makeover_1780579943868.png"
                    alt="Radiant Smile Patient Portrait"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-sky-500 text-white rounded-full p-1 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CLINICAL BEFORE/AFTER SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="before-after-section">
        <div className="rounded-[40px] bg-white border border-gray-100 p-8 sm:p-12 shadow-xl shadow-gray-50/60 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full filter blur-[80px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Description Column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest">
                Interactive Patient Outcomes
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 leading-tight">
                Inspect Real Dental Transformations
              </h2>
              <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
                Choose a clinical case category below and drag the center dynamic divider to compare pre-procedure state directly against finalized premium therapy restorations.
              </p>

              {/* Category selector pills */}
              <div className="flex flex-col gap-2 pt-2" id="compare-case-selectors">
                {Object.entries(compareCases).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCase(key);
                      setSliderPos(50);
                    }}
                    className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl font-semibold text-xs text-left cursor-pointer transition-all border duration-300 ${
                      activeCase === key
                        ? "bg-sky-50 border-sky-200/90 text-sky-800 shadow-xs"
                        : "bg-gray-50/80 border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-100/50"
                    }`}
                  >
                    <div>
                      <span className="block font-display text-gray-900">{item.title}</span>
                      <span className="text-[10px] text-gray-400 font-normal line-clamp-1">{item.description}</span>
                    </div>
                    {activeCase === key && <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 text-xs text-gray-400 italic flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-sky-500 shrink-0" />
                <span>All case images demonstrate accurate therapy restorations performed in-house.</span>
              </div>
            </div>

            {/* Slider Column */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              <div 
                className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-sky-50/70 select-none bg-slate-100"
                id="interactive-slider-canvas"
              >
                
                {/* BEFORE Image wrapper (Always full width background with custom distortion filter) */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/src/assets/images/radiant_smile_makeover_1780579943868.png"
                    alt="Before Treatment Smile"
                    className={`w-full h-full object-cover ${compareCases[activeCase].beforeClass}`}
                  />
                  <div className="absolute left-4 top-4 bg-gray-900/80 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10 z-10">
                    <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-slate-300">Before Treatment</span>
                  </div>
                </div>

                {/* AFTER Image wrapper (Stacked on top, dynamically sized by width polygon clip-path) */}
                <div 
                  className="absolute inset-0 z-10 transition-all duration-75 pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <img
                    src="/src/assets/images/radiant_smile_makeover_1780579943868.png"
                    alt="After Treatment Perfect Restored Smile"
                    className={`w-full h-full object-cover ${compareCases[activeCase].afterClass}`}
                  />
                  <div className="absolute right-4 top-4 bg-sky-600/90 backdrop-blur-md rounded-xl px-3 py-1.5 border border-sky-400/20 z-10">
                    <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-white">After Kothari Therapy</span>
                  </div>
                </div>

                {/* Drag Slider Line handles */}
                <div 
                  className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize hover:scale-x-125 transition-transform"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-sky-500 text-sky-600">
                    <span className="text-sm font-semibold tracking-tighter">↔</span>
                  </div>
                </div>

                {/* Hidden range input overlay covering the entire container */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                  id="before-after-slider-input"
                  aria-label="Before and after split slider controller"
                />

              </div>

              {/* Slider instruction labels */}
              <div className="text-center mt-4 space-y-1">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Drag the slider handle sideways to compare
                </p>
                <div className="flex items-center justify-center gap-6 text-[11px] text-gray-400">
                  <span>← Swipe Left for BEFORE</span>
                  <span>Swipe Right for AFTER →</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTED SPECIALIZATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="specializations-preview-section">
        <div className="space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest">
              Kothari Dental Specializations
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 leading-snug">
              Bespoke Procedures Guided by Diagnostic Excellence
            </h2>
            <p className="text-sm sm:text-base text-brand-text-muted">
              We specialize in providing high-precision solutions that solve underlying biological tooth issues painlessly while perfecting aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="featured-services-cards-grid">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-100 rounded-3xl p-6.5 flex flex-col justify-between hover:shadow-xl hover:shadow-sky-50/50 hover:border-sky-100 transition-all duration-300 group"
                id={`featured-card-${service.id}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center transition-colors group-hover:bg-sky-600 group-hover:text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-gray-900 group-hover:text-sky-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-semibold font-sans">Primary Payoff</span>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/60 inline-block mt-0.5">
                      {service.benefit}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookingShortcut(service.id)}
                    className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 cursor-pointer shadow-xs"
                    aria-label={`Book schedule for ${service.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setActiveTab("services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-all hover:gap-2.5 cursor-pointer"
              id="view-all-services-link"
            >
              Analyze Complete Therapy Catalog
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. PREVIEW CLINICAL SPECIALISTS */}
      <section className="bg-white border-y border-gray-100 py-16 sm:py-24" id="clinicians-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest">
                  Academic Clinical Clinicians
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 leading-tight">
                  Expert Physicians Educated by Global Institutions
                </h2>
                <p className="text-sm sm:text-base text-brand-text-muted">
                  Our doctors maintain active academic research links with global Ivy faculties to deliver proven micro-practice innovations.
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setActiveTab("doctors");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-1.5 bg-sky-50 border border-sky-100 hover:border-sky-200 text-sky-700 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-sky-100/70 cursor-pointer"
                  id="view-all-doctors-link"
                >
                  Analyze Doctor Schedules
                </button>
              </div>
            </div>

            {/* List top 3 Doctors with Grayscale/Color switch hover and clinical schedule */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="featured-doctors-grid">
              {DOCTORS.slice(0, 3).map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-brand-bg rounded-3xl overflow-hidden border border-gray-100/90 hover:border-sky-100/75 group hover:shadow-xl hover:shadow-sky-50/40 transition-all duration-300"
                  id={`featured-doctor-${doctor.id}`}
                >
                  
                  {/* Photo area with Grayscale default, Hover full high contrast color */}
                  <div className="aspect-[1.1] relative overflow-hidden bg-slate-200">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Schedule Floating Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-black">Surgery Hours</span>
                        <span className="text-xs font-semibold text-gray-800 font-mono">{doctor.schedule}</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-sky-600 shadow-sm" />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="p-5.5 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                          {doctor.name}
                        </h3>
                        <span className="text-[10px] font-sans font-bold text-sky-800 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-md">
                          {doctor.degrees}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-brand-text-muted font-medium">
                        {doctor.title}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-gray-100">
                      {doctor.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-sans font-semibold bg-gray-50 text-gray-500 px-2.5 py-1 rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 font-sans flex items-center gap-1 bg-teal-50 px-2 rounded">
                        <span>●</span> {doctor.satisfaction}
                      </span>
                      <button
                        onClick={() => handleDoctorShortcut(doctor.id)}
                        className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 group-hover:gap-1.5 transition-all cursor-pointer"
                      >
                        Book Patient Slot
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-brand-bg" id="testimonials-section">
        <div className="space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest">
              Verified Healthcare Reviews
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900">
              Therapeutic Comfort Confirmed by Patients
            </h2>
            <p className="text-sm sm:text-base text-brand-text-muted">
              We focus on cultivating relaxed environments. Read direct clinical outcomes from individuals who completed complex operations painless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" id="patient-reviews-grid">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-gray-100/80 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-gray-50/50 hover:border-gray-200 transition-all"
                id={`testimonial-card-${t.id}`}
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-gray-100 shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="block font-display font-semibold text-xs text-gray-900">{t.name}</span>
                    <span className="text-[10px] text-teal-600 font-semibold">{t.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
