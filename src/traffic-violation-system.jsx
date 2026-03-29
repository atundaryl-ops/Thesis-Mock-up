<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Car, FileText, CreditCard, AlertTriangle, Users, Settings, BarChart3, Camera, Shield, LogOut, Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, Bell, Menu, X, Upload, TrendingUp, Activity, Gavel, UserCheck, FileWarning, Printer, Loader2, Image, Download, Mail, Phone, Hash, AlertCircle, Info, Trash2, Edit, RefreshCw, Lock, Unlock, Database, WifiOff, Wifi } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
=======
import { useState, useEffect, useRef } from "react";
import { Car, FileText, CreditCard, AlertTriangle, Users, Settings, BarChart3, Camera, Shield, LogOut, ChevronRight, Search, Filter, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, Bell, Menu, X, Upload, MessageSquare, TrendingUp, Activity, Gavel, UserCheck, FileWarning, Printer, Loader2, ChevronDown, Image, Download, Mail, Phone, Hash, AlertCircle, Info, Trash2, Edit, RefreshCw, ToggleLeft, ToggleRight, Plus, Wifi, WifiOff, Sliders } from "lucide-react";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizes[size]} animate-spin text-violet-500`} />
      <p className="text-sm text-slate-500 animate-pulse">{text}</p>
    </div>
  );
};

<<<<<<< HEAD
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
);

=======
const Skeleton = ({ className }) => <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>;
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const CardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
<<<<<<< HEAD
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div><Skeleton className="w-32 h-4 mb-2" /><Skeleton className="w-24 h-3" /></div>
=======
        <Skeleton className="w-12 h-12 rounded-lg" /><div><Skeleton className="w-32 h-4 mb-2" /><Skeleton className="w-24 h-3" /></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      </div>
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton className="w-full h-3 mb-2" /><Skeleton className="w-3/4 h-3 mb-4" />
    <div className="flex gap-2"><Skeleton className="flex-1 h-10 rounded-lg" /><Skeleton className="flex-1 h-10 rounded-lg" /></div>
  </div>
);
<<<<<<< HEAD

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
=======
const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">{[...Array(rows)].map((_, i) => (
    <div key={i} className="flex gap-4 items-center">
      <Skeleton className="w-24 h-4" /><Skeleton className="w-32 h-4" /><Skeleton className="w-20 h-4" /><Skeleton className="w-24 h-4" /><Skeleton className="w-16 h-6 rounded-full" />
    </div>
  ))}</div>
);

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const styles = { success: "bg-emerald-500", error: "bg-rose-500", warning: "bg-amber-500", info: "bg-blue-500" };
  const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
  const Icon = icons[type];
  return (
    <div className={`fixed bottom-4 right-4 ${styles[type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[999]`} style={{animation:'slideUp 0.3s ease-out'}}>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      <Icon className="w-5 h-5" /><span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80"><X className="w-4 h-4" /></button>
    </div>
  );
};

<<<<<<< HEAD
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

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200", unpaid: "bg-rose-100 text-rose-700 border-rose-200",
    disputed: "bg-amber-100 text-amber-700 border-amber-200", pending: "bg-blue-100 text-blue-700 border-blue-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200", rejected: "bg-rose-100 text-rose-700 border-rose-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200", suspended: "bg-rose-100 text-rose-700 border-rose-200",
    online: "bg-emerald-100 text-emerald-700 border-emerald-200", offline: "bg-gray-100 text-gray-600 border-gray-200",
    inactive: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.pending}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
};

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────
// CONFIRM MODAL
// ─────────────────────────────────────────────────────────────

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', confirmColor = 'bg-violet-600 hover:bg-violet-700' }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6 text-amber-600" />
      </div>
=======
const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = "Confirm", confirmColor = "bg-violet-600 hover:bg-violet-700" }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      <h3 className="text-lg font-bold text-center mb-2">{title}</h3>
      <p className="text-slate-500 text-center text-sm mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
        <button onClick={onConfirm} className={`flex-1 py-2.5 ${confirmColor} text-white rounded-xl font-medium transition`}>{confirmText}</button>
      </div>
    </div>
  </div>
);

<<<<<<< HEAD
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
=======
const sampleViolations = [
  { id: "VIO-2024-001", plate: "ABC 1234", type: "Running Red Light", location: "Intersection of Rizal Ave & Main St", date: "2024-03-15", time: "14:32", fine: 1500, status: "unpaid", image: "🚦", driver: "Juan Dela Cruz", driverId: "DRV-001", email: "juan@email.com", phone: "09171234567", license: "N01-12-345678", vehicleBrand: "Toyota", vehicleModel: "Vios", vehicleColor: "White", capturedBy: "CAM-001", evidence: ["snapshot1.jpg", "snapshot2.jpg"] },
  { id: "VIO-2024-002", plate: "ABC 1234", type: "Illegal Parking", location: "No Parking Zone - City Hall", date: "2024-03-10", time: "09:15", fine: 500, status: "paid", image: "🅿️", driver: "Juan Dela Cruz", driverId: "DRV-001", email: "juan@email.com", phone: "09171234567", license: "N01-12-345678", vehicleBrand: "Toyota", vehicleModel: "Vios", vehicleColor: "White", capturedBy: "ENF-001", evidence: ["photo1.jpg"], paidDate: "2024-03-11", paidAmount: 500, paymentMethod: "GCash" },
  { id: "VIO-2024-003", plate: "ABC 1234", type: "Over Speeding", location: "Highway 54 - 80km/h zone (Recorded: 112km/h)", date: "2024-03-05", time: "22:45", fine: 2000, status: "disputed", image: "⚡", driver: "Juan Dela Cruz", driverId: "DRV-001", email: "juan@email.com", phone: "09171234567", license: "N01-12-345678", vehicleBrand: "Toyota", vehicleModel: "Vios", vehicleColor: "White", capturedBy: "CAM-002", evidence: ["speed_capture.jpg"], disputeId: "DIS-2024-001" },
  { id: "VIO-2024-004", plate: "XYZ 5678", type: "No Helmet", location: "Quezon Blvd", date: "2024-03-14", time: "11:20", fine: 1000, status: "unpaid", image: "⛑️", driver: "Maria Santos", driverId: "DRV-002", email: "maria@email.com", phone: "09181234567", license: "N02-12-345678", vehicleBrand: "Honda", vehicleModel: "Click 125i", vehicleColor: "Red", capturedBy: "ENF-002", evidence: ["apprehension1.jpg"] },
  { id: "VIO-2024-005", plate: "DEF 9012", type: "Counterflow", location: "EDSA Northbound", date: "2024-03-13", time: "08:30", fine: 2500, status: "pending", image: "↩️", driver: "Pedro Reyes", driverId: "DRV-003", email: "pedro@email.com", phone: "09191234567", license: "N03-12-345678", vehicleBrand: "Mitsubishi", vehicleModel: "Montero", vehicleColor: "Black", capturedBy: "CAM-003", evidence: ["counterflow1.jpg", "counterflow2.jpg"] },
  { id: "VIO-2024-006", plate: "GHI 3456", type: "Beating Red Light", location: "Shaw Blvd & Ortigas Ave", date: "2024-03-12", time: "17:45", fine: 1500, status: "unpaid", image: "🚦", driver: "Ana Garcia", driverId: "DRV-004", email: "ana@email.com", phone: "09201234567", license: "N04-12-345678", vehicleBrand: "Ford", vehicleModel: "EcoSport", vehicleColor: "Blue", capturedBy: "CAM-001", evidence: ["redlight1.jpg"] },
  { id: "VIO-2024-007", plate: "JKL 7890", type: "Illegal U-Turn", location: "Commonwealth Ave", date: "2024-03-11", time: "13:20", fine: 1000, status: "paid", image: "🔄", driver: "Roberto Cruz", driverId: "DRV-005", email: "roberto@email.com", phone: "09211234567", license: "N05-12-345678", vehicleBrand: "Hyundai", vehicleModel: "Accent", vehicleColor: "Silver", capturedBy: "ENF-001", evidence: ["uturn1.jpg"], paidDate: "2024-03-12", paidAmount: 1000, paymentMethod: "Credit Card" },
];

const sampleDisputes = [
  { id: "DIS-2024-001", violationId: "VIO-2024-003", driver: "Juan Dela Cruz", driverId: "DRV-001", reason: "Speed camera malfunction - was traveling at legal speed. Dashcam footage shows speedometer at 78km/h.", status: "pending", date: "2024-03-06", attachment: "dashcam_footage.mp4", phone: "09171234567", email: "juan@email.com" },
  { id: "DIS-2024-002", violationId: "VIO-2024-001", driver: "Maria Santos", driverId: "DRV-002", reason: "Traffic light was not functioning properly at the time.", status: "approved", date: "2024-03-12", attachment: "witness_statement.pdf", phone: "09181234567", email: "maria@email.com", reviewedBy: "Supervisor Admin", reviewDate: "2024-03-14", reviewNotes: "Verified - signal malfunction confirmed." },
  { id: "DIS-2024-003", violationId: "VIO-2024-004", driver: "Pedro Reyes", driverId: "DRV-003", reason: "Vehicle was reported stolen at the time of violation. Police report attached.", status: "rejected", date: "2024-03-08", attachment: "police_report.pdf", phone: "09191234567", email: "pedro@email.com", reviewedBy: "Supervisor Admin", reviewDate: "2024-03-10", reviewNotes: "Police report dated after violation date. Claim not substantiated." },
];

const sampleUsers = [
  { id: 1, odId: "DRV-001", name: "Juan Dela Cruz", email: "juan@email.com", phone: "09171234567", role: "driver", vehicles: 2, violations: 3, status: "active", license: "N01-12-345678", address: "123 Rizal St, Manila" },
  { id: 2, odId: "DRV-002", name: "Maria Santos", email: "maria@email.com", phone: "09181234567", role: "driver", vehicles: 1, violations: 1, status: "active", license: "N02-12-345678", address: "456 Mabini Ave, Quezon City" },
  { id: 3, odId: "DRV-003", name: "Pedro Reyes", email: "pedro@email.com", phone: "09191234567", role: "driver", vehicles: 3, violations: 2, status: "suspended", license: "N03-12-345678", address: "789 Bonifacio Blvd, Makati" },
  { id: 4, odId: "ENF-001", name: "Officer Garcia", email: "garcia@lto.gov.ph", phone: "09221234567", role: "enforcer", badge: "ENF-001", status: "active", station: "District 1", apprehensions: 156 },
  { id: 5, odId: "ENF-002", name: "Officer Lopez", email: "lopez@lto.gov.ph", phone: "09231234567", role: "enforcer", badge: "ENF-002", status: "active", station: "District 2", apprehensions: 203 },
];
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90

const sampleDevices = [
  { id: "CAM-001", name: "Rizal Ave Camera", location: "Rizal Ave & Main St", status: "active", captures: 1245, lastActive: "2 mins ago", ipAddress: "192.168.1.101", installDate: "2023-06-15", speedLimit: 60, gracePeriod: 2, confidenceScore: 85, detectionMode: "Full", alerts: true },
  { id: "CAM-002", name: "Highway 54 Speed Cam", location: "Highway 54 KM 12", status: "active", captures: 892, lastActive: "1 min ago", ipAddress: "192.168.1.102", installDate: "2023-07-20", speedLimit: 80, gracePeriod: 1, confidenceScore: 90, detectionMode: "Speed Only", alerts: true },
  { id: "CAM-003", name: "EDSA Northbound Cam", location: "EDSA Northbound", status: "inactive", captures: 2341, lastActive: "2 hours ago", ipAddress: "192.168.1.103", installDate: "2023-05-10", speedLimit: 60, gracePeriod: 2, confidenceScore: 80, detectionMode: "Full", alerts: false },
  { id: "CAM-004", name: "Quezon Blvd Junction", location: "Quezon Blvd Junction", status: "active", captures: 567, lastActive: "30 secs ago", ipAddress: "192.168.1.104", installDate: "2023-08-01", speedLimit: 50, gracePeriod: 3, confidenceScore: 88, detectionMode: "Red Light Only", alerts: true },
];

<<<<<<< HEAD
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
=======
const sampleDrivers = [
  { id: "DRV-001", name: "Juan Dela Cruz", plate: "ABC 1234", license: "N01-12-345678", violations: 3, unpaidFines: 3500, status: "active", address: "123 Rizal St, Manila", phone: "09171234567" },
  { id: "DRV-002", name: "Maria Santos", plate: "XYZ 5678", license: "N02-12-345678", violations: 1, unpaidFines: 1000, status: "active", address: "456 Mabini Ave, QC", phone: "09181234567" },
  { id: "DRV-003", name: "Pedro Reyes", plate: "DEF 9012", license: "N03-12-345678", violations: 2, unpaidFines: 2500, status: "suspended", address: "789 Bonifacio Blvd, Makati", phone: "09191234567" },
  { id: "DRV-004", name: "Ana Garcia", plate: "GHI 3456", license: "N04-12-345678", violations: 1, unpaidFines: 1500, status: "active", address: "12 Luna St, Pasig", phone: "09201234567" },
  { id: "DRV-005", name: "Roberto Cruz", plate: "JKL 7890", license: "N05-12-345678", violations: 1, unpaidFines: 0, status: "active", address: "34 Rizal Ave, Caloocan", phone: "09211234567" },
];

const sampleLocations = [
  "Rizal Ave & Main St", "Highway 54 KM 12", "EDSA Northbound", "Quezon Blvd Junction",
  "Shaw Blvd & Ortigas Ave", "Commonwealth Ave", "C5 Road Southbound", "Marcos Highway",
  "Katipunan Ave", "Aurora Blvd", "España Blvd", "Taft Avenue",
];

const NotificationPanel = ({ onClose, notifications, onMarkRead }) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b bg-slate-50">
      <h3 className="font-bold text-sm">Notifications</h3>
      <div className="flex items-center gap-2">
        <button onClick={onMarkRead} className="text-xs text-violet-600 hover:underline">Mark all read</button>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded"><X className="w-4 h-4" /></button>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      </div>
    </div>
    <div className="divide-y max-h-80 overflow-y-auto">
      {notifications.map((n, i) => (
        <div key={i} className={`p-4 hover:bg-slate-50 cursor-pointer transition ${!n.read ? "bg-violet-50/50" : ""}`}>
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

const EnforcerNotificationPanel = ({ onClose, notifications, onMarkRead }) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b bg-slate-50">
      <h3 className="font-bold text-sm">Notifications</h3>
      <div className="flex items-center gap-2">
        <button onClick={onMarkRead} className="text-xs text-orange-600 hover:underline">Mark all read</button>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded"><X className="w-4 h-4" /></button>
      </div>
    </div>
    <div className="divide-y max-h-80 overflow-y-auto">
      {notifications.map((n, i) => (
        <div key={i} className={`p-4 hover:bg-slate-50 cursor-pointer transition ${!n.read ? "bg-orange-50/50" : ""}`}>
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

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────
// VIOLATION DETAILS MODAL
// ─────────────────────────────────────────────────────────────

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const ViolationDetailsModal = ({ violation, onClose, userType, onPayment, onDispute, onApprove, onReject }) => {
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  if (loading) return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
=======
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading violation details..." /></div>
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
=======
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{violation.image}</span>
            <div><h3 className="text-lg font-bold">{violation.type}</h3><p className="text-sm text-slate-500">{violation.id}</p></div>
<<<<<<< HEAD
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={violation.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          </div>
          <div className="flex items-center gap-2"><StatusBadge status={violation.status} /><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
        </div>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2"><Image className="w-4 h-4" />Evidence Photos</h4>
            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
<<<<<<< HEAD
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
=======
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center"><Camera className="w-16 h-16 text-slate-500" /></div>
              <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{violation.evidence?.[activeImageIndex] || "capture.jpg"}</span>
            </div>
            {violation.evidence?.length > 1 && (
              <div className="flex gap-2">{violation.evidence.map((_, i) => (
                <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-16 h-12 rounded-lg ${i === activeImageIndex ? "ring-2 ring-violet-500" : ""} bg-slate-200 flex items-center justify-center`}>
                  <Camera className="w-4 h-4 text-slate-400" />
                </button>
              ))}</div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
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
<<<<<<< HEAD
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
=======
              </div>
            </div>
          </div>
          {violation.status === "paid" && (
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Payment Confirmed</h4>
              <div className="text-sm text-emerald-600 space-y-1">
                <p>Amount Paid: ₱{violation.paidAmount?.toLocaleString()}</p><p>Date: {violation.paidDate}</p><p>Method: {violation.paymentMethod}</p>
              </div>
            </div>
          )}
