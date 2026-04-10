import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Bell, LogOut, Search, Users, X, FileWarning, 
  Info, Loader2, Upload, CheckCircle, MapPin, Eye, Clock,
  Navigation, Wifi, WifiOff
} from 'lucide-react';
import { Toast, Skeleton, StatusBadge } from '../components/UIComponents';
import { sampleDrivers, sampleDevices } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// TRAFFIC ENFORCER DASHBOARD
// ─────────────────────────────────────────────────────────────

// Sample data for THIS enforcer's personal apprehensions
const myApprehensions = [
  { id: 'APP-2024-001', plate: 'ABC 1234', driver: 'Juan Dela Cruz', type: 'Running Red Light', location: 'Rizal Ave & Main St', date: '2024-01-15', time: '09:30 AM', status: 'approved', fine: 2500, image: '🚦' },
  { id: 'APP-2024-002', plate: 'XYZ 5678', driver: 'Maria Santos', type: 'Illegal Parking', location: 'SM City Entrance', date: '2024-01-15', time: '11:45 AM', status: 'pending', fine: 1000, image: '🅿️' },
  { id: 'APP-2024-003', plate: 'DEF 9012', driver: 'Pedro Reyes', type: 'No Helmet', location: 'National Highway', date: '2024-01-14', time: '02:15 PM', status: 'approved', fine: 1500, image: '⛑️' },
  { id: 'APP-2024-004', plate: 'GHI 3456', driver: 'Ana Garcia', type: 'Over Speeding', location: 'EDSA Northbound', date: '2024-01-14', time: '08:00 AM', status: 'rejected', fine: 2000, image: '💨' },
  { id: 'APP-2024-005', plate: 'JKL 7890', driver: 'Roberto Cruz', type: 'Counterflow', location: 'Quezon Blvd', date: '2024-01-13', time: '04:30 PM', status: 'approved', fine: 3000, image: '↩️' },
];

// Sample enforcer locations (other enforcers in the field)
const enforcerLocations = [
  { id: 'ENF-001', name: 'Officer Garcia (You)', lat: 14.5995, lng: 120.9842, status: 'active', area: 'Ermita, Manila' },
  { id: 'ENF-002', name: 'Officer Santos', lat: 14.6091, lng: 120.9897, status: 'active', area: 'Quiapo, Manila' },
  { id: 'ENF-003', name: 'Officer Reyes', lat: 14.5547, lng: 121.0244, status: 'active', area: 'Makati CBD' },
  { id: 'ENF-004', name: 'Officer Cruz', lat: 14.6507, lng: 121.0495, status: 'break', area: 'Quezon City' },
  { id: 'ENF-005', name: 'Officer Lopez', lat: 14.5832, lng: 120.9797, status: 'active', area: 'Malate, Manila' },
];

// CCTV locations with coordinates
const cctvLocations = [
  { id: 'CAM-001', location: 'EDSA-Ayala Intersection', lat: 14.5547, lng: 121.0194, status: 'online', type: 'Speed + Red Light' },
  { id: 'CAM-002', location: 'Quezon Ave-EDSA', lat: 14.6285, lng: 121.0325, status: 'online', type: 'Multi-Purpose' },
  { id: 'CAM-003', location: 'Roxas Blvd-UN Ave', lat: 14.5820, lng: 120.9787, status: 'offline', type: 'LPR Camera' },
  { id: 'CAM-004', location: 'C5-Katipunan', lat: 14.6312, lng: 121.0756, status: 'online', type: 'Speed Detection' },
  { id: 'CAM-005', location: 'Taft Ave-Vito Cruz', lat: 14.5636, lng: 120.9945, status: 'online', type: 'Red Light' },
  { id: 'CAM-006', location: 'España Blvd-Lacson', lat: 14.6110, lng: 120.9880, status: 'online', type: 'Multi-Purpose' },
];

const EnforcerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('apprehensions');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [showApprehensionDetails, setShowApprehensionDetails] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedApprehension, setSelectedApprehension] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverForViolation, setSelectedDriverForViolation] = useState(null);
  const [mapFilter, setMapFilter] = useState('all'); // 'all', 'cctv', 'enforcers'

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

  // Filter apprehensions based on search
  const filteredApprehensions = myApprehensions.filter(a =>
    a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle recording violation
  const handleRecordViolation = () => {
    setRecordLoading(true);
    setTimeout(() => {
      setRecordLoading(false);
      setShowRecordModal(false);
      setSelectedDriverForViolation(null);
      setToast({ message: 'Apprehension recorded successfully! Pending supervisor approval.', type: 'success' });
    }, 2000);
  };

  // Stats for this enforcer only
  const myStats = {
    today: myApprehensions.filter(a => a.date === '2024-01-15').length,
    thisWeek: myApprehensions.length,
    pending: myApprehensions.filter(a => a.status === 'pending').length,
    approved: myApprehensions.filter(a => a.status === 'approved').length,
  };

  // ─────────────────────────────────────────────────────────────
  // RECORD VIOLATION MODAL
  // ─────────────────────────────────────────────────────────────

  const RecordViolationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Record Apprehension</h3>
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); }} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

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
              <p className="text-xs text-blue-700">This apprehension will be submitted for supervisor approval before the driver is notified.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); }} disabled={recordLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={handleRecordViolation} disabled={recordLoading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
            {recordLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <><FileWarning className="w-5 h-5" />Submit</>}
          </button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // APPREHENSION DETAILS MODAL
  // ─────────────────────────────────────────────────────────────

  const ApprehensionDetailsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Apprehension Record</p>
              <h3 className="font-bold text-lg">{selectedApprehension.id}</h3>
            </div>
            <button onClick={() => setShowApprehensionDetails(false)} className="p-2 hover:bg-white/20 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Status Banner */}
          <div className={`p-3 rounded-xl flex items-center gap-3 ${
            selectedApprehension.status === 'approved' ? 'bg-emerald-50 border border-emerald-200' :
            selectedApprehension.status === 'pending' ? 'bg-amber-50 border border-amber-200' :
            'bg-rose-50 border border-rose-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              selectedApprehension.status === 'approved' ? 'bg-emerald-100' :
              selectedApprehension.status === 'pending' ? 'bg-amber-100' :
              'bg-rose-100'
            }`}>
              <span className="text-xl">{selectedApprehension.image}</span>
            </div>
            <div>
              <p className="font-semibold">{selectedApprehension.type}</p>
              <StatusBadge status={selectedApprehension.status} />
            </div>
            <p className="ml-auto font-bold text-lg">₱{selectedApprehension.fine.toLocaleString()}</p>
          </div>

          {/* Driver Info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">DRIVER INFORMATION</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-orange-600">{selectedApprehension.driver.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{selectedApprehension.driver}</p>
                <p className="text-sm text-slate-500">{selectedApprehension.plate}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-500">Date</p>
              <p className="font-semibold">{selectedApprehension.date}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-500">Time</p>
              <p className="font-semibold">{selectedApprehension.time}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500">Location</p>
            <p className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              {selectedApprehension.location}
            </p>
          </div>

          {selectedApprehension.status === 'rejected' && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
              <p className="text-xs text-rose-600 font-medium mb-1">REJECTION REASON</p>
              <p className="text-sm text-rose-700">Insufficient evidence provided. Please capture clearer photos showing the violation.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-slate-50">
          <button onClick={() => setShowApprehensionDetails(false)} className="w-full py-3 border rounded-xl font-medium hover:bg-white transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // DRIVER DETAILS MODAL
  // ─────────────────────────────────────────────────────────────

  const DriverDetailsModal = () => (
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
            <FileWarning className="w-5 h-5" />Record Apprehension for This Driver
          </button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // MY APPREHENSIONS TAB
  // ─────────────────────────────────────────────────────────────

  const MyApprehensionsTab = () => (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {loading ? (
          [...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
        ) : (
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-lg font-bold text-orange-500">{myStats.today}</p>
              <p className="text-xs text-slate-500">Today</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-lg font-bold text-blue-500">{myStats.thisWeek}</p>
              <p className="text-xs text-slate-500">This Week</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-lg font-bold text-amber-500">{myStats.pending}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center">
              <p className="text-lg font-bold text-emerald-500">{myStats.approved}</p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
          </>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your apprehensions..." 
          className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        />
      </div>

      {/* Apprehensions List */}
      <div className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : filteredApprehensions.length > 0 ? (
          filteredApprehensions.map((app) => (
            <div 
              key={app.id} 
              onClick={() => { setSelectedApprehension(app); setShowApprehensionDetails(true); }}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md cursor-pointer transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">{app.image}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{app.type}</p>
                    <p className="text-xs text-slate-500">{app.id}</p>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{app.driver}</p>
                  <p className="text-slate-500 text-xs">{app.plate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-orange-600">₱{app.fine.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">{app.date}</p>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                {app.location}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FileWarning className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No apprehensions found</p>
          </div>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // DRIVERS TAB
  // ─────────────────────────────────────────────────────────────

  const DriversTab = () => (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, plate, or license..." 
          className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        />
      </div>

      {/* Drivers List */}
      <div className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
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
                  <p className={`text-sm font-medium mt-1 ${driver.violations > 2 ? 'text-rose-600' : 'text-slate-600'}`}>
                    {driver.violations} violation{driver.violations !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">No drivers found</p>
          </div>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // MAP TAB
  // ─────────────────────────────────────────────────────────────

  const MapTab = () => (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All', icon: MapPin },
          { id: 'cctv', label: 'CCTV', icon: Camera },
          { id: 'enforcers', label: 'Enforcers', icon: Shield },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setMapFilter(filter.id)}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition ${
              mapFilter === filter.id 
                ? 'bg-orange-500 text-white' 
                : 'bg-white border hover:bg-slate-50'
            }`}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-64 flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-slate-400"></div>
            ))}
          </div>
        </div>
        
        {/* Map pins simulation */}
        <div className="absolute inset-0">
          {(mapFilter === 'all' || mapFilter === 'cctv') && cctvLocations.slice(0, 4).map((cam, i) => (
            <div 
              key={cam.id}
              className={`absolute ${cam.status === 'online' ? 'text-emerald-500' : 'text-rose-500'}`}
              style={{ top: `${20 + (i * 15)}%`, left: `${15 + (i * 20)}%` }}
            >
              <Camera className="w-6 h-6 drop-shadow-lg" />
            </div>
          ))}
          {(mapFilter === 'all' || mapFilter === 'enforcers') && enforcerLocations.slice(0, 3).map((enf, i) => (
            <div 
              key={enf.id}
              className={`absolute ${enf.id === 'ENF-001' ? 'text-orange-500' : 'text-blue-500'}`}
              style={{ top: `${30 + (i * 18)}%`, left: `${25 + (i * 22)}%` }}
            >
              <Shield className="w-6 h-6 drop-shadow-lg" />
            </div>
          ))}
        </div>

        <div className="text-center z-10 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl">
          <MapPin className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm text-slate-600 font-medium">Interactive Map</p>
          <p className="text-xs text-slate-400">Google Maps integration</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-slate-600">CCTV Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
          <span className="text-slate-600">CCTV Offline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-slate-600">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-slate-600">Other Enforcers</span>
        </div>
      </div>

      {/* CCTV List */}
      {(mapFilter === 'all' || mapFilter === 'cctv') && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            CCTV Cameras
            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{cctvLocations.length}</span>
          </h3>
          <div className="space-y-2">
            {cctvLocations.map((cam) => (
              <div key={cam.id} className="bg-white rounded-xl p-3 border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cam.status === 'online' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                    <Camera className={`w-5 h-5 ${cam.status === 'online' ? 'text-emerald-600' : 'text-rose-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{cam.id}</p>
                    <p className="text-xs text-slate-500">{cam.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {cam.status === 'online' ? (
                      <Wifi className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-rose-500" />
                    )}
                    <span className={`text-xs font-medium ${cam.status === 'online' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {cam.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{cam.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enforcers List */}
      {(mapFilter === 'all' || mapFilter === 'enforcers') && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Enforcers on Duty
            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{enforcerLocations.length}</span>
          </h3>
          <div className="space-y-2">
            {enforcerLocations.map((enf) => (
              <div key={enf.id} className={`rounded-xl p-3 border flex items-center justify-between ${enf.id === 'ENF-001' ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${enf.id === 'ENF-001' ? 'bg-orange-200' : 'bg-blue-100'}`}>
                    <Shield className={`w-5 h-5 ${enf.id === 'ENF-001' ? 'text-orange-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{enf.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{enf.area}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  enf.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {enf.status === 'active' ? 'On Patrol' : 'On Break'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showRecordModal && <RecordViolationModal />}
      {showDriverDetails && selectedDriver && <DriverDetailsModal />}
      {showApprehensionDetails && selectedApprehension && <ApprehensionDetailsModal />}
      
      {/* Notification Dropdown */}
      {showNotif && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-72 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b font-bold">Notifications</div>
            {[
              { msg: 'APP-2024-002 approved by supervisor', time: '10 mins ago', unread: true },
              { msg: 'APP-2024-004 rejected - see reason', time: '1 hour ago', unread: true },
              { msg: 'New CCTV camera deployed at Taft Ave', time: '3 hours ago', unread: false }
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

      {/* Tab Navigation */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border">
          {[
            { id: 'apprehensions', label: 'My Records', icon: FileWarning },
            { id: 'drivers', label: 'Drivers', icon: Users },
            { id: 'map', label: 'Map', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-24">
        {activeTab === 'apprehensions' && <MyApprehensionsTab />}
        {activeTab === 'drivers' && <DriversTab />}
        {activeTab === 'map' && <MapTab />}
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