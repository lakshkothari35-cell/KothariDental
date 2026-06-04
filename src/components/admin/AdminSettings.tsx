import React, { useState } from "react";
import { 
  Sliders, Settings, Info, ShieldCheck, Heart, 
  HelpCircle, Sparkles, Database, Shield, SlidersHorizontal,
  RefreshCw, CheckCircle2, ChevronRight, HardDrive, AlertTriangle
} from "lucide-react";

interface AdminSettingsProps {
  heroCms: any;
  setHeroCms: React.Dispatch<React.SetStateAction<any>>;
  clinicHoursCms: string;
  setClinicHoursCms: React.Dispatch<React.SetStateAction<string>>;
  addActivityLog: (act: string) => void;
}

export default function AdminSettings({
  heroCms,
  setHeroCms,
  clinicHoursCms,
  setClinicHoursCms,
  addActivityLog
}: AdminSettingsProps) {
  
  // Settings values states
  const [seoDescription, setSeoDescription] = useState("Premium high-end clinical restorations, root prophylaxis, and cosmetic crowns in Arcadia.");
  const [backupStatus, setBackupStatus] = useState<"idle" | "backing" | "success" | "restoring" | "restored">("idle");
  const [clinicAddress, setClinicAddress] = useState("Phase 1, Signature Towers, Arcadia Commercial Sector, IN");
  const [insuranceIntegrations, setInsuranceIntegrations] = useState(true);

  // Theme overrides simulation values
  const [dashboardTheme, setDashboardTheme] = useState("lux-slate");

  const triggerBackup = () => {
    setBackupStatus("backing");
    setTimeout(() => {
      setBackupStatus("success");
      const backupTimestamp = new Date().toLocaleString();
      addActivityLog(`Secured database hot backup generated: [BACKUP_S2026_${Date.now().toString().slice(-6)}]`);
      
      setTimeout(() => {
        setBackupStatus("idle");
      }, 2000);
    }, 1200);
  };

  const triggerRestore = () => {
    if (confirm("Executing a clinical database restore will revert active roster schedules and pricing metrics. Do you wish to override?")) {
      setBackupStatus("restoring");
      setTimeout(() => {
        setBackupStatus("restored");
        addActivityLog("Restored core dental CRM indices metadata from master backup directory");
        
        setTimeout(() => {
          setBackupStatus("idle");
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Settings Title */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600 block">Staff Controls</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Global Configurations Terminal</h2>
          <p className="text-xs text-brand-text-muted mt-1.5">Manage automated insurance gateways, SEO headings, cloud backup targets, and operational coordinates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: general parameters */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-gray-50 pb-3.5 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-600" />
            <h3 className="font-display font-bold text-base text-gray-900">General Clinic Parameters</h3>
          </div>

          <div className="space-y-4 text-xs font-sans">
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Registered Corporate Address</label>
              <input
                type="text"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Seo Header Page Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-medium text-slate-800 resize-none leading-relaxed"
              />
            </div>

            {/* Insurance billing gateway toggle */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="space-y-1 min-w-0 pr-4">
                <span className="font-extrabold text-sm text-gray-900 block leading-tight">Direct Insurances Authorized Clearinghouse</span>
                <p className="text-[10px] text-gray-400">Claims matching member coordinates will automatically transmit for instant clearing.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInsuranceIntegrations(!insuranceIntegrations);
                  addActivityLog(`Insurance Direct Clearing authorization revised to [${!insuranceIntegrations}]`);
                }}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  insuranceIntegrations ? "bg-emerald-600" : "bg-slate-350"
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-all transform ${
                  insuranceIntegrations ? "translate-x-5.5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Dashboard Theme customization */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Staff Board Aesthetic Trim</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "lux-slate", label: "Luxurious Slate Graphene" },
                  { id: "calm-teal", label: "Calming Mint Emerald" },
                  { id: "cosmic-dark", label: "Deep Cosmic Atmosphere" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDashboardTheme(item.id);
                      addActivityLog(`Staff revised console presentation layout aesthetic to: [${item.id}]`);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      dashboardTheme === item.id 
                        ? "bg-slate-900 border-slate-850 text-white font-bold"
                        : "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[10px] block font-sans">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right column: database backup operations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs">
            
            <div className="border-b border-gray-50 pb-3.5 flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-base text-gray-900">Database & Security Backups</h3>
            </div>

            <div className="text-xs space-y-4">
              <p className="text-brand-text-muted leading-relaxed font-sans font-medium text-[11px]">
                Create hot backups or execute restores of database parameters. Schedulers, prices, clinic settings, and patient records can be serialized as standard backups.
              </p>

              {/* Status alerts */}
              {backupStatus === "backing" && (
                <div className="bg-sky-50 border border-sky-200 text-sky-800 p-3.5 rounded-2xl flex items-center gap-2 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-sky-600" />
                  <span className="font-bold">Serializing operational table indexes...</span>
                </div>
              )}

              {backupStatus === "success" && (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-3.5 rounded-2xl flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="font-bold">Backup transmission saved and stored in local cache!</span>
                </div>
              )}

              {backupStatus === "restoring" && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-2xl flex items-center gap-2 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-amber-600" />
                  <span className="font-bold">Restoring core database schema tables...</span>
                </div>
              )}

              {backupStatus === "restored" && (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-3.5 rounded-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="font-bold">Database indices restored to master default values!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={triggerBackup}
                  disabled={backupStatus !== "idle"}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-sans text-[11px] font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Backup Database</span>
                </button>

                <button
                  type="button"
                  onClick={triggerRestore}
                  disabled={backupStatus !== "idle"}
                  className="border border-gray-200 hover:bg-gray-50 disabled:bg-slate-50 text-gray-700 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                  <span>Restore Tables</span>
                </button>
              </div>

              {/* Warning label */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-900">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wide text-[10px]">Data Integrity Advisory</span>
                  <p className="text-[10.5px] leading-relaxed font-sans font-medium text-amber-900">
                    Always verify backup timestamp directories before executing restorations. Restoring will erase clinical entries booked in subsequent intervals.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
