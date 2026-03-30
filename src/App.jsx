import React, { useState, useEffect } from 'react';
import { Car, FileText, CreditCard, AlertTriangle, Users, Settings, BarChart3, Camera, Shield, LogOut, ChevronRight, Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, Bell, Menu, X, Upload, MessageSquare, TrendingUp, Activity, Gavel, UserCheck, FileWarning, Printer, Loader2, ChevronDown, Image, Download, Mail, Phone, Hash, AlertCircle, Info, Trash2, Edit, RefreshCw, Plus, Copy, ExternalLink, ChevronLeft, Send, Power, Play, Pause, Volume2, ZoomIn, RotateCcw, Save, Database, Lock, Unlock, WifiOff, Wifi } from 'lucide-react';
// ─────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizes[size]} animate-spin text-violet-500`} />
      <p className="text-sm text-slate-500 animate-pulse">{text}</p>
    </div>
  );
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
);

const CardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div><Skeleton className="w-32 h-4 mb-2" /><Skeleton className="w-24 h-3" /></div>
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton className="w-full h-3 mb-2" />
    <Skeleton className="w-3/4 h-3 mb-4" />
    <div className="flex gap-2">
      <Skeleton className="flex-1 h-10 rounded-lg" />
      <Skeleton className="flex-1 h-10 rounded-lg" />
    </div>
  </div>
);

const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 items-center">
        <Skeleton className="w-24 h-4" /><Skeleton className="w-32 h-4" />
        <Skeleton className="w-20 h-4" /><Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
    ))}
  </div>
);

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const styles = { success: 'bg-emerald-500', error: 'bg-rose-500', warning: 'bg-amber-500', info: 'bg-blue-500' };
  const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
  const Icon = icons[type];
  return (
    <div className={`fixed bottom-4 right-4 ${styles[type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-slide-up`}>
      <Icon className="w-5 h-5" /><span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80"><X className="w-4 h-4" /></button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────

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
  { id: 'DIS-2024-002', violationId: 'VIO-2024-001', driver: 'Maria Santos', driverId: 'DRV-002', reason: 'Traffic light was not functioning properly at the time. Several witnesses can confirm.', status: 'approved', date: '2024-03-12', attachment: 'witness_statement.pdf', phone: '09181234567', email: 'maria@email.com', reviewedBy: 'Supervisor Admin', reviewDate: '2024-03-14', reviewNotes: 'Verified with traffic management - signal malfunction confirmed.' },
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
  { id: 'CAM-001', location: 'Rizal Ave & Main St', status: 'online', captures: 1245, lastActive: '2 mins ago', ipAddress: '192.168.1.101', installDate: '2023-06-15' },
  { id: 'CAM-002', location: 'Highway 54 KM 12', status: 'online', captures: 892, lastActive: '1 min ago', ipAddress: '192.168.1.102', installDate: '2023-07-20' },
  { id: 'CAM-003', location: 'EDSA Northbound', status: 'offline', captures: 2341, lastActive: '2 hours ago', ipAddress: '192.168.1.103', installDate: '2023-05-10' },
  { id: 'CAM-004', location: 'Quezon Blvd Junction', status: 'online', captures: 567, lastActive: '30 secs ago', ipAddress: '192.168.1.104', installDate: '2023-08-01' },
];

const sampleDrivers = [
  { id: 'DRV-001', name: 'Juan Dela Cruz', plate: 'ABC 1234', license: 'N01-12-345678', violations: 3, unpaidFines: 3500, status: 'active' },
  { id: 'DRV-002', name: 'Maria Santos', plate: 'XYZ 5678', license: 'N02-12-345678', violations: 1, unpaidFines: 1000, status: 'active' },
  { id: 'DRV-003', name: 'Pedro Reyes', plate: 'DEF 9012', license: 'N03-12-345678', violations: 2, unpaidFines: 2500, status: 'suspended' },
  { id: 'DRV-004', name: 'Ana Garcia', plate: 'GHI 3456', license: 'N04-12-345678', violations: 1, unpaidFines: 1500, status: 'active' },
  { id: 'DRV-005', name: 'Roberto Cruz', plate: 'JKL 7890', license: 'N05-12-345678', violations: 1, unpaidFines: 0, status: 'active' },
];

// ─────────────────────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    unpaid: 'bg-rose-100 text-rose-700 border-rose-200',
    disputed: 'bg-amber-100 text-amber-700 border-amber-200',
    pending: 'bg-blue-100 text-blue-700 border-blue-200',
    approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    rejected: 'bg-rose-100 text-rose-700 border-rose-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    suspended: 'bg-rose-100 text-rose-700 border-rose-200',
    online: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    offline: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// CONFIRM MODAL
// ─────────────────────────────────────────────────────────────

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', confirmColor = 'bg-violet-600 hover:bg-violet-700' }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6 text-amber-600" />
      </div>
      <h3 className="text-lg font-bold text-center mb-2">{title}</h3>
      <p className="text-slate-500 text-center text-sm mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
        <button onClick={onConfirm} className={`flex-1 py-2.5 ${confirmColor} text-white rounded-xl font-medium transition`}>{confirmText}</button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────────────────────