<<<<<<< HEAD
          {violation.status === 'disputed' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2"><Gavel className="w-4 h-4" />Dispute Filed</h4>
              <p className="text-sm text-amber-600">Dispute ID: {violation.disputeId}</p>
              <p className="text-sm text-amber-600 mt-1">This violation is currently under review.</p>
            </div>
          )}
=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {userType === "driver" && violation.status === "unpaid" && (
              <>
                <button onClick={() => { onClose(); onDispute(violation); }} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"><Gavel className="w-4 h-4" />File Dispute</button>
                <button onClick={() => { onClose(); onPayment(violation); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" />Pay Fine</button>
              </>
            )}
            {(userType === "enforcer" || userType === "supervisor") && violation.status === "pending" && (
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

<<<<<<< HEAD
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
=======
const DisputeDetailsModal = ({ dispute, onClose, onApprove, onReject }) => {
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState("");
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  if (loading) return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl"><LoadingSpinner text="Loading dispute details..." /></div>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
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
          {dispute.status === "pending" && (
            <div><h4 className="font-semibold mb-2">Review Notes</h4><textarea value={reviewNotes} onChange={e => setReviewNotes(e.target.value)} rows={3} placeholder="Add your review notes here..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea></div>
          )}
          {(dispute.status === "approved" || dispute.status === "rejected") && (
            <div className={`border rounded-xl p-4 ${dispute.status === "approved" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
              <h4 className={`font-semibold mb-2 ${dispute.status === "approved" ? "text-emerald-700" : "text-rose-700"}`}>Review Decision</h4>
              <p className="text-sm"><span className="text-slate-500">Reviewed by:</span> {dispute.reviewedBy}</p>
              <p className="text-sm"><span className="text-slate-500">Date:</span> {dispute.reviewDate}</p>
              {dispute.reviewNotes && <p className="text-sm mt-2 italic">{dispute.reviewNotes}</p>}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
<<<<<<< HEAD
            {(userType === 'supervisor' || userType === 'enforcer') && dispute.status === 'pending' && (
              <>
                <button onClick={() => onReject(dispute)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><XCircle className="w-4 h-4" />Reject</button>
                <button onClick={() => onApprove(dispute)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Approve & Dismiss</button>
=======
            {dispute.status === "pending" && (
              <>
                <button onClick={() => { onReject(); }} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition">Reject</button>
                <button onClick={() => { onApprove(); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition">Approve</button>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
              </>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
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
=======
const UserDetailsModal = ({ user, onClose, onSuspend }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
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
          {user.role === "driver" && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">License</p><p className="font-medium">{user.license}</p></div>}
          {user.role === "enforcer" && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Station</p><p className="font-medium">{user.station}</p></div>}
          {user.role === "driver" && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Violations</p><p className="font-medium text-rose-600">{user.violations}</p></div>}
          {user.role === "enforcer" && <div className="bg-slate-50 rounded-xl p-3"><p className="text-slate-400 text-xs">Apprehensions</p><p className="font-medium">{user.apprehensions}</p></div>}
        </div>
      </div>
      <div className="p-4 border-t flex gap-2">
        <button onClick={onSuspend} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl text-sm font-medium hover:bg-amber-50 transition">{user.status === "suspended" ? "Activate" : "Suspend"}</button>
        <button onClick={onClose} className="px-6 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50 transition">Close</button>
      </div>
    </div>
  </div>
);
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90

const DeviceSettingsModal = ({ device, onClose, onSave }) => {
  const [settings, setSettings] = useState({ ...device });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl my-8">
        <div className="flex items-center justify-between p-4 border-b">
<<<<<<< HEAD
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
=======
          <div><h3 className="text-lg font-bold">Configure {device.id}</h3><p className="text-sm text-slate-500">{device.location}</p></div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4">
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Camera Name</label><input type="text" value={settings.name} onChange={e => setSettings(s => ({...s, name: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit (km/h)</label><input type="number" value={settings.speedLimit} onChange={e => setSettings(s => ({...s, speedLimit: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Red Light Grace Period (seconds)</label><input type="number" value={settings.gracePeriod} onChange={e => setSettings(s => ({...s, gracePeriod: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Minimum Confidence Score (%)</label><input type="number" value={settings.confidenceScore} onChange={e => setSettings(s => ({...s, confidenceScore: +e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Detection Mode</label>
            <select value={settings.detectionMode} onChange={e => setSettings(s => ({...s, detectionMode: e.target.value}))} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>Full</option><option>Speed Only</option><option>Red Light Only</option><option>Plate Recognition Only</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => { onSave(settings); onClose(); }} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

const AddDeviceModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ name: "", location: "", ipAddress: "", speedLimit: 60, gracePeriod: 2, confidenceScore: 85, detectionMode: "Full", alerts: true });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl my-8">
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
// PORTAL LANDING — choose which portal to enter
// ═══════════════════════════════════════════════════════════════════
const PortalLanding = ({ onSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
    </div>
    <div className="relative text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl mb-5 shadow-2xl shadow-blue-500/30">
        <Camera className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Traffic Violation</h1>
      <p className="text-white/50 text-lg">Monitoring System</p>
      <p className="text-white/30 text-sm mt-2">Select your portal to continue</p>
    </div>
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
      {/* Vehicle Owner */}
      <button onClick={() => onSelect("driver")}
        className="group bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 border border-white/10 hover:border-transparent rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
          <Car className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-white font-bold text-xl mb-1">Vehicle Owner</h2>
        <p className="text-white/40 group-hover:text-white/60 text-sm transition-colors">View violations, pay fines & file disputes</p>
        <div className="mt-6 flex items-center gap-2 text-blue-400 group-hover:text-white text-sm font-medium transition-colors">
          <span>Enter portal</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
      {/* Traffic Enforcer */}
      <button onClick={() => onSelect("enforcer")}
        className="group bg-white/5 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 border border-white/10 hover:border-transparent rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-white font-bold text-xl mb-1">Traffic Enforcer</h2>
        <p className="text-white/40 group-hover:text-white/60 text-sm transition-colors">Record apprehensions & manage violations</p>
        <div className="mt-6 flex items-center gap-2 text-orange-400 group-hover:text-white text-sm font-medium transition-colors">
          <span>Enter portal</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
      {/* Admin */}
      <button onClick={() => onSelect("supervisor")}
        className="group bg-white/5 hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-600 border border-white/10 hover:border-transparent rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-1">
        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
          <Users className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-white font-bold text-xl mb-1">Administrator</h2>
        <p className="text-white/40 group-hover:text-white/60 text-sm transition-colors">Full system management & reporting</p>
        <div className="mt-6 flex items-center gap-2 text-violet-400 group-hover:text-white text-sm font-medium transition-colors">
          <span>Enter portal</span><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
    <p className="relative text-white/20 text-xs mt-10">© 2024 Traffic Violation Monitoring System</p>
  </div>
);

// ── Shared login form base ─────────────────────────────────────────
const BaseLoginScreen = ({ role, gradient, accentFrom, accentTo, icon: Icon, title, subtitle, footerNote, children, onLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center p-4`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${accentFrom}-500/15 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-${accentTo}-500/10 rounded-full blur-3xl`}></div>
      </div>
      <div className="relative w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />Back to portal selection
        </button>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${accentFrom}-500 to-${accentTo}-500 rounded-2xl mb-4 shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-white/50 text-sm mt-1">{subtitle}</p>
          </div>
          {children && <div className="mb-4">{children({ email, setEmail, password, setPassword })}</div>}
          {!children && (
            <div className="space-y-4 mb-6">
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition" />
            </div>
          )}
          <button onClick={handleLogin} disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-${accentFrom}-500 to-${accentTo}-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2`}>
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Signing in...</> : "Sign In"}
          </button>
          {footerNote && <p className="text-center text-white/30 mt-4 text-xs">{footerNote}</p>}
        </div>
      </div>
    </div>
  );
};

// ── Vehicle Owner Login ────────────────────────────────────────────
const DriverLoginScreen = ({ onLogin, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />Back to portal selection
        </button>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Vehicle Owner Portal</h1>
            <p className="text-white/50 text-sm mt-1">Manage your violations & payments</p>
          </div>
          <div className="space-y-4 mb-6">
            {isSignUp && (
              <>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
                <input type="text" placeholder="Driver's License Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
                <input type="text" placeholder="Vehicle Plate Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
              </>
            )}
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />
            {isSignUp && <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition" />}
          </div>
          {!isSignUp && <button className="text-blue-400 text-sm hover:underline block mb-4">Forgot Password?</button>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />{isSignUp ? "Creating account..." : "Signing in..."}</> : (isSignUp ? "Create Account" : "Sign In")}
          </button>
          <p className="text-center text-white/50 mt-4 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline">{isSignUp ? "Sign In" : "Sign Up"}</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Traffic Enforcer Login ─────────────────────────────────────────
const EnforcerLoginScreen = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />Back to portal selection
        </button>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 bg-orange-500/20 border border-orange-500/30 rounded-xl px-4 py-3">
            <Shield className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <p className="text-orange-300 text-sm">Authorized personnel only. Credentials are issued by your supervisor.</p>
          </div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Enforcer Portal</h1>
            <p className="text-white/50 text-sm mt-1">Traffic enforcement officer access</p>
          </div>
          <div className="space-y-4 mb-6">
            <input type="text" placeholder="Badge / Employee ID" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition" />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition" />
          </div>
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Signing in...</> : "Sign In"}
          </button>
          <p className="text-center text-white/30 mt-4 text-xs">Having trouble? Contact your district supervisor.</p>
        </div>
      </div>
    </div>
  );
};

// ── Admin / Supervisor Login ───────────────────────────────────────
const AdminLoginScreen = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleNext = () => { setLoading(true); setTimeout(() => { setLoading(false); setStep(2); }, 1000); };
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" />Back to portal selection
        </button>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-violet-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-1">System administrator & supervisor access</p>
          </div>
          {step === 1 ? (
            <>
              <div className="space-y-4 mb-6">
                <input type="email" placeholder="Admin email address" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition" />
              </div>
              <button onClick={handleNext} disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Verifying...</> : "Continue"}
              </button>
            </>
          ) : (
            <>
              <div className="bg-violet-500/20 border border-violet-500/30 rounded-xl px-4 py-3 mb-6 text-sm text-violet-300">
                A 6-digit verification code was sent to your admin email.
              </div>
              <div className="space-y-4 mb-6">
                <input type="text" placeholder="Enter 6-digit OTP" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition text-center text-2xl tracking-widest font-mono" />
              </div>
              <button onClick={handleLogin} disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Signing in...</> : "Verify & Sign In"}
              </button>
              <button onClick={() => setStep(1)} className="w-full mt-3 text-white/40 hover:text-white/60 text-sm transition">← Back</button>
            </>
          )}
          <p className="text-center text-white/20 mt-4 text-xs">Restricted access. All activity is logged and monitored.</p>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
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

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const VehicleOwnerPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("violations");
  const [showDetails, setShowDetails] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
<<<<<<< HEAD
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
=======
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: AlertTriangle, color: "bg-rose-100 text-rose-600", title: "New Violation", message: "Running Red Light recorded on Mar 15", time: "2 hours ago", read: false },
    { icon: CheckCircle, color: "bg-emerald-100 text-emerald-600", title: "Payment Confirmed", message: "VIO-2024-002 has been paid successfully", time: "2 days ago", read: false },
    { icon: Info, color: "bg-blue-100 text-blue-600", title: "Dispute Update", message: "Your dispute DIS-2024-001 is under review", time: "3 days ago", read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90

  const myViolations = sampleViolations.filter(v => v.driverId === "DRV-001");
  const unreadCount = notifications.filter(n => !n.read).length;

<<<<<<< HEAD
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
=======
  const DisputeModal = () => {
    const [reason, setReason] = useState("");
    const [submitting, setSubmitting] = useState(false);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <h3 className="text-xl font-bold mb-2">File a Dispute</h3>
          <p className="text-sm text-slate-500 mb-4">For: {selectedViolation?.id} - {selectedViolation?.type}</p>
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} placeholder="Explain the reason for your dispute..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"></textarea>
          <div className="border-2 border-dashed rounded-xl p-4 text-center mb-4 hover:bg-slate-50 cursor-pointer transition">
            <Upload className="w-6 h-6 mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">Upload supporting documents</p>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowDispute(false)} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={() => { setSubmitting(true); setTimeout(() => { setShowDispute(false); setToast({ message: "Dispute filed successfully!", type: "success" }); }, 1500); }} disabled={submitting} className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : "Submit Dispute"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PaymentModal = () => {
    const [method, setMethod] = useState("gcash");
    const [processing, setProcessing] = useState(false);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <h3 className="text-xl font-bold mb-4">Pay Fine</h3>
          <div className="bg-slate-50 rounded-xl p-4 mb-4 flex justify-between items-center">
            <div><p className="text-sm text-slate-500">{selectedViolation?.id}</p><p className="font-semibold">{selectedViolation?.type}</p></div>
            <p className="text-2xl font-bold text-rose-600">₱{selectedViolation?.fine?.toLocaleString()}</p>
          </div>
          <div className="space-y-2 mb-4">
            {[{ id: "gcash", label: "GCash" }, { id: "maya", label: "Maya" }, { id: "card", label: "Credit/Debit Card" }, { id: "bank", label: "Online Banking" }].map(m => (
              <label key={m.id} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${method === m.id ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"}`}>
                <input type="radio" checked={method === m.id} onChange={() => setMethod(m.id)} /><span className="font-medium">{m.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowPayment(false)} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={() => { setProcessing(true); setTimeout(() => { setShowPayment(false); setToast({ message: "Payment successful!", type: "success" }); }, 2000); }} disabled={processing} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-4 h-4 animate-spin" />Processing...</> : "Confirm Payment"}
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
<<<<<<< HEAD
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
=======
      {showPayment && <PaymentModal />}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      {showDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="driver" onClose={() => setShowDetails(false)}
          onPayment={(v) => { setSelectedViolation(v); setShowPayment(true); }}
          onDispute={(v) => { setSelectedViolation(v); setShowDispute(true); }} />
      )}
<<<<<<< HEAD
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
=======
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
            {showNotifications && <NotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)} onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <div className="p-4 grid grid-cols-3 gap-3">
<<<<<<< HEAD
        {loading ? (<><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /><Skeleton className="h-24 rounded-xl" /></>) : (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><FileText className="w-6 h-6 text-blue-500 mb-2" /><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-slate-500">Total Violations</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><AlertTriangle className="w-6 h-6 text-rose-500 mb-2" /><p className="text-2xl font-bold">{stats.unpaid}</p><p className="text-xs text-slate-500">Unpaid</p></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border"><DollarSign className="w-6 h-6 text-amber-500 mb-2" /><p className="text-2xl font-bold">₱{stats.totalFines.toLocaleString()}</p><p className="text-xs text-slate-500">Total Due</p></div>
=======
        {loading ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />) : (
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-rose-500">{myViolations.filter(v => v.status === "unpaid").length}</p><p className="text-xs text-slate-500">Unpaid</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-emerald-500">{myViolations.filter(v => v.status === "paid").length}</p><p className="text-xs text-slate-500">Paid</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-amber-500">{myViolations.filter(v => v.status === "disputed").length}</p><p className="text-xs text-slate-500">Disputed</p></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          </>
        )}
      </div>
      <div className="px-4 flex gap-2 mb-4">
<<<<<<< HEAD
        {['violations', 'disputes', 'payments'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
=======
        {["violations", "disputes", "payments"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? "bg-blue-500 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
<<<<<<< HEAD
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
=======
      <div className="px-4 pb-8 space-y-3">
        {loading ? <><CardSkeleton /><CardSkeleton /></> : (
          <>
            {activeTab === "violations" && myViolations.map((v) => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3"><span className="text-2xl">{v.image}</span><div><p className="font-semibold">{v.type}</p><p className="text-sm text-slate-500">{v.id}</p></div></div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-1"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.location}</span></div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4"><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{v.date}</span><span className="flex items-center gap-1"><Clock className="w-4 h-4" />{v.time}</span></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="text-lg font-bold">₱{v.fine.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedViolation(v); setShowDetails(true); }} className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
<<<<<<< HEAD
                    {v.status === 'unpaid' && (
=======
                    {v.status === "unpaid" && (
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
                      <>
                        <button onClick={() => { setSelectedViolation(v); setShowDispute(true); }} className="px-4 py-2 text-sm border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50">Dispute</button>
                        <button onClick={() => { setSelectedViolation(v); setShowPayment(true); }} className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Pay Now</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
<<<<<<< HEAD
            {activeTab === 'disputes' && sampleDisputes.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">For: {d.violationId}</p></div><StatusBadge status={d.status} /></div>
=======
            {activeTab === "disputes" && sampleDisputes.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">For: {d.violationId}</p></div>
                  <StatusBadge status={d.status} />
                </div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
                <p className="text-sm text-slate-600 mb-2 line-clamp-2">{d.reason}</p>
                <p className="text-xs text-slate-400">Filed: {d.date}</p>
              </div>
            ))}
<<<<<<< HEAD
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
=======
            {activeTab === "payments" && myViolations.filter(v => v.status === "paid").map(v => (
              <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
                    <div><p className="font-semibold">{v.id}</p><p className="text-sm text-slate-500">{v.type}</p></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
                  </div>
                  <div className="text-right"><p className="font-bold text-emerald-600">₱{v.paidAmount?.toLocaleString()}</p><p className="text-xs text-slate-400">Paid {v.paidDate}</p><p className="text-xs text-slate-400">{v.paymentMethod}</p></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
<<<<<<< HEAD
      <style jsx global>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
    </div>
  );
};

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────
// TRAFFIC ENFORCER DASHBOARD
// ─────────────────────────────────────────────────────────────

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const EnforcerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("violations");
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [recordLoading, setRecordLoading] = useState(false);
<<<<<<< HEAD
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);

  const pendingViolations = sampleViolations.filter(v => v.status === 'pending' || v.status === 'unpaid');

  const handleApprove = (item) => setShowConfirm({ title: 'Approve Violation', message: 'Are you sure you want to approve this violation? The driver will be notified.', onConfirm: () => { setShowConfirm(null); setToast({ message: 'Violation approved successfully!', type: 'success' }); } });
  const handleReject = (item) => setShowConfirm({ title: 'Reject Violation', message: 'Are you sure you want to reject this violation? This action cannot be undone.', onConfirm: () => { setShowConfirm(null); setToast({ message: 'Violation rejected.', type: 'warning' }); }, confirmText: 'Reject', confirmColor: 'bg-rose-500 hover:bg-rose-600' });

  const handleRecordViolation = () => { setRecordLoading(true); setTimeout(() => { setRecordLoading(false); setShowRecordModal(false); setToast({ message: 'Violation recorded successfully!', type: 'success' }); }, 2000); };
=======
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: Gavel, color: "bg-amber-100 text-amber-600", title: "New Dispute", message: "DIS-2024-001 requires your review", time: "30 mins ago", read: false },
    { icon: AlertTriangle, color: "bg-rose-100 text-rose-600", title: "Violation Flagged", message: "CAM-003 detected a violation on EDSA", time: "1 hour ago", read: false },
    { icon: CheckCircle, color: "bg-emerald-100 text-emerald-600", title: "Apprehension Approved", message: "Your record VIO-2024-005 was approved", time: "2 hours ago", read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingViolations = sampleViolations.filter(v => v.status === "pending" || v.status === "unpaid");
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90

  const RecordViolationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Record Apprehension</h3>
          <button onClick={() => setShowRecordModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Plate Number *</label><input type="text" placeholder="ABC 1234" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Violation Type *</label>
            <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
<<<<<<< HEAD
              {['Running Red Light','Illegal Parking','Over Speeding','No Helmet','Counterflow','No License','Illegal U-Turn','No Seatbelt'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label><input type="text" placeholder="Enter location" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Driver's License (if available)</label><input type="text" placeholder="N01-12-345678" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Photo Evidence *</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition">
              <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" /><p className="text-sm text-slate-500">Take photo or upload</p><p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
=======
              <option>Running Red Light</option><option>Illegal Parking</option><option>Over Speeding</option>
              <option>No Helmet</option><option>Counterflow</option><option>No License</option>
            </select>
          </div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Location *</label><input type="text" placeholder="Enter location" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Photo Evidence *</label>
            <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition">
              <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">Take photo or upload</p>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            </div>
          </div>
          <div><label className="text-sm font-medium text-slate-700 mb-1 block">Notes</label><textarea rows={3} placeholder="Additional details..." className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowRecordModal(false)} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => { setRecordLoading(true); setTimeout(() => { setRecordLoading(false); setShowRecordModal(false); setToast({ message: "Violation recorded successfully!", type: "success" }); }, 2000); }}
            disabled={recordLoading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2">
            {recordLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );

  const DriverSearchModal = ({ onClose }) => {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("plate");
    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const handleSearch = () => {
      setSearching(true);
      setTimeout(() => {
        const found = sampleDrivers.filter(d => {
          if (searchType === "plate") return d.plate.toLowerCase().includes(query.toLowerCase());
          if (searchType === "license") return d.license.toLowerCase().includes(query.toLowerCase());
          return d.name.toLowerCase().includes(query.toLowerCase());
        });
        setResults(found); setSearching(false);
      }, 1000);
    };
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold">Search Driver</h3><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button></div>
          <div className="flex gap-2 mb-3">
            {[{id:"plate",label:"Plate"},{id:"license",label:"License"},{id:"name",label:"Name"}].map(t => (
              <button key={t.id} onClick={() => setSearchType(t.id)} className={`flex-1 py-2 rounded-lg text-sm transition ${searchType === t.id ? "bg-orange-500 text-white" : "border hover:bg-slate-50"}`}>{t.label}</button>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} placeholder={`Search by ${searchType}...`} className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleSearch} disabled={searching} className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition">
              {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
          {results && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {results.length === 0 ? <div className="text-center py-6"><p className="text-slate-500">No records found</p></div>
               : results.map(d => (
                <div key={d.id} className="border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2"><div><p className="font-bold">{d.name}</p><p className="text-sm text-slate-500">{d.id}</p></div><StatusBadge status={d.status} /></div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>Plate: <span className="font-medium">{d.plate}</span></p>
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
      {showRecordModal && <RecordViolationModal />}
      {showSearchModal && <DriverSearchModal onClose={() => setShowSearchModal(false)} />}
      {showNotif && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotif(false)}>
          <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-72 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b font-bold">Notifications</div>
            {[{ msg: 'You have 2 pending violations to approve', time: '5 mins ago', unread: true }, { msg: 'Dispute DIS-2024-001 needs your review', time: '1 hour ago', unread: false }].map((n, i) => (
              <div key={i} className={`p-4 border-b text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-orange-50/50' : ''}`}>
                <p>{n.msg}</p><p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetails && selectedViolation && (
<<<<<<< HEAD
        <ViolationDetailsModal violation={selectedViolation} userType="enforcer" onClose={() => setShowDetails(false)} onApprove={handleApprove} onReject={handleReject} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} userType="enforcer" onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute approved. Violation dismissed.', type: 'success' }); }}
          onReject={() => { setShowDisputeDetails(false); setToast({ message: 'Dispute rejected. Driver notified.', type: 'warning' }); }} />
=======
        <ViolationDetailsModal violation={selectedViolation} userType="enforcer" onClose={() => setShowDetails(false)}
          onApprove={() => { setShowDetails(false); setToast({ message: "Violation approved!", type: "success" }); }}
          onReject={() => { setShowDetails(false); setToast({ message: "Violation rejected.", type: "warning" }); }} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); setToast({ message: "Dispute approved.", type: "success" }); }}
          onReject={() => { setShowDisputeDetails(false); setToast({ message: "Dispute rejected.", type: "warning" }); }} />
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      )}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5" /></div>
            <div><h1 className="font-bold">Enforcer Dashboard</h1><p className="text-xs text-white/80">Officer Garcia (ENF-001)</p></div>
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotif(!showNotif)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>
=======
          <div className="flex items-center gap-2 relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(v => !v)} className="p-2 hover:bg-white/20 rounded-lg relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-slate-900 font-bold">{unreadCount}</span>}
            </button>
            {showNotifications && <EnforcerNotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)} onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            <button onClick={onLogout} className="p-2 hover:bg-white/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <div className="p-4 grid grid-cols-2 gap-3">
<<<<<<< HEAD
        <button onClick={() => setShowRecordModal(true)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
=======
        <button onClick={() => setShowRecordModal(true)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          <Camera className="w-5 h-5" /><span className="font-semibold">Record Apprehension</span>
        </button>
        <button onClick={() => setShowSearchModal(true)} className="bg-white border-2 border-orange-500 text-orange-600 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition">
          <Search className="w-5 h-5" /><span className="font-semibold">Search Driver</span>
        </button>
      </div>
      <div className="px-4 grid grid-cols-3 gap-3 mb-4">
<<<<<<< HEAD
        {loading ? (<><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-20 rounded-xl" /></>) : (
=======
        {loading ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />) : (
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          <>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-orange-500">12</p><p className="text-xs text-slate-500">Today</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-blue-500">87</p><p className="text-xs text-slate-500">This Week</p></div>
            <div className="bg-white rounded-xl p-3 shadow-sm border text-center"><p className="text-xl font-bold text-emerald-500">324</p><p className="text-xs text-slate-500">This Month</p></div>
          </>
        )}
      </div>
      <div className="px-4 flex gap-2 mb-4">
<<<<<<< HEAD
        {['violations', 'disputes'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'disputes' && <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">{sampleDisputes.filter(d => d.status === 'pending').length}</span>}
=======
        {["violations", "disputes"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === tab ? "bg-orange-500 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "disputes" && <span className="ml-2 px-1.5 py-0.5 bg-amber-500/20 text-amber-700 rounded text-xs">{sampleDisputes.filter(d => d.status === "pending").length}</span>}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          </button>
        ))}
      </div>
      <div className="px-4 pb-24 space-y-3">
<<<<<<< HEAD
        {loading ? (<><CardSkeleton /><CardSkeleton /><CardSkeleton /></>) : (
          <>
            {activeTab === 'violations' && pendingViolations.map((v) => (
=======
        {loading ? <><CardSkeleton /><CardSkeleton /></> : (
          <>
            {activeTab === "violations" && pendingViolations.map((v) => (
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
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
<<<<<<< HEAD
                  {v.status === 'pending' && <button onClick={() => handleApprove(v)} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-1 transition"><CheckCircle className="w-4 h-4" />Approve</button>}
                </div>
              </div>
            ))}
            {activeTab === 'disputes' && sampleDisputes.filter(d => d.status === 'pending').map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div><StatusBadge status={d.status} /></div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
                <p className="text-xs text-slate-400 mb-3">For: {d.violationId}</p>
                <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">Review Evidence</button>
              </div>
            ))}
            {activeTab === 'disputes' && sampleDisputes.filter(d => d.status === 'pending').length === 0 && (
              <div className="text-center py-12"><Gavel className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No pending disputes</p></div>
            )}
=======
                  {v.status === "pending" && <button onClick={() => setToast({ message: "Violation approved!", type: "success" })} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-1 transition"><CheckCircle className="w-4 h-4" />Approve</button>}
                </div>
              </div>
            ))}
            {activeTab === "disputes" && sampleDisputes.filter(d => d.status === "pending").map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
                <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">Review Evidence</button>
              </div>
            ))}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          </>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────
// SUPERVISOR / ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
const SupervisorDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showViolationDetails, setShowViolationDetails] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
<<<<<<< HEAD
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showReportModal, setShowReportModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, [activeSection]);
=======
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("All");
  const [violationStatusFilter, setViolationStatusFilter] = useState("All");
  const [violationTypeFilter, setViolationTypeFilter] = useState("All");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [devices, setDevices] = useState(sampleDevices);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon: Camera, color: "bg-slate-100 text-slate-600", title: "CAM-003 Offline", message: "EDSA Northbound camera went offline", time: "2 hours ago", read: false },
    { icon: Gavel, color: "bg-amber-100 text-amber-600", title: "New Dispute", message: "DIS-2024-001 requires review", time: "3 hours ago", read: false },
    { icon: FileWarning, color: "bg-rose-100 text-rose-600", title: "New Violation", message: "VIO-2024-008 recorded by CAM-001", time: "5 hours ago", read: true },
    { icon: CheckCircle, color: "bg-emerald-100 text-emerald-600", title: "Payment Received", message: "₱2,500 from Pedro Reyes", time: "6 hours ago", read: true },
  ]);
  const notifRef = useRef(null);

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, [activeSection]);
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90

  const unreadCount = notifications.filter(n => !n.read).length;
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "violations", label: "Violations", icon: FileWarning },
    { id: "disputes", label: "Disputes", icon: Gavel },
    { id: "users", label: "Users", icon: Users },
    { id: "devices", label: "Camera Devices", icon: Camera },
    { id: "reports", label: "Generate Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

<<<<<<< HEAD
  const filteredViolations = sampleViolations.filter(v =>
    v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = sampleUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'All' || (userFilter === 'Drivers' && u.role === 'driver') || (userFilter === 'Enforcers' && u.role === 'enforcer');
=======
  const violationTypes = ["All", ...new Set(sampleViolations.map(v => v.type))];
  const violationStatuses = ["All", "unpaid", "paid", "disputed", "pending"];

  const filteredViolations = sampleViolations.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchQuery.toLowerCase()) || v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || v.driver.toLowerCase().includes(searchQuery.toLowerCase()) || v.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = violationStatusFilter === "All" || v.status === violationStatusFilter;
    const matchesType = violationTypeFilter === "All" || v.type === violationTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredUsers = sampleUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === "All" || (userFilter === "Drivers" && u.role === "driver") || (userFilter === "Enforcers" && u.role === "enforcer");
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
    return matchesSearch && matchesFilter;
  });

  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transform transition-transform z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5" /></div>
<<<<<<< HEAD
          <div><h1 className="font-bold">STVMS Admin</h1><p className="text-xs text-slate-400">Traffic Chief</p></div>
=======
          <div><h1 className="font-bold">Admin Panel</h1><p className="text-xs text-slate-400">Traffic Chief</p></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
<<<<<<< HEAD
          <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === item.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <item.icon className="w-5 h-5" /><span>{item.label}</span>
            {item.id === 'disputes' && <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{sampleDisputes.filter(d => d.status === 'pending').length}</span>}
=======
          <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); setSearchQuery(""); setShowFilterPanel(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === item.id ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            <item.icon className="w-5 h-5" /><span>{item.label}</span>
            {item.id === "disputes" && <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{sampleDisputes.filter(d => d.status === "pending").length}</span>}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
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
<<<<<<< HEAD
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
              <p className="text-2xl font-bold">12/14</p><p className="text-sm text-slate-500">Active Cameras</p>
=======
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection("violations")}>
              <div className="flex items-center justify-between mb-2"><FileWarning className="w-8 h-8 text-violet-500" /><span className="text-xs text-emerald-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+12%</span></div>
              <p className="text-2xl font-bold">1,234</p><p className="text-sm text-slate-500">Total Violations</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection("disputes")}>
              <div className="flex items-center justify-between mb-2"><Gavel className="w-8 h-8 text-amber-500" /><span className="text-xs text-amber-500 font-medium">+5 new</span></div>
              <p className="text-2xl font-bold">23</p><p className="text-sm text-slate-500">Pending Disputes</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection("devices")}>
              <div className="flex items-center justify-between mb-2"><Camera className="w-8 h-8 text-blue-500" /><span className="text-xs text-emerald-500 font-medium">{devices.filter(d => d.status === "active").length} active</span></div>
              <p className="text-2xl font-bold">{devices.filter(d => d.status === "active").length}/{devices.length}</p><p className="text-sm text-slate-500">Active Cameras</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection("users")}>
              <div className="flex items-center justify-between mb-2"><Users className="w-8 h-8 text-emerald-500" /><span className="text-xs text-emerald-500 font-medium">+3 new</span></div>
              <p className="text-2xl font-bold">{sampleUsers.length}</p><p className="text-sm text-slate-500">Total Users</p>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
            </div>
          </>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
<<<<<<< HEAD
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></>) : (
=======
        {loading ? <><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></> : (
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Violations by Type</h3>
              <div className="space-y-3">
<<<<<<< HEAD
                {[{ type: 'Running Red Light', percent: 35, color: 'from-rose-500 to-pink-500' }, { type: 'Over Speeding', percent: 28, color: 'from-amber-500 to-orange-500' }, { type: 'Illegal Parking', percent: 22, color: 'from-blue-500 to-cyan-500' }, { type: 'No Helmet', percent: 15, color: 'from-violet-500 to-purple-500' }].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1"><span>{item.type}</span><span className="text-slate-500">{item.percent}%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{width: `${item.percent}%`}}></div></div>
                    </div>
=======
                {[{type:"Running Red Light",percent:35,color:"from-rose-500 to-pink-500"},{type:"Over Speeding",percent:28,color:"from-amber-500 to-orange-500"},{type:"Illegal Parking",percent:22,color:"from-blue-500 to-cyan-500"},{type:"No Helmet",percent:15,color:"from-violet-500 to-purple-500"}].map(item => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1"><div className="flex justify-between text-sm mb-1"><span>{item.type}</span><span className="text-slate-500">{item.percent}%</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`} style={{width:`${item.percent}%`}}></div></div></div>
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
<<<<<<< HEAD
                {[{ action: 'New violation recorded', detail: 'VIO-2024-008 - Running Red Light', time: '2 mins ago', icon: FileWarning, color: 'text-rose-500 bg-rose-100', section: 'violations' },
                  { action: 'Payment received', detail: '₱2,500 from Pedro Reyes', time: '15 mins ago', icon: DollarSign, color: 'text-emerald-500 bg-emerald-100', section: null },
                  { action: 'Dispute submitted', detail: 'DIS-2024-004 awaiting review', time: '1 hour ago', icon: Gavel, color: 'text-amber-500 bg-amber-100', section: 'disputes' },
                  { action: 'Camera CAM-003 offline', detail: 'EDSA Northbound location', time: '2 hours ago', icon: Camera, color: 'text-slate-500 bg-slate-100', section: 'devices' }
                ].map((item, i) => (
                  <div key={i} onClick={() => item.section && setActiveSection(item.section)} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
=======
                {[
                  {action:"New violation recorded",detail:"VIO-2024-008 - Running Red Light",time:"2 mins ago",icon:FileWarning,color:"text-rose-500 bg-rose-100"},
                  {action:"Dispute submitted",detail:"DIS-2024-004 awaiting review",time:"1 hour ago",icon:Gavel,color:"text-amber-500 bg-amber-100"},
                  {action:"Camera CAM-003 offline",detail:"EDSA Northbound location",time:"2 hours ago",icon:Camera,color:"text-slate-500 bg-slate-100"},
                  {action:"New user registered",detail:"Juan Dela Cruz (DRV-006)",time:"3 hours ago",icon:Users,color:"text-violet-500 bg-violet-100"},
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
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

<<<<<<< HEAD
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
                  {['ID','Type','Plate','Driver','Date','Fine','Status','Actions'].map(h => (
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

  // USERS: No "Add User/Driver" button — drivers come from LTO database
  const UsersContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2">
          {['All', 'Drivers', 'Enforcers'].map((tab) => (
            <button key={tab} onClick={() => setUserFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm transition ${userFilter === tab ? 'bg-violet-600 text-white' : 'bg-white border hover:bg-slate-50'}`}>{tab}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          {/* NOTE: "Add User" button removed — driver records are synced from LTO database */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm border border-dashed">
            <Database className="w-4 h-4" /><span>Synced from LTO DB</span>
          </div>
        </div>
      </div>
      {loading ? (<div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div>) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>{['Name','Email','Role','Status','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-medium text-slate-600">{h}</th>)}</tr>
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
=======
  const renderContent = () => {
    if (activeSection === "dashboard") return <DashboardContent />;
    if (activeSection === "violations") return (
      <div className="space-y-4">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search violations..." className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <button onClick={() => setShowFilterPanel(v => !v)} className={`px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition ${showFilterPanel ? "bg-violet-50 border-violet-300 text-violet-700" : ""}`}>
            <Filter className="w-4 h-4" />Filter
          </button>
        </div>
        {showFilterPanel && (
          <div className="bg-white border rounded-xl p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Filter by Status</label>
                <div className="flex flex-wrap gap-2">
                  {violationStatuses.map(s => (
                    <button key={s} onClick={() => setViolationStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm transition ${violationStatusFilter === s ? "bg-violet-600 text-white" : "border hover:bg-slate-50"}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Filter by Type</label>
                <select value={violationTypeFilter} onChange={e => setViolationTypeFilter(e.target.value)} className="w-full p-2 border rounded-xl focus:outline-none text-sm">
                  {violationTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => { setViolationStatusFilter("All"); setViolationTypeFilter("All"); }} className="mt-3 text-sm text-violet-600 hover:underline">Clear filters</button>
          </div>
        )}
        {loading ? <div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div> : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Plate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Driver</th>
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
                      <td className="px-4 py-3 text-sm font-semibold">₱{v.fine.toLocaleString()}</td>
                      <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                      <td className="px-4 py-3"><button onClick={() => { setSelectedViolation(v); setShowViolationDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredViolations.length === 0 && <div className="text-center py-12"><p className="text-slate-500">No violations found</p></div>}
          </div>
        )}
      </div>
    );
    if (activeSection === "disputes") return (
      <div className="space-y-4">
        {loading ? <div className="grid md:grid-cols-2 gap-4">{[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}</div> : (
          <div className="grid md:grid-cols-2 gap-4">
            {sampleDisputes.map((d) => (
              <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex justify-between items-start mb-2"><div><p className="font-semibold">{d.id}</p><p className="text-sm text-slate-500">{d.driver}</p></div><StatusBadge status={d.status} /></div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
                <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition mb-2">View Details</button>
                {d.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => setToast({ message: "Dispute approved!", type: "success" })} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">Approve</button>
                    <button onClick={() => setToast({ message: "Dispute rejected.", type: "warning" })} className="flex-1 py-2 text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
    if (activeSection === "users") return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-2">
            {["All", "Drivers", "Enforcers"].map((tab) => (
              <button key={tab} onClick={() => setUserFilter(tab)} className={`px-4 py-2 rounded-lg text-sm transition ${userFilter === tab ? "bg-violet-600 text-white" : "bg-white border hover:bg-slate-50"}`}>{tab}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
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
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
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
                      <td className="px-4 py-3"><button onClick={() => { setSelectedUser(u); setShowUserDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
<<<<<<< HEAD
          {filteredUsers.length === 0 && <div className="text-center py-12"><Users className="w-12 h-12 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No users found</p></div>}
=======
        )}
      </div>
    );
    if (activeSection === "devices") {
      const toggleStatus = (id) => {
        setDevices(ds => ds.map(d => d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d));
        setToast({ message: "Device status updated!", type: "success" });
      };
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Camera Devices</h3>
            <div className="flex gap-2">
              <button onClick={() => setToast({ message: "Refreshing device status...", type: "info" })} className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition"><RefreshCw className="w-4 h-4" />Refresh</button>
              <button onClick={() => setShowAddDevice(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition flex items-center gap-2"><Plus className="w-4 h-4" />Add Camera</button>
            </div>
          </div>
          {loading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((d) => (
                <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === "active" ? "bg-emerald-100" : "bg-slate-100"}`}>
                        <Camera className={`w-5 h-5 ${d.status === "active" ? "text-emerald-600" : "text-slate-400"}`} />
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
                    <button onClick={() => toggleStatus(d.id)} className={`flex-1 py-2 text-xs rounded-lg flex items-center justify-center gap-1 transition ${d.status === "active" ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"}`}>
                      {d.status === "active" ? <><WifiOff className="w-3 h-3" />Deactivate</> : <><Wifi className="w-3 h-3" />Activate</>}
                    </button>
                    <button onClick={() => { setSelectedDevice(d); setShowDeviceSettings(true); }} className="flex-1 py-2 text-xs bg-violet-600 text-white rounded-lg flex items-center justify-center gap-1 hover:bg-violet-700 transition">
                      <Sliders className="w-3 h-3" />Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
        </div>
      );
    }
    if (activeSection === "reports") {
      const ReportsContent = () => {
        const [reportType, setReportType] = useState("violations");
        const [dateFrom, setDateFrom] = useState("2024-03-01");
        const [dateTo, setDateTo] = useState("2024-03-31");
        const [statusFilter, setStatusFilter] = useState("All");
        const [generating, setGenerating] = useState(false);
        const [generated, setGenerated] = useState(false);

<<<<<<< HEAD
  const DevicesContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Camera Devices</h3>
        <button onClick={() => setToast({ message: 'Device status refreshed!', type: 'success' })} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition flex items-center gap-2"><RefreshCw className="w-4 h-4" />Refresh Status</button>
      </div>
      {loading ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}</div>) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleDevices.map((d) => (
            <div key={d.id} onClick={() => { setSelectedDevice(d); setShowDeviceDetails(true); }} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === 'online' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                    <Camera className={`w-5 h-5 ${d.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </div>
                  <div><p className="font-semibold">{d.id}</p><p className="text-xs text-slate-500">{d.location}</p></div>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="flex justify-between text-sm text-slate-500"><span>{d.captures.toLocaleString()} captures</span><span>Active: {d.lastActive}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ReportsContent = () => {
    const reports = [
      { title: 'Violations Report', desc: 'Summary of all violations by type, location, and time period', icon: FileWarning, color: 'text-rose-500', bg: 'bg-rose-100' },
      { title: 'Revenue Report', desc: 'Fines collection summary with payment methods breakdown', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100' },
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
    const handleSave = () => { setSaving(true); setTimeout(() => { setSaving(false); setToast({ message: 'Settings saved successfully!', type: 'success' }); }, 1500); };
    return (
      <div className="space-y-6 max-w-2xl">
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-48 rounded-xl" /></>) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Detection Parameters</h3>
              <div className="space-y-4">
                <div><label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit Threshold (km/h)</label><input type="number" defaultValue={60} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
                <div><label className="text-sm font-medium text-slate-700 mb-1 block">Red Light Grace Period (seconds)</label><input type="number" defaultValue={2} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
                <div><label className="text-sm font-medium text-slate-700 mb-1 block">Minimum Confidence Score (%)</label><input type="number" defaultValue={85} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
                <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition flex items-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : 'Save Changes'}
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Notification Settings</h3>
              <div className="space-y-3">
                {[{ label: 'Email notifications for new disputes', checked: true }, { label: 'SMS alerts for device offline', checked: true }, { label: 'Daily summary reports', checked: false }, { label: 'Payment confirmation alerts', checked: true }].map((setting) => (
                  <label key={setting.label} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                    <input type="checkbox" defaultChecked={setting.checked} className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                    <span className="text-sm">{setting.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-1">LTO Database Integration</h3>
              <p className="text-sm text-slate-500 mb-4">Driver records are automatically synced from the Land Transportation Office (LTO) database. Manual addition of drivers is disabled.</p>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"><Database className="w-4 h-4 text-emerald-600" /></div>
                <div><p className="text-sm font-medium text-emerald-700">LTO Database Connected</p><p className="text-xs text-emerald-600">Last synced: Today at 6:00 AM</p></div>
                <button onClick={() => setToast({ message: 'Database sync triggered!', type: 'info' })} className="ml-auto text-xs text-emerald-700 border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1"><RefreshCw className="w-3 h-3" />Sync Now</button>
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
=======
        const reportTypes = [
          { id: "violations", label: "Violations Summary", icon: FileWarning, desc: "Total violations by type, location, and date range", color: "text-rose-500 bg-rose-50 border-rose-200" },
          { id: "disputes", label: "Disputes Report", icon: Gavel, desc: "Dispute outcomes, approval rates, and resolution time", color: "text-amber-500 bg-amber-50 border-amber-200" },
          { id: "enforcer", label: "Enforcer Performance", icon: Shield, desc: "Apprehensions per officer, by station and period", color: "text-orange-500 bg-orange-50 border-orange-200" },
          { id: "camera", label: "Camera Activity", icon: Camera, desc: "Captures per device, uptime, and detection stats", color: "text-blue-500 bg-blue-50 border-blue-200" },
          { id: "users", label: "User Activity", icon: Users, desc: "Registered users, violations per driver, suspensions", color: "text-violet-500 bg-violet-50 border-violet-200" },
        ];

        const handleGenerate = () => {
          setGenerating(true);
          setGenerated(false);
          setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
        };

        const selectedReport = reportTypes.find(r => r.id === reportType);

        // Mock preview data per report type
        const previewData = {
          violations: {
            summary: [
              { label: "Total Violations", value: "1,234", sub: "Mar 1–31, 2024" },
              { label: "Unpaid", value: "876", sub: "71% of total" },
              { label: "Paid", value: "298", sub: "24% of total" },
              { label: "Disputed", value: "60", sub: "5% of total" },
            ],
            rows: [
              { col1: "Running Red Light", col2: "431", col3: "35%", col4: "₱646,500" },
              { col1: "Over Speeding", col2: "345", col3: "28%", col4: "₱690,000" },
              { col1: "Illegal Parking", col2: "271", col3: "22%", col4: "₱135,500" },
              { col1: "No Helmet", col2: "185", col3: "15%", col4: "₱185,000" },
            ],
            headers: ["Violation Type", "Count", "Share", "Total Fines"],
          },
          disputes: {
            summary: [
              { label: "Total Disputes", value: "60", sub: "Mar 1–31, 2024" },
              { label: "Approved", value: "22", sub: "37% approval rate" },
              { label: "Rejected", value: "31", sub: "52% rejection rate" },
              { label: "Pending", value: "7", sub: "Still under review" },
            ],
            rows: [
              { col1: "Speed Camera Error", col2: "18", col3: "Approved", col4: "3.2 days" },
              { col1: "Signal Malfunction", col2: "14", col3: "Approved", col4: "2.8 days" },
              { col1: "Stolen Vehicle", col2: "12", col3: "Rejected", col4: "4.1 days" },
              { col1: "Wrong Identity", col2: "9", col3: "Rejected", col4: "5.0 days" },
            ],
            headers: ["Dispute Reason", "Count", "Common Outcome", "Avg. Resolution"],
          },
          enforcer: {
            summary: [
              { label: "Active Officers", value: "12", sub: "District 1–4" },
              { label: "Total Apprehensions", value: "1,234", sub: "This period" },
              { label: "Avg per Officer", value: "103", sub: "Per month" },
              { label: "Top District", value: "District 2", sub: "Most active" },
            ],
            rows: [
              { col1: "Officer Lopez (ENF-002)", col2: "District 2", col3: "203", col4: "16.5%" },
              { col1: "Officer Garcia (ENF-001)", col2: "District 1", col3: "156", col4: "12.6%" },
              { col1: "Officer Reyes (ENF-003)", col2: "District 3", col3: "142", col4: "11.5%" },
              { col1: "Officer Cruz (ENF-004)", col2: "District 4", col3: "138", col4: "11.2%" },
            ],
            headers: ["Officer", "Station", "Apprehensions", "Share"],
          },
          camera: {
            summary: [
              { label: "Total Cameras", value: "4", sub: "System-wide" },
              { label: "Active", value: "3", sub: "75% uptime" },
              { label: "Total Captures", value: "5,045", sub: "This period" },
              { label: "Avg Confidence", value: "85.75%", sub: "Detection accuracy" },
            ],
            rows: [
              { col1: "CAM-001 – Rizal Ave", col2: "1,245", col3: "98.2%", col4: "85%" },
              { col1: "CAM-002 – Highway 54", col2: "892", col3: "99.1%", col4: "90%" },
              { col1: "CAM-003 – EDSA NB", col2: "2,341", col3: "72.4%", col4: "80%" },
              { col1: "CAM-004 – Quezon Blvd", col2: "567", col3: "97.8%", col4: "88%" },
            ],
            headers: ["Camera", "Captures", "Uptime", "Confidence"],
          },
          users: {
            summary: [
              { label: "Total Users", value: "5", sub: "Registered accounts" },
              { label: "Active Drivers", value: "4", sub: "In good standing" },
              { label: "Suspended", value: "1", sub: "Pedro Reyes" },
              { label: "Enforcers", value: "2", sub: "Active officers" },
            ],
            rows: [
              { col1: "Juan Dela Cruz", col2: "DRV-001", col3: "3", col4: "Active" },
              { col1: "Maria Santos", col2: "DRV-002", col3: "1", col4: "Active" },
              { col1: "Pedro Reyes", col2: "DRV-003", col3: "2", col4: "Suspended" },
              { col1: "Ana Garcia", col2: "DRV-004", col3: "1", col4: "Active" },
            ],
            headers: ["Name", "ID", "Violations", "Status"],
          },
        };

        const preview = previewData[reportType];

        return (
          <div className="space-y-6 max-w-4xl">
            {/* Report type selector */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Select Report Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {reportTypes.map(r => (
                  <button key={r.id} onClick={() => { setReportType(r.id); setGenerated(false); }}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${reportType === r.id ? `${r.color} border-current` : "bg-white border-slate-200 hover:border-slate-300"}`}>
                    <r.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${reportType === r.id ? "" : "text-slate-400"}`} />
                    <div>
                      <p className={`font-semibold text-sm ${reportType === r.id ? "" : "text-slate-700"}`}>{r.label}</p>
                      <p className={`text-xs mt-0.5 ${reportType === r.id ? "opacity-70" : "text-slate-400"}`}>{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-4">Report Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Date From</label>
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Date To</label>
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Status Filter</label>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>All</option><option>Unpaid</option><option>Paid</option><option>Disputed</option><option>Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleGenerate} disabled={generating}
                  className="px-6 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center gap-2">
                  {generating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><BarChart3 className="w-4 h-4" />Generate Report</>}
                </button>
                {generated && (
                  <>
                    <button onClick={() => setToast({ message: "Report exported as PDF!", type: "success" })} className="px-5 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                      <Download className="w-4 h-4" />Export PDF
                    </button>
                    <button onClick={() => setToast({ message: "Report exported as CSV!", type: "success" })} className="px-5 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4" />Export CSV
                    </button>
                    <button onClick={() => setToast({ message: "Report sent to printer!", type: "info" })} className="px-5 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                      <Printer className="w-4 h-4" />Print
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Generated Report Preview */}
            {generated && (
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                {/* Report header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-violet-200 text-xs uppercase tracking-widest font-medium mb-1">Generated Report</p>
                      <h2 className="text-xl font-bold">{selectedReport?.label}</h2>
                      <p className="text-violet-200 text-sm mt-1">Period: {dateFrom} to {dateTo} · Status: {statusFilter}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      {selectedReport && <selectedReport.icon className="w-6 h-6 text-white" />}
                    </div>
                  </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-b divide-x">
                  {preview.summary.map((s, i) => (
                    <div key={i} className="p-4">
                      <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                      <p className="text-sm font-medium text-slate-600 mt-0.5">{s.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Data table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        {preview.headers.map((h, i) => (
                          <th key={i} className="px-5 py-3 text-left text-sm font-semibold text-slate-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {preview.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition">
                          <td className="px-5 py-3 text-sm font-medium text-slate-800">{row.col1}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{row.col2}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{row.col3}</td>
                          <td className="px-5 py-3 text-sm text-slate-600">{row.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t flex items-center justify-between text-xs text-slate-400">
                  <span>Traffic Violation Monitoring System — Auto-generated report</span>
                  <span>Generated: {new Date().toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        );
      };
      return <ReportsContent />;
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
    }

    if (activeSection === "settings") return (      <div className="space-y-6 max-w-2xl">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">Per-device settings are configured individually from the <button onClick={() => setActiveSection("devices")} className="font-semibold underline">Camera Devices</button> section.</p>
        </div>
        {loading ? <Skeleton className="h-64 rounded-xl" /> : (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold mb-1">System-wide Settings</h3>
            <p className="text-sm text-slate-500 mb-4">Global parameters that apply to all cameras.</p>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-slate-700 mb-1 block">Default Speed Limit (km/h)</label><input type="number" defaultValue={60} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
              <div><label className="text-sm font-medium text-slate-700 mb-1 block">Default Red Light Grace Period (seconds)</label><input type="number" defaultValue={2} className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" /></div>
              <button onClick={() => setToast({ message: "System settings saved!", type: "success" })} className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    );
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
<<<<<<< HEAD
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
=======
      {showViolationDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="supervisor" onClose={() => setShowViolationDetails(false)}
          onApprove={() => { setShowViolationDetails(false); setToast({ message: "Violation approved!", type: "success" }); }}
          onReject={() => { setShowViolationDetails(false); setToast({ message: "Violation rejected.", type: "warning" }); }} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); setToast({ message: "Dispute approved!", type: "success" }); }}
          onReject={() => { setShowDisputeDetails(false); setToast({ message: "Dispute rejected.", type: "warning" }); }} />
      )}
      {showUserDetails && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setShowUserDetails(false)}
          onSuspend={() => { setShowUserDetails(false); setToast({ message: "User status updated!", type: "success" }); }} />
      )}
      {showDeviceSettings && selectedDevice && (
        <DeviceSettingsModal device={selectedDevice} onClose={() => setShowDeviceSettings(false)}
          onSave={(updated) => { setDevices(ds => ds.map(d => d.id === updated.id ? updated : d)); setToast({ message: `${updated.id} settings saved!`, type: "success" }); }} />
      )}
      {showAddDevice && (
        <AddDeviceModal onClose={() => setShowAddDevice(false)}
          onAdd={(newDev) => {
            const id = `CAM-00${devices.length + 1}`;
            setDevices(ds => [...ds, { ...newDev, id, status: "active", captures: 0, lastActive: "Just added", installDate: new Date().toISOString().split("T")[0] }]);
            setToast({ message: "Camera device added!", type: "success" });
          }} />
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
      )}
      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      <div className="lg:pl-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"><Menu className="w-5 h-5" /></button>
<<<<<<< HEAD
              <h2 className="font-bold text-lg capitalize">{activeSection}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
=======
              <h2 className="font-bold text-lg capitalize">{menuItems.find(m => m.id === activeSection)?.label || activeSection}</h2>
            </div>
            <div className="flex items-center gap-3 relative" ref={notifRef}>
              <button onClick={() => setShowNotifications(v => !v)} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full text-xs flex items-center justify-center text-white font-bold">{unreadCount}</span>}
              </button>
              {showNotifications && <NotificationPanel notifications={notifications} onClose={() => setShowNotifications(false)} onMarkRead={() => setNotifications(ns => ns.map(n => ({...n, read: true})))} />}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center"><span className="text-sm font-medium text-violet-600">TC</span></div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">{renderContent()}</main>
      </div>
<<<<<<< HEAD
      <style jsx global>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
    </div>
  );
};

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────

=======
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
export default function TrafficViolationSystem() {
  const [screen, setScreen] = useState("landing"); // landing | driver-login | enforcer-login | admin-login | app
  const [userType, setUserType] = useState(null);

<<<<<<< HEAD
  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} userType={userType} setUserType={setUserType} />;

  switch (userType) {
    case 'driver': return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
    case 'enforcer': return <EnforcerDashboard onLogout={() => setIsLoggedIn(false)} />;
    case 'supervisor': return <SupervisorDashboard onLogout={() => setIsLoggedIn(false)} />;
    default: return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
  }
}
=======
  const handleSelectPortal = (role) => {
    setUserType(role);
    setScreen(`${role}-login`);
  };

  const handleLogin = () => setScreen("app");
  const handleLogout = () => { setScreen("landing"); setUserType(null); };
  const handleBack = () => setScreen("landing");

  if (screen === "landing") return <PortalLanding onSelect={handleSelectPortal} />;
  if (screen === "driver-login") return <DriverLoginScreen onLogin={handleLogin} onBack={handleBack} />;
  if (screen === "enforcer-login") return <EnforcerLoginScreen onLogin={handleLogin} onBack={handleBack} />;
  if (screen === "supervisor-login") return <AdminLoginScreen onLogin={handleLogin} onBack={handleBack} />;

  if (screen === "app") {
    switch (userType) {
      case "driver": return <VehicleOwnerPortal onLogout={handleLogout} />;
      case "enforcer": return <EnforcerDashboard onLogout={handleLogout} />;
      case "supervisor": return <SupervisorDashboard onLogout={handleLogout} />;
      default: return <PortalLanding onSelect={handleSelectPortal} />;
    }
  }
  return <PortalLanding onSelect={handleSelectPortal} />;
}
>>>>>>> 449f4d3b2dd176b978e4f9df919020d321da7e90
