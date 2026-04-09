import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Bell, LogOut, Search, Users, X, FileWarning, 
  Info, Loader2, Upload, CheckCircle
} from 'lucide-react';
import { Toast, Skeleton, StatusBadge } from '../components/UIComponents';
import { sampleViolations, sampleDrivers } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// TRAFFIC ENFORCER DASHBOARD
// ─────────────────────────────────────────────────────────────

const EnforcerDashboard = ({ onLogout }) => {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverForViolation, setSelectedDriverForViolation] = useState(null);

  useEffect(() => { 
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t); 
  }, []);

  // Filter drivers based on search
  const filteredDrivers = sampleDrivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.license.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get violations for a specific driver
  const getDriverViolations = (driverId) => sampleViolations.filter(v => v.driverId === driverId);

  // Handle recording violation
  const handleRecordViolation = () => {
    setRecordLoading(true);
    setTimeout(() => {
      setRecordLoading(false);
      setShowRecordModal(false);
      setSelectedDriverForViolation(null);
      setToast({ message: 'Violation recorded successfully! Pending supervisor approval.', type: 'success' });
    }, 2000);
  };

  // Record Violation Modal
  const RecordViolationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Record Apprehension</h3>
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); }} className="p-2 hover:bg-slate-100 rounded-lg">
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
                <input type="text" placeholder="ABC 1234" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Driver's License (if available)</label>
                <input type="text" placeholder="N01-12-345678" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </>
          )}
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Violation Type *</label>
            <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">Select violation type</option>
              {['Running Red Light', 'Illegal Parking', 'Over Speeding', 'No Helmet', 'Counterflow', 'No License', 'Illegal U-Turn', 'No Seatbelt', 'Reckless Driving', 'Expired Registration'].map(v => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label>
            <input type="text" placeholder="e.g., Corner of Main St & Rizal Ave" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Evidence Photo</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-orange-50 cursor-pointer transition">
              <Upload className="w-8 h-8 mx-auto text-orange-400 mb-2" />
              <p className="text-sm text-slate-500">Click to capture or upload photo</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Notes (optional)</label>
            <textarea rows={3} placeholder="Additional details about the apprehension..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">This violation will be submitted for supervisor approval before the driver is notified.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); }} disabled={recordLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={handleRecordViolation} disabled={recordLoading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
            {recordLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <><FileWarning className="w-5 h-5" />Submit Violation</>}
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
      {showDriverDetails && selectedDriver && <DriverDetailsModal />}
      
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
                <p>{n.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
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
              <p className="text-xl font-bold text-orange-500">12</p>
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

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, plate, or license..." 
            className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Section Title */}
      <div className="px-4 mb-3">
        <h2 className="font-semibold text-slate-700 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Registered Drivers
          <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{filteredDrivers.length}</span>
        </h2>
      </div>

      {/* Drivers List */}
      <div className="px-4 pb-24 space-y-3">
        {loading ? (
          <><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></>
        ) : filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver) => (
            <div 
              key={driver.id} 
              onClick={() => { setSelectedDriver(driver); setShowDriverDetails(true); }}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md cursor-pointer transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-orange-600">{driver.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{driver.name}</p>
                    <p className="text-sm text-slate-500">{driver.plate} • {driver.license}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={driver.status} />
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className={`font-medium ${driver.violations > 2 ? 'text-rose-600' : 'text-slate-600'}`}>
                      {driver.violations} violation{driver.violations !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
              
              {driver.unpaidFines > 0 && (
                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-slate-500">Unpaid Fines:</span>
                  <span className="font-semibold text-rose-600">₱{driver.unpaidFines.toLocaleString()}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No drivers found matching "{searchQuery}"</p>
          </div>
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

export default EnforcerDashboard;