const LoginScreen = ({ onLogin, userType, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };
  const handleResetPassword = () => { setLoading(true); setTimeout(() => { setLoading(false); setResetSent(true); }, 1500); };

  const userTypes = [
    { id: 'driver', label: 'Vehicle Owner', icon: Car, color: 'from-blue-500 to-cyan-500' },
    { id: 'enforcer', label: 'Traffic Enforcer', icon: Shield, color: 'from-orange-500 to-red-500' },
    { id: 'supervisor', label: 'Supervisor/Admin', icon: Users, color: 'from-violet-500 to-purple-500' },
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
              <p className="text-white/60 mb-6">We've sent password reset instructions to your email address.</p>
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
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Traffic Violation</h1>
          <p className="text-white/60">Monitoring System</p>
        </div>
        <div className="flex gap-2 mb-6">
          {userTypes.map((type) => (
            <button key={type.id} onClick={() => setUserType(type.id)}
              className={`flex-1 p-3 rounded-xl border transition-all ${userType === type.id ? `bg-gradient-to-r ${type.color} border-transparent shadow-lg` : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <type.icon className={`w-5 h-5 mx-auto mb-1 ${userType === type.id ? 'text-white' : 'text-white/60'}`} />
              <p className={`text-xs ${userType === type.id ? 'text-white' : 'text-white/60'}`}>{type.label}</p>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {isSignUp && <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />}
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
          {isSignUp && (
            <>
              <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
              <input type="text" placeholder="License Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
            </>
          )}
        </div>
        {!isSignUp && <button onClick={() => setForgotPassword(true)} className="text-blue-400 text-sm mt-3 hover:underline">Forgot Password?</button>}
        <button onClick={handleLogin} disabled={loading}
          className={`w-full py-3 mt-6 bg-gradient-to-r ${userTypes.find(t => t.id === userType)?.color} text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2`}>
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Signing in...</> : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
        {userType === 'driver' && (
          <p className="text-center text-white/60 mt-4 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
          </p>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// VIOLATION DETAILS MODAL
// ─────────────────────────────────────────────────────────────

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
          <div className="flex items-center gap-2">
            <StatusBadge status={violation.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2"><Image className="w-4 h-4" />Evidence Photos</h4>
            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                <Camera className="w-16 h-16 text-slate-500" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{violation.evidence?.[activeImageIndex] || 'capture.jpg'}</span>
            </div>
            {violation.evidence?.length > 1 && (
              <div className="flex gap-2">
                {violation.evidence.map((_, i) => (
                  <button key={i} onClick={() => setActiveImageIndex(i)}
                    className={`w-16 h-12 rounded-lg ${i === activeImageIndex ? 'ring-2 ring-violet-500' : ''} bg-slate-200 flex items-center justify-center`}>
                    <Camera className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
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
                {(userType === 'enforcer' || userType === 'supervisor') && (
                  <>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.email}</span></p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{violation.phone}</span></p>
                  </>
                )}
              </div>
            </div>
          </div>
          {violation.status === 'paid' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Payment Confirmed</h4>
              <div className="text-sm text-emerald-600 space-y-1">
                <p>Amount Paid: ₱{violation.paidAmount?.toLocaleString()}</p>
                <p>Date: {violation.paidDate}</p>
                <p>Method: {violation.paymentMethod}</p>
              </div>
            </div>
          )}
          {violation.status === 'disputed' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2"><Gavel className="w-4 h-4" />Dispute Filed</h4>
              <p className="text-sm text-amber-600">Dispute ID: {violation.disputeId}</p>
              <p className="text-sm text-amber-600 mt-1">This violation is currently under review.</p>
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

// ─────────────────────────────────────────────────────────────
// DISPUTE DETAILS MODAL
// ─────────────────────────────────────────────────────────────

const DisputeDetailsModal = ({ dispute, onClose, onApprove, onReject, userType }) => {
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState('');
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  const relatedViolation = sampleViolations.find(v => v.id === dispute.violationId);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading dispute details..." /></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div><h3 className="text-lg font-bold">{dispute.id}</h3><p className="text-sm text-slate-500">For Violation: {dispute.violationId}</p></div>
          <div className="flex items-center gap-2"><StatusBadge status={dispute.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-700 mb-2">Driver Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
              <p className="flex items-center gap-2"><Users className="w-4 h-4" />{dispute.driver}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{dispute.phone}</p>
              <p className="flex items-center gap-2 col-span-2"><Mail className="w-4 h-4" />{dispute.email}</p>
            </div>
          </div>
          {relatedViolation && (
            <div className="bg-slate-50 border rounded-xl p-4">
              <h4 className="font-semibold mb-2">Related Violation</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-medium">Type:</span> {relatedViolation.type}</p>
                <p><span className="font-medium">Location:</span> {relatedViolation.location}</p>
                <p><span className="font-medium">Date:</span> {relatedViolation.date} at {relatedViolation.time}</p>
                <p><span className="font-medium">Fine Amount:</span> ₱{relatedViolation.fine?.toLocaleString()}</p>
              </div>
            </div>
          )}
          <div>
            <h4 className="font-semibold mb-2">Reason for Dispute</h4>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4 border">{dispute.reason}</p>
          </div>
          <div className="bg-slate-50 border rounded-xl p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4" />Submitted Evidence</h4>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-violet-600" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{dispute.attachment}</p>
                <p className="text-xs text-slate-400">Submitted on {dispute.date}</p>
              </div>
              <button className="text-violet-600 text-sm hover:underline flex items-center gap-1"><Download className="w-4 h-4" />View</button>
            </div>
          </div>
          {dispute.status !== 'pending' && dispute.reviewedBy && (
            <div className={`rounded-xl p-4 border ${dispute.status === 'approved' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              <h4 className={`font-semibold mb-2 ${dispute.status === 'approved' ? 'text-emerald-700' : 'text-rose-700'}`}>Review Decision</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Reviewed by:</span> {dispute.reviewedBy}</p>
                <p><span className="font-medium">Date:</span> {dispute.reviewDate}</p>
                <p><span className="font-medium">Notes:</span> {dispute.reviewNotes}</p>
              </div>
            </div>
          )}
          {(userType === 'supervisor' || userType === 'enforcer') && dispute.status === 'pending' && (
            <div>
              <h4 className="font-semibold mb-2">Review Notes</h4>
              <textarea rows={3} value={reviewNotes} onChange={e => setReviewNotes(e.target.value)}
                placeholder="Add your review notes here..."
                className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {(userType === 'supervisor' || userType === 'enforcer') && dispute.status === 'pending' && (
              <>
                <button onClick={() => onReject(dispute)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><XCircle className="w-4 h-4" />Reject</button>
                <button onClick={() => onApprove(dispute)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Approve & Dismiss</button>
              </>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// USER DETAILS MODAL
// ─────────────────────────────────────────────────────────────

const UserDetailsModal = ({ user, onClose, onSuspend, onActivate }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);
  const userViolations = sampleViolations.filter(v => v.driver === user.name);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading user details..." /></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-violet-600">{user.name.charAt(0)}</span>
            </div>
            <div><h3 className="text-lg font-bold">{user.name}</h3><p className="text-sm text-slate-500 capitalize">{user.role} • {user.odId}</p></div>
          </div>
          <div className="flex items-center gap-2"><StatusBadge status={user.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{user.email}</span></p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{user.phone}</span></p>
                {user.address && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{user.address}</span></p>}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">{user.role === 'driver' ? 'Driver Details' : 'Enforcer Details'}</h4>
              <div className="space-y-2 text-sm">
                {user.license && <p className="flex items-center gap-2"><Hash className="w-4 h-4 text-slate-400" /><span className="text-slate-600">License: {user.license}</span></p>}
                {user.badge && <p className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Badge: {user.badge}</span></p>}
                {user.station && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Station: {user.station}</span></p>}
                {user.apprehensions !== undefined && <p className="flex items-center gap-2"><FileWarning className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{user.apprehensions} apprehensions</span></p>}
                {user.violations !== undefined && <p className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{user.violations} violations on record</span></p>}
              </div>
            </div>
          </div>
          {user.role === 'driver' && userViolations.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Violation History</h4>
              <div className="space-y-2">
                {userViolations.map(v => (
                  <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{v.image}</span>
                      <div><p className="text-sm font-medium">{v.type}</p><p className="text-xs text-slate-400">{v.date}</p></div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">₱{v.fine.toLocaleString()}</p>
                      <StatusBadge status={v.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {user.role === 'driver' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Driver records are synced from the LTO database. Edit access is restricted to LTO administrators.
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {user.role === 'driver' && (
              user.status === 'active'
                ? <button onClick={() => onSuspend(user)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><Lock className="w-4 h-4" />Suspend Account</button>
                : <button onClick={() => onActivate(user)} className="flex-1 py-2.5 border border-emerald-500 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition flex items-center justify-center gap-2"><Unlock className="w-4 h-4" />Reactivate Account</button>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DEVICE DETAILS MODAL
// ─────────────────────────────────────────────────────────────

const DeviceDetailsModal = ({ device, onClose, onRestart, onDiagnostic }) => {
  const [loading, setLoading] = useState(true);
  const [diagRunning, setDiagRunning] = useState(false);
  const [restartRunning, setRestartRunning] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  const runDiagnostic = () => {
    setDiagRunning(true);
    setTimeout(() => { setDiagRunning(false); onDiagnostic && onDiagnostic(device); }, 2000);
  };

  const runRestart = () => {
    setRestartRunning(true);
    setTimeout(() => { setRestartRunning(false); onRestart && onRestart(device); }, 2500);
  };

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"><LoadingSpinner text="Loading device info..." /></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.status === 'online' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
              <Camera className={`w-6 h-6 ${device.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
            </div>
            <div><h3 className="text-lg font-bold">{device.id}</h3><p className="text-sm text-slate-500">{device.location}</p></div>
          </div>
          <div className="flex items-center gap-2"><StatusBadge status={device.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Captures', value: device.captures.toLocaleString(), icon: Camera },
              { label: 'Last Active', value: device.lastActive, icon: Clock },
              { label: 'IP Address', value: device.ipAddress, icon: Database },
              { label: 'Install Date', value: device.installDate, icon: Calendar },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-3 border">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className={`rounded-xl p-4 border ${device.status === 'online' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <div className="flex items-center gap-2">
              {device.status === 'online' ? <Wifi className="w-5 h-5 text-emerald-600" /> : <WifiOff className="w-5 h-5 text-rose-500" />}
              <p className={`font-semibold ${device.status === 'online' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {device.status === 'online' ? 'Device is online and capturing' : 'Device is offline — action required'}
              </p>
            </div>
            {device.status === 'offline' && <p className="text-sm text-rose-500 mt-1 ml-7">Last seen: {device.lastActive}. Check network connection or restart device.</p>}
          </div>
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl flex gap-3">
          <button onClick={runDiagnostic} disabled={diagRunning}
            className="flex-1 py-2.5 border border-violet-500 text-violet-600 rounded-xl font-medium hover:bg-violet-50 transition flex items-center justify-center gap-2">
            {diagRunning ? <><Loader2 className="w-4 h-4 animate-spin" />Running...</> : <><Activity className="w-4 h-4" />Run Diagnostic</>}
          </button>
          <button onClick={runRestart} disabled={restartRunning}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
            {restartRunning ? <><Loader2 className="w-4 h-4 animate-spin" />Restarting...</> : <><RefreshCw className="w-4 h-4" />Restart Device</>}
          </button>
          <button onClick={onClose} className="px-4 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DRIVER SEARCH MODAL
// ─────────────────────────────────────────────────────────────

const DriverSearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('plate');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      const found = sampleDrivers.filter(d =>
        searchType === 'plate' ? d.plate.toLowerCase().includes(searchQuery.toLowerCase())
          : searchType === 'license' ? d.license.toLowerCase().includes(searchQuery.toLowerCase())
            : d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(found);
      setSearching(false);
    }, 1000);
  };

  const getDriverViolations = (driverId) => sampleViolations.filter(v => v.driverId === driverId);

  if (selectedDriver) {
    const driverViolations = getDriverViolations(selectedDriver.id);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl my-8 animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedDriver(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">←</button>
              <div><h3 className="font-bold">{selectedDriver.name}</h3><p className="text-sm text-slate-500">{selectedDriver.plate}</p></div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'License No.', value: selectedDriver.license },
                { label: 'Status', value: selectedDriver.status },
                { label: 'Total Violations', value: selectedDriver.violations },
                { label: 'Unpaid Fines', value: `₱${selectedDriver.unpaidFines.toLocaleString()}` },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-3">Violation History</h4>
              {driverViolations.length > 0 ? driverViolations.map(v => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border mb-2">
                  <div className="flex items-center gap-2"><span className="text-xl">{v.image}</span>
                    <div><p className="text-sm font-medium">{v.type}</p><p className="text-xs text-slate-400">{v.date}</p></div>
                  </div>
                  <div className="text-right"><p className="text-sm font-semibold">₱{v.fine.toLocaleString()}</p><StatusBadge status={v.status} /></div>
                </div>
              )) : <p className="text-slate-400 text-sm text-center py-4">No violations found</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Search Driver / Vehicle</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            {[{ id: 'plate', label: 'Plate No.' }, { id: 'license', label: 'License' }, { id: 'name', label: 'Name' }].map(t => (
              <button key={t.id} onClick={() => setSearchType(t.id)}
                className={`flex-1 py-2 rounded-lg text-sm transition ${searchType === t.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={`Search by ${searchType}...`}
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleSearch} disabled={searching}
              className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition flex items-center gap-2">
              {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
          {results !== null && (
            <div>
              {results.length > 0 ? results.map(d => (
                <button key={d.id} onClick={() => setSelectedDriver(d)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl border mb-2 hover:bg-orange-50 hover:border-orange-300 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-orange-600">{d.name.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{d.name}</p>
                      <p className="text-xs text-slate-500">{d.plate} • {d.license}</p>
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </button>
              )) : (
                <div className="text-center py-8 text-slate-500">
                  <Search className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// FILTER MODAL
// ─────────────────────────────────────────────────────────────

const FilterModal = ({ onClose, onApply, title = 'Filter Options' }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'unpaid', 'paid', 'pending', 'disputed', 'approved'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`py-1.5 rounded-lg text-xs font-medium capitalize transition ${statusFilter === s ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
            <div className="flex gap-2">
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={() => { setStatusFilter('all'); setDateFrom(''); setDateTo(''); }} className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50 transition">Reset</button>
          <button onClick={() => { onApply({ statusFilter, dateFrom, dateTo }); onClose(); }}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// EXPORT MODAL
// ─────────────────────────────────────────────────────────────

const ExportModal = ({ onClose, onExport, title = 'Export Data' }) => {
  const [format, setFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); onExport(format); onClose(); }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Export Format</label>
            <div className="space-y-2">
              {[{ id: 'csv', label: 'CSV Spreadsheet', desc: 'Compatible with Excel, Google Sheets' },
              { id: 'pdf', label: 'PDF Report', desc: 'Formatted report for printing' },
              { id: 'json', label: 'JSON Data', desc: 'Raw data for system integration' }].map(f => (
                <button key={f.id} onClick={() => setFormat(f.id)}
                  className={`w-full p-3 rounded-xl border text-left transition ${format === f.id ? 'border-violet-500 bg-violet-50' : 'hover:bg-slate-50'}`}>
                  <p className="font-medium text-sm">{f.label}</p>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleExport} disabled={exporting}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
            {exporting ? <><Loader2 className="w-4 h-4 animate-spin" />Exporting...</> : <><Download className="w-4 h-4" />Export</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// NOTIFICATION PANEL
// ─────────────────────────────────────────────────────────────

const NotificationPanel = ({ onClose }) => {
  const notifications = [
    { id: 1, type: 'dispute', message: 'New dispute filed by Juan Dela Cruz', time: '2 mins ago', read: false },
    { id: 2, type: 'payment', message: 'Payment received: ₱2,500 from Pedro Reyes', time: '15 mins ago', read: false },
    { id: 3, type: 'device', message: 'CAM-003 went offline at EDSA Northbound', time: '2 hours ago', read: true },
    { id: 4, type: 'violation', message: 'New violation recorded: VIO-2024-008', time: '3 hours ago', read: true },
  ];
  const icons = { dispute: Gavel, payment: DollarSign, device: Camera, violation: AlertTriangle };
  const colors = { dispute: 'text-amber-500 bg-amber-100', payment: 'text-emerald-500 bg-emerald-100', device: 'text-slate-500 bg-slate-100', violation: 'text-rose-500 bg-rose-100' };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute top-14 right-4 bg-white rounded-2xl shadow-2xl border w-80 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold">Notifications</h3>
          <span className="text-xs text-violet-600 font-medium cursor-pointer hover:underline">Mark all read</span>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map(n => {
            const Icon = icons[n.type];
            return (
              <div key={n.id} className={`flex gap-3 p-4 border-b hover:bg-slate-50 transition cursor-pointer ${!n.read ? 'bg-violet-50/40' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors[n.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-violet-500 rounded-full mt-1.5 shrink-0"></div>}
              </div>
            );
          })}
        </div>
        <div className="p-3 text-center"><button className="text-sm text-violet-600 hover:underline">View all notifications</button></div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// REPORT GENERATE MODAL
// ─────────────────────────────────────────────────────────────

const ReportModal = ({ report, onClose, onGenerate }) => {
  const [period, setPeriod] = useState('month');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); onGenerate(report.title, period); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Generate Report</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${report.bg}`}><report.icon className={`w-6 h-6 ${report.color}`} /></div>
          <div><p className="font-bold">{report.title}</p><p className="text-sm text-slate-500">{report.desc}</p></div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Reporting Period</label>
            <div className="grid grid-cols-3 gap-2">
              {[{ id: 'week', label: 'This Week' }, { id: 'month', label: 'This Month' }, { id: 'year', label: 'This Year' }].map(p => (
                <button key={p.id} onClick={() => setPeriod(p.id)}
                  className={`py-2 rounded-lg text-xs font-medium transition ${period === p.id ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleGenerate} disabled={generating}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
            {generating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Printer className="w-4 h-4" />Generate</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// VEHICLE OWNER PORTAL
// ─────────────────────────────────────────────────────────────

const VehicleOwnerPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('violations');
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);

  const myViolations = sampleViolations.filter(v => v.plate === 'ABC 1234');
  const stats = {
    total: myViolations.length,
    unpaid: myViolations.filter(v => v.status === 'unpaid').length,
    totalFines: myViolations.filter(v => v.status === 'unpaid').reduce((a, b) => a + b.fine, 0),
  };

  const handlePayment = () => {
    setPaymentLoading(true);
    setTimeout(() => { setPaymentLoading(false); setShowPayment(false); setToast({ message: 'Payment successful! Receipt sent to your email.', type: 'success' }); }, 2000);
  };

  const handleDispute = () => {
    setDisputeLoading(true);
    setTimeout(() => { setDisputeLoading(false); setShowDispute(false); setToast({ message: 'Dispute filed successfully! You will be notified of the decision.', type: 'success' }); }, 2000);
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
        <h3 className="text-xl font-bold mb-4">Pay Fine</h3>
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-slate-500">Violation: {selectedViolation?.id}</p>
          <p className="text-sm text-slate-500">{selectedViolation?.type}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">₱{selectedViolation?.fine.toLocaleString()}</p>
        </div>
        <div className="space-y-3 mb-4">
          <button className="w-full p-4 border-2 border-blue-500 bg-blue-50 rounded-xl flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <div className="text-left"><p className="font-semibold">Credit/Debit Card</p><p className="text-xs text-slate-500">Visa, Mastercard, JCB</p></div>
            <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
          </button>
          <button className="w-full p-4 border rounded-xl flex items-center gap-3 hover:bg-slate-50 transition">
            <DollarSign className="w-6 h-6 text-slate-600" />
            <div className="text-left"><p className="font-semibold">GCash / Maya</p><p className="text-xs text-slate-500">E-Wallet Payment</p></div>
          </button>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowPayment(false)} disabled={paymentLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handlePayment} disabled={paymentLoading} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
            {paymentLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );

  const DisputeModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
        <h3 className="text-xl font-bold mb-4">File Dispute</h3>
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-slate-500">Violation: {selectedViolation?.id}</p>
          <p className="font-medium">{selectedViolation?.type}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Reason for Dispute</label>
            <textarea rows={4} placeholder="Explain why you are disputing this violation..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
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
          <button onClick={() => setShowDispute(false)} disabled={disputeLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
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
      {showNotif && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-80 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b font-bold">Notifications</div>
            {[
              { msg: 'Your dispute DIS-2024-001 is under review', time: '1 hour ago', unread: true },
              { msg: 'Payment receipt sent to juan@email.com', time: '2 days ago', unread: false },
            ].map((n, i) => (
              <div key={i} className={`p-4 border-b text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-blue-50/50' : ''}`}>
                <p>{n.msg}</p><p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="driver" onClose={() => setShowDetails(false)}
          onPayment={(v) => { setSelectedViolation(v); setShowPayment(true); }}
          onDispute={(v) => { setSelectedViolation(v); setShowDispute(true); }} />
      )}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Car className="w-5 h-5" /></div>
            <div><h1 className="font-bold">STVMS Online Portal</h1><p className="text-xs text-white/80">Welcome, Juan Dela Cruz</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotif(!showNotif)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <div className="p-4 grid grid-cols-3 gap-3">
        {loading ? (<><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></>) : (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><FileText className="w-6 h-6 text-blue-500 mb-2" /><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-slate-500">Total Violations</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><AlertTriangle className="w-6 h-6 text-rose-500 mb-2" /><p className="text-2xl font-bold">{stats.unpaid}</p><p className="text-xs text-slate-500">Unpaid</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><DollarSign className="w-6 h-6 text-amber-500 mb-2" /><p className="text-2xl font-bold">₱{stats.totalFines.toLocaleString()}</p><p className="text-xs text-slate-500">Total Due</p></div>
          </>
        )}
      </div>
      <div className="px-4 flex gap-2 mb-4">
        {['violations', 'disputes', 'payments'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="px-4 pb-24 space-y-3">
        {loading ? (<><CardSkeleton /><CardSkeleton /><CardSkeleton /></>) : (
          <>
            {activeTab === 'violations' && myViolations.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3"><span className="text-3xl">{v.image}</span><div><p className="font-semibold">{v.type}</p><p className="text-xs text-slate-500">{v.id}</p></div></div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</span></div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{v.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{v.time}</span>
                </div>
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
                <div className="flex justify-between items-start mb-2"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">For: {d.violationId}</p></div><StatusBadge status={d.status} /></div>
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
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">₱{v.paidAmount?.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Paid {v.paidDate}</p>
                        <p className="text-xs text-slate-400">{v.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
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

// ─────────────────────────────────────────────────────────────
// TRAFFIC ENFORCER DASHBOARD
// ─────────────────────────────────────────────────────────────

const EnforcerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('drivers');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverForViolation, setSelectedDriverForViolation] = useState(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);

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
              {['Running Red Light', 'Illegal Parking', 'Over Speeding', 'No Helmet', 'Counterflow', 'No License', 'Illegal U-Turn', 'No Seatbelt', 'Reckless Driving', 'Expired Registration'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label>
            <input type="text" placeholder="e.g., Rizal Ave & Main St" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
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
          <button onClick={() => { setShowRecordModal(false); setSelectedDriverForViolation(null); }} disabled={recordLoading} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
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

// ─────────────────────────────────────────────────────────────
// SUPERVISOR / ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

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
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showReportModal, setShowReportModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, [activeSection]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'violations', label: 'Violations', icon: FileWarning },
    { id: 'disputes', label: 'Disputes', icon: Gavel },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'devices', label: 'Devices', icon: Camera },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredViolations = sampleViolations.filter(v =>
    v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div><h1 className="font-bold">STVMS Admin</h1><p className="text-xs text-slate-400">Traffic Chief</p></div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); setSearchQuery(''); }}
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
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2"><DollarSign className="w-8 h-8 text-emerald-500" /><span className="text-xs text-emerald-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+8%</span></div>
              <p className="text-2xl font-bold">₱2.4M</p><p className="text-sm text-slate-500">Fines Collected</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('disputes')}>
              <div className="flex items-center justify-between mb-2"><Gavel className="w-8 h-8 text-amber-500" /><span className="text-xs text-amber-500 font-medium">+5 new</span></div>
              <p className="text-2xl font-bold">23</p><p className="text-sm text-slate-500">Pending Disputes</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('devices')}>
              <div className="flex items-center justify-between mb-2"><Camera className="w-8 h-8 text-blue-500" /><span className="text-xs text-emerald-500 font-medium">3 online</span></div>
              <p className="text-2xl font-bold">3/4</p><p className="text-sm text-slate-500">Active Cameras</p>
            </div>
          </>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></>) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Violations by Type</h3>
              <div className="space-y-3">
                {[{ type: 'Running Red Light', percent: 35, color: 'from-rose-500 to-pink-500' }, { type: 'Over Speeding', percent: 28, color: 'from-amber-500 to-orange-500' }, { type: 'Illegal Parking', percent: 22, color: 'from-blue-500 to-cyan-500' }, { type: 'No Helmet', percent: 15, color: 'from-violet-500 to-purple-500' }].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1"><span>{item.type}</span><span className="text-slate-500">{item.percent}%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[{ action: 'New violation recorded', detail: 'VIO-2024-008 - Running Red Light', time: '2 mins ago', icon: FileWarning, color: 'text-rose-500 bg-rose-100', section: 'violations' },
                { action: 'Payment received', detail: '₱2,500 from Pedro Reyes', time: '15 mins ago', icon: DollarSign, color: 'text-emerald-500 bg-emerald-100', section: null },
                { action: 'Dispute submitted', detail: 'DIS-2024-004 awaiting review', time: '1 hour ago', icon: Gavel, color: 'text-amber-500 bg-amber-100', section: 'disputes' },
                { action: 'Camera CAM-003 offline', detail: 'EDSA Northbound location', time: '2 hours ago', icon: Camera, color: 'text-slate-500 bg-slate-100', section: 'devices' }
                ].map((item, i) => (
                  <div key={i} onClick={() => item.section && setActiveSection(item.section)} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
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
        <button onClick={() => setShowFilter(true)} className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition"><Filter className="w-4 h-4" />Filter</button>
        <button onClick={() => setShowExport(true)} className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition"><Download className="w-4 h-4" />Export</button>
      </div>
      {loading ? (<div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div>) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {['ID', 'Type', 'Plate', 'Driver', 'Date', 'Fine', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-sm font-medium text-slate-600">{h}</th>
                  ))}
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
                    <td className="px-4 py-3 text-sm font-medium">₱{v.fine.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setSelectedViolation(v); setShowViolationDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredViolations.length === 0 && (
            <div className="text-center py-12"><Search className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No violations found matching "{searchQuery}"</p></div>
          )}
        </div>
      )}
    </div>
  );

  const DisputesContent = () => (
    <div className="space-y-4">
      {loading ? (<div className="grid md:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>) : (
        <div className="grid md:grid-cols-3 gap-4">
          {sampleDisputes.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div><StatusBadge status={d.status} /></div>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
              <p className="text-xs text-slate-400 mb-3">For: {d.violationId}</p>
              <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">View Details</button>
              {d.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setShowConfirm({ title: 'Approve Dispute', message: `Approve ${d.id} and dismiss the related violation?`, onConfirm: () => { setShowConfirm(null); setToast({ message: 'Dispute approved! Violation dismissed.', type: 'success' }); } })}
                    className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">Approve</button>
                  <button onClick={() => setShowConfirm({ title: 'Reject Dispute', message: `Reject ${d.id}? The driver will be notified.`, confirmText: 'Reject', confirmColor: 'bg-rose-500 hover:bg-rose-600', onConfirm: () => { setShowConfirm(null); setToast({ message: 'Dispute rejected. Driver notified.', type: 'warning' }); } })}
                    className="flex-1 py-2 text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // USERS: Drivers synced from LTO, Enforcers can be added manually
  const UsersContent = () => {
    const [activeUserTab, setActiveUserTab] = useState('drivers');
    const [showAddEnforcer, setShowAddEnforcer] = useState(false);

    const drivers = sampleUsers.filter(u => u.role === 'driver' &&
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())));
    const enforcers = sampleUsers.filter(u => u.role === 'enforcer' &&
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())));

    // Add Enforcer Modal
    const AddEnforcerModal = () => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Add New Enforcer</h3>
            <button onClick={() => setShowAddEnforcer(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name *</label>
              <input type="text" placeholder="Officer Name" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Badge Number *</label>
              <input type="text" placeholder="ENF-XXX" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <input type="email" placeholder="officer@lto.gov.ph" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone Number *</label>
              <input type="tel" placeholder="09XX XXX XXXX" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Assigned Station *</label>
              <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="">Select Station</option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                <option value="district3">District 3</option>
                <option value="highway">Highway Patrol</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAddEnforcer(false)} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50">Cancel</button>
            <button onClick={() => { setShowAddEnforcer(false); showToast('Enforcer added successfully!', 'success'); }} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700">Add Enforcer</button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        {showAddEnforcer && <AddEnforcerModal />}

        {/* Tab Switcher */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-2">
            <button onClick={() => { setActiveUserTab('drivers'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeUserTab === 'drivers' ? 'bg-violet-600 text-white' : 'bg-white border hover:bg-slate-50'}`}>
              <Car className="w-4 h-4" />Drivers
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeUserTab === 'drivers' ? 'bg-white/20' : 'bg-slate-100'}`}>{sampleUsers.filter(u => u.role === 'driver').length}</span>
            </button>
            <button onClick={() => { setActiveUserTab('enforcers'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeUserTab === 'enforcers' ? 'bg-violet-600 text-white' : 'bg-white border hover:bg-slate-50'}`}>
              <Shield className="w-4 h-4" />Enforcers
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeUserTab === 'enforcers' ? 'bg-white/20' : 'bg-slate-100'}`}>{sampleUsers.filter(u => u.role === 'enforcer').length}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeUserTab}...`}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>

            {/* Conditional: Add Enforcer button OR LTO sync indicator */}
            {activeUserTab === 'enforcers' ? (
              <button onClick={() => setShowAddEnforcer(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />Add Enforcer
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm border border-dashed">
                <Database className="w-4 h-4" /><span>Synced from LTO</span>
              </div>
            )}
          </div>
        </div>

        {/* Drivers Table */}
        {activeUserTab === 'drivers' && (
          loading ? (<div className="bg-white rounded-xl shadow-sm border p-6"><Skeleton className="h-64" /></div>) : (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">License No.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Vehicles</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Violations</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {drivers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{u.name.charAt(0)}</span>
                            </div>
                            <span className="text-sm font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-slate-600">{u.license}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-center">{u.vehicles}</td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={`font-medium ${u.violations > 2 ? 'text-rose-600' : 'text-slate-600'}`}>{u.violations}</span>
                        </td>
                        <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                        <td className="px-4 py-3">
                          <button onClick={() => { setSelectedUser(u); setShowUserDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1">
                            <Eye className="w-4 h-4" />View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {drivers.length === 0 && (
                <div className="text-center py-12">
                  <Car className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No drivers found</p>
                </div>
              )}
            </div>
          )
        )}

        {/* Enforcers Table */}
        {activeUserTab === 'enforcers' && (
          loading ? (<div className="bg-white rounded-xl shadow-sm border p-6"><Skeleton className="h-64" /></div>) : (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Badge No.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Station</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Apprehensions</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {enforcers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-orange-600">{u.name.charAt(0)}</span>
                            </div>
                            <span className="text-sm font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-slate-600">{u.badge}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{u.email}</td>
                        <td className="px-4 py-3 text-sm">{u.station}</td>
                        <td className="px-4 py-3 text-sm text-center font-medium text-emerald-600">{u.apprehensions}</td>
                        <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setSelectedUser(u); setShowUserDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1">
                              <Eye className="w-4 h-4" />View
                            </button>
                            <button onClick={() => showToast('Edit enforcer', 'info')} className="text-slate-500 hover:text-slate-700">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {enforcers.length === 0 && (
                <div className="text-center py-12">
                  <Shield className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No enforcers found</p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    );
  };

  const DevicesContent = () => {
    const [showAddCamera, setShowAddCamera] = useState(false);
    const [addingCamera, setAddingCamera] = useState(false);
    const [newCamera, setNewCamera] = useState({
      id: '',
      location: '',
      ipAddress: '',
      type: 'speed',
      installDate: new Date().toISOString().split('T')[0]
    });

    // Add Camera Modal
    const AddCameraModal = () => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Camera className="w-5 h-5 text-violet-600" />Deploy New Camera</h3>
            <button onClick={() => setShowAddCamera(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Camera ID *</label>
              <input
                type="text"
                placeholder="CAM-XXX"
                value={newCamera.id}
                onChange={(e) => setNewCamera({ ...newCamera, id: e.target.value.toUpperCase() })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-xs text-slate-400 mt-1">Format: CAM-001, CAM-002, etc.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Location / Intersection *</label>
              <input
                type="text"
                placeholder="e.g., Rizal Ave & Main St"
                value={newCamera.location}
                onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">IP Address *</label>
              <input
                type="text"
                placeholder="192.168.1.XXX"
                value={newCamera.ipAddress}
                onChange={(e) => setNewCamera({ ...newCamera, ipAddress: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Camera Type *</label>
              <select
                value={newCamera.type}
                onChange={(e) => setNewCamera({ ...newCamera, type: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="speed">Speed Detection</option>
                <option value="redlight">Red Light Detection</option>
                <option value="multi">Multi-Purpose (Speed + Red Light)</option>
                <option value="lpr">License Plate Recognition (LPR)</option>
                <option value="surveillance">General Surveillance</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Installation Date</label>
              <input
                type="date"
                value={newCamera.installDate}
                onChange={(e) => setNewCamera({ ...newCamera, installDate: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Deployment Notice</p>
                  <p className="text-xs text-amber-700 mt-1">After adding, the camera will appear as "Offline" until it's physically connected and configured on the network.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAddCamera(false)} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button
              onClick={() => {
                if (!newCamera.id || !newCamera.location || !newCamera.ipAddress) {
                  setToast({ message: 'Please fill in all required fields', type: 'warning' });
                  return;
                }
                setAddingCamera(true);
                setTimeout(() => {
                  setAddingCamera(false);
                  setShowAddCamera(false);
                  setNewCamera({ id: '', location: '', ipAddress: '', type: 'speed', installDate: new Date().toISOString().split('T')[0] });
                  setToast({ message: `Camera ${newCamera.id} added successfully! Awaiting network connection.`, type: 'success' });
                }, 1500);
              }}
              disabled={addingCamera}
              className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2"
            >
              {addingCamera ? <><Loader2 className="w-4 h-4 animate-spin" />Adding...</> : <><Plus className="w-4 h-4" />Add Camera</>}
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        {showAddCamera && <AddCameraModal />}

        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-semibold text-lg">Camera Devices</h3>
            <p className="text-sm text-slate-500">Manage traffic monitoring cameras across the network</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setToast({ message: 'Refreshing device status...', type: 'info' })} className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />Refresh
            </button>
            <button onClick={() => setShowAddCamera(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />Deploy Camera
            </button>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sampleDevices.length}</p>
                <p className="text-xs text-slate-500">Total Cameras</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{sampleDevices.filter(d => d.status === 'online').length}</p>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">{sampleDevices.filter(d => d.status === 'offline').length}</p>
                <p className="text-xs text-slate-500">Offline</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{sampleDevices.reduce((acc, d) => acc + (d.captures || 0), 0).toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Captures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Camera Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleDevices.map((d) => (
              <div
                key={d.id}
                onClick={() => { setSelectedDevice(d); setShowDeviceDetails(true); }}
                className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md cursor-pointer transition group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${d.status === 'online' ? 'bg-emerald-100 group-hover:bg-emerald-200' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                      <Camera className={`w-6 h-6 ${d.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{d.id}</p>
                      <p className="text-xs text-slate-500">{d.location}</p>
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Captures</p>
                    <p className="font-semibold">{d.captures?.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Last Active</p>
                    <p className="font-semibold text-xs">{d.lastActive}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-xs text-slate-400 font-mono">{d.ipAddress}</span>
                  <span className="text-xs text-violet-600 group-hover:underline">View Details →</span>
                </div>
              </div>
            ))}

            {/* Add Camera Card */}
            <div
              onClick={() => setShowAddCamera(true)}
              className="bg-slate-50 rounded-xl p-4 border-2 border-dashed border-slate-300 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition flex flex-col items-center justify-center min-h-[180px] group"
            >
              <div className="w-14 h-14 bg-slate-200 group-hover:bg-violet-100 rounded-xl flex items-center justify-center transition mb-3">
                <Plus className="w-7 h-7 text-slate-400 group-hover:text-violet-600 transition" />
              </div>
              <p className="font-semibold text-slate-600 group-hover:text-violet-700 transition">Deploy New Camera</p>
              <p className="text-xs text-slate-400 group-hover:text-violet-500 transition mt-1">Add a camera to the network</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ReportsContent = () => {
    const reports = [
      { title: 'Violations Report', desc: 'Summary of all violations by type, location, and time period', icon: FileWarning, color: 'text-rose-500', bg: 'bg-rose-100' },
      { title: 'Enforcer Performance', desc: 'Staff activity metrics and apprehension statistics', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-100' },
    ];
    return (
      <div className="space-y-4">
        {loading ? (<div className="grid md:grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}</div>) : (
          <div className="grid md:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div key={report.title} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setShowReportModal(report)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.bg} mb-3`}><report.icon className={`w-5 h-5 ${report.color}`} /></div>
                <h3 className="font-bold mb-1">{report.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{report.desc}</p>
                <button className="text-violet-600 text-sm flex items-center gap-1 hover:underline"><Printer className="w-4 h-4" />Generate Report</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SettingsContent = () => {
    const [saving, setSaving] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [cameraSettings, setCameraSettings] = useState({});

    // Initialize camera settings
    useEffect(() => {
      const initialSettings = {};
      sampleDevices.forEach(device => {
        initialSettings[device.id] = {
          speedLimit: 60,
          redLightGrace: 2,
          confidenceScore: 85,
          enabled: device.status === 'online'
        };
      });
      setCameraSettings(initialSettings);
    }, []);

    const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setToast({ message: selectedCamera ? `Settings saved for ${selectedCamera}!` : 'Global settings saved!', type: 'success' });
      }, 1500);
    };

    const handleCameraSettingChange = (cameraId, field, value) => {
      setCameraSettings(prev => ({
        ...prev,
        [cameraId]: { ...prev[cameraId], [field]: value }
      }));
    };

    return (
      <div className="space-y-6">
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-48 rounded-xl" /></>) : (
          <>
            {/* Camera Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Camera className="w-5 h-5 text-violet-600" />Camera Detection Settings</h3>
              <p className="text-sm text-slate-500 mb-4">Select a camera to configure its detection parameters, or configure global defaults.</p>

              {/* Camera Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button
                  onClick={() => setSelectedCamera(null)}
                  className={`p-4 rounded-xl border-2 transition text-left ${selectedCamera === null ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-violet-600" />
                    <span className="font-semibold text-sm">Global Default</span>
                  </div>
                  <p className="text-xs text-slate-500">Apply to all cameras</p>
                </button>

                {sampleDevices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedCamera(device.id)}
                    className={`p-4 rounded-xl border-2 transition text-left ${selectedCamera === device.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Camera className={`w-5 h-5 ${device.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className="font-semibold text-sm">{device.id}</span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{device.location}</p>
                  </button>
                ))}
              </div>

              {/* Settings Form */}
              <div className="bg-slate-50 rounded-xl p-5 border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {selectedCamera ? (
                      <>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sampleDevices.find(d => d.id === selectedCamera)?.status === 'online' ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                          <Camera className={`w-5 h-5 ${sampleDevices.find(d => d.id === selectedCamera)?.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{selectedCamera}</h4>
                          <p className="text-xs text-slate-500">{sampleDevices.find(d => d.id === selectedCamera)?.location}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                          <Settings className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Global Default Settings</h4>
                          <p className="text-xs text-slate-500">Applied to all cameras without custom settings</p>
                        </div>
                      </>
                    )}
                  </div>
                  {selectedCamera && (
                    <StatusBadge status={sampleDevices.find(d => d.id === selectedCamera)?.status} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit (km/h)</label>
                      <input
                        type="number"
                        value={selectedCamera ? cameraSettings[selectedCamera]?.speedLimit || 60 : 60}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'speedLimit', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Red Light Grace (sec)</label>
                      <input
                        type="number"
                        value={selectedCamera ? cameraSettings[selectedCamera]?.redLightGrace || 2 : 2}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'redLightGrace', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Confidence Score (%)</label>
                      <input
                        type="number"
                        value={selectedCamera ? cameraSettings[selectedCamera]?.confidenceScore || 85 : 85}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'confidenceScore', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                      />
                    </div>
                  </div>

                  {selectedCamera && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border">
                      <div className="flex items-center gap-3">
                        <Power className={`w-5 h-5 ${cameraSettings[selectedCamera]?.enabled ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="text-sm font-medium">Camera Detection</p>
                          <p className="text-xs text-slate-500">Enable or disable violation detection for this camera</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCameraSettingChange(selectedCamera, 'enabled', !cameraSettings[selectedCamera]?.enabled)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${cameraSettings[selectedCamera]?.enabled ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {cameraSettings[selectedCamera]?.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition flex items-center gap-2">
                      {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Settings</>}
                    </button>
                    {selectedCamera && (
                      <button
                        onClick={() => {
                          handleCameraSettingChange(selectedCamera, 'speedLimit', 60);
                          handleCameraSettingChange(selectedCamera, 'redLightGrace', 2);
                          handleCameraSettingChange(selectedCamera, 'confidenceScore', 85);
                          setToast({ message: 'Reset to default values', type: 'info' });
                        }}
                        className="px-6 py-2.5 border rounded-xl hover:bg-white transition flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-violet-600" />Notification Settings</h3>
              <div className="space-y-3">
                {[
                  { label: 'Email notifications for new disputes', checked: true },
                  { label: 'SMS alerts for device offline', checked: true },
                  { label: 'Daily summary reports', checked: false },
                  { label: 'Payment confirmation alerts', checked: true },
                  { label: 'Real-time violation alerts', checked: true }
                ].map((setting) => (
                  <label key={setting.label} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                    <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                    <span className="text-sm">{setting.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* LTO Database Integration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl">
              <h3 className="font-bold mb-1 flex items-center gap-2"><Database className="w-5 h-5 text-violet-600" />LTO Database Integration</h3>
              <p className="text-sm text-slate-500 mb-4">Driver records are automatically synced from the Land Transportation Office (LTO) database. Manual addition of drivers is disabled.</p>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"><Database className="w-4 h-4 text-emerald-600" /></div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">LTO Database Connected</p>
                  <p className="text-xs text-emerald-600">Last synced: Today at 6:00 AM</p>
                </div>
                <button onClick={() => setToast({ message: 'Database sync triggered!', type: 'info' })} className="ml-auto text-xs text-emerald-700 border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />Sync Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardContent />;
      case 'violations': return <ViolationsContent />;
      case 'disputes': return <DisputesContent />;
      case 'users': return <UsersContent />;
      case 'devices': return <DevicesContent />;
      case 'reports': return <ReportsContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showConfirm && <ConfirmModal {...showConfirm} onCancel={() => setShowConfirm(null)} />}
      {showFilter && <FilterModal onClose={() => setShowFilter(false)} onApply={(f) => setToast({ message: 'Filters applied!', type: 'info' })} />}
      {showExport && <ExportModal onClose={() => setShowExport(false)} onExport={(fmt) => setToast({ message: `Exported as ${fmt.toUpperCase()} successfully!`, type: 'success' })} />}
      {showReportModal && <ReportModal report={showReportModal} onClose={() => setShowReportModal(null)} onGenerate={(title, period) => setToast({ message: `${title} for ${period} generated!`, type: 'success' })} />}
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
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
          onSuspend={(u) => { setShowUserDetails(false); setShowConfirm({ title: 'Suspend Account', message: `Suspend ${u.name}'s account? They will lose access to the portal.`, confirmText: 'Suspend', confirmColor: 'bg-rose-500 hover:bg-rose-600', onConfirm: () => { setShowConfirm(null); setToast({ message: `${u.name}'s account suspended.`, type: 'warning' }); } }); }}
          onActivate={(u) => { setShowUserDetails(false); setShowConfirm({ title: 'Reactivate Account', message: `Reactivate ${u.name}'s account?`, confirmText: 'Reactivate', onConfirm: () => { setShowConfirm(null); setToast({ message: `${u.name}'s account reactivated.`, type: 'success' }); } }); }} />
      )}
      {showDeviceDetails && selectedDevice && (
        <DeviceDetailsModal device={selectedDevice} onClose={() => setShowDeviceDetails(false)}
          onDiagnostic={(d) => setToast({ message: `${d.id} diagnostic complete — all systems normal.`, type: 'info' })}
          onRestart={(d) => setToast({ message: `${d.id} restarted successfully!`, type: 'success' })} />
      )}
      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      <div className="lg:pl-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"><Menu className="w-5 h-5" /></button>
              <h2 className="font-bold text-lg capitalize">{activeSection}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
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

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────

export default function TrafficViolationSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('driver');

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} userType={userType} setUserType={setUserType} />;

  switch (userType) {
    case 'driver': return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
    case 'enforcer': return <EnforcerDashboard onLogout={() => setIsLoggedIn(false)} />;
    case 'supervisor': return <SupervisorDashboard onLogout={() => setIsLoggedIn(false)} />;
    default: return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
  }
}