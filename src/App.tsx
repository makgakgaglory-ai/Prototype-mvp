import React, { useState } from 'react';

// ==========================================
// SYSTEM TYPE INTERFACES
// ==========================================
export type UserRole = 'LANDING' | 'SCHOOL' | 'SPONSOR';
export type DashboardTab = 'OVERVIEW' | 'SCHOOLS' | 'TRANSACTIONS' | 'REPORTS';

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
  status: 'Pending (Waiting for sponsor review)' | 'Approved (Sponsor accepted request)' | 'Completed (Funds allocated)';
  supplier: string;
}

// ==========================================
// SEED DATA REFLECTING SYSTEM LOGIC
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
    currentAmount: 4200,
    status: 'Completed (Funds allocated)',
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
    status: 'Approved (Sponsor accepted request)',
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
    currentAmount: 0,
    status: 'Pending (Waiting for sponsor review)',
    supplier: 'Local Logistics Hub'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<UserRole | 'LOGIN'>('LANDING');
  const [activeRole, setActiveRole] = useState<UserRole>('LANDING');
  const [activeTab, setActiveTab] = useState<DashboardTab>('OVERVIEW');
  const [loginTab, setLoginTab] = useState<'SPONSOR' | 'SCHOOL'>('SPONSOR');
  const [requests, setRequests] = useState<SchoolRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<SchoolRequest | null>(null);
  
  // UI Flow Notification Banners (Next Step Guidance)
  const [guidanceMessage, setGuidanceMessage] = useState<{current: string; next: string; outcome: string} | null>(null);

  // Form Management States
  const [showRequestWizard, setShowRequestWizard] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState<string>('');
  const [newCategory, setNewCategory] = useState<SchoolRequest['category']>('Textbooks');
  const [newQty, setNewQty] = useState<string>('');
  const [newCost, setNewCost] = useState<string>('');
  const [newMotivation, setNewMotivation] = useState<string>('');

  // ==========================================
  // EVENT HANDLERS & SIMULATORS
  // ==========================================
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(loginTab);
    setCurrentView(loginTab);
    setActiveTab('OVERVIEW');
    setShowRequestWizard(false);
    setSelectedRequest(null);

    // Contextual Step guidance instantly upon authentication entry point
    if (loginTab === 'SCHOOL') {
      setGuidanceMessage({
        current: "Registered & Verified Profile",
        next: "Submit a sponsorship request using the primary CTA below",
        outcome: "Get matched to a corporate sponsor voucher pipeline"
      });
    } else {
      setGuidanceMessage({
        current: "Authenticated Sponsor Profile",
        next: "Navigate to the 'Schools' tab to evaluate active requests",
        outcome: "Deploy targeted corporate CSI / B-BBEE funding allocations"
      });
    }
  };

  const handleLogout = () => {
    setActiveRole('LANDING');
    setCurrentView('LANDING');
    setGuidanceMessage(null);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCost || Number(newCost) <= 0) return;

    const newReq: SchoolRequest = {
      id: `REQ-00${requests.length + 1}`,
      schoolName: 'Demo School Instance',
      location: 'Gauteng · Quintile 2',
      category: newCategory,
      quantity: Number(newQty) || 1,
      motivation: newMotivation || 'General structural resource augmentation allocation.',
      urgency: 'Active',
      targetAmount: Number(newCost),
      currentAmount: 0,
      status: 'Pending (Waiting for sponsor review)',
      supplier: 'Regional Logistical Vendor'
    };

    setRequests([newReq, ...requests]);
    setShowRequestWizard(false);
    setActiveTab('OVERVIEW');
    
    // Set next step notification blueprint
    setGuidanceMessage({
      current: "Request Submitted Successfully",
      next: "Awaiting Corporate Sponsor Evaluation match",
      outcome: "Approved parameters trigger direct vendor voucher dispatch"
    });

    // Reset Form
    setNewQty('');
    setNewCost('');
    setNewMotivation('');
  };

  const handlePledgeSubmit = (id: string) => {
    const amount = Number(pledgeAmount);
    if (!amount || amount <= 0) return;

    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const totalFunded = req.currentAmount + amount;
        const fullyFunded = totalFunded >= req.targetAmount;
        return {
          ...req,
          currentAmount: Math.min(totalFunded, req.targetAmount),
          status: fullyFunded ? 'Completed (Funds allocated)' : 'Approved (Sponsor accepted request)'
        };
      }
      return req;
    }));

    setPledgeAmount('');
    setSelectedRequest(null);
    setActiveTab('TRANSACTIONS');

    setGuidanceMessage({
      current: "Pledge Funds Committed",
      next: "System processing closed-loop digital supply chain vouchers",
      outcome: "Direct product delivery to school with audited CSI track receipt"
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-slate-800 flex flex-col font-sans antialiased">
      
      {/* GLOBAL NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleLogout}>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Sponsor<span className="text-[#D39313]">Buddy</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {activeRole !== 'LANDING' ? (
            <div className="flex items-center gap-4">
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold px-2.5 py-1 rounded">
                Console: {activeRole} Portal
              </span>
              <button onClick={handleLogout} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition uppercase tracking-wider">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => setCurrentView('LOGIN')} className="bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold px-4 py-2 rounded shadow-sm tracking-wide transition">
              Portal Access Gateway &rarr;
            </button>
          )}
        </div>
      </nav>

      {/* SYSTEM BODY OVERVIEW CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        
        {/* LANDING MARKETING SCREEN */}
        {currentView === 'LANDING' && (
          <div className="w-full text-center py-24 bg-[#1E1C1A] text-white px-6">
            <h1 className="text-4xl font-black mb-4">Transparent Giving Infrastructure</h1>
            <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">Zero cash leakage. Direct itemised resource fulfillment channels for South African public schools.</p>
            <button onClick={() => setCurrentView('LOGIN')} className="bg-[#D39313] text-white text-xs font-bold px-6 py-3 rounded-lg uppercase">
              Enter Platform Gateway
            </button>
          </div>
        )}

        {/* ACCESS LOG-IN SYSTEM */}
        {currentView === 'LOGIN' && (
          <div className="w-full max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
            <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 text-center text-xs font-bold">
              <button onClick={() => setLoginTab('SPONSOR')} className={`py-2 rounded-md transition ${loginTab === 'SPONSOR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Corporate Sponsor</button>
              <button onClick={() => setLoginTab('SCHOOL')} className={`py-2 rounded-md transition ${loginTab === 'SCHOOL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>School Head</button>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Access Identifier</label>
                <input type="email" required placeholder="user@node.co.za" className="w-full text-xs border p-2.5 rounded-lg focus:outline-none focus:border-[#D39313]" />
              </div>
              <button type="submit" className="w-full bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wide">
                Authorize Profile &rarr;
              </button>
            </form>
          </div>
        )}

        {/* UNIFIED ROBUST DASHBOARD ROUTER FOR SPONSORS AND SCHOOLS */}
        {(currentView === 'SPONSOR' || currentView === 'SCHOOL') && (
          <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            
            {/* 🟢 BREADCRUMBS NAVIGATION CONSISTENCY FRAMEWORK */}
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 bg-white px-4 py-2 rounded-lg border border-slate-200/60 w-fit">
              <span className="hover:text-slate-900 cursor-pointer" onClick={handleLogout}>Home</span>
              <span>&gt;</span>
              <span className="hover:text-slate-900 cursor-pointer" onClick={() => { setActiveTab('OVERVIEW'); setSelectedRequest(null); setShowRequestWizard(false); }}>
                {activeRole === 'SPONSOR' ? 'Sponsor Console' : 'School Infrastructure Panel'}
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-bold capitalize">{activeTab.toLowerCase()}</span>
              {selectedRequest && (
                <>
                  <span>&gt;</span>
                  <span className="text-[#D39313] font-bold">Fulfillment ({selectedRequest.id})</span>
                </>
              )}
              {showRequestWizard && (
                <>
                  <span>&gt;</span>
                  <span className="text-[#D39313] font-bold">Sponsorship Request Creator</span>
                </>
              )}
            </div>

            {/* 🔴 NEXT STEP GUIDANCE NOTIFICATION ENGINE */}
            {guidanceMessage && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl shadow-sm relative">
                <button onClick={() => setGuidanceMessage(null)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-900 font-bold text-xs">✕</button>
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">💡 System Logic Roadmap Guidance</p>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="bg-white px-2.5 py-1 rounded border border-amber-200/80"><span className="text-slate-400 font-medium">You are here:</span> <strong className="text-slate-700">{guidanceMessage.current}</strong></div>
                  <span className="text-slate-400 font-bold">&rarr;</span>
                  <div className="bg-amber-600 px-2.5 py-1 rounded text-white shadow-sm"><span className="text-amber-100 font-medium">Next Step:</span> <strong>{guidanceMessage.next}</strong></div>
                  <span className="text-slate-400 font-bold">&rarr;</span>
                  <div className="bg-white px-2.5 py-1 rounded border border-emerald-200 text-emerald-800"><span className="text-slate-400 font-medium">Outcome:</span> <strong>{guidanceMessage.outcome}</strong></div>
                </div>
              </div>
            )}

            {/* INTEGRATED CENTRAL ROLE CONTROL HEADER */}
            <div className="bg-[#1E1C1A] text-white p-8 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#D39313] uppercase tracking-widest block">Role Landing Point Cluster</span>
                <h2 className="text-2xl font-black tracking-tight">
                  {activeRole === 'SCHOOL' ? 'Welcome back, Demo School Instance Node' : 'Welcome back, Corporate Sponsor Allocation Node'}
                </h2>
                <p className="text-xs text-stone-400">Manage, trace, and execute localized itemised resource loops from one centralized console track.</p>
              </div>

              {/* 🟠 HIGH-VISIBILITY PRIMARY ACTIONS (CRITICAL FIXES FOR VISIBILITY & ACCESSIBILITY) */}
              <div className="flex flex-wrap gap-3">
                {activeRole === 'SCHOOL' && (
                  <button onClick={() => { setShowRequestWizard(true); setSelectedRequest(null); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg tracking-wide transition uppercase">
                    ➕ Request Sponsorship (PRIMARY CTA)
                  </button>
                )}
                {activeRole === 'SPONSOR' && (
                  <button onClick={() => { setActiveTab('SCHOOLS'); setSelectedRequest(null); }} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg tracking-wide transition uppercase">
                    🔍 Browse Schools & Make Pledge (PRIMARY CTA)
                  </button>
                )}
                <button onClick={() => alert('Compiling structural platform ledger audit metrics... Export downloaded.')} className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center gap-1.5">
                  📥 Export Report (Secondary)
                </button>
              </div>
            </div>

            {/* 🟠 PERSISTENT SINGLE-PAGE INTERACTIVE DASHBOARD TABS MANAGEMENT */}
            <div className="bg-white p-1 rounded-xl border border-slate-200/80 grid grid-cols-4 text-center text-xs font-bold shadow-sm">
              <button onClick={() => { setActiveTab('OVERVIEW'); setSelectedRequest(null); setShowRequestWizard(false); }} className={`py-3 rounded-lg transition ${activeTab === 'OVERVIEW' && !showRequestWizard && !selectedRequest ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                📊 Overview Hub
              </button>
              <button onClick={() => { setActiveTab('SCHOOLS'); setSelectedRequest(null); setShowRequestWizard(false); }} className={`py-3 rounded-lg transition ${activeTab === 'SCHOOLS' && !showRequestWizard && !selectedRequest ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                🏫 Schools & Active Requests
              </button>
              <button onClick={() => { setActiveTab('TRANSACTIONS'); setSelectedRequest(null); setShowRequestWizard(false); }} className={`py-3 rounded-lg transition ${activeTab === 'TRANSACTIONS' && !showRequestWizard && !selectedRequest ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                💼 Ledger Transactions
              </button>
              <button onClick={() => { setActiveTab('REPORTS'); setSelectedRequest(null); setShowRequestWizard(false); }} className={`py-3 rounded-lg transition ${activeTab === 'REPORTS' && !showRequestWizard && !selectedRequest ? 'bg-slate-900 text-white shadow' : 'text-slate-400 hover:text-slate-600'}`}>
                📈 Compliance Reports
              </button>
            </div>

            {/* BACK ACTIONS WHEN WIZARDS/DETAILS INTERRUPT THE TAB VIEW */}
            {(showRequestWizard || selectedRequest) && (
              <button onClick={() => { setShowRequestWizard(false); setSelectedRequest(null); }} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition flex items-center gap-1">
                &larr; Back to Single Dashboard Tabs View
              </button>
            )}

            {/* ==========================================
                DYNAMIC SUB-CONTENT RENDERING LOOPS
               ========================================== */}
            
            {/* WIZARD FRAME: REQUEST SPONSORSHIP FORM */}
            {showRequestWizard && activeRole === 'SCHOOL' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-xl mx-auto shadow-md">
                <h3 className="font-black text-sm text-slate-900 mb-2 uppercase tracking-wide">Submit New Resource Need Pipeline</h3>
                <p className="text-slate-400 text-xs mb-4">Provide exact logistical system metric specifications for item procurement tracking arrays.</p>
                <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-500 uppercase mb-1">Resource Category</label>
                      <select value={newCategory} onChange={e => setNewCategory(e.target.value as any)} className="w-full border p-2 rounded bg-white">
                        <option value="Textbooks">Textbooks</option>
                        <option value="Sanitation">Sanitation</option>
                        <option value="Sports">Sports</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-500 uppercase mb-1">Quantity Units</label>
                      <input type="number" required placeholder="e.g., 200" value={newQty} onChange={e => setNewQty(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-500 uppercase mb-1">Estimated Supplier Framework Cost (ZAR)</label>
                    <input type="number" required placeholder="e.g., 6500" value={newCost} onChange={e => setNewCost(e.target.value)} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-500 uppercase mb-1">Motivation Declaration Statement</label>
                    <textarea required rows={3} placeholder="Describe exact contextual framework urgency parameters..." value={newMotivation} onChange={e => setNewMotivation(e.target.value)} className="w-full border p-2 rounded"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#D39313] text-white font-bold py-2.5 rounded-lg uppercase tracking-wide text-xs">
                    Inject Request Node into Verified Tracking Matrix ↗
                  </button>
                </form>
              </div>
            )}

            {/* WIZARD FRAME: PLEDGE ESCROW COMMITMENT DETAIL VIEW */}
            {selectedRequest && activeRole === 'SPONSOR' && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 max-w-xl mx-auto space-y-4 shadow-md">
                <h3 className="font-black text-base text-slate-900">Fulfill Request Cluster for {selectedRequest.schoolName}</h3>
                <div className="p-3 bg-slate-50 rounded text-xs text-slate-600 font-mono space-y-1">
                  <p><strong>Item Batch Need:</strong> {selectedRequest.category} ({selectedRequest.quantity} units)</p>
                  <p><strong>Supplier Target cost:</strong> R {selectedRequest.targetAmount}</p>
                  <p><strong>Remaining Required:</strong> R {selectedRequest.targetAmount - selectedRequest.currentAmount}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Pledge Level Amount Allocation (ZAR)</label>
                  <input type="number" placeholder="Enter ZAR value" value={pledgeAmount} onChange={e => setPledgeAmount(e.target.value)} className="w-full text-xs border p-2.5 rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handlePledgeSubmit(selectedRequest.id)} className="bg-[#D39313] hover:bg-[#B77F0F] text-white font-bold text-xs px-4 py-2 rounded-lg">Commit Audited Digital Pledge</button>
                  <button onClick={() => setSelectedRequest(null)} className="border px-4 py-2 text-xs font-bold rounded-lg text-slate-400">Cancel</button>
                </div>
              </div>
            )}

            {/* NORMAL DATA TAB WORKFLOW CORES */}
            {!showRequestWizard && !selectedRequest && (
              <>
                {/* TAB 1: OVERVIEW COMPONENT TRACK */}
                {activeTab === 'OVERVIEW' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Active Metric Scope</span>
                        <p className="text-xl font-black text-slate-900 mt-1">{requests.length} System Needs Listed</p>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Aggregated Ledger Level</span>
                        <p className="text-xl font-black text-slate-900 mt-1">R {requests.reduce((a,c) => a + c.currentAmount, 0).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* MAIN EXPLICITLY SELF-EXPLAINING TRACKING LIST (🔴 3: STATUS LABELS FIXED) */}
                    <div className="bg-white rounded-xl border border-slate-200/80 p-6 space-y-4">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Live Pipeline Execution State Logs</h3>
                      <div className="space-y-3">
                        {requests.map(req => (
                          <div key={req.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex flex-wrap justify-between items-center gap-4 text-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] font-bold text-slate-400 bg-white border px-1.5 py-0.5 rounded">{req.id}</span>
                                <h4 className="font-bold text-slate-900">{req.schoolName}</h4>
                              </div>
                              <p className="text-slate-500">{req.category} Need Kit Grid — Level target: R {req.targetAmount}</p>
                            </div>
                            
                            {/* EXPLICIT STATUS ENGINE SHOWING EXACT LOGIC SYSTEM PATTERNS */}
                            <span className={`px-3 py-1 font-bold rounded-lg text-[10px] uppercase tracking-wide border ${
                              req.status.includes('Pending') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              req.status.includes('Approved') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ACTIVE SCHOOL REQUEST SEARCH REPOSITORY */}
                {activeTab === 'SCHOOLS' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500 font-medium">Click any active structural card parameters item entry down below to directly evaluate and commit localized funds loop.</div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {requests.map(req => {
                        const completionPercentage = Math.round((req.currentAmount / req.targetAmount) * 100);
                        return (
                          <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm relative hover:border-amber-400 transition">
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block">{req.location}</span>
                              <h4 className="font-bold text-slate-900 text-sm">{req.schoolName}</h4>
                              <p className="text-xs text-slate-600 bg-amber-50/50 border border-amber-200/40 px-2 py-1 rounded w-fit font-mono">{req.category} Allocation Kit</p>
                              <p className="text-xs text-slate-500 line-clamp-2 italic mt-2">"{req.motivation}"</p>
                            </div>

                            <div className="pt-4 space-y-3 border-t border-slate-100 mt-4">
                              <div className="flex justify-between text-[11px] font-bold">
                                <span className="text-slate-400">Status Vector:</span>
                                <span className="text-slate-800 font-mono text-[10px]">{req.status.split(' ')[0]}</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#D39313] h-full" style={{ width: `${Math.min(completionPercentage, 100)}%` }}></div>
                              </div>
                              <div className="flex justify-between items-center text-[11px] font-bold pt-1">
                                <span>Target: R {req.targetAmount}</span>
                                <span className="text-[#D39313]">{completionPercentage}% Met</span>
                              </div>

                              {activeRole === 'SPONSOR' && (
                                <button onClick={() => setSelectedRequest(req)} className="w-full bg-[#D39313] hover:bg-[#B77F0F] text-white text-xs font-bold py-2 rounded-lg transition uppercase tracking-wider text-[10px]">
                                  Initiate Funding Evaluation &rarr;
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: TRANSACTION AUDITS LEDGER */}
                {activeTab === 'TRANSACTIONS' && (
                  <div className="bg-white rounded-xl border border-slate-200/80 p-6 space-y-4">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Closed Loop Voucher Ledger Accounts</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs divide-y divide-slate-100">
                        <thead>
                          <tr className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                            <th className="p-3">Reference Node</th>
                            <th className="p-3">Beneficiary Account</th>
                            <th className="p-3">Resource Focus Array</th>
                            <th className="p-3">Committed Volume</th>
                            <th className="p-3">Internal System State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {requests.map(req => (
                            <tr key={req.id} className="hover:bg-slate-50/60 transition">
                              <td className="p-3 font-mono text-slate-400 font-bold">{req.id}-TX</td>
                              <td className="p-3 font-bold text-slate-900">{req.schoolName}</td>
                              <td className="p-3 text-slate-500">{req.category} Allocation</td>
                              <td className="p-3 font-bold text-slate-900">R {req.currentAmount.toLocaleString()}</td>
                              <td className="p-3">
                                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  {req.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 4: COMPLIANCE REPORTS OVERVIEW */}
                {activeTab === 'REPORTS' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-4 text-xs">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs">B-BBEE &amp; Corporate Social Investment Compliance Summary</h3>
                    <p className="text-slate-500 leading-relaxed">All generated records loop matching logs safely down to verified institutional EMIS references. Download the complete packet summary anytime via the upper management task section actions.</p>
                    <div className="p-4 bg-slate-50 border rounded-lg max-w-sm font-mono space-y-2 text-[11px]">
                      <p><strong>Total Audited Spend:</strong> R {requests.reduce((a,c)=>a+c.currentAmount,0).toLocaleString()} ZAR</p>
                      <p><strong>Verification Hash:</strong> SB-2026-F63K9B11X</p>
                      <p><strong>Status Scorecard:</strong> Active &amp; Validated Compliance Node</p>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
        )}

      </main>

      <footer className="bg-slate-900 border-t border-stone-800 text-stone-500 py-8 px-6 text-center text-xs font-medium mt-12">
        <p>© 2026 SponsorBuddy (Pty) Ltd. CSI Procurement Delivery Systems. Closed Loop Audit Ledger Tracking Frame index.</p>
      </footer>
      
    </div>
  );
}