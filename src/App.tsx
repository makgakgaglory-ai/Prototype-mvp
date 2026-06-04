import React, { useState } from 'react';

// ==========================================
// SYSTEM TYPE INTERFACES
// ==========================================
export type UserRole = 'LANDING' | 'SCHOOL' | 'SPONSOR' | 'ADMIN';

export interface SchoolRequest {
  id: string;
  schoolName: string;
  location: string;
  category: 'Textbooks' | 'Sanitation' | 'Sports' | 'Stationery' | 'Electronics';
  quantity: number;
  motivation: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent' | 'Active';
  targetAmount: number;
  currentAmount: number;
  status: 'Pending' | 'Voucher Issued' | 'Redeemed' | 'Partially Funded';
  supplier: string;
}

// ==========================================
// SEED DATA REFLECTING THE DESIGNS
// ==========================================
const initialRequests: SchoolRequest[] = [
  {
    id: 'REQ-001',
    schoolName: 'Thusanang Primary',
    location: 'Limpopo · Quintile 1',
    category: 'Textbooks',
    quantity: 180,
    motivation: 'Core curriculum learning guidelines lack sufficient book resources for foundational development sets.',
    urgency: 'Urgent',
    targetAmount: 4200,
    currentAmount: 1596,
    status: 'Redeemed',
    supplier: 'Waltons Office Supplies'
  },
  {
    id: 'REQ-002',
    schoolName: 'Siyakhula High',
    location: 'Eastern Cape · Quintile 2',
    category: 'Sanitation',
    quantity: 12,
    motivation: 'Awaiting specialized programmatic facility hardware restoration frameworks to address capacity conditions.',
    urgency: 'Active',
    targetAmount: 8000,
    currentAmount: 5760,
    status: 'Voucher Issued',
    supplier: 'BuildIt Logistics'
  },
  {
    id: 'REQ-003',
    schoolName: 'Ikageng Combined',
    location: 'North West · Quintile 5',
    category: 'Sports',
    quantity: 45,
    motivation: 'Extracurricular inventory setup requirements need replacement kits to ensure structural team safety compliance.',
    urgency: 'Active',
    targetAmount: 3400,
    currentAmount: 2040,
    status: 'Pending',
    supplier: 'Local Logistics Hub'
  },
  {
    id: 'REQ-004',
    schoolName: 'Bophelong Secondary',
    location: 'Gauteng · Quintile 3',
    category: 'Stationery',
    quantity: 300,
    motivation: 'General study packages including workbooks and tools for mathematics distribution batches.',
    urgency: 'Low',
    targetAmount: 5600,
    currentAmount: 5600,
    status: 'Redeemed',
    supplier: 'Waltons Office Supplies'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<UserRole | 'LOGIN' | 'DETAIL' | 'HOW_IT_WORKS'>('LANDING');
  const [activeRole, setActiveRole] = useState<UserRole>('LANDING');
  const [loginTab, setLoginTab] = useState<'SPONSOR' | 'SCHOOL'>('SPONSOR');
  const [requests, setRequests] = useState<SchoolRequest[]>(initialRequests);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  
  // Funding Simulator Inputs
  const [pledgeAmount, setPledgeAmount] = useState<string>('');

  // ==========================================
  // AUTHENTICATION & ROUTING HANDLERS
  // ==========================================
  const handleLogin = (role: UserRole) => {
    setActiveRole(role);
    setCurrentView(role);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(loginTab);
    setCurrentView(loginTab);
  };

  const handleLogout = () => {
    setActiveRole('LANDING');
    setCurrentView('LANDING');
    setSelectedRequestId(null);
  };

  const handlePledgeSubmit = (id: string) => {
    const amount = Number(pledgeAmount);
    if (!amount || amount <= 0) return;

    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const nextAmount = req.currentAmount + amount;
        const complete = nextAmount >= req.targetAmount;
        return {
          ...req,
          currentAmount: Math.min(nextAmount, req.targetAmount),
          status: complete ? 'Redeemed' : 'Partially Funded'
        };
      }
      return req;
    }));
    setPledgeAmount('');
    setCurrentView('SPONSOR');
  };

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  // Computed metrics for the Sponsor Dashboard
  const totalPledged = requests.reduce((acc, curr) => acc + curr.currentAmount, 0) + 230604;
  const totalRedeemed = requests.filter(r => r.status === 'Redeemed').reduce((acc, curr) => acc + curr.currentAmount, 0) + 192804;

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-slate-800 flex flex-col font-sans antialiased">
      
      {/* GLOBAL NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { setCurrentView('LANDING'); setSelectedRequestId(null); }}>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Sponsor<span className="text-[#D39313]">Buddy</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-slate-900 cursor-pointer transition" onClick={() => setCurrentView('LANDING')}>Home</span>
            <span className="hover:text-slate-900 cursor-pointer transition" onClick={() => { handleLogin('SPONSOR'); setCurrentView('SPONSOR'); }}>Find a School</span>
            <span className="hover:text-slate-900 cursor-pointer transition" onClick={() => setCurrentView('HOW_IT_WORKS')}>How It Works</span>
            <span className="hover:text-slate-900 cursor-pointer transition" onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }}>For Sponsors</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {activeRole !== 'LANDING' ? (
            <div className="flex items-center gap-4">
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold px-2.5 py-1 rounded">
                Active Node: {activeRole} Console
              </span>
              <button onClick={handleLogout} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-wider">
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setCurrentView('LOGIN')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition px-3 py-1.5">
                Log In
              </button>
              <button onClick={() => setCurrentView('LOGIN')} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 py-2 rounded shadow-sm tracking-wide transition">
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start w-full">
        
        {/* ==========================================
            VIEW 1: HOME MARKETING PLATFORM
           ========================================== */}
        {currentView === 'LANDING' && (
          <div className="w-full flex flex-col items-center">
            
            <div className="w-full bg-[#1E1C1A] text-white py-16 px-6 text-center border-b border-stone-800 relative overflow-hidden">
              <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                <span className="text-xs font-bold tracking-widest text-[#D39313] uppercase block">
                  Connecting Sponsors to Schools
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
                  Fund What Schools <span className="text-[#D39313]">Actually Need.</span>
                </h1>
                <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
                  A transparent B2B2C marketplace connecting verified South African public schools with corporate sponsors — no cash, no guesswork.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button onClick={() => { setActiveRole('SPONSOR'); setCurrentView('SPONSOR'); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-6 py-3 rounded tracking-wide transition shadow-md">
                    Browse Schools ↗
                  </button>
                  <button onClick={() => { setLoginTab('SCHOOL'); setCurrentView('LOGIN'); }} className="bg-transparent hover:bg-white/5 text-white font-bold text-xs px-6 py-3 rounded border border-white tracking-wide transition">
                    Register Your School
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full bg-white border-b border-slate-200 shadow-sm max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 py-6 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">2,400+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Schools Registered</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">R 18M+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pledged to Date</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">100%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Voucher-Based</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">B-BBEE</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">CSI Compliant</p>
              </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-6 py-16 space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">How It Works</h2>
                <p className="text-xs text-slate-500 font-medium">Four simple steps from need to verified real-world impact</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "School Registers", desc: "EMIS-verified profile + itemised resource requests parameters." },
                  { title: "Needs Listed", desc: "Stationery, textbooks, sports gear, sanitation infrastructure arrays categorized." },
                  { title: "Sponsor Pledges", desc: "Funds routed via digital closed voucher loops only — zero cash transfers." },
                  { title: "Impact Reported", desc: "Detailed audit trail generated for custom corporate CSI & B-BBEE scorecards." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm relative group hover:shadow-md transition">
                    <span className="absolute top-4 right-4 text-3xl font-black text-slate-100 group-hover:text-amber-100 transition">{idx + 1}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-4 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => setCurrentView('HOW_IT_WORKS')} className="text-xs font-bold text-[#D39313] hover:underline">
                  Read Detailed Process & Registration Guide &rarr;
                </button>
              </div>
            </div>

            <div className="w-full bg-white border-t border-slate-200/60 py-16 px-6">
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#D39313] uppercase block">Schools</span>
                    <h2 className="text-xl font-black text-slate-900">Featured Schools In Need</h2>
                  </div>
                  <button onClick={() => { setActiveRole('SPONSOR'); setCurrentView('SPONSOR'); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-[10px] font-bold px-3 py-1.5 rounded tracking-wide uppercase transition">
                    View All Schools ↗
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {requests.slice(0, 3).map(req => {
                    const pct = Math.round((req.currentAmount / req.targetAmount) * 100);
                    return (
                      <div key={req.id} className="border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm hover:border-slate-300 transition flex flex-col justify-between bg-slate-50/50">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{req.schoolName}</h4>
                              <p className="text-[11px] text-slate-400 font-medium">{req.location}</p>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${req.urgency === 'Urgent' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                              {req.urgency}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-mono font-medium">{req.category}</p>
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D39313] h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400 font-medium">{pct}% funded</span>
                            <button onClick={() => { setSelectedRequestId(req.id); setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-[10px] font-bold px-2.5 py-1 rounded transition">
                              Pledge Now ↗
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full bg-[#D39313] text-white py-12 px-6 text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl sm:text-2xl font-black">Ready to Make an Impact?</h3>
                <p className="text-xs text-amber-50/80 max-w-md mx-auto">Join thousands of verified public schools and leading corporate entities building a verified pipeline for South African youth.</p>
                <button onClick={() => setCurrentView('LOGIN')} className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs px-5 py-2.5 rounded shadow mt-2 transition tracking-wide">
                  Get Started Today ↗
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            VIEW 1.5: HOW IT WORKS SECTION (NEW)
           ========================================== */}
        {currentView === 'HOW_IT_WORKS' && (
          <div className="w-full max-w-4xl mx-auto px-6 my-12 space-y-12">
            
            {/* Header intro */}
            <div className="bg-[#1E1C1A] text-white p-8 rounded-2xl border border-stone-800 space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-[#D39313] uppercase block">Platform Framework</span>
              <h2 className="text-3xl font-black tracking-tight text-white">What is SponsorBuddy?</h2>
              <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
                SponsorBuddy is a transparent digital pipeline built to connect South African public schools directly with corporate CSI spend. Instead of transferring untraceable cash, our marketplace handles itemised inventory management through verified regional vendor fulfillment networks. Every transaction is 100% voucher-based and fully audited to comply with custom B-BBEE Socio-Economic Development scorecards.
              </p>
            </div>

            {/* Split onboarding pipelines */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Sponsor Column */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#D39313] tracking-widest uppercase block">For Corporates</span>
                  <h3 className="text-lg font-black text-slate-900">Registering as a Sponsor</h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Streamline corporate socio-economic development compliance and fulfill social responsibility plans with strict financial oversight.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="bg-amber-100 text-[#D39313] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Create Corporate Account</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Submit your company information parameters and link your primary verification tracking tags.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-amber-100 text-[#D39313] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Browse Itemised Portfolios</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Filter by location, category (Textbooks, Sanitation, Infrastructure), or school quintile indicators.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-amber-100 text-[#D39313] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Commit Voucher Pledges</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Fund resource batches. Funds convert to merchant inventory credit vouchers accessible only to specific pre-vetted suppliers.</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="w-full bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs py-2.5 rounded shadow transitional tracking-wide uppercase">
                  Sign Up as a Corporate Sponsor ↗
                </button>
              </div>

              {/* School Column */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-[#D39313] tracking-widest uppercase block">For Institutions</span>
                  <h3 className="text-lg font-black text-slate-900">Registering Your School</h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  List specific resource needs securely to gain visibility among major corporate sponsors searching for socio-economic development assignments.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="bg-stone-100 text-stone-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">EMIS Validation Check</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Provide your official Department of Basic Education EMIS credential parameters along with regional context documentation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-stone-100 text-stone-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Log Item Requests</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Input precise batch parameters (e.g., "180 mathematics textbooks") with motivation guidelines explaining your urgency levels.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-stone-100 text-stone-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Receive Direct Delivery</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Once a sponsor fulfills a voucher, our automated delivery infrastructure works with regional suppliers to ship items to your door.</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => { setLoginTab('SCHOOL'); setCurrentView('LOGIN'); }} className="w-full bg-[#1E1C1A] hover:bg-stone-800 text-white font-bold text-xs py-2.5 rounded shadow transitional tracking-wide uppercase">
                  Register Your School to Get Help ↗
                </button>
              </div>

            </div>

            {/* Back button link alignment */}
            <div className="text-center pt-4">
              <button onClick={() => setCurrentView('LANDING')} className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">
                &larr; Return to Home Dashboard Overview
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW 2: AUTHORIZATION PORTAL DUAL SPLIT SCREEN
           ========================================== */}
        {currentView === 'LOGIN' && (
          <div className="w-full max-w-5xl mx-auto my-12 bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden grid md:grid-cols-2 min-h-[500px]">
            
            <div className="bg-[#1E1C1A] text-white p-10 flex flex-col justify-between relative">
              <span className="text-xs font-black text-slate-400 tracking-wider uppercase">SponsorBuddy Gateway</span>
              
              <div className="space-y-4 max-w-xs">
                <span className="text-[10px] font-bold tracking-widest text-[#D39313] uppercase block">Welcome Back</span>
                <h2 className="text-2xl font-black tracking-tight leading-tight">Continue making school funding transparent.</h2>
                <p className="text-xs text-stone-400 leading-relaxed">Log in to manage active pipelines, analyze verification indexes, process item validation tracks, or generate localized infrastructure parameters.</p>
              </div>

              <div className="border border-stone-800 bg-stone-900/40 p-4 rounded-xl max-w-xs">
                <p className="text-lg font-black text-[#D39313]">100%</p>
                <p className="text-[9px] font-bold text-stone-400 tracking-widest uppercase mt-0.5">Voucher-Based Giving Ecosystem</p>
              </div>
            </div>

            <div className="p-10 flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">Log in</h3>
                <p className="text-xs text-slate-400 mt-1">Access your verified custom environment using registered credentials.</p>
              </div>

              <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 text-center text-xs font-bold">
                <button 
                  onClick={() => setLoginTab('SPONSOR')} 
                  className={`py-2 rounded-md transition ${loginTab === 'SPONSOR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Sponsor
                </button>
                <button 
                  onClick={() => setLoginTab('SCHOOL')} 
                  className={`py-2 rounded-md transition ${loginTab === 'SCHOOL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  School
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input type="email" required placeholder="name@company.co.za" className="w-full text-xs border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#D39313]" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <span className="text-[10px] text-[#D39313] hover:underline cursor-pointer font-medium">Forgot password?</span>
                  </div>
                  <input type="password" required placeholder="••••••••••••" className="w-full text-xs border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#D39313]" />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="remember" className="rounded border-slate-300 text-[#D39313] focus:ring-[#D39313]" />
                  <label htmlFor="remember" className="text-xs text-slate-500 font-medium select-none">Remember me for quick access</label>
                </div>

                <button type="submit" className="w-full bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold py-3 rounded-lg shadow transition tracking-wide uppercase">
                  Log in to Dashboard ↗
                </button>
              </form>

              <div className="relative text-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">or</span>
              </div>

              <button onClick={() => { setActiveRole(loginTab); setCurrentView(loginTab); }} className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Continue with Google Session
              </button>
            </div>

          </div>
        )}

        {/* ==========================================
            VIEW 3: CORPORATE SPONSOR DASHBOARD PANEL
           ========================================== */}
        {currentView === 'SPONSOR' && (
          <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase">07 — CSI Dashboard · Acme Group</span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Acme Group CSI Dashboard</h2>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">2026 financial year · B-BBEE Socio-Economic Development tracking index</p>
              </div>
              <div className="flex gap-2">
                <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2 rounded transition shadow-sm">
                  Export Report ↗
                </button>
                <button onClick={() => handleLogin('SPONSOR')} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-4 py-2 rounded transition shadow shadow-sm tracking-wide">
                  New Pledge ↗
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm border-t-4 border-amber-500">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Total Pledged</span>
                <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">R {totalPledged.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm border-t-4 border-emerald-500">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Vouchers Redeemed</span>
                <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">R {totalRedeemed.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm border-t-4 border-blue-500">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Schools Supported</span>
                <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">18</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm border-t-4 border-purple-500">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Provinces Reached</span>
                <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">4</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Recent Pledges Portfolio</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                        <th className="py-2.5 px-3">School Name</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {requests.map(req => (
                        <tr key={req.id} className="hover:bg-slate-50/60 transition">
                          <td className="py-3 px-3 font-bold text-slate-900">{req.schoolName}</td>
                          <td className="py-3 px-3 text-slate-500">{req.category}</td>
                          <td className="py-3 px-3 text-slate-900 font-bold">R {req.targetAmount.toLocaleString()}</td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full ${
                              req.status === 'Redeemed' ? 'bg-emerald-50 text-emerald-700' :
                              req.status === 'Voucher Issued' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button onClick={() => { setSelectedRequestId(req.id); setCurrentView('DETAIL'); }} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Spend by Category</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Localized programmatic capital allocations</p>
                </div>

                <div className="flex justify-center py-4">
                  <div className="w-28 h-28 rounded-full border-[14px] border-amber-500 border-r-emerald-500 border-b-blue-500 border-l-slate-200 relative flex items-center justify-center">
                    <div className="absolute bg-white rounded-full w-16 h-16 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-inner">
                      CSI Data
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-medium text-slate-600">
                  <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>Textbooks</div><span className="font-bold text-slate-900">42%</span></div>
                  <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>Sanitation</div><span className="font-bold text-slate-900">31%</span></div>
                  <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>Sports Gear</div><span className="font-bold text-slate-900">18%</span></div>
                  <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>Other Units</div><span className="font-bold text-slate-900">9%</span></div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==========================================
            VIEW 4: SCHOOL MANAGEMENT SYSTEM INTERFACE
           ========================================== */}
        {currentView === 'SCHOOL' && (
          <div className="w-full max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm h-fit space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">Institution Parameters</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">Demo School Instance</h3>
              </div>
              <div className="space-y-2 text-xs font-medium text-slate-600 border-t border-slate-100 pt-3">
                <div><span className="text-slate-400 block text-[10px] uppercase">EMIS Code Number</span><span className="font-mono font-bold text-slate-900">EMIS123456</span></div>
                <div><span className="text-slate-400 block text-[10px] uppercase">Verification Status</span><span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-bold inline-block mt-0.5">CIPC & EMIS Secured</span></div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Active Requests Pipeline</h3>
              <div className="space-y-3">
                {requests.map(req => (
                  <div key={req.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">{req.id}</span>
                      <h4 className="font-bold text-slate-900 mt-2 text-sm">{req.category} Fulfillment Kit</h4>
                      <p className="text-slate-500 text-[11px] max-w-md mt-0.5 line-clamp-1">{req.motivation}</p>
                    </div>
                    <button onClick={() => { setSelectedRequestId(req.id); setCurrentView('DETAIL'); }} className="text-[#D39313] hover:underline font-bold">
                      Open Parameters &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW 5: DETAILED INTERACTION PROFILE
           ========================================== */}
        {currentView === 'DETAIL' && selectedRequest && (
          <div className="w-full max-w-3xl mx-auto p-6 space-y-4">
            <button onClick={() => setCurrentView(activeRole === 'LANDING' ? 'SPONSOR' : activeRole)} className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider">
              &larr; Back to Platform View
            </button>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-start gap-4">
                <div>
                  <span className="font-mono text-xs text-slate-400 block">{selectedRequest.id} · {selectedRequest.location}</span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedRequest.schoolName}</h2>
                </div>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {selectedRequest.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">Requirement Motivation</span>
                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-4 rounded-xl leading-relaxed">{selectedRequest.motivation}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-medium border-t border-slate-100 pt-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Assigned System Supplier</span>
                  <span className="text-slate-900 font-bold text-sm mt-0.5 block">{selectedRequest.supplier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Financial Allocation Target</span>
                  <span className="text-slate-900 font-bold text-sm mt-0.5 block">R {selectedRequest.currentAmount.toLocaleString()} / R {selectedRequest.targetAmount.toLocaleString()}</span>
                </div>
              </div>

              {activeRole === 'SPONSOR' && selectedRequest.status !== 'Redeemed' && (
                <div className="bg-amber-50/50 border border-amber-200/60 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Simulate Transaction Fulfillment</h4>
                  <div className="flex gap-2 max-w-sm">
                    <input 
                      type="number" 
                      placeholder="Enter Amount ZAR" 
                      className="bg-white border border-slate-200 p-2 text-xs rounded-lg w-full focus:outline-none"
                      value={pledgeAmount}
                      onChange={e => setPledgeAmount(e.target.value)}
                    />
                    <button onClick={() => handlePledgeSubmit(selectedRequest.id)} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 rounded-lg whitespace-nowrap tracking-wide transition shadow-sm">
                      Commit Pledge
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <footer className="bg-slate-900 border-t border-stone-800 text-stone-500 py-8 px-6 text-center text-xs font-medium">
        <p>© 2026 SponsorBuddy (Pty) Ltd. All rights reserved. Registered under CIPC documentation indexes.</p>
      </footer>
      
    </div>
  );
}