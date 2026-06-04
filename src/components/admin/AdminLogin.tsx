import React, { useState } from "react";
import { ShieldCheck, KeyRound, Mail, AlertCircle, Fingerprint, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminLoginProps {
  onLoginSuccess: (role: string) => void;
  addActivityLog: (act: string) => void;
}

export default function AdminLogin({ onLoginSuccess, addActivityLog }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("administrator"); // default role
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // High-fidelity security flows
  const [flow, setFlow] = useState<"login" | "forgot" | "otp">("login");
  
  // Forgot password flow states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  
  // OTP standard codes
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("749812"); // Preset mock OTP code

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (email !== "admin@dentalclinic.com" || password !== "Dental@123") {
      setError("Incorrect administrator credentials. Please check details and try again.");
      addActivityLog(`Failed login attempt for ID: ${email || "empty"}`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Advance to 2FA / OTP step
      setFlow("otp");
      // Pick a random code
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      addActivityLog(`1FA authenticated for administrator. Dispatched 2FA key OTP: ${newOtp}`);
    }, 850);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    
    setForgotStatus("sending");
    setTimeout(() => {
      setForgotStatus("sent");
      addActivityLog(`Password reset link dispatched for administrator email: ${forgotEmail}`);
    }, 1000);
  };

  const handleOtpInput = (index: number, val: string) => {
    if (isNaN(Number(val)) && val !== "") return;
    
    const updated = [...otpCode];
    updated[index] = val.slice(-1);
    setOtpCode(updated);
    setOtpError("");

    // Auto-focus next field
    if (val !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otpCode[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyOtp = () => {
    const codeString = otpCode.join("");
    if (codeString === generatedOtp || codeString === "111111") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        addActivityLog(`Secured session authorized for role: [${role.toUpperCase()}]`);
        onLoginSuccess(role);
      }, 700);
    } else {
      setOtpError("Invalid 2FA security key. Please enter the current valid code.");
      addActivityLog("Failed 2FA validation check");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100 rounded-[40px] shadow-2xl relative overflow-hidden my-6 border border-slate-800">
      
      {/* Immersive backing atmosphere */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-sky-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10 p-2 sm:p-4">
        
        {/* Brand identity header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/10 border border-sky-400/20">
            <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">Kothari Staff Terminal</h2>
            <p className="text-xs text-slate-400 font-medium">Bespoke Enterprise Clinical Care Portal</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {flow === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-white">Identify Session</h3>
                <p className="text-xs text-slate-450">Use secure clinical board privileges to log in.</p>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-xs text-rose-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-450 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Role Switcher */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Board Role Privilege</label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800/80 text-[11px]">
                    {[
                      { val: "administrator", label: "Admin" },
                      { val: "coordinator", label: "Coordinator" },
                      { val: "dentist", label: "Clinician" }
                    ].map((r) => (
                      <button
                        key={r.val}
                        type="button"
                        onClick={() => setRole(r.val)}
                        className={`py-1.5 rounded-lg font-bold transition-all ${
                          role === r.val 
                            ? "bg-sky-600 text-white shadow-xs" 
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Clinical Username ID</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="admin@dentalclinic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-800/90 focus:border-sky-500 rounded-xl pl-10 pr-4 py-3 text-xs font-sans text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Secret Code Signature</label>
                    <button
                      type="button"
                      onClick={() => setFlow("forgot")}
                      className="text-[10px] text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                    >
                      Forgot Shield Key?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-800/90 focus:border-sky-500 rounded-xl pl-10 pr-4 py-3 text-xs font-sans text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-sky-500/5 hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Fingerprint className="w-4.5 h-4.5" />
                        <span>Authenticate Staff Identity</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

              <div className="pt-2 text-center text-[10px] text-slate-500 bg-slate-900/30 py-3 px-4 rounded-xl border border-slate-900">
                <span className="block font-bold">Clinical Demo Access Gate:</span>
                <code className="text-sky-350 block mt-1 font-mono text-[11px]">admin@dentalclinic.com | Dental@123</code>
              </div>
            </motion.div>
          )}

          {flow === "forgot" && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-white">Reset Credentials</h3>
                <p className="text-xs text-slate-400">Request password verification signature.</p>
              </div>

              {forgotStatus === "sent" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-xs space-y-2">
                  <p className="font-bold">✓ Verification Transmission Complete</p>
                  <p>In a real production scope, an automated authentication link is issued. In this portal, the administrator credentials can be reset offline. You may safely return to login.</p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Registered Admin Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. admin@dentalclinic.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full bg-slate-900/90 border border-slate-800/90 focus:border-sky-500 rounded-xl pl-10 pr-4 py-3 text-xs font-sans text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setFlow("login"); setForgotStatus(""); }}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={forgotStatus === "sending"}
                      className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {forgotStatus === "sending" ? "Processing..." : "Dispatch Link"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {flow === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
            >
              <div className="space-y-1 text-center">
                <h3 className="font-display font-extrabold text-lg text-white">Enter 2FA Security Key</h3>
                <p className="text-xs text-slate-400">Two-factor validation code sent via smart secure signal.</p>
              </div>

              {otpError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs text-center">
                  {otpError}
                </div>
              )}

              <div className="flex justify-center gap-2" id="otp-input-row">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx]}
                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-12 bg-slate-900 border border-slate-850 hover:border-slate-800 focus:border-sky-500 rounded-xl text-center font-mono font-black text-lg text-white focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <div className="space-y-3.5">
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Verify and Open Dashboard</span>
                </button>

                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Haven't received? Check clinical log</span>
                  <button 
                    type="button" 
                    onClick={() => {
                        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        setGeneratedOtp(newOtp);
                        addActivityLog(`Re-issued 2FA validation signature key code: ${newOtp}`);
                    }} 
                    className="text-sky-400 hover:underline font-semibold cursor-pointer"
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              {/* Dynamic Simulated Device displaying Code */}
              <div className="bg-sky-500/5 border border-sky-500/10 p-3.5 rounded-2xl relative">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-450 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Interactive Live Authenticator Simulator</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed mb-2.5">
                  Your simulated 2FA device is linked. Enter this active key or type <code className="text-white font-mono bg-slate-900 px-1 py-0.5 rounded">111111</code> to bypass:
                </p>
                <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="font-mono font-black text-base text-emerald-400 tracking-widest">{generatedOtp}</span>
                  <button
                    onClick={() => {
                      setOtpCode(generatedOtp.split(""));
                      addActivityLog("2FA secure key copy-to-input requested by operator");
                    }}
                    className="text-[9px] uppercase font-sans font-black bg-sky-700/60 hover:bg-sky-700 hover:text-white px-2.5 py-1 rounded-lg text-sky-100 transition-colors pointer-cursor"
                  >
                    Autofill Code
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setFlow("login")}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer font-semibold underline"
                >
                  Cancel Authentication
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
