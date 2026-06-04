import React, { useState } from "react";
import { 
  Plus, Users, Award, Clock, Star, Edit2, Trash2, 
  Check, Calendar, Sliders, ShieldCheck, Mail, AlertTriangle, X
} from "lucide-react";

interface AdminDoctorsProps {
  doctors: any[];
  setDoctors: React.Dispatch<React.SetStateAction<any[]>>;
  addActivityLog: (act: string) => void;
}

export default function AdminDoctors({ doctors, setDoctors, addActivityLog }: AdminDoctorsProps) {
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDegrees, setFormDegrees] = useState("");
  const [formSchedule, setFormSchedule] = useState("");
  const [formSpecialties, setFormSpecialties] = useState("");
  const [formSatisfaction, setFormSatisfaction] = useState("98% Success Rate");
  const [formExperience, setFormExperience] = useState("10+ Years Experience");

  const [isOpenForm, setIsOpenForm] = useState(false);

  const resetForm = () => {
    setFormName("");
    setFormTitle("Cosmetic Dentist");
    setFormDegrees("DDS, MDS");
    setFormSchedule("MON - FRI: 9AM - 5PM");
    setFormSpecialties("General Dentistry, Diagnostics");
    setFormSatisfaction("98% Success Rate");
    setFormExperience("10+ Years Experience");
    setEditingId(null);
    setIsOpenForm(false);
  };

  const handleCreateOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim()) return;

    const parsedSpecialties = formSpecialties.split(",").map(s => s.trim()).filter(Boolean);

    if (editingId) {
      // Edit mode
      const updated = doctors.map((d) => {
        if (d.id === editingId) {
          return {
            ...d,
            name: formName,
            title: formTitle,
            degrees: formDegrees,
            schedule: formSchedule,
            specialties: parsedSpecialties,
            satisfaction: formSatisfaction,
            experience: formExperience
          };
        }
        return d;
      });
      setDoctors(updated);
      addActivityLog(`Board updated Clinical Profile for: Dr. ${formName}`);
    } else {
      // Add mode
      const newDocId = formName.toLowerCase().replace(/\s+/g, "-").replace(/dr\.-/g, "");
      const newDoctor = {
        id: newDocId,
        name: formName.startsWith("Dr.") ? formName : `Dr. ${formName}`,
        title: formTitle,
        degrees: formDegrees,
        schedule: formSchedule,
        specialties: parsedSpecialties,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6XQ1UcXBN4GDbfYNQ8iWO57hxtgvJbUDfm9HdKzKePlWsQMMSSmuN-22TLxva6Wj6hWnEMVRMJutV6MA5GS7rT3t4TA8c0T1MuQAhECxC5CPQLIhk9qrh5gbR90pdRNO_I5VRlvhmFEg4Fr_rqz1MctGdhqOhSghGLTqEKZK9fXQQK0SHKFGJP0WqILgNO7lu-KB0wrsMzH3BNZRIBni2cGAyI6v9qX2C8pR8y3C2JEDvSXgXVBQmDAQU5B2RxQVXPC-FJEjVrKt", // fallback placeholder
        experience: formExperience,
        satisfaction: formSatisfaction
      };
      setDoctors([...doctors, newDoctor]);
      addActivityLog(`Board added new Doctor Specialist registration: ${newDoctor.name}`);
    }

    resetForm();
  };

  const startEdit = (doc: any) => {
    setEditingId(doc.id);
    setFormName(doc.name);
    setFormTitle(doc.title);
    setFormDegrees(doc.degrees);
    setFormSchedule(doc.schedule);
    setFormSpecialties(doc.specialties.join(", "));
    setFormSatisfaction(doc.satisfaction);
    setFormExperience(doc.experience);
    setIsOpenForm(true);
  };

  const deleteDoctor = (docId: string, name: string) => {
    if (confirm(`Are you sure you want to remove Dr. ${name} from clinical duty directory?`)) {
      setDoctors(doctors.filter((d) => d.id !== docId));
      addActivityLog(`Archived doctor clinical register for Dr. ${name}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title block */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600">Practitioners Board</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Clinical Specialists Roster</h2>
          <p className="text-xs text-brand-text-muted">Review clinician schedules, update credentials, catalog qualifications, and configure leave structures.</p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsOpenForm(true);
          }}
          className="bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Specialist</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Doctors list cards */}
        <div className={isOpenForm ? "lg:col-span-7 space-y-4" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6"}>
          {doctors.map((d) => (
            <div 
              key={d.id} 
              className="bg-white border border-gray-150/60 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <img 
                  src={d.image} 
                  alt={d.name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shrink-0 bg-slate-50"
                  referrerPolicy="no-referrer"
                />
                
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900 leading-tight truncate">{d.name}</h3>
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide block truncate">{d.title}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {d.degrees}
                    </span>
                    <span className="text-[9px] font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                      {d.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timing info */}
              <div className="mt-4 pt-3.5 border-t border-gray-50 flex items-center justify-between text-[11px] font-medium text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-600" /> {d.schedule}</span>
                <span className="text-[10px] text-teal-600 font-extrabold bg-teal-50/60 px-2 py-0.5 rounded">{d.satisfaction}</span>
              </div>

              {/* Specialties List */}
              <div className="mt-3 flex flex-wrap gap-1">
                {d.specialties.map((sp: string, idx: number) => (
                  <span key={idx} className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {sp}
                  </span>
                ))}
              </div>

              {/* Hover quick action overlays */}
              <div className="absolute right-4 top-4 flex gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-lg border border-gray-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(d)}
                  title="Modify Clinician Profile"
                  className="p-1.5 hover:bg-slate-100 text-sky-700 rounded-md cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteDoctor(d.id, d.name)}
                  title="Archive roster file"
                  className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-md cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic form side overlay */}
        {isOpenForm && (
          <div className="lg:col-span-5">
            <form onSubmit={handleCreateOrEdit} className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs relative">
              
              <button 
                type="button" 
                onClick={resetForm}
                className="p-1.5 absolute right-4 top-4 hover:bg-gray-100 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-gray-50 pb-3">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">
                  {editingId ? "Update Portfolio Credentials" : "Onboard Dental Specialist"}
                </h3>
                <p className="text-[10px] text-gray-400">Configure clinic availability and credentials.</p>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">FullName *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Eleanor Vance"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Clinical Specialty Title *</label>
                  <select
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                  >
                    <option value="Cosmetic Dentist">Cosmetic Dentist</option>
                    <option value="Orthodontist Specialist">Orthodontist Specialist</option>
                    <option value="Chief Dental Surgeon">Chief Dental Surgeon</option>
                    <option value="Pediatric Clinician">Pediatric Clinician</option>
                    <option value="Senior Endodontist">Senior Endodontist</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Academic Degrees *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DDS, MDS — Harvard Medical"
                    value={formDegrees}
                    onChange={(e) => setFormDegrees(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Timetable Schedule Hours *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TUE - SAT: 10AM - 6PM"
                    value={formSchedule}
                    onChange={(e) => setFormSchedule(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Treatment Specialty Tags *</label>
                  <input
                    type="text"
                    required
                    placeholder="Separate with commas: Veneers, Whitening, Crowns"
                    value={formSpecialties}
                    onChange={(e) => setFormSpecialties(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Attended Experience</label>
                    <input
                      type="text"
                      value={formExperience}
                      onChange={(e) => setFormExperience(e.target.value)}
                      className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Trust Satisfaction</label>
                    <input
                      type="text"
                      value={formSatisfaction}
                      onChange={(e) => setFormSatisfaction(e.target.value)}
                      className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>
                </div>

              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sky-600 hover:bg-sky-550 text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-wider cursor-pointer shadow-md shadow-sky-500/10"
                >
                  Confirm Profile
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

    </div>
  );
}
