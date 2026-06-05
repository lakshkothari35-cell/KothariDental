/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Mail, Navigation, Phone, Calendar, ArrowRight, HeartPulse, Check } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openEmergencyModal: () => void;
  startNewBooking?: () => void;
  theme?: "light" | "dark";
}

export default function Footer({ setActiveTab, openEmergencyModal, startNewBooking, theme }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Dental Specializations" },
    { id: "doctors", label: "Clinical Specialists" },
    { id: "booking", label: "Schedule Appointment" },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 font-sans border-t border-slate-800 dark:border-slate-900 transition-all duration-300" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {/* Column 1: Clinic Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-lg tracking-wider text-white">
                KOTHARI <span className="text-sky-400 font-light">DENTAL</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing precision dental treatment powered by modern digital diagnostics, painless anesthesia, and five-star patient hospitality.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Navigation className="w-4 h-4 text-sky-400 hover:scale-110 transition-transform" />
                <span>Kothari Medical Arcade, Linking Road, Bandra West, Mumbai, MH - 400050</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Phone className="w-4 h-4 text-sky-400 hover:scale-110 transition-transform" />
                <span>+91 22 6125 7800 (Helpline)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white mb-4.5 border-l-2 border-sky-500 pl-3">
              Specialized Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      if (link.id === "booking" && startNewBooking) {
                        startNewBooking();
                      } else {
                        setActiveTab(link.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1 group text-left cursor-pointer text-slate-400 font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500 opacity-0 group-hover:opacity-100 transition-all -ml-3.5 group-hover:ml-0 group-hover:mr-1" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setActiveTab("admin");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group text-left cursor-pointer text-sky-400 font-bold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500 opacity-0 group-hover:opacity-100 transition-all -ml-3.5 group-hover:ml-0 group-hover:mr-1" />
                  <span>Clinician Staff Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openEmergencyModal}
                  className="text-rose-400 hover:text-rose-300 font-semibold transition-colors flex items-center gap-2.5"
                >
                  <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>24/7 Trauma Assistance</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white mb-4.5 border-l-2 border-sky-500 pl-3">
              Working Hours
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Monday – Thursday</span>
                <span className="text-slate-200 font-medium font-mono">08:00 – 19:00</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Friday</span>
                <span className="text-slate-200 font-medium font-mono">09:00 – 17:00</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                <span>Saturday</span>
                <span className="text-slate-200 font-medium font-mono">09:00 – 14:00</span>
              </li>
              <li className="flex justify-between text-rose-400 font-medium">
                <span>Sunday (Emergency Only)</span>
                <span className="font-mono">24h Response</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Luxury Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white mb-4.5 border-l-2 border-sky-500 pl-3">
              Intelligent Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to obtain modern dental routine optimization guides and community clinic updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@patient.com"
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-medium focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all pr-12"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-sky-500 hover:bg-sky-600 rounded-lg text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kothari Dental Clinic Inc. Professional Clinical Services. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#services" onClick={(e) => { e.preventDefault(); setActiveTab("services"); }} className="hover:text-slate-300 transition-colors">Treatments</a>
            <a href="#booking" onClick={(e) => { e.preventDefault(); setActiveTab("booking"); }} className="hover:text-slate-300 transition-colors">Privacy Charter</a>
            <a href="#doctors" onClick={(e) => { e.preventDefault(); setActiveTab("doctors"); }} className="hover:text-slate-300 transition-colors">Affiliations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
