/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Search, Sparkles, Clock, Shield, Anchor, Smile, 
  Baby, Activity, Droplets, Layers, ChevronDown, Check,
  BookOpen, Calendar, HelpCircle, ArrowRight, ShieldCheck, ThumbsUp,
  DollarSign
} from "lucide-react";
import { SERVICES } from "../data";

interface ServicesViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedServiceId: (id: string | null) => void;
  servicesProp?: any[];
}

export default function ServicesView({ setActiveTab, setSelectedServiceId, servicesProp }: ServicesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const servicesList = servicesProp || SERVICES;

  // Tags filter definitions
  const categories = [
    { id: "all", label: "All Procedures" },
    { id: "cosmetic", label: "Aesthetics & Cosmetic" },
    { id: "restorative", label: "Restorative & Surgical" },
    { id: "preventive", label: "Preventive & Hygiene" }
  ];

  // Helper matching tag to service definition
  const matchCategory = (serviceId: string, category: string): boolean => {
    if (category === "all") return true;
    if (category === "cosmetic") {
      return ["whitening", "makeover", "braces"].includes(serviceId);
    }
    if (category === "restorative") {
      return ["implants", "root-canal", "surgery"].includes(serviceId);
    }
    if (category === "preventive") {
      return ["clean", "pediatric"].includes(serviceId);
    }
    return false;
  };

  const filteredServices = useMemo(() => {
    return servicesList.filter((service) => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.benefit && service.benefit.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = matchCategory(service.id, selectedTag);
      return matchesSearch && matchesCategory;
    });
  }, [servicesList, searchQuery, selectedTag]);

  // Lookup map icon to dynamic Lucide Icon element
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplets": return Droplets;
      case "Shield": return Shield;
      case "Layers": return Layers;
      case "Anchor": return Anchor;
      case "Sparkles": return Sparkles;
      case "Smile": return Smile;
      case "Baby": return Baby;
      case "Activity": return Activity;
      default: return Sparkles;
    }
  };

  const handleBookNow = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FAQs = [
    {
      question: "Are your advanced surgical procedures completely painless?",
      answer: "Yes. Kothari Clinic operates computer-controlled, digitally-guided local anesthetic dispensers which deliver slow, precise tissue numbing. Patients experience virtually zero pinch during administration. For complex surgical Extractions or Dental Implants, we offer customized gentle options to keep you relaxed."
    },
    {
      question: "How long does laser-accelerated Teeth Whitening last?",
      answer: "Typically between 12 to 24 months, depending heavily on daily diet habits (such as coffee, tea, or smoking). Our Pro Laser Whitening session includes a post-treatment mineral sealer that blocks new stains from adhering. We also supply a complimentary take-home touchup dental splint."
    },
    {
      question: "Do you accept common corporate insurance plans?",
      answer: "We partner with major premium healthcare networks. Our administration desk provides full electronic fast-track claims submission on your behalf, so you only pay the direct co-payment amount. For major restorative solutions, we offer flexible 0% interest payment plans."
    },
    {
      question: "Can kids undergo orthodontic clear aligners?",
      answer: "Yes! Pediatric orthodontics are highly effective. We specialize in early adolescent Invisalign® Teen aligners which are formulated with clinical indicator spots to monitor correct compliance wear. Our gentle clinical approach is entirely worry and fear-free for youngsters."
    }
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 sm:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Title Headings */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-sky-600 font-sans font-bold text-xs uppercase tracking-widest bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Kothari Clinical Portfolio
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight leading-tight">
            Specializations & Restorative Procedures
          </h1>
          <p className="text-sm sm:text-base text-brand-text-muted">
            Search our comprehensive, high-technology dental procedural array. Choose individual procedures below to read specific benefit parameters or initiate direct scheduling setup.
          </p>
        </div>

        {/* Search, Filter, and Controls Block */}
        <div className="bg-white border border-gray-100 p-5 rounded-[28px] shadow-lg shadow-gray-50/50 space-y-4" id="services-search-and-filters">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search inputs */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search procedures, benefits, durations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-100 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm placeholder-gray-400 font-medium focus:outline-none transition-all"
                id="treatment-search-input"
              />
            </div>

            {/* Category selection tabs */}
            <div className="md:col-span-7 flex flex-wrap gap-1.5 justify-start md:justify-end" id="services-tag-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTag(cat.id)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedTag === cat.id
                      ? "bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-50"
                      : "bg-gray-50/80 border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* Results summary indicators */}
          <div className="text-xs text-brand-text-muted flex items-center justify-between px-2 pt-1 border-t border-gray-50">
            <span>Displaying <strong className="text-gray-900">{filteredServices.length}</strong> elite procedures</span>
            {(searchQuery || selectedTag !== "all") && (
              <button 
                onClick={() => { setSearchQuery(""); setSelectedTag("all"); }}
                className="text-sky-600 hover:text-sky-700 font-semibold uppercase tracking-widest text-[10px]"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        </div>

        {/* Procedures Dynamic grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="treatments-grid">
            {filteredServices.map((service, index) => {
              const ServiceIcon = getIcon(service.iconName);
              
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-100 rounded-3xl p-6.5 flex flex-col justify-between hover:shadow-xl hover:shadow-sky-50/60 hover:border-sky-100 duration-300 transition-all group"
                  id={`service-card-${service.id}`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center transition-colors group-hover:bg-sky-600 group-hover:text-white">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                        CAT-{(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Meta info & descriptions */}
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900 group-hover:text-sky-700 transition-colors">
                        {service.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sky-500" />
                          {service.duration || "Custom duration"}
                        </span>
                        {service.approxPrice && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-md">
                            <DollarSign className="w-3.5 h-3.5" />
                            {service.approxPrice}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-teal-600">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                          Clinical Excellence
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions & dynamic bottom info banner */}
                  <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-extrabold font-sans">Therapy Target</span>
                      <span className="text-xs font-bold text-teal-800 bg-teal-50/70 border border-teal-100 px-2.5 py-0.5 rounded-full inline-block">
                        {service.benefit}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookNow(service.id)}
                      className="flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-sans text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <span>Reserve Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-[32px] max-w-lg mx-auto space-y-4" id="no-services-found">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
            <h3 className="font-display font-bold text-lg text-gray-900">No matching treatments discovered</h3>
            <p className="text-xs sm:text-sm text-brand-text-muted max-w-sm mx-auto">
              We couldn't locate any dental specializations aligning with "{searchQuery}". Please refine your query parameters or try one of the tags.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedTag("all"); }}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

        {/* Clinical Patient FAQs container */}
        <section className="bg-white border border-gray-100 rounded-[40px] p-8 sm:p-12 shadow-xl shadow-gray-50/60" id="services-faq-panel">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Header intro */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 leading-tight">
                Addressing Patient Concerns & Comfort Goals
              </h2>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                We believe that clear diagnostic information eliminates anxiety. Review answers to common questions compiled directly by our clinical board team.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-sky-700">
                <ThumbsUp className="w-4 h-4" />
                <span>Patient-focused care without compromises</span>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="lg:col-span-7 space-y-3" id="faq-accordions">
              {FAQs.map((faq, index) => {
                const isOpen = expandedFAQ === index;
                
                return (
                  <div
                    key={index}
                    className="border border-gray-100/80 rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50/30"
                  >
                    <button
                      onClick={() => setExpandedFAQ(isOpen ? null : index)}
                      className="w-full px-5.5 py-4.5 flex items-center justify-between text-left font-display font-bold text-sm sm:text-base text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-sky-600" : ""}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="px-5.5 pb-5 text-xs sm:text-sm text-brand-text-muted leading-relaxed bg-white border-t border-gray-50/60 animate-fade-in">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
