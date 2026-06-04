import React, { useState } from "react";
import { 
  Search, User, Phone, Mail, FolderHeart, FileText, 
  Download, Plus, Upload, Trash2, ShieldAlert, Sliders, CheckCircle2,
  X, Shield, Edit2, Sparkles, AlertCircle, RefreshCw
} from "lucide-react";

interface AdminPatientsProps {
  bookings: any[];
  addActivityLog: (act: string) => void;
}

export default function AdminPatients({ bookings, addActivityLog }: AdminPatientsProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Simulated initial offline-first static patients database
  const [patients, setPatients] = useState([
    {
      id: "PAT-879102",
      fullName: "Eleanor Vance",
      age: 34,
      gender: "Female",
      phone: "+91 98845 23112",
      email: "eleanor.vance@gmail.com",
      medicalHistory: "Allergic to Penicillin. Mild hypertension.",
      dentalRecords: "Molar Restoration (July 2025). Aligners scheduled.",
      prescriptions: ["Amoxicillin 500mg", "Hexidine Mouth Wash"],
      xrays: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBh6XQ1UcXBN4GDbfYNQ8iWO57hxtgvJbUDfm9HdKzKePlWsQMMSSmuN-22TLxva6Wj6hWnEMVRMJutV6MA5GS7rT3t4TA8c0T1MuQAhECxC5CPQLIhk9qrh5gbR90pdRNO_I5VRlvhmFEg4Fr_rqz1MctGdhqOhSghGLTqEKZK9fXQQK0SHKFGJP0WqILgNO7lu-KB0wrsMzH3BNZRIBni2cGAyI6v9qX2C8pR8y3C2JEDvSXgXVBQmDAQU5B2RxQVXPC-FJEjVrKt"],
      createdAt: "2025-02-14"
    },
    {
      id: "PAT-439201",
      fullName: "Julian Thorne",
      age: 41,
      gender: "Male",
      phone: "+91 88931 01923",
      email: "jthorne@stanford.edu",
      medicalHistory: "No systemic conditions reported. Non-smoker.",
      dentalRecords: "Root Canal on tooth #14 completed. Post-treatment evaluation clear.",
      prescriptions: ["Ibuprofen 400mg tabs"],
      xrays: [],
      createdAt: "2025-05-18"
    },
    {
      id: "PAT-019283",
      fullName: "Sarah Jenkins",
      age: 29,
      gender: "Female",
      phone: "+91 94590 12093",
      email: "sarah.j@outlook.com",
      medicalHistory: "Asthmatics (manages with inhaler).",
      dentalRecords: "Third Molar Surgical Extraction. Gum recovery monitored.",
      prescriptions: ["Paracetamol 650mg", "Chlorhexidine Gluconate"],
      xrays: [],
      createdAt: "2025-08-22"
    }
  ]);

  // Merge in patients from active bookings dynamically so that newly booked guests instantly appear in patient directory!
  const getUnifiedPatientsList = () => {
    const list = [...patients];
    bookings.forEach((b) => {
      const alreadyExists = list.some(
        (p) => p.email.toLowerCase() === b.email.toLowerCase() || p.fullName.toLowerCase() === b.fullName.toLowerCase()
      );
      if (!alreadyExists) {
        list.push({
          id: b.id.replace("LUM-", "PAT-").replace("EMG-", "PAT-"),
          fullName: b.fullName,
          age: 38, // default fallback
          gender: "Prefer not to say",
          phone: b.phone,
          email: b.email,
          medicalHistory: b.isEmergency ? "Emergency trauma patient intake" : "Standard clinic onboarding request",
          dentalRecords: b.isEmergency ? "Emergency clinical service dispatch" : "Routine diagnostic evaluation registered.",
          prescriptions: [],
          xrays: [],
          createdAt: b.createdAt.split(",")[0] || new Date().toISOString().split("T")[0]
        });
      }
    });
    return list;
  };

  const unifiedPatients = getUnifiedPatientsList();

  const filteredPatients = unifiedPatients.filter((p) => {
    return (
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
    );
  });

  // Action: Export patients database as downloadable structured JSON
  const exportRecords = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(unifiedPatients, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `kothari_dental_patients_db_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addActivityLog("Board backup exported core patient medical database file");
  };

  // Profile fields helper states for edit
  const [editingPatient, setEditingPatient] = useState<any | null>(null);
  
  // Custom prescription creator states
  const [newRx, setNewRx] = useState("");

  const savePatientEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    
    // Check if edited patient is custom state vs booking-mapped
    const inCustomDbIndex = patients.findIndex(p => p.id === editingPatient.id);
    if (inCustomDbIndex >= 0) {
      const updated = [...patients];
      updated[inCustomDbIndex] = editingPatient;
      setPatients(updated);
    } else {
      // Add as custom patient item to override
      setPatients([...patients, editingPatient]);
    }
    
    addActivityLog(`Board updated diagnostics report for clinical patient ID: ${editingPatient.id}`);
    setEditingPatient(null);
  };

  // Simulated drag and drop X-ray upload
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload();
    }
  };

  const simulateFileUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            // Append a high-end mockup Xray image
            const mockXray = "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6XQ1UcXBN4GDbfYNQ8iWO57hxtgvJbUDfm9HdKzKePlWsQMMSSmuN-22TLxva6Wj6hWnEMVRMJutV6MA5GS7rT3t4TA8c0T1MuQAhECxC5CPQLIhk9qrh5gbR90pdRNO_I5VRlvhmFEg4Fr_rqz1MctGdhqOhSghGLTqEKZK9fXQQK0SHKFGJP0WqILgNO7lu-KB0wrsMzH3BNZRIBni2cGAyI6v9qX2C8pR8y3C2JEDvSXgXVBQmDAQU5B2RxQVXPC-FJEjVrKt";
            if (editingPatient) {
              setEditingPatient({
                ...editingPatient,
                xrays: [...(editingPatient.xrays || []), mockXray]
              });
            }
            addActivityLog("Simulated core medical radiography X-Ray transmission complete");
          }, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 120);
  };

  const activeProfile = selectedPatientId 
    ? unifiedPatients.find(p => p.id === selectedPatientId) 
    : null;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block">Medical Audit Vault</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Diagnostic Patient Records</h2>
          <p className="text-xs text-brand-text-muted">Retrieve medical records, manage diagnostic prescriptions, analyze interactive dental panoramic radiography.</p>
        </div>

        <button 
          onClick={exportRecords}
          className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Clinical database</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Directory search list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Intake Lookup</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Case index, patient phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto pr-1">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-10 text-gray-450 italic">No patients matching filters.</div>
              ) : (
                filteredPatients.map((p) => {
                  const isSelected = selectedPatientId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setEditingPatient(p);
                      }}
                      className={`w-full text-left p-4 flex items-center justify-between transition-all rounded-xl cursor-pointer ${
                        isSelected 
                          ? "bg-sky-50/70 border border-sky-100/50 scale-[1.01]" 
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="space-y-1 truncate pr-2">
                        <div className="font-extrabold text-sm text-gray-900 truncate leading-tight flex items-center gap-1.5">
                          {p.medicalHistory.includes("Penicillin") && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shrink-0" title="Allergic Risk" />
                          )}
                          {p.fullName}
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold block truncate">{p.id} • {p.phone}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                        {p.age} yrs
                      </span>
                    </button>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* Right Side: High fidelity diagnostic profile & diagnostic edits */}
        <div className="lg:col-span-7">
          {activeProfile && editingPatient ? (
            <form onSubmit={savePatientEdits} className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-xs">
              
              {/* Profile Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-5">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gradient-to-tr from-sky-600 to-sky-400 rounded-2xl flex items-center justify-center text-white text-lg font-black shrink-0 shadow-md shadow-sky-100">
                    {editingPatient.fullName.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{editingPatient.id}</span>
                    <h3 className="font-display font-black text-xl text-gray-900 leading-none">{editingPatient.fullName}</h3>
                    <p className="text-[11px] text-brand-text-muted mt-1">Clinical Record Registered: {editingPatient.createdAt}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-teal-700 bg-teal-50 px-2 rounded font-sans uppercase inline-block">
                    Active File
                  </span>
                </div>
              </div>

              {/* Patient Core Details Edit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-450 block">Patient Age *</label>
                  <input
                    type="number"
                    required
                    value={editingPatient.age}
                    onChange={(e) => setEditingPatient({ ...editingPatient, age: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-455 block">Gender *</label>
                  <input
                    type="text"
                    required
                    value={editingPatient.gender}
                    onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-455 block">Verification Email</label>
                  <input
                    type="email"
                    required
                    value={editingPatient.email}
                    onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Medical histories fields */}
              <div className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-450 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Restrictive medical warnings & allergy history list
                  </label>
                  <textarea
                    rows={2}
                    value={editingPatient.medicalHistory}
                    onChange={(e) => setEditingPatient({ ...editingPatient, medicalHistory: e.target.value })}
                    className="w-full bg-rose-50/35 hover:bg-rose-50/50 focus:bg-white border border-rose-100 focus:border-rose-400 focus:outline-none rounded-xl p-3 text-xs font-medium text-slate-800 resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-550 block">Intake Dental notes & Diagnostic tracking timeline</label>
                  <textarea
                    rows={2}
                    value={editingPatient.dentalRecords}
                    onChange={(e) => setEditingPatient({ ...editingPatient, dentalRecords: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3.5 text-xs font-medium text-slate-800 resize-none leading-relaxed"
                  />
                </div>

              </div>

              {/* Prescriptions sub-module */}
              <div className="space-y-3.5 border-t border-gray-100 pt-5">
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500">Active Prescribed Pharmaceutics</h4>
                  <p className="text-[10px] text-gray-400">Manage prescriptions logged for current clinical sessions.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {(editingPatient.prescriptions || []).length === 0 ? (
                    <span className="text-[11px] text-gray-400 italic">No custom therapeutics initialized.</span>
                  ) : (
                    editingPatient.prescriptions.map((rx: string, idx: number) => (
                      <div key={idx} className="bg-sky-50 border border-sky-100/60 font-sans text-[11px] font-bold text-sky-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                        <span>{rx}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedRx = editingPatient.prescriptions.filter((_: any, i: number) => i !== idx);
                            setEditingPatient({ ...editingPatient, prescriptions: updatedRx });
                            addActivityLog(`Removed therapeutic prescriptions on case: ${editingPatient.id}`);
                          }}
                          className="hover:text-rose-500 font-bold shrink-0 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Paracetamol 650mg once daily..."
                    value={newRx}
                    onChange={(e) => setNewRx(e.target.value)}
                    className="flex-1 bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newRx.trim()) return;
                      setEditingPatient({
                        ...editingPatient,
                        prescriptions: [...(editingPatient.prescriptions || []), newRx.trim()]
                      });
                      setNewRx("");
                      addActivityLog(`Added therapeutic prescription ${newRx.trim()} on patient: ${editingPatient.fullName}`);
                    }}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-sans text-xs font-bold uppercase tracking-wider px-4.5 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Prescribe
                  </button>
                </div>
              </div>

              {/* Drag and Drop X-Ray Upload */}
              <div className="space-y-3 border-t border-gray-100 pt-5">
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500">Clinical Radiography (X-Ray Panoramic Orthopantomogram)</h4>
                  <p className="text-[10px] text-gray-400">Ingest medical imaging scans for diagnostics assessment.</p>
                </div>

                {/* Display active patient Xray cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(editingPatient.xrays || []).map((url: string, index: number) => (
                    <div key={index} className="border border-slate-250/70 rounded-2xl p-2 relative group overflow-hidden bg-slate-900 flex flex-col justify-center h-28">
                      {/* X-ray mockup visual design */}
                      <div className="absolute inset-0 bg-sky-950/20 backdrop-blur-3xs" />
                      
                      {/* Realistic skeletal teeth render lines */}
                      <svg className="w-full h-full opacity-60 absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M10,80 Q30,50 50,80 T90,80" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                        <path d="M10,20 Q30,50 50,20 T90,20" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="20" y1="20" x2="20" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                        <line x1="40" y1="20" x2="40" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                        <line x1="60" y1="20" x2="60" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                        <line x1="80" y1="20" x2="80" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                      </svg>

                      <div className="relative text-center text-[10px] font-mono text-cyan-300 font-extrabold z-10 flex flex-col items-center">
                        <span className="bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">SCAN #{index + 1}</span>
                        <span className="text-[8px] text-slate-400 mt-1 uppercase">OPG DETAILED</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedXray = editingPatient.xrays.filter((_: any, i: number) => i !== index);
                          setEditingPatient({ ...editingPatient, xrays: updatedXray });
                          addActivityLog(`Deleted imaging scan on file: ${editingPatient.id}`);
                        }}
                        className="absolute right-2 top-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-rose-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                    dragActive 
                      ? "border-sky-500 bg-sky-50/40 scale-[0.99]" 
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-350"
                  }`}
                >
                  {uploadProgress !== null ? (
                    <div className="space-y-2.5 py-2">
                      <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-700 block">Uploading panoramic medical imaging file...</span>
                        <div className="h-1.5 w-36 bg-slate-200 rounded-full mx-auto overflow-hidden">
                          <div className="h-full bg-sky-600 transition-all" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <div className="space-y-1 text-xs">
                        <p className="font-bold text-slate-700">Drag & Drop radiography DICOM/PDF, or <span className="text-sky-600 underline cursor-pointer" onClick={simulateFileUpload}>browse locally</span></p>
                        <p className="text-[10px] text-gray-450">Formats accepted: JPEG, PNG, DICOM files up to 25MB.</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Save changes triggers */}
              <div className="pt-4 flex gap-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-sky-500/5 hover:shadow-lg hover:shadow-sky-500/10 cursor-pointer text-center"
                >
                  Commit Diagnostics Update
                </button>
              </div>

            </form>
          ) : (
            <div className="bg-white border border-gray-100 rounded-[32px] p-16 text-center shadow-xs space-y-4">
              <FolderHeart className="w-14 h-14 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base text-gray-900">Patient File Closed</h4>
                <p className="text-xs text-brand-text-muted leading-relaxed max-w-sm mx-auto">
                  Select a clinical reference from the intake list to inspect detailed dental logs, active therapeutic prescriptions, and radiographic jaw scans.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
