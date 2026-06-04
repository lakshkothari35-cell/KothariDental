/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Calendar, PhoneCall, Menu, X, Users, HeartPulse, ChevronRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openEmergencyModal: () => void;
  startNewBooking?: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  openEmergencyModal, 
  startNewBooking,
  theme,
  toggleTheme 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: HeartPulse },
    { id: "services", label: "Specializations", icon: Sparkles },
    { id: "doctors", label: "Clinical Team", icon: Users },
    { id: "booking", label: "Book Appointment", icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/85 backdrop-blur-md border-b border-gray-100/80 dark:border-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo element */}
          <div 
            onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo-container"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-sky-700 shadow-md shadow-sky-100 dark:shadow-none group-hover:scale-105">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5">
                KOTHARI
                <span className="text-sky-650 dark:text-sky-400 font-bold tracking-normal text-xs bg-sky-50 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 px-2 py-0.5 rounded-full">DENTAL</span>
              </span>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-sans font-semibold">Excellence in Care</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" id="desktop-navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    if (item.id === "booking" && startNewBooking) {
                      startNewBooking();
                    } else {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium font-sans text-sm transition-all duration-300 uppercase tracking-wider ${
                    isActive 
                      ? "text-sky-700 dark:text-sky-400" 
                      : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-slate-900/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-600 dark:bg-sky-505 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call-to-actions / Emergency triggers & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Desktop Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-slate-900/50 border border-gray-100/50 dark:border-slate-800 transition-all duration-300 cursor-pointer"
              title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
              id="desktop-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5 text-slate-600" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
            </button>

            <button
              onClick={openEmergencyModal}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-455 dark:border-rose-900/30 border border-rose-100 hover:border-rose-200 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              id="nav-emergency-trigger"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              Emergency Care
            </button>
            <button
               onClick={() => {
                 if (startNewBooking) {
                   startNewBooking();
                 } else {
                   setActiveTab("booking");
                   window.scrollTo({ top: 0, behavior: "smooth" });
                 }
               }}
              className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-sans text-xs font-semibold uppercase tracking-wider px-4.5 py-3 rounded-xl transition-all duration-300 shadow-md shadow-sky-100 dark:shadow-none hover:shadow-lg hover:shadow-sky-100 group cursor-pointer"
              id="nav-direct-book-trigger"
            >
              Direct Scheduling
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Theme Switcher Icon */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300"
              title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
              id="mobile-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-4 h-4 text-slate-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Mobile emergency care trigger */}
            <button
              onClick={openEmergencyModal}
              className="p-2 text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg"
              id="mobile-emergency-button"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
            </button>

            {/* Mobile drawer toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-slate-950 overflow-hidden"
            id="mobile-drawer-container"
          >
            <div className="px-4 py-4 space-y-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      if (item.id === "booking" && startNewBooking) {
                        startNewBooking();
                      } else {
                        setActiveTab(item.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium text-sm transition-all ${
                      isActive 
                        ? "bg-sky-50 dark:bg-slate-900 text-sky-700 dark:text-sky-455" 
                        : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-100 dark:border-slate-900 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEmergencyModal();
                  }}
                  className="flex items-center justify-center gap-2 w-full text-center text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-955 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border border-rose-100 dark:border-rose-900/30 transition-colors"
                  id="mobile-emergency-care-button"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  Request Emergency Care
                </button>
                <button
                  onClick={() => {
                    if (startNewBooking) {
                      startNewBooking();
                    } else {
                      setActiveTab("booking");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-sans text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-xl transition-all"
                  id="mobile-direct-schedule-button"
                >
                  Schedule Appointment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
