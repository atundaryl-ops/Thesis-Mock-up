import React, { useState, useEffect } from 'react';
import { 
  X, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, 
  Camera, Users, Car, Image, Download, Mail, Phone, Hash, Info, 
  FileText, Gavel, Shield, AlertTriangle, Lock, Unlock, Database,
  Wifi, WifiOff, Activity, RefreshCw, Loader2, Search, FileWarning,
  CreditCard
} from 'lucide-react';
import { LoadingSpinner, StatusBadge } from './UIComponents';
import { sampleViolations, sampleDrivers } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// VIOLATION DETAILS MODAL
// ─────────────────────────────────────────────────────────────

export const ViolationDetailsModal = ({ violation, onClose, userType, onPayment, onDispute, onApprove, onReject }) => {
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
                <p className="flex items-center gap-2"><span className="w-4 h-4 text-slate-400 font-bold text-sm flex items-center justify-center">₱</span><span className="font-semibold text-lg">₱{violation.fine?.toLocaleString()}</span></p>
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
                <button onClick={() => { onClose(); onDispute && onDispute(violation); }} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"><Gavel className="w-4 h-4" />File Dispute</button>
                <button onClick={() => { onClose(); onPayment && onPayment(violation); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" />Pay Fine</button>
              </>
            )}
            {(userType === 'enforcer' || userType === 'supervisor') && violation.status === 'pending' && (
              <>
                <button onClick={() => { onClose(); onReject && onReject(violation); }} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><XCircle className="w-4 h-4" />Reject</button>
                <button onClick={() => { onClose(); onApprove && onApprove(violation); }} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Approve</button>
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

export const DisputeDetailsModal = ({ dispute, onClose, onApprove, onReject, userType }) => {
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
                <button onClick={() => onReject && onReject(dispute)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><XCircle className="w-4 h-4" />Reject</button>
                <button onClick={() => onApprove && onApprove(dispute)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" />Approve & Dismiss</button>
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

export const UserDetailsModal = ({ user, onClose, onSuspend, onActivate }) => {
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
                ? <button onClick={() => onSuspend && onSuspend(user)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2"><Lock className="w-4 h-4" />Suspend Account</button>
                : <button onClick={() => onActivate && onActivate(user)} className="flex-1 py-2.5 border border-emerald-500 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition flex items-center justify-center gap-2"><Unlock className="w-4 h-4" />Reactivate Account</button>
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

export const DeviceDetailsModal = ({ device, onClose, onRestart, onDiagnostic }) => {
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
// FILTER MODAL
// ─────────────────────────────────────────────────────────────

export const FilterModal = ({ onClose, onApply, title = 'Filter Options' }) => {
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

export const ExportModal = ({ onClose, onExport, title = 'Export Data' }) => {
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
// REPORT MODAL
// ─────────────────────────────────────────────────────────────

export const ReportModal = ({ report, onClose, onGenerate }) => {
  const [period, setPeriod] = useState('this_month');
  const [generating, setGenerating] = useState(false);

  const periods = [
    { id: 'this_week',   label: 'This Week',      desc: 'Last 7 days' },
    { id: 'this_month',  label: 'This Month',     desc: 'Last 30 days' },
    { id: 'last_month',  label: 'Last Month',     desc: 'Previous calendar month' },
    { id: 'this_quarter',label: 'This Quarter',   desc: 'Last 90 days' },
    { id: 'this_year',   label: 'This Year',      desc: 'Current calendar year' },
    { id: 'custom',      label: 'Custom Range',   desc: 'Pick a date range' },
  ];

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      onGenerate && onGenerate(report.title, period);
    }, 1500);
  };

  const Icon = report?.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.bg}`}>
                <Icon className={`w-5 h-5 ${report.color}`} />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold">{report?.title}</h3>
              <p className="text-xs text-slate-500">{report?.desc}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Select Report Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {periods.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`p-3 rounded-xl border text-left transition ${
                    period === p.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {period === 'custom' && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          )}

          <div className="bg-slate-50 border rounded-xl p-3 flex items-start gap-3">
            <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500">
              The generated report will include charts, tables, and a printable summary for the selected period.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || (period === 'custom' && (!dateFrom || !dateTo))}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating
              ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</>
              : <><FileText className="w-4 h-4" />Generate Report</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// NOTIFICATION PANEL
// ─────────────────────────────────────────────────────────────

export const NotificationPanel = ({ onClose }) => {
  const notifications = [
    { id: 1, type: 'dispute', message: 'New dispute filed by Juan Dela Cruz', time: '2 mins ago', read: false },
    { id: 2, type: 'payment', message: 'Payment received: ₱2,500 from Pedro Reyes', time: '15 mins ago', read: false },
    { id: 3, type: 'device', message: 'CAM-003 went offline at EDSA Northbound', time: '2 hours ago', read: true },
    { id: 4, type: 'violation', message: 'New violation recorded: VIO-2024-008', time: '3 hours ago', read: true },
  ];
  
  const PesoIcon = ({ className }) => <span className={`font-bold flex items-center justify-center ${className}`}>₱</span>;
  const icons = { dispute: Gavel, payment: PesoIcon, device: Camera, violation: AlertTriangle };
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