import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Bell, LogOut, Search, Users, X, FileWarning, 
  Info, Loader2, Upload, MapPin, Calendar
} from 'lucide-react';
import { Toast, Skeleton, StatusBadge } from '../components/UIComponents';
import { sampleViolations, sampleDrivers } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// TRAFFIC ENFORCER DASHBOARD
// ─────────────────────────────────────────────────────────────

const EnforcerDashboard = ({ onLogout }) => {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverForViolation, setSelectedDriverForViolation] = useState(null);
  const [myApprehensions, setMyApprehensions] = useState([]);
  const [violationForm, setViolationForm] = useState({ plate: '', license: '', type: '', location: '', notes: '' });

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);

  // Get violations for a specific driver
  const getDriverViolations = (driverId) => sampleViolations.filter(v => v.driverId === driverId);

  // Handle recording violation
  const handleRecordViolation = () => {
    const plate = selectedDriverForViolation ? selectedDriverForViolation.plate : violationForm.plate;
    const type = violationForm.type;
    const location = violationForm.location;
    if (!plate || !type || !location) {
      setToast({ message: 'Please fill in all required fields.', type: 'warning' });
      return;
    }
    setRecordLoading(true);
    setTimeout(() => {
      const fineMap = {
        'Running Red Light': 1500, 'Illegal Parking': 500, 'Over Speeding': 2000,
        'No Helmet': 1000, 'Counterflow': 2500, 'No License': 1500,
        'Illegal U-Turn': 1000, 'No Seatbelt': 1000, 'Reckless Driving': 3000, 'Expired Registration': 1500,
      };
      const imageMap = {
        'Running Red Light': '🚦', 'Illegal Parking': '🅿️', 'Over Speeding': '⚡',
        'No Helmet': '⛑️', 'Counterflow': '↩️', 'No License': '📋',
        'Illegal U-Turn': '🔄', 'No Seatbelt': '🔒', 'Reckless Driving': '⚠️', 'Expired Registration': '📅',
      };
      const newViolation = {
        id: `VIO-${Date.now()}`,
        plate,
        type,
        location,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        fine: fineMap[type] || 1000,
        status: 'unpaid',
        image: imageMap[type] || '⚠️',
        driver: selectedDriverForViolation ? selectedDriverForViolation.name : plate,
        driverId: selectedDriverForViolation ? selectedDriverForViolation.id : null,
        capturedBy: 'ENF-001',
        notes: violationForm.notes,
      };
      setMyApprehensions(prev => [newViolation, ...prev]);
      sampleViolations.unshift(newViolation);
      setRecordLoading(false);
      setShowRecordModal(false);
      setSelectedDriverForViolation(null);
      setViolationForm({ plate: '', license: '', type: '', location: '', notes: '' });
      setToast({ message: 'Citation issued successfully! Violation has been recorded.', type: 'success' });
    }, 2000);
  };

  // Record Violation Modal
  const RecordViolationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Record Apprehension</h3>
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); setViolationForm({ plate: '', license: '', type: '', location: '', notes: '' }); }} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pre-filled driver info if selected */}
        {selectedDriverForViolation && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="font-bold text-orange-700">{selectedDriverForViolation.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{selectedDriverForViolation.name}</p>
                <p className="text-sm text-slate-600">{selectedDriverForViolation.plate} • {selectedDriverForViolation.license}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {!selectedDriverForViolation && (
            <>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Plate Number *</label>
                <input type="text" value={violationForm.plate} onChange={e => setViolationForm(f => ({...f, plate: e.target.value}))} placeholder="ABC 1234" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Driver's License (if available)</label>
                <input type="text" value={violationForm.license} onChange={e => setViolationForm(f => ({...f, license: e.target.value}))} placeholder="N01-12-345678" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </>
          )}
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Violation Type *</label>
            <select value={violationForm.type} onChange={e => setViolationForm(f => ({...f, type: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">Select violation type</option>
              {['Running Red Light', 'Illegal Parking', 'Over Speeding', 'No Helmet', 'Counterflow', 'No License', 'Illegal U-Turn', 'No Seatbelt', 'Reckless Driving', 'Expired Registration'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label>
            <input type="text" value={violationForm.location} onChange={e => setViolationForm(f => ({...f, location: e.target.value}))} placeholder="e.g., Rizal Ave & Main St" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Photo Evidence *</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition">
              <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">Take photo or upload</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Notes (optional)</label>
            <textarea rows={3} value={violationForm.notes} onChange={e => setViolationForm(f => ({...f, notes: e.target.value}))} placeholder="Additional details about the apprehension..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
          </div>


        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); setViolationForm({ plate: '', license: '', type: '', location: '', notes: '' }); }} disabled={recordLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleRecordViolation} disabled={recordLoading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
            {recordLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Issuing...</> : <><FileWarning className="w-5 h-5" />Issue Citation</>}
          </button>
        </div>
      </div>
    </div>
  );

  // Driver Details Modal
  const DriverDetailsModal = () => {
    const violations = getDriverViolations(selectedDriver.id);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">{selectedDriver.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedDriver.name}</h3>
                  <p className="text-sm text-white/80">{selectedDriver.license}</p>
                </div>
              </div>
              <button onClick={() => setShowDriverDetails(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {/* Driver Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500">Plate Number</p>
                <p className="font-semibold">{selectedDriver.plate}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500">Status</p>
                <StatusBadge status={selectedDriver.status} />
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500">Total Violations</p>
                <p className="font-semibold text-rose-600">{selectedDriver.violations}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500">Unpaid Fines</p>
                <p className={`font-semibold ${selectedDriver.unpaidFines > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  ₱{selectedDriver.unpaidFines.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Violation History */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileWarning className="w-4 h-4 text-slate-600" />Violation History
              </h4>
              {violations.length > 0 ? (
                <div className="space-y-2">
                  {violations.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{v.image}</span>
                        <div>
                          <p className="font-medium text-sm">{v.type}</p>
                          <p className="text-xs text-slate-500">{v.date} • {v.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={v.status} />
                        <p className="text-sm font-medium mt-1">₱{v.fine.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
                  <p className="text-sm text-slate-500">No violations on record</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t bg-slate-50">
            <button 
              onClick={() => { 
                setShowDriverDetails(false); 
                setSelectedDriverForViolation(selectedDriver);
                setShowRecordModal(true); 
              }} 
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              <FileWarning className="w-5 h-5" />Record Violation for This Driver
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showRecordModal && <RecordViolationModal />}
      
      {/* Notification Dropdown */}
      {showNotif && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-72 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b font-bold">Notifications</div>
            {[
              { msg: 'Violation VIO-2024-008 approved by supervisor', time: '10 mins ago', unread: true },
              { msg: 'New driver added to system: Roberto Cruz', time: '1 hour ago', unread: false }
            ].map((n, i) => (
              <div key={i} className={`p-4 border-b text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-orange-50/50' : ''}`}>
                <p>{n.msg}</p><p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold">Enforcer Dashboard</h1>
              <p className="text-xs text-white/80">Officer Garcia (ENF-001)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotif(!showNotif)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Quick Action Button */}
      <div className="p-4">
        <button onClick={() => setShowRecordModal(true)} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30 hover:opacity-90 transition">
          <Camera className="w-6 h-6" />
          <span className="font-semibold text-lg">Record New Apprehension</span>
        </button>
      </div>

      {/* Stats */}
      <div className="px-4 grid grid-cols-3 gap-3 mb-4">
        {loading ? (
          <><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-20 rounded-xl" /></>
        ) : (
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-xl font-bold text-orange-500">{myApprehensions.filter(v => v.date === new Date().toISOString().split('T')[0]).length}</p>
              <p className="text-xs text-slate-500">Today</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-xl font-bold text-blue-500">87</p>
              <p className="text-xs text-slate-500">This Week</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-xl font-bold text-emerald-500">324</p>
              <p className="text-xs text-slate-500">This Month</p>
            </div>
          </>
        )}
      </div>

      {/* Section Header + Filter */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-700 flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-orange-500" />
            My Apprehensions
            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{myApprehensions.length}</span>
          </h2>
        </div>
        {myApprehensions.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All', count: myApprehensions.length },
              { id: 'unpaid', label: 'Unpaid', count: myApprehensions.filter(v => v.status === 'unpaid').length },
              { id: 'paid', label: 'Paid', count: myApprehensions.filter(v => v.status === 'paid').length },
              { id: 'disputed', label: 'Disputed', count: myApprehensions.filter(v => v.status === 'disputed').length },
            ].map(f => (
              <button key={f.id} onClick={() => setSearchQuery(f.id === 'all' ? '' : f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  (f.id === 'all' && searchQuery === '') || searchQuery === f.id
                    ? f.id === 'unpaid' ? 'bg-rose-500 text-white border-rose-500'
                    : f.id === 'paid' ? 'bg-emerald-500 text-white border-emerald-500'
                    : f.id === 'disputed' ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}>
                {f.label} <span className="opacity-80">({f.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apprehensions List */}
      <div className="px-4 pb-24 space-y-3">
        {loading ? (
          <><Skeleton className="h-28 rounded-xl" /><Skeleton className="h-28 rounded-xl" /></>
        ) : myApprehensions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border shadow-sm">
            <FileWarning className="w-14 h-14 mx-auto text-slate-200 mb-3" />
            <p className="text-slate-500 font-medium">No apprehensions recorded yet</p>
            <p className="text-sm text-slate-400 mt-1">Tap "Record New Apprehension" to get started</p>
          </div>
        ) : (() => {
          const filtered = searchQuery
            ? myApprehensions.filter(v => v.status === searchQuery)
            : myApprehensions;
          return filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border shadow-sm">
              <Search className="w-10 h-10 mx-auto text-slate-200 mb-3" />
              <p className="text-slate-500">No {searchQuery} violations found</p>
            </div>
          ) : filtered.map((v) => (
            <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{v.image}</span>
                  <div>
                    <p className="font-semibold">{v.type}</p>
                    <p className="text-xs text-slate-400 font-mono">{v.id}</p>
                  </div>
                </div>
                <StatusBadge status={v.status} />
              </div>
              <div className="flex flex-col gap-1 text-sm text-slate-500 mb-2">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{v.date} {v.time}</span>
                <span className="flex items-center gap-1"><Car className="w-4 h-4" />{v.plate}{v.driver !== v.plate ? ` • ${v.driver}` : ''}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <p className="font-bold text-slate-700">₱{v.fine.toLocaleString()}</p>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />Citation Issued
                </span>
              </div>
            </div>
          ));
        })()}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => setShowRecordModal(true)}
          className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg shadow-orange-500/40 flex items-center justify-center hover:scale-105 transition"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


export default EnforcerDashboard;
