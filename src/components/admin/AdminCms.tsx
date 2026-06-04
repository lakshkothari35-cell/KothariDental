import React, { useState } from "react";
import { 
  Sparkles, FileText, Globe, Image as ImageIcon, MessageSquare, 
  BookOpen, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, Save,
  X, HelpCircle, Layers, Sliders, ArrowUpRight, Search
} from "lucide-react";

interface AdminCmsProps {
  services: any[];
  setServices: React.Dispatch<React.SetStateAction<any[]>>;
  testimonials: any[];
  setTestimonials: React.Dispatch<React.SetStateAction<any[]>>;
  heroCms: any;
  setHeroCms: React.Dispatch<React.SetStateAction<any>>;
  clinicHoursCms: string;
  setClinicHoursCms: React.Dispatch<React.SetStateAction<string>>;
  galleryCms: any[];
  setGalleryCms: React.Dispatch<React.SetStateAction<any[]>>;
  blogPostsCms: any[];
  setBlogPostsCms: React.Dispatch<React.SetStateAction<any[]>>;
  addActivityLog: (act: string) => void;
}

export default function AdminCms({
  services,
  setServices,
  testimonials,
  setTestimonials,
  heroCms,
  setHeroCms,
  clinicHoursCms,
  setClinicHoursCms,
  galleryCms,
  setGalleryCms,
  blogPostsCms,
  setBlogPostsCms,
  addActivityLog
}: AdminCmsProps) {
  
  const [cmsTab, setCmsTab] = useState<"hero" | "services" | "testimonials" | "gallery" | "blogs">("hero");

  // Blog states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Oral Care");
  const [blogAuthor, setBlogAuthor] = useState("Dr. Eleanor Vance");
  const [blogStatus, setBlogStatus] = useState<"published" | "draft">("published");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [seoKeys, setSeoKeys] = useState("");
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Gallery states
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryCaption, setGalleryCaption] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("clinical");

  // Services states
  const [srvName, setSrvName] = useState("");
  const [srvDesc, setSrvDesc] = useState("");
  const [srvBenefit, setSrvBenefit] = useState("");
  const [srvDuration, setSrvDuration] = useState("");
  const [srvPrice, setSrvPrice] = useState("");
  const [isSrvFormOpen, setIsSrvFormOpen] = useState(false);
  const [editingSrvId, setEditingSrvId] = useState<string | null>(null);

  // General alert
  const [saveSuccess, setSaveSuccess] = useState(false);

  const displaySuccessFeedback = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleHeroSave = (e: React.FormEvent) => {
    e.preventDefault();
    displaySuccessFeedback();
    addActivityLog("Board updated Hero CMS and clinical hours counters");
  };

  const deleteService = (srvId: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name} specialty treatment?`)) {
      setServices(services.filter(s => s.id !== srvId));
      addActivityLog(`Archived treatment specialty: ${name}`);
    }
  };

  const handleSrvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim() || !srvDesc.trim()) return;

    if (editingSrvId) {
      // Edit
      const updated = services.map(s => {
        if (s.id === editingSrvId) {
          return {
            ...s,
            name: srvName,
            description: srvDesc,
            benefit: srvBenefit,
            duration: srvDuration,
            approxPrice: srvPrice
          };
        }
        return s;
      });
      setServices(updated);
      addActivityLog(`CMS revised treatment catalog for: ${srvName}`);
    } else {
      // Add
      const cleanId = srvName.toLowerCase().replace(/\s+/g, "-");
      const newSrv = {
        id: cleanId,
        name: srvName,
        description: srvDesc,
        iconName: "Sparkles",
        benefit: srvBenefit || "Enhances Gum Profile",
        duration: srvDuration || "45 - 60 mins",
        approxPrice: srvPrice
      };
      setServices([...services, newSrv]);
      addActivityLog(`CMS onboarded new Treatment Specialty: ${srvName}`);
    }

    setSrvName("");
    setSrvDesc("");
    setSrvBenefit("");
    setSrvDuration("");
    setSrvPrice("");
    setEditingSrvId(null);
    setIsSrvFormOpen(false);
    displaySuccessFeedback();
  };

  const startSrvEdit = (s: any) => {
    setEditingSrvId(s.id);
    setSrvName(s.name);
    setSrvDesc(s.description);
    setSrvBenefit(s.benefit || "");
    setSrvDuration(s.duration || "");
    setSrvPrice(s.approxPrice || "");
    setIsSrvFormOpen(true);
  };

  const toggleTestimonialActive = (tId: string) => {
    const updated = testimonials.map(t => {
      if (t.id === tId) {
        // Toggle simulated verification approval
        const currentActive = t.approved !== false; // default is approved
        return { ...t, approved: !currentActive };
      }
      return t;
    });
    setTestimonials(updated);
    addActivityLog(`CMS parsed testimonial verification status on claim ID: ${tId}`);
    displaySuccessFeedback();
  };

  const deleteTestimonial = (tId: string) => {
    if (confirm("Are you sure you want to delete this patient review?")) {
      setTestimonials(testimonials.filter(t => t.id !== tId));
      addActivityLog(`Removed review ID: ${tId}`);
    }
  };

  const addGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl.trim()) return;

    const newItem = {
      id: "GAL-" + Math.floor(100000 + Math.random() * 900000),
      url: galleryUrl,
      caption: galleryCaption || "Kothari Aesthetic Clinical Care",
      category: galleryCategory
    };

    setGalleryCms([...galleryCms, newItem]);
    setGalleryUrl("");
    setGalleryCaption("");
    addActivityLog("CMS appended gallery medical visual card");
    displaySuccessFeedback();
  };

  const deleteGalleryItem = (gId: string) => {
    setGalleryCms(galleryCms.filter(g => g.id !== gId));
    addActivityLog(`Deleted gallery layout card ID: ${gId}`);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) return;

    if (editingBlogId) {
      const updated = blogPostsCms.map(b => {
        if (b.id === editingBlogId) {
          return {
            ...b,
            title: blogTitle,
            category: blogCategory,
            author: blogAuthor,
            excerpt: blogExcerpt,
            content: blogContent,
            status: blogStatus,
            seoTags: seoKeys
          };
        }
        return b;
      });
      setBlogPostsCms(updated);
      addActivityLog(`CMS updated Blog Post: [${blogTitle}]`);
    } else {
      const newPost = {
        id: "POST-" + Math.floor(100000 + Math.random() * 900000),
        title: blogTitle,
        category: blogCategory,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        author: blogAuthor,
        excerpt: blogExcerpt || "Read details from our top medical board clinicians.",
        content: blogContent || "Detailed healthcare article contents.",
        status: blogStatus,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6XQ1UcXBN4GDbfYNQ8iWO57hxtgvJbUDfm9HdKzKePlWsQMMSSmuN-22TLxva6Wj6hWnEMVRMJutV6MA5GS7rT3t4TA8c0T1MuQAhECxC5CPQLIhk9qrh5gbR90pdRNO_I5VRlvhmFEg4Fr_rqz1MctGdhqOhSghGLTqEKZK9fXQQK0SHKFGJP0WqILgNO7lu-KB0wrsMzH3BNZRIBni2cGAyI6v9qX2C8pR8y3C2JEDvSXgXVBQmDAQU5B2RxQVXPC-FJEjVrKt",
        readTime: "4 min read",
        seoTags: seoKeys
      };
      setBlogPostsCms([newPost, ...blogPostsCms]);
      addActivityLog(`CMS published new Blog Article: [${blogTitle}]`);
    }

    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent("");
    setSeoKeys("");
    setEditingBlogId(null);
    setIsBlogFormOpen(false);
    displaySuccessFeedback();
  };

  const startBlogEdit = (p: any) => {
    setEditingBlogId(p.id);
    setBlogTitle(p.title);
    setBlogCategory(p.category);
    setBlogAuthor(p.author);
    setBlogExcerpt(p.excerpt || "");
    setBlogContent(p.content || "");
    setBlogStatus(p.status || "published");
    setSeoKeys(p.seoTags || "");
    setIsBlogFormOpen(true);
  };

  const deleteBlogPost = (pId: string, title: string) => {
    if (confirm(`Do you wish to delete article [${title}]?`)) {
      setBlogPostsCms(blogPostsCms.filter(b => b.id !== pId));
      addActivityLog(`Archived blog article ID: ${pId}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* CMS Dashboard Title */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600">Enterprise Core CMS</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Website Content Management Services (CMS)</h2>
          <p className="text-xs text-brand-text-muted">Edit hero copywriting, manage treatment lists, audit testimonies, configure patient blogs & galleries.</p>
        </div>

        {/* Global Success Notification Toast */}
        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shrink-0 text-xs font-bold animate-pulse self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Updates Authorized and Live On-screen!</span>
          </div>
        )}
      </div>

      {/* Selector CMS categories tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50 border border-gray-100 rounded-2xl max-w-max text-xs font-semibold">
        {[
          { id: "hero", label: "Hero Branding Copywriting", icon: Globe },
          { id: "services", label: "Treatments Catalog", icon: Layers },
          { id: "testimonials", label: "Patient Reviews Review", icon: MessageSquare },
          { id: "gallery", label: "Gallery Media", icon: ImageIcon },
          { id: "blogs", label: "Educational Blog CMS", icon: BookOpen }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCmsTab(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold cursor-pointer ${
                cmsTab === item.id 
                  ? "bg-slate-900 text-white shadow-xs" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* TAB 1: Hero sections */}
        {cmsTab === "hero" && (
          <form onSubmit={handleHeroSave} className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="border-b border-gray-50 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-gray-900">Hero Section & Corporate Announcements</h3>
                <p className="text-[10px] text-gray-400">Alter key messaging titles immediately on guest index layouts.</p>
              </div>
              <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Live SEO synced</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-sans">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Small Welcome Pre-Label</label>
                <input
                  type="text"
                  value={heroCms.welcomeLabel}
                  onChange={(e) => setHeroCms({ ...heroCms, welcomeLabel: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Active Clinic Hot Line</label>
                <input
                  type="text"
                  value={heroCms.phone}
                  onChange={(e) => setHeroCms({ ...heroCms, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Headings Title Lead</label>
                <input
                  type="text"
                  value={heroCms.titleLine1}
                  onChange={(e) => setHeroCms({ ...heroCms, titleLine1: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Headings Sub-Title Line</label>
                <input
                  type="text"
                  value={heroCms.titleLine2}
                  onChange={(e) => setHeroCms({ ...heroCms, titleLine2: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Introductory Description Statement</label>
                <textarea
                  rows={3}
                  value={heroCms.description}
                  onChange={(e) => setHeroCms({ ...heroCms, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3.5 font-sans font-medium text-slate-850 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Clinical Operational Hour details</label>
                <input
                  type="text"
                  value={clinicHoursCms}
                  onChange={(e) => setClinicHoursCms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-slate-450 block">Year Experience</label>
                  <input
                    type="text"
                    value={heroCms.experienceCount}
                    onChange={(e) => setHeroCms({ ...heroCms, experienceCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-mono font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-slate-450 block">Active Patients</label>
                  <input
                    type="text"
                    value={heroCms.patientCount}
                    onChange={(e) => setHeroCms({ ...heroCms, patientCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-mono font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-slate-450 block">Audit Satisfaction</label>
                  <input
                    type="text"
                    value={heroCms.satisfactionRate}
                    onChange={(e) => setHeroCms({ ...heroCms, satisfactionRate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:outline-none rounded-xl p-3 font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/5"
              >
                <Save className="w-4 h-4" />
                <span>Save and Update Live branding</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Services lists CMS */}
        {cmsTab === "services" && (
          <div className="space-y-6">
            
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="font-display font-bold text-sm text-gray-800">Operational Oral Treatments Directory</h3>
                <p className="text-[10px] text-gray-400">Add or alter procedures offered on Specializations screen.</p>
              </div>
              
              {!isSrvFormOpen && (
                <button
                  onClick={() => {
                    setEditingSrvId(null);
                    setSrvName("");
                    setSrvDesc("");
                    setSrvBenefit("");
                    setSrvDuration("");
                    setIsSrvFormOpen(true);
                  }}
                  className="bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider px-4.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Onboard Specialty Treatment</span>
                </button>
              )}
            </div>

            {/* Custom Form */}
            {isSrvFormOpen && (
              <form onSubmit={handleSrvSubmit} className="bg-slate-50 border border-slate-150/70 rounded-3xl p-6 space-y-4 text-xs font-sans animate-fade-in relative">
                <button 
                  type="button" 
                  onClick={() => setIsSrvFormOpen(false)}
                  className="p-1 absolute right-4 top-4 hover:bg-gray-200 text-slate-400 hover:text-slate-700 rounded-lg shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <h4 className="font-display font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">
                  {editingSrvId ? "Edit Procedure Catalog" : "Add Dental Procedure Specialty"}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Service Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Endodontic Canal Therapy"
                      value={srvName}
                      onChange={(e) => setSrvName(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Procedure Standard Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 - 2 Visits"
                      value={srvDuration}
                      onChange={(e) => setSrvDuration(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Estimated Cost Range</label>
                    <input
                      type="text"
                      placeholder="e.g. $120 - $250"
                      value={srvPrice}
                      onChange={(e) => setSrvPrice(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Treatments Benefits Header Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Preserves Natural Jawlines & Dental Arch"
                      value={srvBenefit}
                      onChange={(e) => setSrvBenefit(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-850"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Treatments Clinical Description *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Specialized root prophylaxis treatment..."
                      value={srvDesc}
                      onChange={(e) => setSrvDesc(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:outline-none focus:border-sky-500 rounded-xl p-3.5 font-sans font-semibold text-slate-850 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsSrvFormOpen(false); setEditingSrvId(null); }}
                    className="bg-slate-200 text-slate-700 py-2.5 px-5 rounded-xl font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-550 text-white py-2.5 px-6 rounded-xl font-black uppercase tracking-wider text-[10px] cursor-pointer"
                  >
                    Save treatment specs
                  </button>
                </div>
              </form>
            )}

            {/* List existing ones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((item) => (
                <div key={item.id} className="bg-white border border-gray-150 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden group hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1.5 pr-14 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <h4 className="font-display font-extrabold text-sm text-gray-900 leading-none truncate">{item.name}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-teal-600 block">{item.duration} • {item.benefit}{item.approxPrice ? ` • Approx Price: ${item.approxPrice}` : ""}</span>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed line-clamp-2 font-medium">{item.description}</p>
                  </div>

                  <div className="absolute right-4 top-4 flex gap-1 bg-white border border-gray-105 p-1 rounded-lg shadow-sm">
                    <button
                      onClick={() => startSrvEdit(item)}
                      title="Edit Service copywriting"
                      className="p-1 hover:bg-slate-150 text-sky-700 rounded cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteService(item.id, item.name)}
                      title="Archive treatment option"
                      className="p-1 hover:bg-rose-50 text-rose-500 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: Testimonials lists CMS */}
        {cmsTab === "testimonials" && (
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs">
              <h3 className="font-display font-bold text-sm text-gray-800">Featured Testimonial Audits</h3>
              <p className="text-[10px] text-gray-400">Toggle "Spam Block" vs "Feature Highlighted" testimonials easily.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((item) => {
                const isApproved = item.approved !== false;
                
                return (
                  <div key={item.id} className="bg-white border border-gray-150 rounded-2xl p-5 relative group flex flex-col justify-between">
                    <div className="space-y-2 pr-12">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-sky-600 shrink-0" />
                        <h4 className="font-display font-bold text-sm text-gray-900 leading-none">{item.name}</h4>
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 rounded">{item.type}</span>
                      </div>
                      
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-500 italic leading-relaxed">"{item.quote}"</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-105 flex justify-between items-center text-[10px]">
                      <span className={`font-bold ${isApproved ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"} px-2.5 py-0.5 rounded-full`}>
                        {isApproved ? "Approved & Live" : "Draft Blocked"}
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleTestimonialActive(item.id)}
                          className="text-sky-700 hover:underline font-extrabold uppercase cursor-pointer"
                        >
                          {isApproved ? "Block" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteTestimonial(item.id)}
                          className="text-rose-500 hover:underline font-extrabold uppercase cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 w-9 h-9 opacity-10 bg-slate-400 rounded flex justify-center items-center font-display text-lg font-black">
                      ”
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: Gallery media sections */}
        {cmsTab === "gallery" && (
          <div className="space-y-6">
            
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs">
              <h3 className="font-display font-bold text-sm text-gray-800">Clinic Visual Portfolios (Gallery)</h3>
              <p className="text-[10px] text-gray-400">Manage photos and OPG radiography mockups on customer views.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Add form */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-150/70 p-5 rounded-3xl space-y-4 text-xs font-sans">
                <h4 className="font-display font-bold text-gray-900 leading-none">Append Visual Card</h4>
                
                <form onSubmit={addGalleryItem} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Image Asset URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={galleryUrl}
                      onChange={(e) => setGalleryUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Visual Caption *</label>
                    <input
                      type="text"
                      placeholder="e.g. Restorations Room Panoramic Laser"
                      value={galleryCaption}
                      onChange={(e) => setGalleryCaption(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Portfolio Category</label>
                    <select
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl p-2.5 font-semibold text-slate-800 cursor-pointer"
                    >
                      <option value="clinical">Clinical Infrastructure</option>
                      <option value="aesthetics">Smile Makeover / Restorations</option>
                      <option value="equipment">Premium Laser Instrumentation</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Commit Gallery Card
                  </button>
                </form>

                <div className="p-3 bg-white/70 rounded-xl text-[9px] text-slate-500 font-sans leading-relaxed border border-slate-200">
                  <span className="block font-bold">Standard Preloaded Fallbacks:</span>
                  You can append royalty-free Unsplash aesthetic links or mock photography URL strings securely.
                </div>
              </div>

              {/* Display list */}
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryCms.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-150 rounded-2xl p-1 relative overflow-hidden group">
                    <img 
                      src={item.url} 
                      alt={item.caption} 
                      className="w-full h-34 object-cover rounded-xl bg-slate-50 border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="p-2 space-y-0.5 select-none text-[10px] truncate">
                      <span className="font-extrabold text-slate-800 truncate block">{item.caption}</span>
                      <span className="text-[8px] uppercase tracking-wider text-sky-600 font-bold bg-sky-50 p-1 rounded inline-block">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="absolute right-3.5 top-3.5 bg-slate-900 border border-slate-850 p-1.5 rounded-lg text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: Blog Article lists CMS */}
        {cmsTab === "blogs" && (
          <div className="space-y-6">
            
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex justify-between items-center">
              <div>
                <h3 className="font-display font-bold text-sm text-gray-800">Specialty Blog Articles and Clinical Papers (CMS)</h3>
                <p className="text-[10px] text-gray-400">Configure search categorization keywords and SEO tags securely.</p>
              </div>

              {!isBlogFormOpen && (
                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogTitle("");
                    setBlogExcerpt("");
                    setBlogContent("");
                    setSeoKeys("");
                    setIsBlogFormOpen(true);
                  }}
                  className="bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider px-4.5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Create Articles
                </button>
              )}
            </div>

            {/* Custom Blog forms */}
            {isBlogFormOpen && (
              <form onSubmit={handleBlogSubmit} className="bg-slate-50 border border-slate-150 rounded-3xl p-6 space-y-4 text-xs font-sans animate-fade-in relative">
                
                <button 
                  type="button" 
                  onClick={() => setIsBlogFormOpen(false)}
                  className="p-1 absolute right-4 top-4 hover:bg-gray-200 text-slate-400 hover:text-slate-705 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <h4 className="font-display font-bold text-sm text-gray-900 border-b border-gray-250 pb-2">
                  {editingBlogId ? "Modify Blog specs" : "Publish Dental Educational Post"}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Article Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Microscopic Root Canal: A Painless Marvel"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Status</label>
                    <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-slate-200 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setBlogStatus("published")}
                        className={`flex-1 py-1 px-3 rounded-lg transition-all ${blogStatus === "published" ? "bg-emerald-600 text-white" : "text-slate-500"}`}
                      >
                        Publish
                      </button>
                      <button
                        type="button"
                        onClick={() => setBlogStatus("draft")}
                        className={`flex-1 py-1 px-3 rounded-lg transition-all ${blogStatus === "draft" ? "bg-slate-900 text-white" : "text-slate-500"}`}
                      >
                        Draft
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Category Tag</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl p-2.5 font-semibold text-slate-800 cursor-pointer"
                    >
                      <option value="Oral Care">Oral Care</option>
                      <option value="Cosmetics">Cosmetics</option>
                      <option value="Periodontology">Periodontology</option>
                      <option value="Pediatrics">Pediatrics & Kids Care</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Physician Author Name</label>
                    <select
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl p-2.5 font-semibold text-slate-800 cursor-pointer"
                    >
                      <option value="Dr. Eleanor Vance">Dr. Eleanor Vance</option>
                      <option value="Dr. Julian Thorne">Dr. Julian Thorne</option>
                      <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">SEO Keywords Metas</label>
                    <input
                      type="text"
                      placeholder="e.g. implants, laser, rootcanal"
                      value={seoKeys}
                      onChange={(e) => setSeoKeys(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl p-3 font-semibold text-slate-850"
                    />
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Article Brief Excerpt *</label>
                    <input
                      type="text"
                      required
                      placeholder="Quick summary snippet..."
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl p-3 font-semibold text-slate-850"
                    />
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-505 block">Educational Post Contents *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Detailed healthcare parameters..."
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-sky-500 focus:outline-none rounded-xl p-3 text-slate-800 resize-none font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => { setIsBlogFormOpen(false); setEditingBlogId(null); }}
                    className="bg-slate-200 text-slate-700 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-550 text-white py-2 px-6 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Commit blog article
                  </button>
                </div>

              </form>
            )}

            {/* Existing blogs directory cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPostsCms.map((item) => (
                <div key={item.id} className="bg-white border border-gray-150 rounded-2xl p-5 relative group flex flex-col justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1.5 pr-14 select-none">
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-extrabold text-sky-600">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h4 className="font-display font-extrabold text-sm text-gray-900 leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 font-sans font-semibold">Author: {item.author} ({item.date})</p>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed line-clamp-2">{item.excerpt}</p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span className={`px-2 py-0.5 rounded ${item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-150 text-slate-600"}`}>
                      {item.status === "published" ? "Published" : "Draft"}
                    </span>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startBlogEdit(item)}
                        className="text-sky-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlogPost(item.id, item.title)}
                        className="text-rose-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
