import React, { useState, useEffect } from 'react';
import { 
  Car, FileText, AlertTriangle, LogOut, Eye, Clock, Calendar, MapPin, 
  DollarSign, Bell, CreditCard, Upload, CheckCircle, Loader2, X
} from 'lucide-react';
import { Toast, Skeleton, CardSkeleton, StatusBadge } from '../components/UIComponents';
import { ViolationDetailsModal } from '../components/Modals';
import { sampleViolations, sampleDisputes } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// VEHICLE OWNER PORTAL
// ─────────────────────────────────────────────────────────────

const VehicleOwnerPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('violations');
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [disputeLoading, setDisputeLoading] = useState(false);

  useEffect(() => { 
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t); 
  }, []);

  // Filter violations for current user (Juan Dela Cruz - DRV-001)
  const myViolations = sampleViolations.filter(v => v.driverId === 'DRV-001');
  const myDisputes = sampleDisputes.filter(d => d.driverId === 'DRV-001');
  
  const stats = {
    total: myViolations.length,
    unpaid: myViolations.filter(v => v.status === 'unpaid').length,
    totalFines: myViolations.filter(v => v.status === 'unpaid').reduce((sum, v) => sum + v.fine, 0),
  };

  const handlePayment = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setShowPayment(false);
      setToast({ message: 'Payment successful! Receipt sent to your email.', type: 'success' });
    }, 2000);
  };

  const handleDispute = () => {
    setDisputeLoading(true);
    setTimeout(() => {
      setDisputeLoading(false);
      setShowDispute(false);
      setToast({ message: 'Dispute submitted successfully! We\'ll review your case.', type: 'success' });
    }, 2000);
  };

  // Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Pay Fine</h3>
          <button onClick={() => setShowPayment(false)} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-slate-500">Violation: {selectedViolation?.id}</p>
          <p className="text-sm text-slate-500">{selectedViolation?.type}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">₱{selectedViolation?.fine.toLocaleString()}</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <button className="w-full p-4 border-2 border-blue-500 bg-blue-50 rounded-xl flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-semibold">Credit/Debit Card</p>
              <p className="text-xs text-slate-500">Visa, Mastercard, JCB</p>
            </div>
            <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
          </button>
          <button className="w-full p-4 border rounded-xl flex items-center gap-3 hover:bg-slate-50 transition">
            <DollarSign className="w-6 h-6 text-slate-600" />
            <div className="text-left">
              <p className="font-semibold">GCash / Maya</p>
              <p className="text-xs text-slate-500">E-Wallet Payment</p>
            </div>
          </button>
          <button className="w-full p-4 border rounded-xl flex items-center gap-3 hover:bg-slate-50 transition">
            <FileText className="w-6 h-6 text-slate-600" />
            <div className="text-left">
              <p className="font-semibold">Bank Transfer</p>
              <p className="text-xs text-slate-500">BDO, BPI, Metrobank</p>
            </div>
          </button>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => setShowPayment(false)} disabled={paymentLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={handlePayment} disabled={paymentLoading} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
            {paymentLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );

  // Dispute Modal
  const DisputeModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">File Dispute</h3>
          <button onClick={() => setShowDispute(false)} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-slate-500">Violation: {selectedViolation?.id}</p>
          <p className="font-medium">{selectedViolation?.type}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Reason for Dispute *</label>
            <textarea 
              rows={4} 
              placeholder="Explain why you are disputing this violation..." 
              className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Supporting Documents</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition">
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">Click to upload files</p>
              <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowDispute(false)} disabled={disputeLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={handleDispute} disabled={disputeLoading} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2">
            {disputeLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : 'Submit Dispute'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showPayment && <PaymentModal />}
      {showDispute && <DisputeModal />}
      
      {/* Notification Dropdown */}
      {showNotif && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-80 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b font-bold">Notifications</div>
            {[
              { msg: 'Your dispute DIS-2024-001 is under review', time: '1 hour ago', unread: true },
              { msg: 'Payment receipt sent to juan@email.com', time: '2 days ago', unread: false },
            ].map((n, i) => (
              <div key={i} className={`p-4 border-b text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-blue-50/50' : ''}`}>
                <p>{n.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Violation Details Modal */}
      {showDetails && selectedViolation && (
        <ViolationDetailsModal 
          violation={selectedViolation} 
          userType="driver" 
          onClose={() => setShowDetails(false)}
          onPayment={(v) => { setSelectedViolation(v); setShowPayment(true); }}
          onDispute={(v) => { setSelectedViolation(v); setShowDispute(true); }} 
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold">STVMS Online Portal</h1>
              <p className="text-xs text-white/80">Welcome, Juan Dela Cruz</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotif(!showNotif)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {loading ? (
          <><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></>
        ) : (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <FileText className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-slate-500">Total Violations</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <AlertTriangle className="w-6 h-6 text-rose-500 mb-2" />
              <p className="text-2xl font-bold">{stats.unpaid}</p>
              <p className="text-xs text-slate-500">Unpaid</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <DollarSign className="w-6 h-6 text-amber-500 mb-2" />
              <p className="text-2xl font-bold">₱{stats.totalFines.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Due</p>
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-4">
        {['violations', 'disputes', 'payments'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 pb-24 space-y-3">
        {loading ? (
          <><CardSkeleton /><CardSkeleton /><CardSkeleton /></>
        ) : (
          <>
            {/* Violations Tab */}
            {activeTab === 'violations' && myViolations.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{v.image}</span>
                    <div>
                      <p className="font-semibold">{v.type}</p>
                      <p className="text-xs text-slate-500">{v.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{v.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{v.time}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="text-lg font-bold">₱{v.fine.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedViolation(v); setShowDetails(true); }} className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 flex items-center gap-1">
                      <Eye className="w-4 h-4" />View
                    </button>
                    {v.status === 'unpaid' && (
                      <>
                        <button onClick={() => { setSelectedViolation(v); setShowDispute(true); }} className="px-4 py-2 text-sm border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50">
                          Dispute
                        </button>
                        <button onClick={() => { setSelectedViolation(v); setShowPayment(true); }} className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                          Pay Now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Disputes Tab */}
            {activeTab === 'disputes' && myDisputes.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{d.id}</p>
                    <p className="text-sm text-slate-500">For: {d.violationId}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-sm text-slate-600 mb-2 line-clamp-2">{d.reason}</p>
                <p className="text-xs text-slate-400">Filed: {d.date}</p>
              </div>
            ))}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-3">
                {myViolations.filter(v => v.status === 'paid').map(v => (
                  <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{v.id}</p>
                          <p className="text-sm text-slate-500">{v.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">₱{v.paidAmount?.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Paid {v.paidDate}</p>
                        <p className="text-xs text-slate-400">{v.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {myViolations.filter(v => v.status === 'paid').length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">No payment history</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default VehicleOwnerPortal;
