import React, { useState } from "react";
import { 
  Mail, MessageSquare, Trash2, CheckCircle2, ChevronRight, Eye, 
  Send, RefreshCw, X, AlertCircle, FileText, Calendar, Info
} from "lucide-react";

interface AdminFeedbackProps {
  contacts: any[];
  setContacts: React.Dispatch<React.SetStateAction<any[]>>;
  addActivityLog: (act: string) => void;
}

export default function AdminFeedback({ contacts, setContacts, addActivityLog }: AdminFeedbackProps) {
  
  // Custom message details drawer
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  
  // Simulated reply editor
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  const activeMsg = activeMessageId ? contacts.find(c => c.id === activeMessageId) : null;

  const handleMessageDelete = (mId: string) => {
    setContacts(contacts.filter(c => c.id !== mId));
    addActivityLog(`Archived visitor contact inquiry ID: ${mId}`);
    if (activeMessageId === mId) {
      setActiveMessageId(null);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMsg) return;

    setIsReplying(true);
    setTimeout(() => {
      setIsReplying(false);
      setReplySuccess(true);
      addActivityLog(`Billing & Coordination Desk dispatched inquiry reply to ${activeMsg.email}`);
      
      setTimeout(() => {
        setReplySuccess(false);
        setReplyText("");
        setActiveMessageId(null);
      }, 1500);

    }, 800);
  };

  const toggleMsgRead = (mId: string) => {
    const updated = contacts.map(c => {
      if (c.id === mId) return { ...c, read: true };
      return c;
    });
    setContacts(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs">
        <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Inbound Contact Inquiries & Reviews</h2>
        <p className="text-xs text-brand-text-muted mt-1.5">Moderate patient communication channels, analyze incoming questions, and send rapid replies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Messages list */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="border-b border-gray-50 pb-3 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">Inquiry Mailbox ({contacts.length})</span>
              <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">POP3 Server Active</span>
            </div>

            <div className="divide-y divide-gray-50/90 max-h-[460px] overflow-y-auto pr-1">
              {contacts.length === 0 ? (
                <div className="text-center py-16 text-gray-400 italic">Inbound inbox is currently empty.</div>
              ) : (
                contacts.map((msg) => {
                  const isRead = msg.read === true;
                  const isSelected = activeMessageId === msg.id;
                  
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setActiveMessageId(msg.id);
                        toggleMsgRead(msg.id);
                      }}
                      className={`p-4 flex items-start gap-3.5 transition-all rounded-xl cursor-pointer ${
                        isSelected 
                          ? "bg-sky-50/70 border border-sky-100/50 scale-[1.01]" 
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      {/* Read status icon */}
                      <div className={`mt-1 p-1.5 rounded-lg shrink-0 ${isRead ? "bg-slate-100 text-slate-400" : "bg-sky-100 text-sky-600 animate-pulse"}`}>
                        <Mail className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-center gap-2">
                          <span className={`text-sm text-gray-900 truncate ${isRead ? "font-bold" : "font-black"}`}>
                            {msg.fullName}
                          </span>
                          <span className="text-[9px] text-gray-400 shrink-0">{msg.createdAt ? msg.createdAt.split(" ")[0] : "Recent"}</span>
                        </div>
                        <span className="text-[10px] text-sky-600 font-bold block truncate">Service Match: {msg.service || "General Inquiry"}</span>
                        <p className="text-[11px] text-slate-500 leading-normal line-clamp-1 truncate font-medium">"{msg.message}"</p>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* Right Side: Message details panel and simulated responses form */}
        <div className="lg:col-span-6">
          {activeMsg ? (
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 space-y-5 shadow-xs relative">
              
              <button
                onClick={() => setActiveMessageId(null)}
                className="p-1.5 absolute right-4 top-4 hover:bg-gray-100 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-gray-50 pb-4">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-teal-850 bg-teal-50 px-2 rounded font-sans inline-block">
                  Case ticket #{activeMsg.id}
                </span>
                <h3 className="font-display font-extrabold text-lg text-gray-900 mt-2">{activeMsg.fullName}</h3>
                <div className="flex flex-col text-[11px] text-slate-450 mt-1 block font-semibold leading-tight">
                  <span>Contact Email: <strong className="text-slate-700 select-all">{activeMsg.email}</strong></span>
                </div>
              </div>

              {/* Inquiry message box */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[12px] text-slate-700 leading-relaxed font-sans space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Inquiry Copy:</span>
                <p className="font-medium">"{activeMsg.message}"</p>
              </div>

              {/* Write simulated clinical SMTP reply */}
              <div className="border-t border-gray-100 pt-5 space-y-3.5">
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-500">Clinical Desk Response Console</h4>
                  <p className="text-[10px] text-gray-400">Dispatch an immediate advice response to patient's email address.</p>
                </div>

                {replySuccess ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-2 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Secure reply transmitted via SMTP relay successfully!</span>
                  </div>
                ) : (
                  <form onSubmit={handleReplySubmit} className="space-y-3">
                    <textarea
                      rows={3}
                      required
                      placeholder="Type diagnostic recommendations or scheduling advice..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-sky-500 focus:outline-none rounded-xl p-3 text-xs text-slate-800 resize-none font-medium leading-relaxed"
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-400 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" /> Automatically templates signature from clinical coordinate.
                      </span>
                      
                      <button
                        type="submit"
                        disabled={isReplying}
                        className="bg-slate-900 hover:bg-slate-850 text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                      >
                        {isReplying ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Dispatch SMTP Reply</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-[32px] p-16 text-center shadow-xs space-y-3.5">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-gray-900">No active inquiry selected</h4>
                <p className="text-xs text-brand-text-muted leading-relaxed max-w-sm mx-auto">
                  Click on any incoming patient inquiry on the left column to analyze messages, read communication credentials, and draft clinical advice responses.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
