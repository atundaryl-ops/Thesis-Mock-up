import React, { useState, useEffect, useRef } from 'react';
import { Car, FileText, CreditCard, AlertTriangle, Users, Settings, BarChart3, Camera, Shield, LogOut, ChevronRight, Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, Bell, Menu, X, Upload, MessageSquare, TrendingUp, Activity, Gavel, UserCheck, FileWarning, Printer, Loader2, ChevronDown, Image, Download, Mail, Phone, Hash, AlertCircle, Info, Trash2, Edit, RefreshCw, ToggleLeft, ToggleRight, Plus, Wifi, WifiOff, Sliders } from 'lucide-react';

// ── Loading Spinner ──────────────────────────────────────────────
const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizes[size]} animate-spin text-violet-500`} />
      <p className="text-sm text-slate-500 animate-pulse">{text}</p>
    </div>
  );
};

// ── Skeleton ─────────────────────────────────────────────────────
const Skeleton = ({ className }) => <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>;
const CardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" /><div><Skeleton className="w-32 h-4 mb-2" /><Skeleton className="w-24 h-3" /></div>
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton className="w-full h-3 mb-2" /><Skeleton className="w-3/4 h-3 mb-4" />
    <div className="flex gap-2"><Skeleton className="flex-1 h-10 rounded-lg" /><Skeleton className="flex-1 h-10 rounded-lg" /></div>
  </div>
);
const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">{[...Array(rows)].map((_, i) => (
    <div key={i} className="flex gap-4 items-center">
      <Skeleton className="w-24 h-4" /><Skeleton className="w-32 h-4" /><Skeleton className="w-20 h-4" /><Skeleton className="w-24 h-4" /><Skeleton className="w-16 h-6 rounded-full" />
    </div>
  ))}</div>
);

// ── Toast ─────────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const styles = { success: 'bg-emerald-500', error: 'bg-rose-500', warning: 'bg-amber-500', info: 'bg-blue-500' };
  const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
  const Icon = icons[type];
  return (
    <div className={`fixed bottom-4 right-4 ${styles[type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[999] animate-slide-up`}>
      <Icon className="w-5 h-5" /><span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80"><X className="w-4 h-4" /></button>
    </div>
  );
};

// ── Status Badge ──────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    paid: 'bg-emerald-100 text-emerald-700 border-emerald-200', unpaid: 'bg-rose-100 text-rose-700 border-rose-200',
    disputed: 'bg-amber-100 text-amber-700 border-amber-200', pending: 'bg-blue-100 text-blue-700 border-blue-200',
    approved: 'bg-emerald-100 text-emerald-700 border-emerald-200', rejected: 'bg-rose-100 text-rose-700 border-rose-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200', suspended: 'bg-rose-100 text-rose-700 border-rose-200',
    online: 'bg-emerald-100 text-emerald-700 border-emerald-200', offline: 'bg-gray-100 text-gray-600 border-gray-200',
    inactive: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.pending}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
};

// ── Confirm Modal ─────────────────────────────────────────────────
const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', confirmColor = 'bg-violet-600 hover:bg-violet-700' }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
      <h3 className="text-lg font-bold text-center mb-2">{title}</h3>
      <p className="text-slate-500 text-center text-sm mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
        <button onClick={onConfirm} className={`flex-1 py-2.5 ${confirmColor} text-white rounded-xl font-medium transition`}>{confirmText}</button>
      </div>
    </div>
  </div>
);

// ── Sample Data ────────────────────────────────────────────────────
const sampleViolations = [
  { id: 'VIO-2024-001', plate: 'ABC 1234', type: 'Running Red Light', location: 'Intersection of Rizal Ave & Main St', date: '2024-03-15', time: '14:32', fine: 1500, status: 'unpaid', image: '🚦', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'CAM-001', evidence: ['snapshot1.jpg', 'snapshot2.jpg'] },
  { id: 'VIO-2024-002', plate: 'ABC 1234', type: 'Illegal Parking', location: 'No Parking Zone - City Hall', date: '2024-03-10', time: '09:15', fine: 500, status: 'paid', image: '🅿️', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'ENF-001', evidence: ['photo1.jpg'], paidDate: '2024-03-11', paidAmount: 500, paymentMethod: 'GCash' },
  { id: 'VIO-2024-003', plate: 'ABC 1234', type: 'Over Speeding', location: 'Highway 54 - 80km/h zone (Recorded: 112km/h)', date: '2024-03-05', time: '22:45', fine: 2000, status: 'disputed', image: '⚡', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'CAM-002', evidence: ['speed_capture.jpg'], disputeId: 'DIS-2024-001' },
  { id: 'VIO-2024-004', plate: 'XYZ 5678', type: 'No Helmet', location: 'Quezon Blvd', date: '2024-03-14', time: '11:20', fine: 1000, status: 'unpaid', image: '⛑️', driver: 'Maria Santos', driverId: 'DRV-002', email: 'maria@email.com', phone: '09181234567', license: 'N02-12-345678', vehicleBrand: 'Honda', vehicleModel: 'Click 125i', vehicleColor: 'Red', capturedBy: 'ENF-002', evidence: ['apprehension1.jpg'] },
  { id: 'VIO-2024-005', plate: 'DEF 9012', type: 'Counterflow', location: 'EDSA Northbound', date: '2024-03-13', time: '08:30', fine: 2500, status: 'pending', image: '↩️', driver: 'Pedro Reyes', driverId: 'DRV-003', email: 'pedro@email.com', phone: '09191234567', license: 'N03-12-345678', vehicleBrand: 'Mitsubishi', vehicleModel: 'Montero', vehicleColor: 'Black', capturedBy: 'CAM-003', evidence: ['counterflow1.jpg', 'counterflow2.jpg'] },
  { id: 'VIO-2024-006', plate: 'GHI 3456', type: 'Beating Red Light', location: 'Shaw Blvd & Ortigas Ave', date: '2024-03-12', time: '17:45', fine: 1500, status: 'unpaid', image: '🚦', driver: 'Ana Garcia', driverId: 'DRV-004', email: 'ana@email.com', phone: '09201234567', license: 'N04-12-345678', vehicleBrand: 'Ford', vehicleModel: 'EcoSport', vehicleColor: 'Blue', capturedBy: 'CAM-001', evidence: ['redlight1.jpg'] },
  { id: 'VIO-2024-007', plate: 'JKL 7890', type: 'Illegal U-Turn', location: 'Commonwealth Ave', date: '2024-03-11', time: '13:20', fine: 1000, status: 'paid', image: '🔄', driver: 'Roberto Cruz', driverId: 'DRV-005', email: 'roberto@email.com', phone: '09211234567', license: 'N05-12-345678', vehicleBrand: 'Hyundai', vehicleModel: 'Accent', vehicleColor: 'Silver', capturedBy: 'ENF-001', evidence: ['uturn1.jpg'], paidDate: '2024-03-12', paidAmount: 1000, paymentMethod: 'Credit Card' },
];

const sampleDisputes = [
  { id: 'DIS-2024-001', violationId: 'VIO-2024-003', driver: 'Juan Dela Cruz', driverId: 'DRV-001', reason: 'Speed camera malfunction - was traveling at legal speed. Dashcam footage shows speedometer at 78km/h.', status: 'pending', date: '2024-03-06', attachment: 'dashcam_footage.mp4', phone: '09171234567', email: 'juan@email.com' },
  { id: 'DIS-2024-002', violationId: 'VIO-2024-001', driver: 'Maria Santos', driverId: 'DRV-002', reason: 'Traffic light was not functioning properly at the time.', status: 'approved', date: '2024-03-12', attachment: 'witness_statement.pdf', phone: '09181234567', email: 'maria@email.com', reviewedBy: 'Supervisor Admin', reviewDate: '2024-03-14', reviewNotes: 'Verified - signal malfunction confirmed.' },
  { id: 'DIS-2024-003', violationId: 'VIO-2024-004', driver: 'Pedro Reyes', driverId: 'DRV-003', reason: 'Vehicle was reported stolen at the time of violation. Police report attached.', status: 'rejected', date: '2024-03-08', attachment: 'police_report.pdf', phone: '09191234567', email: 'pedro@email.com', reviewedBy: 'Supervisor Admin', reviewDate: '2024-03-10', reviewNotes: 'Police report dated after violation date. Claim not substantiated.' },
];

const sampleUsers = [
  { id: 1, odId: 'DRV-001', name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '09171234567', role: 'driver', vehicles: 2, violations: 3, status: 'active', license: 'N01-12-345678', address: '123 Rizal St, Manila' },
  { id: 2, odId: 'DRV-002', name: 'Maria Santos', email: 'maria@email.com', phone: '09181234567', role: 'driver', vehicles: 1, violations: 1, status: 'active', license: 'N02-12-345678', address: '456 Mabini Ave, Quezon City' },
  { id: 3, odId: 'DRV-003', name: 'Pedro Reyes', email: 'pedro@email.com', phone: '09191234567', role: 'driver', vehicles: 3, violations: 2, status: 'suspended', license: 'N03-12-345678', address: '789 Bonifacio Blvd, Makati' },
  { id: 4, odId: 'ENF-001', name: 'Officer Garcia', email: 'garcia@lto.gov.ph', phone: '09221234567', role: 'enforcer', badge: 'ENF-001', status: 'active', station: 'District 1', apprehensions: 156 },
  { id: 5, odId: 'ENF-002', name: 'Officer Lopez', email: 'lopez@lto.gov.ph', phone: '09231234567', role: 'enforcer', badge: 'ENF-002', status: 'active', station: 'District 2', apprehensions: 203 },
];

const sampleDevices = [
  { id: 'CAM-001', name: 'Rizal Ave Camera', location: 'Rizal Ave & Main St', status: 'active', captures: 1245, lastActive: '2 mins ago', ipAddress: '192.168.1.101', installDate: '2023-06-15', speedLimit: 60, gracePeriod: 2, confidenceScore: 85, detectionMode: 'Full', alerts: true },
  { id: 'CAM-002', name: 'Highway 54 Speed Cam', location: 'Highway 54 KM 12', status: 'active', captures: 892, lastActive: '1 min ago', ipAddress: '192.168.1.102', installDate: '2023-07-20', speedLimit: 80, gracePeriod: 1, confidenceScore: 90, detectionMode: 'Speed Only', alerts: true },
  { id: 'CAM-003', name: 'EDSA Northbound Cam', location: 'EDSA Northbound', status: 'inactive', captures: 2341, lastActive: '2 hours ago', ipAddress: '192.168.1.103', installDate: '2023-05-10', speedLimit: 60, gracePeriod: 2, confidenceScore: 80, detectionMode: 'Full', alerts: false },
  { id: 'CAM-004', name: 'Quezon Blvd Junction', location: 'Quezon Blvd Junction', status: 'active', captures: 567, lastActive: '30 secs ago', ipAddress: '192.168.1.104', installDate: '2023-08-01', speedLimit: 50, gracePeriod: 3, confidenceScore: 88, detectionMode: 'Red Light Only', alerts: true },
];

const sampleDrivers = [
  { id: 'DRV-001', name: 'Juan Dela Cruz', plate: 'ABC 1234', license: 'N01-12-345678', violations: 3, unpaidFines: 3500, status: 'active', address: '123 Rizal St, Manila', phone: '09171234567' },
  { id: 'DRV-002', name: 'Maria Santos', plate: 'XYZ 5678', license: 'N02-12-345678', violations: 1, unpaidFines: 1000, status: 'active', address: '456 Mabini Ave, QC', phone: '09181234567' },
  { id: 'DRV-003', name: 'Pedro Reyes', plate: 'DEF 9012', license: 'N03-12-345678', violations: 2, unpaidFines: 2500, status: 'suspended', address: '789 Bonifacio Blvd, Makati', phone: '09191234567' },
  { id: 'DRV-004', name: 'Ana Garcia', plate: 'GHI 3456', license: 'N04-12-345678', violations: 1, unpaidFines: 1500, status: 'active', address: '12 Luna St, Pasig', phone: '09201234567' },
  { id: 'DRV-005', name: 'Roberto Cruz', plate: 'JKL 7890', license: 'N05-12-345678', violations: 1, unpaidFines: 0, status: 'active', address: '34 Rizal Ave, Caloocan', phone: '09211234567' },
];

const sampleLocations = [
  'Rizal Ave & Main St', 'Highway 54 KM 12', 'EDSA Northbound', 'Quezon Blvd Junction',
  'Shaw Blvd & Ortigas Ave', 'Commonwealth Ave', 'C5 Road Southbound', 'Marcos Highway',
  'Katipunan Ave', 'Aurora Blvd', 'España Blvd', 'Taft Avenue',
];

// ── Notification Panel ──────────────────────────────────────────────
const NotificationPanel = ({ onClose, notifications, onMarkRead }) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border z-50 animate-scale-in overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b bg-slate-50">
      <h3 className="font-bold text-sm">Notifications</h3>
      <div className="flex items-center gap-2">
        <button onClick={onMarkRead} className="text-xs text-violet-600 hover:underline">Mark all read</button>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded"><X className="w-4 h-4" /></button>
      </div>
    </div>
    <div className="divide-y max-h-80 overflow-y-auto">
      {notifications.map((n, i) => (
        <div key={i} className={`p-4 hover:bg-slate-50 cursor-pointer transition ${!n.read ? 'bg-violet-50/50' : ''}`}>
          <div className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.color}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-violet-500 rounded-full mt-1 flex-shrink-0"></div>}
          </div>
        </div>
      ))}
    </div>
    <div className="p-3 border-t bg-slate-50 text-center">
      <button className="text-xs text-violet-600 hover:underline">View all notifications</button>
    </div>
  </div>
);

// Enforcer notification panel (orange)
const EnforcerNotificationPanel = ({ onClose, notifications, onMarkRead }) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border z-50 animate-scale-in overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b bg-slate-50">
      <h3 className="font-bold text-sm">Notifications</h3>
      <div className="flex items-center gap-2">
        <button onClick={onMarkRead} className="text-xs text-orange-600 hover:underline">Mark all read</button>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded"><X className="w-4 h-4" /></button>
      </div>
    </div>
    <div className="divide-y max-h-80 overflow-y-auto">
      {notifications.map((n, i) => (
        <div key={i} className={`p-4 hover:bg-slate-50 cursor-pointer transition ${!n.read ? 'bg-orange-50/50' : ''}`}>
          <div className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.color}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Violation Details Modal ──────────────────────────────────────────
const ViolationDetailsModal = ({ violation, onClose, userType, onPayment, onDispute, onApprove, onReject }) => {
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading violation details..." /></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{violation.image}</span>
            <div><h3 className="text-lg font-bold">{violation.type}</h3><p className="text-sm text-slate-500">{violation.id}</p></div>
          </div>
          <div className="flex items-center gap-2"><StatusBadge status={violation.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2"><Image className="w-4 h-4" />Evidence Photos</h4>
            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center"><Camera className="w-16 h-16 text-slate-500" /></div>
              <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{violation.evidence?.[activeImageIndex] || 'capture.jpg'}</span>
            </div>
            {violation.evidence?.length > 1 && (
              <div className="flex gap-2">{violation.evidence.map((_, i) => (
                <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-16 h-12 rounded-lg ${i === activeImageIndex ? 'ring-2 ring-violet-500' : ''} bg-slate-200 flex items-center justify-center`}>
                  <Camera className="w-4 h-4 text-slate-400" />
                </button>
              ))}</div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Violation Information</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.location}</span></p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.date} at {violation.time}</span></p>
                <p className="flex items-center gap-2"><Camera className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Captured by: {violation.capturedBy}</span></p>
                <p className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /><span className="font-semibold text-lg">₱{violation.fine?.toLocaleString()}</span></p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Driver & Vehicle</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.driver}</span></p>
                <p className="flex items-center gap-2"><Hash className="w-4 h-4 text-slate-400" /><span className="text-slate-600">License: {violation.license}</span></p>
                <p className="flex items-center gap-2"><Car className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.plate} - {violation.vehicleColor} {violation.vehicleBrand} {violation.vehicleModel}</span></p>
              </div>
            </div>
          </div>
          {violation.status === 'paid' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Payment Confirmed</h4>
              <div className="text-sm text-emerald-600 space-y-1">
                <p>Amount Paid: ₱{violation.paidAmount?.toLocaleString()}</p><p>Date: {violation.paidDate}</p><p>Method: {violation.paymentMethod}</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {userType === 'driver' && violation.status === 'unpaid' && (
              <>
                <button onClick={() => { onClose(); onDispute(violation); }} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"><Gavel className="w-4 h-4" />File Dispute</button>
                <button onClick={() => { onClose(); onPayment(violation); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" />Pay Fine</button>
              </>
            )}
            {(userType === 'enforcer' || userType === 'supervisor') && violation.status === 'pending' && (
              <>
                <button onClick={() => { onClose(); onReject(violation); }} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><XCircle className="w-4 h-4" />Reject</button>
                <button onClick={() => { onClose(); onApprove(violation); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Approve</button>
              </>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Dispute Details Modal ──────────────────────────────────────────
const DisputeDetailsModal = ({ dispute, onClose, onApprove, onReject }) => {
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState('');
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading dispute details..." /></div>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div><h3 className="text-lg font-bold">Dispute Details</h3><p className="text-sm text-slate-500">{dispute.id}</p></div>
          <div className="flex items-center gap-2"><StatusBadge status={dispute.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Dispute Information</h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500">Filed by:</span> {dispute.driver}</p>
              <p><span className="text-slate-500">Date Filed:</span> {dispute.date}</p>
              <p><span className="text-slate-500">For Violation:</span> {dispute.violationId}</p>
              <p><span className="text-slate-500">Contact:</span> {dispute.email} | {dispute.phone}</p>
            </div>
          </div>
          <div><h4 className="font-semibold mb-2">Reason for Dispute</h4><p className="text-slate-600 bg-white border rounded-xl p-4">{dispute.reason}</p></div>
          <div>
            <h4 className="font-semibold mb-2">Supporting Documents</h4>
            <div className="border rounded-xl p-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3"><FileText className="w-8 h-8 text-blue-500" /><div><p className="font-medium">{dispute.attachment}</p><p className="text-xs text-slate-500">Uploaded on {dispute.date}</p></div></div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"><Download className="w-4 h-4" />Download</button>
            </div>
          </div>
          {dispute.status === 'pending' && (
            <div><h4 className="font-semibold mb-2">Review Notes</h4><textarea value={reviewNotes} onChange={e => setReviewNotes(e.target.value)} rows={3} placeholder="Add your review notes here..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea></div>
          )}
          {(dispute.status === 'approved' || dispute.status === 'rejected') && (
            <div className={`border rounded-xl p-4 ${dispute.status === 'approved' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <h4 className={`font-semibold mb-2 ${dispute.status === 'approved' ? 'text-emerald-700' : 'text-rose-700'}`}>Review Decision</h4>
              <p className="text-sm"><span className="text-slate-500">Reviewed by:</span> {dispute.reviewedBy}</p>
              <p className="text-sm"><span className="text-slate-500">Date:</span> {dispute.reviewDate}</p>
              {dispute.reviewNotes && <p className="text-sm mt-2 italic">{dispute.reviewNotes}</p>}
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {dispute.status === 'pending' && (
              <>
                <button onClick={() => { onReject(); }} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition">Reject</button>
                <button onClick={() => { onApprove(); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition">Approve</button>
              </>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── User Details Modal ──────────────────────────────────────────────
const UserDetailsModal = ({ user, onClose, onEdit, onDelete, onSuspend }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-bold">User Details</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center"><span className="text-2xl font-bold text-violet-600">{user.name.charAt(0)}</span></div>
          <div><h4 className="font-bold text-lg">{user.name}</h4><p className="text-slate-500 text-sm">{user.odId}</p><StatusBadge status={user.status} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Email</p><p className="font-medium">{user.email}</p></div>
          <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Phone</p><p className="font-medium">{user.phone}</p></div>
          <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Role</p><p className="font-medium capitalize">{user.role}</p></div>
          {user.role === 'driver' && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">License</p><p className="font-medium">{user.license}</p></div>}
          {user.role === 'enforcer' && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Station</p><p className="font-medium">{user.station}</p></div>}
          {user.role === 'driver' && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Violations</p><p className="font-medium text-rose-600">{user.violations}</p></div>}
          {user.role === 'enforcer' && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Apprehensions</p><p className="font-medium">{user.apprehensions}</p></div>}
        </div>
      </div>
      <div className="p-4 border-t flex gap-2">
        <button onClick={onSuspend} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl text-sm font-medium hover:bg-amber-50 transition">{user.status === 'suspended' ? 'Activate' : 'Suspend'}</button>
        <button onClick={onClose} className="px-6 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50 transition">Close</button>
      </div>
    </div>
  </div>
);

// ── Device Settings Modal (per-device) ─────────────────────────────
const DeviceSettingsModal = ({ device, onClose, onSave }) => {
  const [settings, setSettings] = useState({ ...device });
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div><h3 className="text-lg font-bold">Configure {device.id}</h3><p className="text-sm text-slate-500">{device.location}</p></div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Camera Name</label>
            <input type="text" value={settings.name} onChange={e => setSettings(s => ({...s, name: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Location Description</label>
            <input type="text" value={settings.location} onChange={e => setSettings(s => ({...s, location: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit (km/h)</label>
            <input type="number" value={settings.speedLimit} onChange={e => setSettings(s => ({...s, speedLimit: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Red Light Grace Period (seconds)</label>
            <input type="number" value={settings.gracePeriod} onChange={e => setSettings(s => ({...s, gracePeriod: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Minimum Confidence Score (%)</label>
            <input type="number" value={settings.confidenceScore} onChange={e => setSettings(s => ({...s, confidenceScore: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Detection Mode</label>
            <select value={settings.detectionMode} onChange={e => setSettings(s => ({...s, detectionMode: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>Full</option><option>Speed Only</option><option>Red Light Only</option><option>Plate Recognition Only</option>
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
            <input type="checkbox" checked={settings.alerts} onChange={e => setSettings(s => ({...s, alerts: e.target.checked}))} className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
            <span className="text-sm font-medium">Enable Offline Alerts</span>
          </label>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => { onSave(settings); onClose(); }} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

// ── Add Device Modal ─────────────────────────────────────────────────
const AddDeviceModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', location: '', ipAddress: '', speedLimit: 60, gracePeriod: 2, confidenceScore: 85, detectionMode: 'Full', alerts: true });
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Add Camera Device</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Camera Name *</label><input type="text" placeholder="e.g., Main Gate Camera" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label><input type="text" placeholder="e.g., Rizal Ave & Main St" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">IP Address *</label><input type="text" placeholder="192.168.1.xxx" value={form.ipAddress} onChange={e => setForm(f => ({...f, ipAddress: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit (km/h)</label><input type="number" value={form.speedLimit} onChange={e => setForm(f => ({...f, speedLimit: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Grace Period (s)</label><input type="number" value={form.gracePeriod} onChange={e => setForm(f => ({...f, gracePeriod: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          </div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Detection Mode</label><select value={form.detectionMode} onChange={e => setForm(f => ({...f, detectionMode: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"><option>Full</option><option>Speed Only</option><option>Red Light Only</option><option>Plate Recognition Only</option></select></div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => { onAdd(form); onClose(); }} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition">Add Device</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════════════
const LoginScreen = ({ onLogin, userType, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1500);
  };

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setResetSent(true); }, 1500);
  };

  const userTypes = [
    { id: 'driver', label: 'Vehicle Owner', icon: Car, color: 'from-blue-500 to-cyan-500' },
    { id: 'enforcer', label: 'Traffic Enforcer', icon: Shield, color: 'from-orange-500 to-red-500' },
    { id: 'supervisor', label: 'Admin', icon: Users, color: 'from-violet-500 to-purple-500' },
  ];

  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <button onClick={() => { setForgotPassword(false); setResetSent(false); }} className="text-white/60 hover:text-white mb-4 flex items-center gap-2 text-sm">← Back to Login</button>
          {resetSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Mail className="w-8 h-8 text-emerald-400" /></div>
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-white/60 mb-6">We've sent password reset instructions to your email.</p>
              <button onClick={() => { setForgotPassword(false); setResetSent(false); }} className="text-blue-400 hover:underline">Return to Login</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-white/60 mb-6">Enter your email to receive reset instructions</p>
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 mb-4" />
              <button onClick={handleResetPassword} disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : 'Send Reset Link'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Traffic Violation</h1>
          <p className="text-white/60">Monitoring System</p>
        </div>

        {/* User type selector — separate buttons, no combined login */}
        <div className="flex gap-2 mb-6">
          {userTypes.map((type) => (
            <button key={type.id} onClick={() => { setUserType(type.id); setIsSignUp(false); }}
              className={`flex-1 p-3 rounded-xl border transition-all ${userType === type.id ? `bg-gradient-to-r ${type.color} border-transparent shadow-lg` : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <type.icon className={`w-5 h-5 mx-auto mb-1 ${userType === type.id ? 'text-white' : 'text-white/60'}`} />
              <p className={`text-xs ${userType === type.id ? 'text-white font-semibold' : 'text-white/60'}`}>{type.label}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {isSignUp && userType === 'driver' && (
            <>
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
              <input type="text" placeholder="License Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
              <input type="text" placeholder="Vehicle Plate Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
            </>
          )}
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
          {isSignUp && userType === 'driver' && (
            <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
          )}
        </div>

        {!isSignUp && (
          <button onClick={() => setForgotPassword(true)} className="text-blue-400 text-sm mt-3 hover:underline">Forgot Password?</button>
        )}

        <button onClick={handleLogin} disabled={loading}
          className={`w-full py-3 mt-6 bg-gradient-to-r ${userTypes.find(t => t.id === userType)?.color} text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2`}>
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" />{isSignUp ? 'Creating Account...' : 'Signing in...'}</> : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>

        {/* Sign up ONLY for vehicle owner */}
        {userType === 'driver' && (
          <p className="text-center text-white/60 mt-4 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
          </p>
        )}
        {(userType === 'enforcer' || userType === 'supervisor') && (
          <p className="text-center text-white/40 mt-4 text-xs">Contact your administrator for account access.</p>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// VEHICLE OWNER PORTAL
// ═══════════════════════════════════════════════════════════════════
const VehicleOwnerPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('violations');
  const [showDetails, setShowDetails] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: AlertTriangle, color: 'bg-rose-100 text-rose-600', title: 'New Violation', message: 'Running Red Light recorded on Mar 15', time: '2 hours ago', read: false },
    { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600', title: 'Payment Confirmed', message: 'VIO-2024-002 has been paid successfully', time: '2 days ago', read: false },
    { icon: Info, color: 'bg-blue-100 text-blue-600', title: 'Dispute Update', message: 'Your dispute DIS-2024-001 is under review', time: '3 days ago', read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const myViolations = sampleViolations.filter(v => v.driverId === 'DRV-001');
  const unreadCount = notifications.filter(n => !n.read).length;

  const DisputeModal = () => {
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <h3 className="text-xl font-bold mb-2">File a Dispute</h3>
          <p className="text-sm text-slate-500 mb-4">For: {selectedViolation?.id} - {selectedViolation?.type}</p>
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} placeholder="Explain the reason for your dispute..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"></textarea>
          <div className="border-2 border-dashed rounded-xl p-4 text-center mb-4 hover:bg-slate-50 cursor-pointer transition">
            <Upload className="w-6 h-6 mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">Upload supporting documents</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDispute(false)} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={() => { setSubmitting(true); setTimeout(() => { setShowDispute(false); setToast({ message: 'Dispute filed successfully!', type: 'success' }); }, 1500); }} disabled={submitting} className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : 'Submit Dispute'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PaymentModal = () => {
    const [method, setMethod] = useState('gcash');
    const [processing, setProcessing] = useState(false);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <h3 className="text-xl font-bold mb-4">Pay Fine</h3>
          <div className="bg-slate-50 rounded-xl p-4 mb-4 flex justify-between items-center">
            <div><p className="text-sm text-slate-500">{selectedViolation?.id}</p><p className="font-semibold">{selectedViolation?.type}</p></div>
            <p className="text-2xl font-bold text-rose-600">₱{selectedViolation?.fine?.toLocaleString()}</p>
          </div>
          <div className="space-y-2 mb-4">
            {[{ id: 'gcash', label: 'GCash' }, { id: 'maya', label: 'Maya' }, { id: 'card', label: 'Credit/Debit Card' }, { id: 'bank', label: 'Online Banking' }].map(m => (
              <label key={m.id} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${method === m.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                <input type="radio" checked={method === m.id} onChange={() => setMethod(m.id)} className="text-blue-500" /><span className="font-medium">{m.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowPayment(false)} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={() => { setProcessing(true); setTimeout(() => { setShowPayment(false); setToast({ message: 'Payment successful!', type: 'success' }); }, 2000); }} disabled={processing} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-4 h-4 animate-spin" />Processing...</> : 'Confirm Payment'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showDispute && <DisputeModal />}
      {showPayment && <PaymentModal />}
      {showDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="driver" onClose={() => setShowDetails(false)}
          onPayment={(v) => { setSelectedViolation(v); setShowPayment(true); }}
          onDispute={(v) => { setSelectedViolation(v); setShowDispute(true); }} />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Car className="w-5 h-5" /></div>
            <div><h1 className="font-bold">My Violations</h1><p className="text-xs text-white/80">Juan Dela Cruz</p></div>
          </div>
          <div className="flex items-center gap-2 relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(v => !v)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-slate-900 font-bold">{unreadCount}</span>}
            </button>
            {showNotifications && (
              <NotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)}
                onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />
            )}
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {loading ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />) : (
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-rose-500">{myViolations.filter(v => v.status === 'unpaid').length}</p><p className="text-xs text-slate-500">Unpaid</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-emerald-500">{myViolations.filter(v => v.status === 'paid').length}</p><p className="text-xs text-slate-500">Paid</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-amber-500">{myViolations.filter(v => v.status === 'disputed').length}</p><p className="text-xs text-slate-500">Disputed</p></div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-4">
        {['violations', 'disputes', 'payments'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 pb-8 space-y-3">
        {loading ? <><CardSkeleton /><CardSkeleton /></> : (
          <>
            {activeTab === 'violations' && myViolations.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3"><span className="text-2xl">{v.image}</span><div><p className="font-semibold">{v.type}</p><p className="text-sm text-slate-500">{v.id}</p></div></div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-1"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</span></div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4"><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{v.date}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{v.time}</span></div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="text-lg font-bold">₱{v.fine.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedViolation(v); setShowDetails(true); }} className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
                    {v.status === 'unpaid' && (
                      <>
                        <button onClick={() => { setSelectedViolation(v); setShowDispute(true); }} className="px-4 py-2 text-sm border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50">Dispute</button>
                        <button onClick={() => { setSelectedViolation(v); setShowPayment(true); }} className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Pay Now</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {activeTab === 'disputes' && sampleDisputes.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">For: {d.violationId}</p></div>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-sm text-slate-600 mb-2 line-clamp-2">{d.reason}</p>
                <p className="text-xs text-slate-400">Filed: {d.date}</p>
              </div>
            ))}
            {activeTab === 'payments' && (
              <div className="space-y-3">
                {myViolations.filter(v => v.status === 'paid').map(v => (
                  <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
                        <div><p className="font-semibold">{v.id}</p><p className="text-sm text-slate-500">{v.type}</p></div>
                      </div>
                      <div className="text-right"><p className="font-bold text-emerald-600">₱{v.paidAmount?.toLocaleString()}</p><p className="text-xs text-slate-400">Paid {v.paidDate}</p><p className="text-xs text-slate-400">{v.paymentMethod}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <style jsx global>{`@keyframes scale-in{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}@keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-scale-in{animation:scale-in 0.2s ease-out}.animate-slide-up{animation:slide-up 0.3s ease-out}`}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ENFORCER DASHBOARD
// ═══════════════════════════════════════════════════════════════════
const EnforcerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('violations');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: Gavel, color: 'bg-amber-100 text-amber-600', title: 'New Dispute', message: 'DIS-2024-001 requires your review', time: '30 mins ago', read: false },
    { icon: AlertTriangle, color: 'bg-rose-100 text-rose-600', title: 'Violation Flagged', message: 'CAM-003 detected a violation on EDSA', time: '1 hour ago', read: false },
    { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600', title: 'Apprehension Approved', message: 'Your record VIO-2024-005 was approved', time: '2 hours ago', read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingViolations = sampleViolations.filter(v => v.status === 'pending' || v.status === 'unpaid');

  // ── Autocomplete Input ────────────────────────────────────────────
  const AutocompleteInput = ({ label, placeholder, suggestions, onSelect, className = '' }) => {
    const [value, setValue] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (e) => {
      const v = e.target.value;
      setValue(v);
      if (v.length > 0) {
        const f = suggestions.filter(s => s.toLowerCase().includes(v.toLowerCase()));
        setFiltered(f);
        setShowDropdown(f.length > 0);
      } else {
        setShowDropdown(false);
      }
    };

    const handleSelect = (item) => {
      setValue(item);
      setShowDropdown(false);
      if (onSelect) onSelect(item);
    };

    return (
      <div className={`relative ${className}`}>
        <label className="text-sm font-medium text-slate-700 mb-1 block">{label}</label>
        <input ref={inputRef} type="text" value={value} onChange={handleChange} onFocus={() => { if (filtered.length > 0) setShowDropdown(true); }}
          placeholder={placeholder} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        {showDropdown && (
          <div className="absolute z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-40 overflow-y-auto">
            {filtered.map((item, i) => (
              <button key={i} onMouseDown={() => handleSelect(item)} className="w-full text-left px-4 py-2.5 hover:bg-orange-50 text-sm transition first:rounded-t-xl last:rounded-b-xl">
                <span className="font-medium">{item}</span>
              </button>
            ))}
          </div>
        )}
        {value.length > 0 && filtered.length === 0 && showDropdown === false && value.length > 1 && (
          <div className="absolute z-30 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 px-4 py-2.5 text-sm text-slate-400">No records found</div>
        )}
      </div>
    );
  };

  const RecordViolationModal = () => {
    const plateNumbers = sampleDrivers.map(d => d.plate);
    const licenseNumbers = sampleDrivers.map(d => d.license);

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Record Apprehension</h3>
            <button onClick={() => setShowRecordModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <AutocompleteInput label="Plate Number *" placeholder="ABC 1234" suggestions={plateNumbers} />
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Violation Type *</label>
              <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Running Red Light</option><option>Illegal Parking</option><option>Over Speeding</option>
                <option>No Helmet</option><option>Counterflow</option><option>No License</option>
                <option>Illegal U-Turn</option><option>No Seatbelt</option>
              </select>
            </div>
            <AutocompleteInput label="Location *" placeholder="Enter location" suggestions={sampleLocations} />
            <AutocompleteInput label="Driver's License (if available)" placeholder="N01-12-345678" suggestions={licenseNumbers} />
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Photo Evidence *</label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition">
                <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-500">Take photo or upload</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Notes</label>
              <textarea rows={3} placeholder="Additional details..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowRecordModal(false)} disabled={recordLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={() => { setRecordLoading(true); setTimeout(() => { setRecordLoading(false); setShowRecordModal(false); setToast({ message: 'Violation recorded successfully!', type: 'success' }); }, 2000); }}
              disabled={recordLoading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
              {recordLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DriverSearchModal = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('plate');
    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
      setSearching(true);
      setTimeout(() => {
        const found = sampleDrivers.filter(d => {
          if (searchType === 'plate') return d.plate.toLowerCase().includes(query.toLowerCase());
          if (searchType === 'license') return d.license.toLowerCase().includes(query.toLowerCase());
          return d.name.toLowerCase().includes(query.toLowerCase());
        });
        setResults(found);
        setSearching(false);
      }, 1000);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Search Driver</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex gap-2 mb-3">
            {[{id:'plate',label:'Plate'},{id:'license',label:'License'},{id:'name',label:'Name'}].map(t => (
              <button key={t.id} onClick={() => setSearchType(t.id)} className={`flex-1 py-2 rounded-lg text-sm transition ${searchType === t.id ? 'bg-orange-500 text-white' : 'border hover:bg-slate-50'}`}>{t.label}</button>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder={`Search by ${searchType}...`} className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleSearch} disabled={searching} className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition">
              {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
          {results && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {results.length === 0 ? (
                <div className="text-center py-6"><Users className="w-12 h-12 mx-auto text-slate-300 mb-2" /><p className="text-slate-500">No records found</p></div>
              ) : results.map(d => (
                <div key={d.id} className="border rounded-xl p-4 hover:bg-slate-50 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div><p className="font-bold">{d.name}</p><p className="text-sm text-slate-500">{d.id}</p></div>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>Plate: <span className="font-medium">{d.plate}</span></p>
                    <p>License: <span className="font-medium">{d.license}</span></p>
                    <p>Violations: <span className="font-medium text-rose-600">{d.violations}</span> | Unpaid: <span className="font-medium text-amber-600">₱{d.unpaidFines.toLocaleString()}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={onClose} className="w-full mt-4 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showConfirm && <ConfirmModal {...showConfirm} onCancel={() => setShowConfirm(null)} />}
      {showRecordModal && <RecordViolationModal />}
      {showSearchModal && <DriverSearchModal onClose={() => setShowSearchModal(false)} />}
      {showDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="enforcer" onClose={() => setShowDetails(false)}
          onApprove={() => { setShowDetails(false); setToast({ message: 'Violation approved!', type: 'success' }); }}
          onReject={() => { setShowDetails(false); setToast({ message: 'Violation rejected.', type: 'warning' }); }} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} userType="enforcer" onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute approved.', type: 'success' }); }}
          onReject={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute rejected.', type: 'warning' }); }} />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5" /></div>
            <div><h1 className="font-bold">Enforcer Dashboard</h1><p className="text-xs text-white/80">Officer Garcia (ENF-001)</p></div>
          </div>
          <div className="flex items-center gap-2 relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(v => !v)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-slate-900 font-bold">{unreadCount}</span>}
            </button>
            {showNotifications && (
              <EnforcerNotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)}
                onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />
            )}
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <button onClick={() => setShowRecordModal(true)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
          <Camera className="w-5 h-5" /><span className="font-semibold">Record Apprehension</span>
        </button>
        <button onClick={() => setShowSearchModal(true)} className="bg-white border-2 border-orange-500 text-orange-600 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition">
          <Search className="w-5 h-5" /><span className="font-semibold">Search Driver</span>
        </button>
      </div>

      {/* Stats */}
      <div className="px-4 grid grid-cols-3 gap-3 mb-4">
        {loading ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />) : (
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-orange-500">12</p><p className="text-xs text-slate-500">Today</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-blue-500">87</p><p className="text-xs text-slate-500">This Week</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-emerald-500">324</p><p className="text-xs text-slate-500">This Month</p></div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-4">
        {['violations', 'disputes'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'disputes' && <span className="ml-2 px-1.5 py-0.5 bg-amber-500/20 text-amber-700 rounded text-xs">{sampleDisputes.filter(d => d.status === 'pending').length}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 pb-24 space-y-3">
        {loading ? <><CardSkeleton /><CardSkeleton /></> : (
          <>
            {activeTab === 'violations' && pendingViolations.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3"><span className="text-2xl">{v.image}</span><div><p className="font-semibold">{v.type}</p><p className="text-sm text-slate-500">{v.plate} • {v.driver}</p></div></div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="text-sm text-slate-500 mb-3">
                  <p className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</p>
                  <p className="flex items-center gap-1 mt-1"><Calendar className="w-4 h-4" />{v.date} at {v.time}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedViolation(v); setShowDetails(true); }} className="flex-1 py-2 text-sm border rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1 transition"><Eye className="w-4 h-4" />View Details</button>
                  {v.status === 'pending' && <button onClick={() => setToast({ message: 'Violation approved!', type: 'success' })} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-1 transition"><CheckCircle className="w-4 h-4" />Approve</button>}
                </div>
              </div>
            ))}
            {activeTab === 'disputes' && sampleDisputes.filter(d => d.status === 'pending').map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
                <p className="text-xs text-slate-400 mb-3">For: {d.violationId}</p>
                <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">Review Evidence</button>
              </div>
            ))}
            {activeTab === 'disputes' && sampleDisputes.filter(d => d.status === 'pending').length === 0 && (
              <div className="text-center py-12"><Gavel className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No pending disputes</p></div>
            )}
          </>
        )}
      </div>
      <style jsx global>{`@keyframes scale-in{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}@keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-scale-in{animation:scale-in 0.2s ease-out}.animate-slide-up{animation:slide-up 0.3s ease-out}`}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ADMIN / SUPERVISOR DASHBOARD
// ═══════════════════════════════════════════════════════════════════
const SupervisorDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showViolationDetails, setShowViolationDetails] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');
  const [violationStatusFilter, setViolationStatusFilter] = useState('All');
  const [violationTypeFilter, setViolationTypeFilter] = useState('All');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [devices, setDevices] = useState(sampleDevices);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: Camera, color: 'bg-slate-100 text-slate-600', title: 'CAM-003 Offline', message: 'EDSA Northbound camera went offline', time: '2 hours ago', read: false },
    { icon: Gavel, color: 'bg-amber-100 text-amber-600', title: 'New Dispute', message: 'DIS-2024-001 requires review', time: '3 hours ago', read: false },
    { icon: FileWarning, color: 'bg-rose-100 text-rose-600', title: 'New Violation', message: 'VIO-2024-008 recorded by CAM-001', time: '5 hours ago', read: true },
    { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600', title: 'Payment Received', message: '₱2,500 from Pedro Reyes', time: '6 hours ago', read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, [activeSection]);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'violations', label: 'Violations', icon: FileWarning },
    { id: 'disputes', label: 'Disputes', icon: Gavel },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'devices', label: 'Camera Devices', icon: Camera },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const violationTypes = ['All', ...new Set(sampleViolations.map(v => v.type))];
  const violationStatuses = ['All', 'unpaid', 'paid', 'disputed', 'pending'];

  const filteredViolations = sampleViolations.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || v.driver.toLowerCase().includes(searchQuery.toLowerCase()) || v.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = violationStatusFilter === 'All' || v.status === violationStatusFilter;
    const matchesType = violationTypeFilter === 'All' || v.type === violationTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredUsers = sampleUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'All' || (userFilter === 'Drivers' && u.role === 'driver') || (userFilter === 'Enforcers' && u.role === 'enforcer');
    return matchesSearch && matchesFilter;
  });

  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transform transition-transform z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5" /></div>
          <div><h1 className="font-bold">Admin Panel</h1><p className="text-xs text-slate-400">Traffic Chief</p></div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); setSearchQuery(''); setShowFilterPanel(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === item.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <item.icon className="w-5 h-5" /><span>{item.label}</span>
            {item.id === 'disputes' && <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{sampleDisputes.filter(d => d.status === 'pending').length}</span>}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"><LogOut className="w-5 h-5" /><span>Logout</span></button>
      </div>
    </aside>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />) : (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('violations')}>
              <div className="flex items-center justify-between mb-2"><FileWarning className="w-8 h-8 text-violet-500" /><span className="text-xs text-emerald-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+12%</span></div>
              <p className="text-2xl font-bold">1,234</p><p className="text-sm text-slate-500">Total Violations</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('disputes')}>
              <div className="flex items-center justify-between mb-2"><Gavel className="w-8 h-8 text-amber-500" /><span className="text-xs text-amber-500 font-medium">+5 new</span></div>
              <p className="text-2xl font-bold">23</p><p className="text-sm text-slate-500">Pending Disputes</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('devices')}>
              <div className="flex items-center justify-between mb-2"><Camera className="w-8 h-8 text-blue-500" /><span className="text-xs text-emerald-500 font-medium">{devices.filter(d => d.status === 'active').length} active</span></div>
              <p className="text-2xl font-bold">{devices.filter(d => d.status === 'active').length}/{devices.length}</p><p className="text-sm text-slate-500">Active Cameras</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('users')}>
              <div className="flex items-center justify-between mb-2"><Users className="w-8 h-8 text-emerald-500" /><span className="text-xs text-emerald-500 font-medium">+3 new</span></div>
              <p className="text-2xl font-bold">{sampleUsers.length}</p><p className="text-sm text-slate-500">Total Users</p>
            </div>
          </>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? <><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></> : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Violations by Type</h3>
              <div className="space-y-3">
                {[{type:'Running Red Light',percent:35,color:'from-rose-500 to-pink-500'},{type:'Over Speeding',percent:28,color:'from-amber-500 to-orange-500'},{type:'Illegal Parking',percent:22,color:'from-blue-500 to-cyan-500'},{type:'No Helmet',percent:15,color:'from-violet-500 to-purple-500'}].map(item => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span>{item.type}</span><span className="text-slate-500">{item.percent}%</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`} style={{width:`${item.percent}%`}}></div></div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {action:'New violation recorded',detail:'VIO-2024-008 - Running Red Light',time:'2 mins ago',icon:FileWarning,color:'text-rose-500 bg-rose-100'},
                  {action:'Dispute submitted',detail:'DIS-2024-004 awaiting review',time:'1 hour ago',icon:Gavel,color:'text-amber-500 bg-amber-100'},
                  {action:'Camera CAM-003 offline',detail:'EDSA Northbound location',time:'2 hours ago',icon:Camera,color:'text-slate-500 bg-slate-100'},
                  {action:'New user registered',detail:'Juan Dela Cruz (DRV-006)',time:'3 hours ago',icon:Users,color:'text-violet-500 bg-violet-100'},
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}><item.icon className="w-4 h-4" /></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium">{item.action}</p><p className="text-xs text-slate-500 truncate">{item.detail}</p></div>
                    <p className="text-xs text-slate-400 whitespace-nowrap">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const ViolationsContent = () => (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by ID, plate, driver, type..." className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <button onClick={() => setShowFilterPanel(v => !v)} className={`px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition ${showFilterPanel ? 'bg-violet-50 border-violet-300 text-violet-700' : ''}`}>
          <Filter className="w-4 h-4" />Filter {(violationStatusFilter !== 'All' || violationTypeFilter !== 'All') && <span className="w-2 h-2 bg-violet-500 rounded-full"></span>}
        </button>
        <button className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition"><Download className="w-4 h-4" />Export</button>
      </div>

      {showFilterPanel && (
        <div className="bg-white border rounded-xl p-4 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Filter by Status</label>
              <div className="flex flex-wrap gap-2">
                {violationStatuses.map(s => (
                  <button key={s} onClick={() => setViolationStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm transition ${violationStatusFilter === s ? 'bg-violet-600 text-white' : 'border hover:bg-slate-50'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Filter by Type</label>
              <select value={violationTypeFilter} onChange={e => setViolationTypeFilter(e.target.value)} className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm">
                {violationTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => { setViolationStatusFilter('All'); setViolationTypeFilter('All'); }} className="mt-3 text-sm text-violet-600 hover:underline">Clear filters</button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Plate</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Driver</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Fine</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredViolations.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 text-sm font-mono">{v.id}</td>
                    <td className="px-4 py-3 text-sm"><span className="flex items-center gap-2">{v.image} {v.type}</span></td>
                    <td className="px-4 py-3 text-sm font-medium">{v.plate}</td>
                    <td className="px-4 py-3 text-sm">{v.driver}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{v.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold">₱{v.fine.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setSelectedViolation(v); setShowViolationDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredViolations.length === 0 && <div className="text-center py-12"><FileWarning className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No violations found</p></div>}
        </div>
      )}
    </div>
  );

  const DisputesContent = () => (
    <div className="space-y-4">
      {loading ? <div className="grid md:grid-cols-2 gap-4">{[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}</div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {sampleDisputes.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex justify-between items-start mb-2"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div><StatusBadge status={d.status} /></div>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
              <p className="text-xs text-slate-400 mb-3">For: {d.violationId}</p>
              <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">View Details</button>
              {d.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setToast({ message: 'Dispute approved!', type: 'success' })} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">Approve</button>
                  <button onClick={() => setToast({ message: 'Dispute rejected.', type: 'warning' })} className="flex-1 py-2 text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const UsersContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2">
          {['All', 'Drivers', 'Enforcers'].map((tab) => (
            <button key={tab} onClick={() => setUserFilter(tab)} className={`px-4 py-2 rounded-lg text-sm transition ${userFilter === tab ? 'bg-violet-600 text-white' : 'bg-white border hover:bg-slate-50'}`}>{tab}</button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        {/* No "Add User" button — removed as requested */}
      </div>
      {loading ? <div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div> : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center"><span className="text-sm font-medium text-violet-600">{u.name.charAt(0)}</span></div>
                        <span className="text-sm font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{u.email}</td>
                    <td className="px-4 py-3 text-sm capitalize">{u.role}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setSelectedUser(u); setShowUserDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && <div className="text-center py-12"><Users className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No users found</p></div>}
        </div>
      )}
    </div>
  );

  const DevicesContent = () => {
    const toggleStatus = (id) => {
      setDevices(ds => ds.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d));
      setToast({ message: 'Device status updated!', type: 'success' });
    };
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Camera Devices</h3>
          <div className="flex gap-2">
            <button onClick={() => setToast({ message: 'Refreshing device status...', type: 'info' })} className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition"><RefreshCw className="w-4 h-4" />Refresh</button>
            <button onClick={() => setShowAddDevice(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition flex items-center gap-2"><Plus className="w-4 h-4" />Add Camera</button>
          </div>
        </div>
        {loading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === 'active' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <Camera className={`w-5 h-5 ${d.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                    <div><p className="font-semibold text-sm">{d.id}</p><p className="text-xs text-slate-500">{d.location}</p></div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-3">
                  <span>{d.captures.toLocaleString()} captures</span><span>Last: {d.lastActive}</span>
                </div>
                <div className="text-xs text-slate-400 mb-3 space-y-1">
                  <p>Mode: <span className="text-slate-600 font-medium">{d.detectionMode}</span></p>
                  <p>Speed limit: <span className="text-slate-600 font-medium">{d.speedLimit} km/h</span></p>
                  <p>IP: <span className="font-mono text-slate-600">{d.ipAddress}</span></p>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  {/* Active/Inactive toggle */}
                  <button onClick={() => toggleStatus(d.id)} className={`flex-1 py-2 text-xs rounded-lg flex items-center justify-center gap-1 transition ${d.status === 'active' ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'}`}>
                    {d.status === 'active' ? <><WifiOff className="w-3 h-3" />Deactivate</> : <><Wifi className="w-3 h-3" />Activate</>}
                  </button>
                  {/* Configure button */}
                  <button onClick={() => { setSelectedDevice(d); setShowDeviceSettings(true); }} className="flex-1 py-2 text-xs bg-violet-600 text-white rounded-lg flex items-center justify-center gap-1 hover:bg-violet-700 transition">
                    <Sliders className="w-3 h-3" />Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SettingsContent = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">Per-device settings are configured individually from the <button onClick={() => setActiveSection('devices')} className="font-semibold underline">Camera Devices</button> section using the Configure button on each device card.</p>
      </div>
      {loading ? <><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-48 rounded-xl" /></> : (
        <>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold mb-1">System-wide Settings</h3>
            <p className="text-sm text-slate-500 mb-4">Global parameters that apply to all cameras unless overridden per-device.</p>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-slate-700 mb-1 block">Default Speed Limit (km/h)</label><input type="number" defaultValue={60} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
              <div><label className="text-sm font-medium text-slate-700 mb-1 block">Default Red Light Grace Period (seconds)</label><input type="number" defaultValue={2} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
              <div><label className="text-sm font-medium text-slate-700 mb-1 block">Default Minimum Confidence Score (%)</label><input type="number" defaultValue={85} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
              <button onClick={() => setToast({ message: 'System settings saved!', type: 'success' })} className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition">Save Changes</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {[{label:'Email notifications for new disputes',checked:true},{label:'SMS alerts for device offline',checked:true},{label:'Daily summary reports',checked:false},{label:'Payment confirmation alerts',checked:true}].map((setting) => (
                <label key={setting.label} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                  <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                  <span className="text-sm">{setting.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardContent />;
      case 'violations': return <ViolationsContent />;
      case 'disputes': return <DisputesContent />;
      case 'users': return <UsersContent />;
      case 'devices': return <DevicesContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showConfirm && <ConfirmModal {...showConfirm} onCancel={() => setShowConfirm(null)} />}
      {showViolationDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="supervisor" onClose={() => setShowViolationDetails(false)}
          onApprove={() => { setShowViolationDetails(false); setToast({ message: 'Violation approved!', type: 'success' }); }}
          onReject={() => { setShowViolationDetails(false); setToast({ message: 'Violation rejected.', type: 'warning' }); }} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} userType="supervisor" onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute approved!', type: 'success' }); }}
          onReject={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute rejected.', type: 'warning' }); }} />
      )}
      {showUserDetails && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setShowUserDetails(false)}
          onSuspend={() => { setShowUserDetails(false); setToast({ message: 'User status updated!', type: 'success' }); }} />
      )}
      {showDeviceSettings && selectedDevice && (
        <DeviceSettingsModal device={selectedDevice} onClose={() => setShowDeviceSettings(false)}
          onSave={(updated) => { setDevices(ds => ds.map(d => d.id === updated.id ? updated : d)); setToast({ message: `${updated.id} settings saved!`, type: 'success' }); }} />
      )}
      {showAddDevice && (
        <AddDeviceModal onClose={() => setShowAddDevice(false)}
          onAdd={(newDev) => {
            const id = `CAM-00${devices.length + 1}`;
            setDevices(ds => [...ds, { ...newDev, id, status: 'active', captures: 0, lastActive: 'Just added', installDate: new Date().toISOString().split('T')[0] }]);
            setToast({ message: 'Camera device added!', type: 'success' });
          }} />
      )}

      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <div className="lg:pl-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"><Menu className="w-5 h-5" /></button>
              <h2 className="font-bold text-lg capitalize">{menuItems.find(m => m.id === activeSection)?.label || activeSection}</h2>
            </div>
            <div className="flex items-center gap-3 relative" ref={notifRef}>
              <button onClick={() => setShowNotifications(v => !v)} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full text-xs flex items-center justify-center text-white font-bold">{unreadCount}</span>}
              </button>
              {showNotifications && (
                <NotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)}
                  onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />
              )}
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center"><span className="text-sm font-medium text-violet-600">TC</span></div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">{renderContent()}</main>
      </div>

      <style jsx global>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function TrafficViolationSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('driver');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} userType={userType} setUserType={setUserType} />;
  }

  switch (userType) {
    case 'driver': return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
    case 'enforcer': return <EnforcerDashboard onLogout={() => setIsLoggedIn(false)} />;
    case 'supervisor': return <SupervisorDashboard onLogout={() => setIsLoggedIn(false)} />;
    default: return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
  }
}
