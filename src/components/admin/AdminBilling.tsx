import React, { useState } from "react";
import { 
  FileText, DollarSign, PenTool, CheckCircle2, Sliders, Plus, 
  Receipt, Download, CreditCard, Landmark, Wallet, Eye, X, 
  Trash2, ShieldCheck, Printer, Barcode
} from "lucide-react";

interface AdminBillingProps {
  bookings: any[];
  doctors: any[];
  services: any[];
  addActivityLog: (act: string) => void;
}

export default function AdminBilling({ bookings, doctors, services, addActivityLog }: AdminBillingProps) {
  
  // Dynamic pricing overrides
  const [prices, setPrices] = useState<Record<string, number>>({
    clean: 1500,
    "root-canal": 4500,
    braces: 35000,
    implants: 45000,
    whitening: 60000,
    makeover: 120000,
    pediatric: 2000,
    surgery: 12000
  });

  // Invoice creator form states
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [discountValue, setDiscountValue] = useState(0);
  const [customPatientName, setCustomPatientName] = useState("");

  const [isCmsPricingOpen, setIsCmsPricingOpen] = useState(false);

  // Past invoices history
  const [invoices, setInvoices] = useState([
    {
      invoiceNo: "TX-2026-0819",
      patientName: "Eleanor Vance",
      treatmentName: "Smile Makeover",
      dentistName: "Dr. Eleanor Vance",
      baseCost: 120000,
      discount: 5000,
      gst: 20700, // 18% of (120000 - 5000)
      totalAmount: 135700,
      method: "Credit Card",
      status: "paid",
      date: "2026-05-12"
    },
    {
      invoiceNo: "TX-2026-1042",
      patientName: "Julian Thorne",
      treatmentName: "Root Canal",
      dentistName: "Dr. Julian Thorne",
      baseCost: 4500,
      discount: 0,
      gst: 810,
      totalAmount: 5310,
      method: "UPI",
      status: "paid",
      date: "2026-06-02"
    }
  ]);

  // Invoice view details modal
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState<any | null>(null);

  const calculateInvoiceGst = (base: number, disc: number) => {
    const taxable = Math.max(0, base - disc);
    return Math.floor(taxable * 0.18); // 18% GST standard
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pick name and treatment details
    let pName = customPatientName.trim();
    if (!pName && selectedPatientId) {
      const matchB = bookings.find(b => b.id === selectedPatientId);
      if (matchB) pName = matchB.fullName;
    }
    
    if (!pName) {
      alert("Please designate an active patient name/classification.");
      return;
    }

    if (!selectedServiceId) {
      alert("Please choose a dental treatment procedure.");
      return;
    }

    const srvObj = services.find(s => s.id === selectedServiceId);
    const docObj = doctors.find(d => d.id === selectedDoctorId);

    const baseCost = prices[selectedServiceId] || 3000;
    const calculatedGst = calculateInvoiceGst(baseCost, discountValue);
    const totalAmount = Math.max(0, baseCost - discountValue) + calculatedGst;

    const newInvoice = {
      invoiceNo: "TX-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000),
      patientName: pName,
      treatmentName: srvObj?.name || "General Consultancy",
      dentistName: docObj ? docObj.name : "Clinical Associate",
      baseCost,
      discount: discountValue,
      gst: calculatedGst,
      totalAmount,
      method: paymentMethod,
      status: "paid",
      date: new Date().toISOString().split("T")[0]
    };

    setInvoices([newInvoice, ...invoices]);
    addActivityLog(`Billing Desk generated Tax Invoice [${newInvoice.invoiceNo}] for ${pName} - Amount: ₹${totalAmount}`);
    
    // Auto launch receipt viewer modal!
    setActiveReceiptInvoice(newInvoice);

    // Reset fields
    setCustomPatientName("");
    setSelectedPatientId("");
    setSelectedServiceId("");
    setSelectedDoctorId("");
    setDiscountValue(0);
  };

  const handlePriceUpdate = (srvId: string, val: number) => {
    setPrices({ ...prices, [srvId]: val });
    addActivityLog(`Board revised base operational cost of [${srvId}] to ₹${val}`);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Upper header */}
      <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-sky-600">Financial Ledger</span>
          <h2 className="font-display font-black text-2xl text-gray-900 leading-none">Invoicing & Claims Gateway</h2>
          <p className="text-xs text-brand-text-muted">Draft clinical tax invoices, configure procedure base costs, and compile direct receipts.</p>
        </div>

        <button 
          onClick={() => setIsCmsPricingOpen(!isCmsPricingOpen)}
          className="bg-slate-50 border border-gray-100 hover:border-sky-300 text-slate-700 hover:text-sky-700 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Receipt className="w-4 h-4" />
          <span>{isCmsPricingOpen ? "Close Master Prices" : "Edit Treatment Prices"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Invoice draft workbench */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-50 pb-3 flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-bold text-base text-gray-900 leading-none">Generate Patient Receipt</h3>
          </div>

          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            
            {/* Pick patient or input manually */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Patient Association</label>
              <select
                value={selectedPatientId}
                onChange={(e) => {
                  setSelectedPatientId(e.target.value);
                  if (e.target.value) {
                    const matchB = bookings.find(b => b.id === e.target.value);
                    if (matchB) {
                      setCustomPatientName("");
                      setSelectedServiceId(matchB.serviceId);
                      setSelectedDoctorId(matchB.doctorId);
                    }
                  }
                }}
                className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl px-3 py-2.5 font-sans font-semibold text-slate-800"
              >
                <option value="">-- Dynamic intake reservation match --</option>
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>{b.fullName} ({b.id.substring(0, 7)})</option>
                ))}
              </select>

              <div className="relative flex py-1 text-[9px] uppercase font-black text-slate-400 items-center">
                <div className="flex-grow border-t border-gray-100" />
                <span className="flex-shrink mx-2 text-[9px]">or walk-in entry</span>
                <div className="flex-grow border-t border-gray-100" />
              </div>

              <input
                type="text"
                placeholder="Direct Patient Name..."
                value={customPatientName}
                onChange={(e) => {
                  setCustomPatientName(e.target.value);
                  if (e.target.value) {
                    setSelectedPatientId("");
                  }
                }}
                className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl p-3 font-semibold text-slate-800"
              />
            </div>

            {/* Specialty treatment select */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Treatment Specialty</label>
              <select
                value={selectedServiceId}
                required
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl px-3 py-2.5 font-sans font-semibold text-slate-800"
              >
                <option value="">-- Choose Procedure --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} (Base: ₹{prices[s.id] || "TBD"})</option>
                ))}
              </select>
            </div>

            {/* Doctor assigned */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Operating Dentist</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full bg-slate-50 border border-transparent focus:border-sky-500 focus:outline-none rounded-xl px-3 py-2.5 font-sans font-semibold text-slate-800 animate-fade-in"
              >
                <option value="">-- Associate practitioner --</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                ))}
              </select>
            </div>

            {/* Payment channel */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">Payment Mode</label>
              <div className="grid grid-cols-2 gap-1.5 font-bold">
                {[
                  { id: "UPI", label: "UPI Scan", icon: Wallet },
                  { id: "Credit Card", label: "Card Pay", icon: CreditCard },
                  { id: "Cash", label: "Cash Desk", icon: DollarSign },
                  { id: "Net Banking", label: "Bank Wire", icon: Landmark }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id)}
                      className={`p-2.5 rounded-xl border text-[10px] font-sans flex items-center gap-1.5 transition-colors cursor-pointer ${
                        paymentMethod === item.id 
                          ? "bg-sky-50 border-sky-400 text-sky-700"
                          : "bg-slate-50 border-transparent text-slate-650 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional deduction discount */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span className="uppercase tracking-widest">Optional Rebate Discount</span>
                <span className="text-sky-600">₹{discountValue}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                step={250}
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full text-sky-600 focus:ring-0 focus:outline-none rounded"
              />
            </div>

            {/* Calculation pre-total preview */}
            {selectedServiceId && (
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-1.5 font-bold border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Base:</span>
                  <span className="text-gray-800">₹{prices[selectedServiceId]}</span>
                </div>
                {discountValue > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Rebate:</span>
                    <span>- ₹{discountValue}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">GST Standard (18%):</span>
                  <span className="text-gray-850">₹{calculateInvoiceGst(prices[selectedServiceId], discountValue)}</span>
                </div>
                <div className="border-t border-slate-200/60 pt-1.5 flex justify-between text-sm">
                  <span className="text-gray-800 font-extrabold uppercase text-[10px]">Tax Estimate:</span>
                  <span className="text-sky-700 font-black">
                    ₹{Math.max(0, prices[selectedServiceId] - discountValue) + calculateInvoiceGst(prices[selectedServiceId], discountValue)}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-550 text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-sky-500/5 hover:scale-[1.01] cursor-pointer text-center"
            >
              Issue and Print Invoice
            </button>

          </form>
        </div>

        {/* Right Side: Ledger table (plus base cost overrides if toggled) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Base cost configuration widget */}
          {isCmsPricingOpen && (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 animate-fade-in text-xs">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-2 mb-2">
                <div>
                  <h4 className="font-display font-bold text-emerald-800 text-sm">Master Clinical Base Pricings</h4>
                  <p className="text-[10px] text-emerald-600">Altering valuations will affect estimating widgets and newly created receipts.</p>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Ledger active</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans font-bold text-slate-700">
                {services.map((s) => (
                  <div key={s.id} className="bg-white border border-emerald-100/50 p-3 rounded-2xl flex flex-col justify-between">
                    <span className="text-[10px] text-gray-500 truncate block mb-1.5" title={s.name}>{s.name}</span>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-gray-400 font-bold block">₹</span>
                      <input
                        type="number"
                        step={250}
                        value={prices[s.id] || 0}
                        onChange={(e) => handlePriceUpdate(s.id, Number(e.target.value))}
                        className="w-full bg-slate-50 border border-transparent focus:border-emerald-500 focus:outline-none rounded-xl pl-6 pr-2 py-2 text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical ledger payments */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-4">
            <div className="border-b border-gray-50 pb-3">
              <h3 className="font-display font-bold text-base text-gray-900 leading-none">Aesthetic & Care Tax Receipts</h3>
              <p className="text-[10px] text-gray-400 font-sans">List of payments committed during current staff shift.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-gray-100 bg-slate-50 text-[9px] uppercase tracking-wider text-slate-400 font-black">
                    <th className="p-3 sm:px-4">Tx Reference ID</th>
                    <th className="p-3 sm:px-4">Patient Case</th>
                    <th className="p-3 sm:px-4">Treatment</th>
                    <th className="p-3 sm:px-4">Tax Fee Total</th>
                    <th className="p-3 sm:px-4">Channel Mode</th>
                    <th className="p-3 sm:px-4 text-right">Invoice View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/80">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/45 group transition-colors">
                      <td className="p-3 sm:px-4">
                        <code className="text-[10.5px] font-mono font-bold text-sky-700 bg-sky-50 border border-sky-100/50 rounded px-2 py-0.5">{inv.invoiceNo}</code>
                        <span className="text-[9px] text-gray-400 block mt-0.5">{inv.date}</span>
                      </td>
                      <td className="p-3 sm:px-4 font-bold text-gray-850 truncate max-w-28">{inv.patientName}</td>
                      <td className="p-3 sm:px-4">
                        <span className="font-semibold text-slate-700 block truncate max-w-32">{inv.treatmentName}</span>
                        <span className="text-[9px] text-slate-450 block truncate">{inv.dentistName}</span>
                      </td>
                      <td className="p-3 sm:px-4">
                        <span className="font-extrabold text-slate-800">₹{inv.totalAmount.toLocaleString()}</span>
                        {inv.discount > 0 && <span className="text-[9px] text-rose-500 block">Discount applied</span>}
                      </td>
                      <td className="p-3 sm:px-4">
                        <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 inline-block font-mono uppercase">
                          {inv.method}
                        </span>
                      </td>
                      <td className="p-3 sm:px-4 text-right">
                        <button
                          onClick={() => {
                            setActiveReceiptInvoice(inv);
                            addActivityLog(`Audited payment invoice details for TX: ${inv.invoiceNo}`);
                          }}
                          className="bg-slate-550 hover:bg-slate-650 border border-gray-100 p-2 rounded-xl text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* Invoice receipt details print modal */}
      {activeReceiptInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setActiveReceiptInvoice(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" />
          
          <div className="relative bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 z-10 font-sans text-xs">
            
            {/* Modal close */}
            <button 
              onClick={() => setActiveReceiptInvoice(null)}
              className="absolute right-4 top-4 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Receipt print area */}
            <div className="space-y-6 p-2 relative" id="tax-invoice-printable-area">
              
              {/* Header design logo */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-sky-600 flex items-center justify-center text-white font-extrabold text-[10px]">K</span>
                    <span className="font-display font-extrabold text-sm tracking-widest text-slate-900 uppercase">Kothari Dental Clinic</span>
                  </div>
                  <p className="text-[8px] text-gray-400 font-sans">Aesthetic & Family Care • Excellence in Care</p>
                  <p className="text-[8px] text-slate-500 font-medium">GSTIN: 27AACK9810D1ZX • Arcadia, IN</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black tracking-wider uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded inline-block border border-sky-100">
                    Official Tax Invoice
                  </span>
                  <p className="text-[9px] text-slate-500 mt-1">Invoice: <strong className="font-mono text-slate-800 font-black">{activeReceiptInvoice.invoiceNo}</strong></p>
                  <p className="text-[9px] text-slate-450">Date: {activeReceiptInvoice.date}</p>
                </div>
              </div>

              {/* Patient details row */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 block font-sans">Billed Patient</span>
                  <span className="font-extrabold text-slate-800 text-sm block">{activeReceiptInvoice.patientName}</span>
                  <span className="text-[9px] text-slate-500 block">Registration Code: Verified member</span>
                </div>
                <div className="space-y-0.5 text-right">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 block font-sans">Clinician Assigned</span>
                  <span className="font-bold text-slate-800 block">{activeReceiptInvoice.dentistName}</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="border-b border-gray-150 pb-4">
                <div className="grid grid-cols-12 font-bold text-[8px] uppercase text-gray-400 py-1.5 border-b border-gray-100 font-sans tracking-widest leading-none">
                  <span className="col-span-6">Procedure Specialty Description</span>
                  <span className="col-span-2 text-right">Base Fee</span>
                  <span className="col-span-2 text-right">Deductions</span>
                  <span className="col-span-2 text-right">Amount (₹)</span>
                </div>

                <div className="grid grid-cols-12 py-3 font-semibold text-gray-850 items-center">
                  <div className="col-span-6 space-y-0.5">
                    <span className="font-extrabold text-slate-900 text-sm block leading-tight">{activeReceiptInvoice.treatmentName}</span>
                    <span className="text-[9px] text-slate-500 block">Clinic Treatment Unit code: OP-{activeReceiptInvoice.invoiceNo.split("-").slice(-1)[0]}</span>
                  </div>
                  <span className="col-span-2 text-right font-semibold">₹{activeReceiptInvoice.baseCost.toLocaleString()}</span>
                  <span className="col-span-2 text-right font-semibold text-rose-600">-₹{activeReceiptInvoice.discount.toLocaleString()}</span>
                  <span className="col-span-2 text-right font-extrabold text-slate-800">
                    ₹{Math.max(0, activeReceiptInvoice.baseCost - activeReceiptInvoice.discount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Grand Total breakdown */}
              <div className="flex justify-end pt-2">
                <div className="w-52 space-y-1.5 font-bold text-[11px]">
                  <div className="flex justify-between text-gray-500">
                    <span>Taxable Subtotal:</span>
                    <span>₹{Math.max(0, activeReceiptInvoice.baseCost - activeReceiptInvoice.discount).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-500 text-[10px]">
                    <span className="flex flex-col">
                      <span>CGST (9.0%):</span>
                      <span>SGST (9.0%):</span>
                    </span>
                    <span className="text-right">
                      <span>₹{(activeReceiptInvoice.gst / 2).toFixed(1)}</span>
                      <span className="block">₹{(activeReceiptInvoice.gst / 2).toFixed(1)}</span>
                    </span>
                  </div>

                  <div className="border-t border-gray-200/80 pt-2 flex justify-between text-base leading-none">
                    <span className="text-slate-900 font-black uppercase text-[10px]">Grand Fee Due:</span>
                    <span className="text-sky-700 font-black select-all">₹{activeReceiptInvoice.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Mode confirmation stamp */}
              <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-5 mt-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-450 font-sans text-[8px] uppercase tracking-widest font-black">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Authorized payment seal
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed max-w-xs">
                    This is an electronically generated valid medical claim receipt registered under GST rules. Mode of settlement: <strong className="text-slate-800 uppercase font-mono">{activeReceiptInvoice.method}</strong>.
                  </p>
                </div>
                
                {/* Barcode artwork */}
                <div className="text-center font-mono opacity-70 shrink-0 select-none">
                  <Barcode className="w-16 h-7 mx-auto stroke-[1.5] text-slate-700" />
                  <span className="text-[7.5px] uppercase tracking-wider block text-slate-450 mt-1">TX-ID {activeReceiptInvoice.invoiceNo}</span>
                </div>
              </div>

            </div>

            {/* Print trigger actions */}
            <div className="flex gap-2.5 pt-2 border-t border-gray-100">
              <button
                onClick={() => setActiveReceiptInvoice(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Close View
              </button>
              <button
                onClick={() => {
                  window.print();
                  addActivityLog(`Printed medical tax invoice TX: ${activeReceiptInvoice.invoiceNo}`);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-850 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
