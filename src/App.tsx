import React, { useState } from 'react';

// ==========================================
// SYSTEM TYPE INTERFACES
// ==========================================
export type UserRole = 'LANDING' | 'SCHOOL' | 'SPONSOR' | 'LOGIN';
export type SubView = 'DASHBOARD' | 'BROWSE_SCHOOLS' | 'MY_REQUESTS' | 'MY_PLEDGES' | 'TRANSACTIONS' | 'REPORTS' | 'IMPACT' | 'VOUCHERS' | 'PROFILE';

export interface SchoolRequest {
  id: string;
  schoolName: string;
  location: string;
  category: 'Textbooks' | 'Infrastructure' | 'Sport Equipment' | 'Classroom Furniture' | 'Sanitation' | 'Sports' | 'Stationery';
  quantity: number;
  motivation: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent' | 'Active';
  targetAmount: number;
  currentAmount: number;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Completed' | 'Voucher Issued' | 'Redeemed';
  supplier: string;
  date: string;
}

// ==========================================
// SEED DATA MATCHING THE DESIGN
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
    status: 'Pending',
    supplier: 'Waltons Office Supplies',
    date: '2 hours ago'
  },
  {
    id: 'REQ-002',
    schoolName: 'Siyakhula High',
    location: 'Eastern Cape · Quintile 2',
    category: 'Sport Equipment',
    quantity: 12,
    motivation: 'Awaiting specialized programmatic facility hardware restoration frameworks to address capacity conditions.',
    urgency: 'Active',
    targetAmount: 8500,
    currentAmount: 8500,
    status: 'Approved',
    supplier: 'BuildIt Logistics',
    date: '1 day ago'
  },
  {
    id: 'REQ-003',
    schoolName: 'Ikageng Combined',
    location: 'North West · Quintile 5',
    category: 'Classroom Furniture',
    quantity: 45,
    motivation: 'Extracurricular inventory setup requirements need replacement kits to ensure structural team safety compliance.',
    urgency: 'Active',
    targetAmount: 120000,
    currentAmount: 60000,
    status: 'Under Review',
    supplier: 'Local Logistics Hub',
    date: '3 days ago'
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
    status: 'Completed',
    supplier: 'Waltons Office Supplies',
    date: '5 days ago'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<UserRole>('LANDING');
  const [activeRole, setActiveRole] = useState<'SCHOOL' | 'SPONSOR' | null>(null);
  const [subView, setSubView] = useState<SubView>('DASHBOARD');
  const [loginTab, setLoginTab] = useState<'SPONSOR' | 'SCHOOL'>('SPONSOR');
  const [requests, setRequests] = useState<SchoolRequest[]>(initialRequests);
  
  // Modal & Input state setups
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newCategory, setNewCategory] = useState<any>('Textbooks');
  const [newQty, setNewQty] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newMotivation, setNewMotivation] = useState('');

  const handleLogin = (role: 'SCHOOL' | 'SPONSOR') => {
    setActiveRole(role);
    setCurrentView(role);
    setSubView('DASHBOARD');
  };

  const handleLogout = () => {
    setActiveRole(null);
    setCurrentView('LANDING');
    setSubView('DASHBOARD');
  };

  const scrollToSection = (id: string) => {
    // If the user isn't on the landing page, bring them back first
    if (currentView !== 'LANDING') {
      setCurrentView('LANDING');
      // Timeout allows the DOM node to mount completely before calculating position offsets
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCost || !newQty) return;

    const newReq: SchoolRequest = {
      id: `REQ-00${requests.length + 1}`,
      schoolName: 'Demo School Instance',
      location: 'Gauteng · Quintile 2',
      category: newCategory,
      quantity: Number(newQty),
      motivation: newMotivation || 'Standard operational educational resource allocation requirement.',
      urgency: 'Active',
      targetAmount: Number(newCost),
      currentAmount: 0,
      status: 'Pending',
      supplier: 'Approved Regional Supplier Framework',
      date: 'Just now'
    };

    setRequests([newReq, ...requests]);
    setShowRequestModal(false);
    setNewQty('');
    setNewCost('');
    setNewMotivation('');
    setSubView('DASHBOARD');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans antialiased flex flex-col scroll-smooth">
      
      {/* =========================================================================
          PUBLIC VISITOR INTERFACE (MARKETING & ONBOARDING PORTAL)
         ========================================================================= */}
      {currentView === 'LANDING' && (
        <>
          <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-xs">
            <div className="flex items-center gap-10">
              <span className="text-xl font-black tracking-tight text-slate-900 cursor-pointer" onClick={() => setCurrentView('LANDING')}>
                Sponsor<span className="text-[#D39313]">Buddy</span>
              </span>
              <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
                <span onClick={() => { setCurrentView('LANDING'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-900 cursor-pointer transition">Home</span>
                <span onClick={() => scrollToSection('metrics-panel')} className="hover:text-slate-900 cursor-pointer transition">Find a School</span>
                <span onClick={() => scrollToSection('how-it-works-panel')} className="hover:text-slate-900 cursor-pointer transition">How It Works</span>
                <span onClick={() => scrollToSection('onboarding-console')} className="hover:text-slate-900 cursor-pointer transition">For Sponsors</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition px-3 py-2">Log In</button>
              <button onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition">Get Started</button>
            </div>
          </nav>

          {/* MAIN HERO PROMO GRAPHIC BANNER */}
          <div className="bg-[#1E1C1A] text-white py-20 px-6 text-center bg-gradient-to-b from-stone-800 to-[#1E1C1A] border-b border-stone-900 relative">
            <div className="max-w-4xl mx-auto space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#D39313] uppercase block">Connecting Sponsors to Schools</span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
                Fund What Schools <span className="text-[#D39313]">Actually Need.</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
                A transparent B2B2C marketplace connecting verified South African public schools with corporate sponsors — no cash, no guesswork.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md transition uppercase tracking-wide">Browse Schools ↗</button>
                <button onClick={() => { setLoginTab('SCHOOL'); setCurrentView('LOGIN'); }} className="bg-transparent hover:bg-white/5 text-white font-bold text-xs px-6 py-3 rounded-lg border border-stone-700 transition">Register Your School</button>
              </div>
            </div>
          </div>

          {/* NEW GRAPHICAL SEGMENTED ONBOARDING CONSOLE MAPPER ("I WANT TO...") */}
          <div id="onboarding-console" className="max-w-7xl mx-auto w-full px-6 -mt-8 relative z-20 scroll-mt-24">
            <div className="bg-[#111111] border border-stone-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl text-stone-300">
              <div className="p-4 rounded-xl hover:bg-stone-900/60 transition group border border-transparent hover:border-stone-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">🏢</div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">I'm a Sponsor</h3>
                  <p className="text-xs text-stone-400">Browse schools and make real structural CSI impact footprints.</p>
                  <button onClick={() => { setLoginTab('SPONSOR'); setCurrentView('LOGIN'); }} className="text-xs font-bold text-amber-500 pt-1 block group-hover:underline">Get Started &rarr;</button>
                </div>
              </div>
              <div className="p-4 rounded-xl hover:bg-stone-900/60 transition group border border-transparent hover:border-stone-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">🏫</div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">I'm a School</h3>
                  <p className="text-xs text-stone-400">Request sponsorship allocations for precise, itemized resources needed.</p>
                  <button onClick={() => { setLoginTab('SCHOOL'); setCurrentView('LOGIN'); }} className="text-xs font-bold text-amber-500 pt-1 block group-hover:underline">Get Started &rarr;</button>
                </div>
              </div>
              <div className="p-4 rounded-xl hover:bg-stone-900/60 transition group border border-transparent hover:border-stone-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">ℹ️</div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">Learn More</h3>
                  <p className="text-xs text-stone-400">See how SponsorBuddy routes closed-loop voucher infrastructure safely.</p>
                  <span onClick={() => scrollToSection('how-it-works-panel')} className="text-xs font-bold text-amber-500 pt-1 block cursor-pointer group-hover:underline">Learn More &rarr;</span>
                </div>
              </div>
            </div>
          </div>

          {/* PUBLIC REVENUE TRACK RECORDS */}
          <div id="metrics-panel" className="w-full bg-white border-b border-slate-200/60 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 py-10 mt-12 text-center rounded-xl shadow-xs scroll-mt-24">
            <div>
              <p className="text-3xl font-black text-slate-900">2,400+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Schools Registered</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">R 18M+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Pledged to Date</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">100%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Voucher-Based</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">B-BBEE</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">CSI Compliant</p>
            </div>
          </div>

          {/* HOW IT WORKS PROCESS PIPELINE FLOW BLOCK */}
          <div id="how-it-works-panel" className="max-w-7xl mx-auto w-full px-6 py-20 text-center space-y-12 scroll-mt-24">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">How It Works</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">Four simple steps from verified institutional need to real-world community impact.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { step: '1', title: 'Schools Register', desc: 'Schools create an EMIS-verified profile containing precise itemized request requirements.' },
                { step: '2', title: 'Request Sponsorship', desc: 'Schools log structural resource pipelines directly matching localized curriculum guidelines.' },
                { step: '3', title: 'Sponsors Pledge', desc: 'Corporates commit CSI capital directly via secure closed-loop programmatic digital supply channels.' },
                { step: '4', title: 'Impact Delivered', desc: 'Vouchers route to audited supplier hubs, feeding transparency ledger lines for scorecards.' }
              ].map(item => (
                <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs relative space-y-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs">{item.step}</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="bg-stone-950 text-stone-500 py-10 border-t border-stone-900 mt-auto text-center text-xs">
            <p>© 2026 SponsorBuddy (Pty) Ltd. All rights reserved. CIPC Documentation Compliance Registered Profile Node.</p>
          </footer>
        </>
      )}

      {/* =========================================================================
          LOGIN CONTROLLER GATEWAY
         ========================================================================= */}
      {currentView === 'LOGIN' && (
        <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF9F6]">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            <div className="bg-[#1E1C1A] p-12 flex flex-col justify-between text-white bg-gradient-to-b from-stone-800 to-stone-950">
              <span className="text-lg font-black tracking-tight text-white cursor-pointer" onClick={() => setCurrentView('LANDING')}>
                Sponsor<span className="text-[#D39313]">Buddy</span>
              </span>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase block">Welcome Back</span>
                <h2 className="text-3xl font-black tracking-tight max-w-xs">Continue making school funding transparent.</h2>
                <p className="text-xs text-stone-400 max-w-xs leading-relaxed">Log in to manage active pledges, audit voucher tracks, or pull regulatory CSI tax compliance validation forms.</p>
              </div>
              <div className="bg-stone-900/60 border border-stone-800 p-3 rounded-xl inline-flex items-center gap-3 w-fit text-[11px] font-bold text-amber-400">
                <span>🛡️ 100% Voucher-Based Giving Pipeline</span>
              </div>
            </div>

            <div className="p-12 flex flex-col justify-center space-y-6 bg-white">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Log in</h3>
                <p className="text-xs text-slate-400">Access your dashboard node infrastructure instantly.</p>
              </div>
              <div className="bg-slate-100 p-1 rounded-xl grid grid-cols-2 text-center text-xs font-bold">
                <button onClick={() => setLoginTab('SPONSOR')} className={`py-2.5 rounded-lg transition ${loginTab === 'SPONSOR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}>Sponsor</button>
                <button onClick={() => setLoginTab('SCHOOL')} className={`py-2.5 rounded-lg transition ${loginTab === 'SCHOOL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}>School</button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Email Address</label>
                  <input type="email" defaultValue={loginTab === 'SPONSOR' ? 'corporate@acme.co.za' : 'principal@demo-school.edu.za'} className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[#D39313] bg-slate-50/50" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Password</label>
                    <span className="text-[10px] font-bold text-[#D39313] hover:underline cursor-pointer">Forgot?</span>
                  </div>
                  <input type="password" defaultValue="password123" className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-[#D39313] bg-slate-50/50" />
                </div>
                <button onClick={() => handleLogin(loginTab)} className="w-full bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition uppercase tracking-wider">Log In to Dashboard &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          AUTHENTICATED APPLICATION SUITE LAYOUT (DARK COMPACT INTERFACES)
         ========================================================================= */}
      {(currentView === 'SPONSOR' || currentView === 'SCHOOL') && (
        <div className="flex-1 flex min-h-0 bg-[#0F1115]">
          
          {/* FIXED LEFT SIDEBAR COMPACT CONTROL DASHBOARD MODULE */}
          <aside className="w-64 bg-[#161920] border-r border-slate-800/60 p-4 flex flex-col justify-between shrink-0 text-slate-400">
            <div className="space-y-8">
              <div className="px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center font-black text-xs text-white">SB</div>
                <span className="text-base font-black tracking-tight text-white cursor-pointer" onClick={handleLogout}>
                  Sponsor<span className="text-[#D39313]">Buddy</span>
                </span>
              </div>

              {/* ROUTING BUTTON TRACK MATRIX */}
              <nav className="space-y-1 text-xs font-bold">
                <button onClick={() => setSubView('DASHBOARD')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'DASHBOARD' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>📊 Dashboard</button>
                {activeRole === 'SPONSOR' ? (
                  <>
                    <button onClick={() => setSubView('BROWSE_SCHOOLS')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'BROWSE_SCHOOLS' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>🔍 Browse Schools</button>
                    <button onClick={() => setSubView('MY_PLEDGES')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'MY_PLEDGES' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>🤝 My Pledges</button>
                    <button onClick={() => setSubView('TRANSACTIONS')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'TRANSACTIONS' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>💸 Transactions</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSubView('MY_REQUESTS')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'MY_REQUESTS' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>📋 My Requests</button>
                    <button onClick={() => setSubView('VOUCHERS')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'VOUCHERS' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>🎟️ Vouchers</button>
                  </>
                )}
                <button onClick={() => setSubView('REPORTS')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'REPORTS' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>📈 Reports <span className="text-[9px] bg-amber-500 text-white font-mono px-1 rounded ml-auto">NEW</span></button>
                <button onClick={() => setSubView('IMPACT')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'IMPACT' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>🌱 Impact</button>
                {activeRole === 'SCHOOL' && (
                  <button onClick={() => setSubView('PROFILE')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${subView === 'PROFILE' ? 'bg-amber-500/10 text-amber-500 border-l-4 border-amber-500 pl-2' : 'hover:bg-slate-800/50 text-slate-400'}`}>🏫 School Profile</button>
                )}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4 text-xs font-bold space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-stone-700 text-stone-200 font-bold flex items-center justify-center uppercase text-[10px]">
                  {activeRole === 'SPONSOR' ? 'AG' : 'DS'}
                </div>
                <div className="truncate">
                  <p className="text-white text-[11px] truncate">{activeRole === 'SPONSOR' ? 'Acme Corporate Group' : 'Demo School Instance'}</p>
                  <p className="text-[10px] text-slate-500 truncate font-mono">{activeRole === 'SPONSOR' ? 'CSI Manager Node' : 'EMIS Verified Node'}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-stone-500 hover:text-white transition text-[11px] uppercase tracking-wider block">Sign Out &rarr;</button>
            </div>
          </aside>

          {/* APPLICATION MAIN STAGE LAYOUT VIEWS */}
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            
            {/* TOP HEADER CONSOLE BLOCK ACTIONS */}
            <header className="bg-[#161920] border-b border-slate-800/60 px-8 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                {/* Back to Home Navigation breadcrumb inside app panels */}
                <span onClick={handleLogout} className="text-xs text-slate-500 hover:text-[#D39313] transition cursor-pointer font-bold uppercase tracking-wider">&larr; Public Portal</span>
                <span className="text-slate-700 text-xs">/</span>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">{subView.replace('_', ' ')} Console View</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:text-white">🔔</div>
                {activeRole === 'SCHOOL' && (
                  <button onClick={() => setShowRequestModal(true)} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 py-2 rounded-lg shadow transition">➕ Request Sponsorship</button>
                )}
                {activeRole === 'SPONSOR' && (
                  <button onClick={() => setSubView('BROWSE_SCHOOLOS' as any)} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 py-2 rounded-lg shadow transition">✨ New Pledge ↗</button>
                )}
              </div>
            </header>

            <div className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
              
              {/* =========================================================================
                  SPONSOR VIEW: CUSTOM DESIGN IMPLEMENTATION
                 ========================================================================= */}
              {activeRole === 'SPONSOR' && subView === 'DASHBOARD' && (
                <div className="space-y-8">
                  <div className="bg-[#161920] border border-slate-800/60 p-8 rounded-2xl flex flex-wrap justify-between items-center gap-6 shadow-xl relative overflow-hidden">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-white tracking-tight">Welcome back, Sponsor!</h2>
                      <p className="text-xs text-slate-400">Here's what's happening with your corporate CSI impact allocation footprint profiles.</p>
                    </div>
                  </div>

                  {/* METRIC GRID BANNER ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Pledged', value: 'R 4.2M', subtitle: 'View details →', border: 'border-t-amber-500' },
                      { label: 'Schools Supported', value: '36', subtitle: 'View schools →', border: 'border-t-blue-500' },
                      { label: 'Vouchers Redeemed', value: '128', subtitle: 'View transactions →', border: 'border-t-emerald-500' },
                      { label: 'Provinces Reached', value: '5', subtitle: 'View impact →', border: 'border-t-purple-500' }
                    ].map((card, i) => (
                      <div key={i} className={`bg-[#161920] border border-slate-800/60 p-5 rounded-xl text-left border-t-4 ${card.border} shadow-sm space-y-1`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{card.label}</span>
                        <p className="text-2xl font-black text-white">{card.value}</p>
                        <span className="text-[10px] font-bold text-[#D39313] block cursor-pointer hover:underline pt-1">{card.subtitle}</span>
                      </div>
                    ))}
                  </div>

                  {/* LOWER LAYER STRUCTURAL DATA SPLIT PANELS */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#161920] border border-slate-800/60 rounded-xl p-6 space-y-4">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Activity Framework Matrix</h3>
                      <div className="space-y-3">
                        {requests.slice(0, 3).map(req => (
                          <div key={req.id} className="p-4 bg-[#1C202B] border border-slate-800/60 rounded-xl flex justify-between items-center gap-4 text-xs">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center">🤝</div>
                              <div>
                                <p className="text-white font-bold">Pledge of R {(req.targetAmount/2).toLocaleString()} to {req.schoolName}</p>
                                <span className="text-[10px] text-slate-500 block font-mono mt-0.5">{req.date}</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-bold">Completed</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#161920] border border-slate-800/60 rounded-xl p-6 space-y-4">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Top Impact Areas</h3>
                      <div className="space-y-4 pt-2">
                        {[
                          { category: 'Education Resources', pct: '45%', color: 'bg-amber-500' },
                          { category: 'Infrastructure', pct: '30%', color: 'bg-blue-500' },
                          { category: 'Sport Equipment', pct: '15%', color: 'bg-emerald-500' },
                          { category: 'Other', pct: '10%', color: 'bg-slate-600' }
                        ].map((item, i) => (
                          <div key={i} className="space-y-1.5 text-xs">
                            <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-slate-300">{item.category}</span>
                              <span className="text-white font-mono">{item.pct}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: item.pct }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  SCHOOL VIEW: CUSTOM DESIGN IMPLEMENTATION
                 ========================================================================= */}
              {activeRole === 'SCHOOL' && subView === 'DASHBOARD' && (
                <div className="space-y-8">
                  <div className="bg-[#161920] border border-slate-800/60 p-8 rounded-2xl flex flex-wrap justify-between items-center gap-6 shadow-xl relative overflow-hidden">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-white tracking-tight">Welcome back, School!</h2>
                      <p className="text-xs text-slate-400">Track your verified resource requests pipelines and sponsorship logs securely.</p>
                    </div>
                  </div>

                  {/* SCHOOL METRIC STATUS ROW DISPLAY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Active Requests', value: '3', subtitle: 'View requests →', border: 'border-t-amber-500' },
                      { label: 'Approved', value: '1', subtitle: 'View details →', border: 'border-t-blue-500' },
                      { label: 'Completed', value: '0', subtitle: 'View details →', border: 'border-t-emerald-500' },
                      { label: 'Total Value Received', value: 'R 120,000', subtitle: 'View vouchers →', border: 'border-t-purple-500' }
                    ].map((card, i) => (
                      <div key={i} className={`bg-[#161920] border border-slate-800/60 p-5 rounded-xl text-left border-t-4 ${card.border} shadow-sm space-y-1`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{card.label}</span>
                        <p className="text-2xl font-black text-white">{card.value}</p>
                        <span className="text-[10px] font-bold text-[#D39313] block cursor-pointer hover:underline pt-1">{card.subtitle}</span>
                      </div>
                    ))}
                  </div>

                  {/* LOWER LAYER SPLIT PIPELINES */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#161920] border border-slate-800/60 rounded-xl p-6 space-y-4">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Updates</h3>
                      <div className="space-y-3">
                        {requests.map(req => (
                          <div key={req.id} className="p-4 bg-[#1C202B] border border-slate-800/60 rounded-xl flex justify-between items-center text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] bg-slate-800 text-slate-400 border border-slate-700 px-1 py-0.5 rounded font-bold">{req.id}</span>
                                <p className="text-white font-bold">Your request for {req.category} is currently {req.status.toLowerCase()}</p>
                              </div>
                              <span className="text-[10px] text-slate-500 block font-mono mt-1">Track Log · Budget Framework: R {req.targetAmount.toLocaleString()}</span>
                            </div>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${
                              req.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              req.status === 'Under Review' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#161920] border border-slate-800/60 rounded-xl p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Need Help?</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">Learn how to request corporate sponsorship frameworks and safely redeem supplier digital item vouchers using our resource playbook guidelines.</p>
                      </div>
                      <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-lg border border-slate-700 transition">View Guide Playbook</button>
                    </div>
                  </div>

                  {/* NEW DESIGN SEGMENT 6: REQUEST STATUS LEGEND MAPPER EXPLAINED */}
                  <div className="bg-[#161920] border border-slate-800/60 rounded-xl p-6 space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pipeline Request Status Matrix Guide</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      {[
                        { title: 'Pending', desc: 'Awaiting primary sponsor review allocations.', color: 'bg-amber-500 text-stone-950' },
                        { title: 'Under Review', desc: 'Sponsor corporate networks are actively reviewing assets.', color: 'bg-blue-500 text-white' },
                        { title: 'Approved', desc: 'Request fully approved by sponsoring groups.', color: 'bg-emerald-500 text-white' },
                        { title: 'Completed', desc: 'Digital supply chain vouchers fully issued & fulfilled.', color: 'bg-purple-500 text-white' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-[#1C202B] border border-slate-800/60 rounded-xl space-y-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.color}`}>{item.title}</span>
                          <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* fallback message for secondary navigation frames */}
              {subView !== 'DASHBOARD' && (
                <div className="bg-[#161920] border border-slate-800/60 rounded-xl p-12 text-center text-slate-400 space-y-4">
                  <p className="text-xs font-mono">Secondary view layout frame index node: [ {subView} ] is connected to tracking workflows.</p>
                  <button onClick={() => setSubView('DASHBOARD')} className="bg-[#D39313] text-white text-xs font-bold px-4 py-2 rounded-lg">Return to main dashboard overview hub</button>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          WIZARD MODAL DIALOGUE POPUP (CLEAN NEW RESOURCE REQUEST FLOW)
         ========================================================================= */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#161920] border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl text-white space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black uppercase tracking-wider text-white">Create New Resource Request Pipeline</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>
            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold uppercase tracking-wide">Category Framework</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)} className="w-full bg-[#1C202B] border border-slate-700 p-2.5 rounded-xl text-white font-medium focus:outline-none focus:border-[#D39313]">
                    <option value="Textbooks">Textbooks</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Sport Equipment">Sport Equipment</option>
                    <option value="Classroom Furniture">Classroom Furniture</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Stationery">Stationery</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold uppercase tracking-wide">Quantity Requirements</label>
                  <input type="number" required placeholder="e.g. 150" value={newQty} onChange={e => setNewQty(e.target.value)} className="w-full bg-[#1C202B] border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#D39313]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-slate-400 font-bold uppercase tracking-wide">Estimated Supplier Cost Framework (ZAR)</label>
                <input type="number" required placeholder="e.g. 8500" value={newCost} onChange={e => setNewCost(e.target.value)} className="w-full bg-[#1C202B] border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#D39313]" />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-400 font-bold uppercase tracking-wide">Institutional Project Motivation Statements</label>
                <textarea required rows={3} placeholder="Provide structural justification metrics parameters..." value={newMotivation} onChange={e => setNewMotivation(e.target.value)} className="w-full bg-[#1C202B] border border-slate-700 p-2.5 rounded-xl text-white focus:outline-none focus:border-[#D39313]" />
              </div>
              <div className="flex gap-3 pt-2 justify-end text-xs font-bold">
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition">Cancel</button>
                <button type="submit" className="bg-[#D39313] text-white px-5 py-2 rounded-xl shadow transition">Inject Request Node &rarr;</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}