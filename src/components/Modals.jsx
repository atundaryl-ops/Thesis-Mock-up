import React, { useState, useEffect } from 'react';
import { 
  X, Eye, CheckCircle, XCircle, Clock, Calendar, MapPin, DollarSign, 
  Upload, FileText, Download, Mail, Phone, Users, Hash, Shield, 
  Loader2, Search, Filter, Image, Car, CreditCard, Camera,
  Play, Pause, Volume2, ZoomIn, RotateCcw, Power, RefreshCw, Wifi, WifiOff
} from 'lucide-react';
import { StatusBadge, LoadingSpinner, Skeleton } from './UIComponents';
import { sampleViolations, sampleDrivers } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// VIOLATION DETAILS MODAL
// ─────────────────────────────────────────────────────────────

export const ViolationDetailsModal = ({ violation, userType, onClose, onApprove, onReject, onPayment, onDispute }) => {
  const [loading, setLoading] = useState(true);
  const [activeEvidence, setActiveEvidence] = useState(0);
  
  useEffect(() => { 
    const t = setTimeout(() => setLoading(false), 600); 
    return () => clearTimeout(t); 
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        <LoadingSpinner text="Loading violation details..." />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-bold">{violation.id}</h3>
            <p className="text-sm text-slate-500">{violation.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={violation.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Evidence Gallery */}
          <div className="bg-slate-100 rounded-xl p-4">
            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
              <span className="text-6xl">{violation.image}</span>
              <div className="absolute bottom-2 right-2 flex gap-1">
                {violation.evidence?.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveEvidence(i)}
                    className={`w-2 h-2 rounded-full ${i === activeEvidence ? 'bg-violet-500' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {violation.evidence?.map((e, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveEvidence(i)}
                  className={`flex-shrink-0 w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center border-2 ${i === activeEvidence ? 'border-violet-500' : 'border-transparent'}`}
                >
                  <Image className="w-6 h-6 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Violation Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Violation Details</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.date} at {violation.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Captured by: {violation.capturedBy}</span>
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 font-semibold">Fine: ₱{violation.fine?.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Vehicle & Driver</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.plate} - {violation.vehicleBrand} {violation.vehicleModel} ({violation.vehicleColor})</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.driver}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.license}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{violation.phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info (if paid) */}
          {violation.status === 'paid' && violation.paidDate && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-700 mb-2">Payment Information</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-emerald-600">Amount Paid</p>
                  <p className="font-semibold">₱{violation.paidAmount?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-emerald-600">Date Paid</p>
                  <p className="font-semibold">{violation.paidDate}</p>
                </div>
                <div>
                  <p className="text-emerald-600">Method</p>
                  <p className="font-semibold">{violation.paymentMethod}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {userType === 'driver' && violation.status === 'unpaid' && (
              <>
                <button onClick={() => onDispute?.(violation)} className="flex-1 py-2.5 border border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition">
                  Dispute
                </button>
                <button onClick={() => onPayment?.(violation)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition">
                  Pay Now
                </button>
              </>
            )}
            {(userType === 'supervisor' || userType === 'enforcer') && violation.status === 'pending' && (
              <>
                <button onClick={() => onReject?.(violation)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" />Reject
                </button>
                <button onClick={() => onApprove?.(violation)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />Approve
                </button>
              </>
            )}
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DISPUTE DETAILS MODAL
// ─────────────────────────────────────────────────────────────

export const DisputeDetailsModal = ({ dispute, userType, onClose, onApprove, onReject }) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const relatedViolation = sampleViolations.find(v => v.id === dispute.violationId);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-bold">{dispute.id}</h3>
            <p className="text-sm text-slate-500">For Violation: {dispute.violationId}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={dispute.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Driver Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-700 mb-2">Driver Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
              <p className="flex items-center gap-2"><Users className="w-4 h-4" />{dispute.driver}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{dispute.phone}</p>
              <p className="flex items-center gap-2 col-span-2"><Mail className="w-4 h-4" />{dispute.email}</p>
            </div>
          </div>

          {/* Related Violation */}
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

          {/* Reason */}
          <div>
            <h4 className="font-semibold mb-2">Reason for Dispute</h4>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4 border">{dispute.reason}</p>
          </div>

          {/* Evidence */}
          <div className="bg-slate-50 border rounded-xl p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />Submitted Evidence
            </h4>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{dispute.attachment}</p>
                <p className="text-xs text-slate-400">Submitted on {dispute.date}</p>
              </div>
              <button className="text-violet-600 text-sm hover:underline flex items-center gap-1">
                <Download className="w-4 h-4" />View
              </button>
            </div>
          </div>

          {/* Review Decision (if already reviewed) */}
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

          {/* Review Notes (for pending disputes) */}
          {userType === 'supervisor' && dispute.status === 'pending' && (
            <div>
              <h4 className="font-semibold mb-2">Review Notes</h4>
              <textarea 
                rows={3} 
                value={reviewNotes} 
                onChange={e => setReviewNotes(e.target.value)}
                placeholder="Add your review notes here..."
                className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500" 
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {userType === 'supervisor' && dispute.status === 'pending' && (
              <>
                <button onClick={() => onReject?.(dispute)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" />Reject
                </button>
                <button onClick={() => onApprove?.(dispute)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />Approve & Dismiss
                </button>
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
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        <LoadingSpinner text="Loading user details..." />
      </div>
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
            <div>
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm text-slate-500 capitalize">{user.role} • {user.odId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={user.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
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
                {user.vehicles && <p className="flex items-center gap-2"><Car className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Vehicles: {user.vehicles}</span></p>}
                {user.apprehensions && <p className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Apprehensions: {user.apprehensions}</span></p>}
              </div>
            </div>
          </div>

          {/* Violation History for Drivers */}
          {user.role === 'driver' && (
            <div>
              <h4 className="font-semibold mb-3">Violation History ({userViolations.length})</h4>
              {userViolations.length > 0 ? (
                <div className="space-y-2">
                  {userViolations.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{v.image}</span>
                        <div>
                          <p className="font-medium text-sm">{v.type}</p>
                          <p className="text-xs text-slate-500">{v.date}</p>
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
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            {user.status === 'active' ? (
              <button onClick={() => onSuspend?.(user)} className="flex-1 py-2.5 border border-rose-500 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition">
                Suspend Account
              </button>
            ) : (
              <button onClick={() => onActivate?.(user)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition">
                Reactivate Account
              </button>
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

export const DeviceDetailsModal = ({ device, onClose, onDiagnostic, onRestart }) => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        <LoadingSpinner text="Loading device details..." />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.status === 'online' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
              <Camera className={`w-6 h-6 ${device.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold">{device.id}</h3>
              <p className="text-sm text-slate-500">{device.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={device.status} />
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Live Feed */}
          <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
            {device.status === 'online' ? (
              <>
                <div className="text-white/40 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Live Feed - {device.location}</p>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPlaying(!playing)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                      </button>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                        <Volume2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                        <RotateCcw className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <span className="absolute top-3 left-3 flex items-center gap-2 text-xs text-white bg-red-500 px-2 py-1 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>LIVE
                </span>
              </>
            ) : (
              <div className="text-white/40 text-center">
                <WifiOff className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Camera Offline</p>
              </div>
            )}
          </div>

          {/* Device Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Total Captures</p>
              <p className="text-xl font-bold text-violet-600">{device.captures.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Last Active</p>
              <p className="text-sm font-semibold">{device.lastActive}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">IP Address</p>
              <p className="text-sm font-semibold">{device.ipAddress}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Installed</p>
              <p className="text-sm font-semibold">{device.installDate}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t bg-slate-50 rounded-b-2xl">
          <div className="flex gap-3">
            <button onClick={() => onRestart?.(device)} disabled={device.status === 'offline'} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <Power className="w-4 h-4" />Restart
            </button>
            <button onClick={() => onDiagnostic?.(device)} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />Run Diagnostic
            </button>
            <button onClick={onClose} className="px-6 py-2.5 border rounded-xl font-medium hover:bg-slate-100 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// DRIVER SEARCH MODAL (for Enforcer)
// ─────────────────────────────────────────────────────────────

export const DriverSearchModal = ({ onClose, onSelectDriver }) => {
  const [searchType, setSearchType] = useState('plate');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const filtered = sampleDrivers.filter(d => {
        const q = searchQuery.toLowerCase();
        if (searchType === 'plate') return d.plate.toLowerCase().includes(q);
        if (searchType === 'license') return d.license.toLowerCase().includes(q);
        return d.name.toLowerCase().includes(q);
      });
      setResults(filtered);
      setSearching(false);
    }, 800);
  };

  if (selectedDriver) {
    const driverViolations = sampleViolations.filter(v => v.driverId === selectedDriver.id);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in max-h-[85vh] overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <button onClick={() => setSelectedDriver(null)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
              <span className="font-medium">Driver Profile</span>
              <div className="w-9"></div>
            </div>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-orange-600">{selectedDriver.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
              <p className="text-slate-500">{selectedDriver.license}</p>
              <StatusBadge status={selectedDriver.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">Plate Number</p>
                <p className="font-semibold">{selectedDriver.plate}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">Violations</p>
                <p className="font-semibold text-rose-600">{selectedDriver.violations}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Violation History</h4>
              {driverViolations.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {driverViolations.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <span>{v.image}</span>
                        <span>{v.type}</span>
                      </div>
                      <StatusBadge status={v.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl">No violations found</p>
              )}
            </div>
          </div>
          <div className="p-4 border-t">
            <button 
              onClick={() => { onSelectDriver?.(selectedDriver); onClose(); }} 
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
            >
              Record Violation for This Driver
            </button>
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
          <button onClick={() => { onApply?.({ statusFilter, dateFrom, dateTo }); onClose(); }}
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
    setTimeout(() => { setExporting(false); onExport?.(format); onClose(); }, 1500);
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
              {[
                { id: 'csv', label: 'CSV Spreadsheet', desc: 'Compatible with Excel, Google Sheets' },
                { id: 'pdf', label: 'PDF Report', desc: 'Formatted report for printing' },
                { id: 'json', label: 'JSON Data', desc: 'Raw data for system integration' }
              ].map(f => (
                <button key={f.id} onClick={() => setFormat(f.id)}
                  className={`w-full p-3 border rounded-xl text-left transition ${format === f.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <p className="font-medium">{f.label}</p>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleExport} disabled={exporting}
            className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
            {exporting ? <><Loader2 className="w-4 h-4 animate-spin" />Exporting...</> : <><Download className="w-4 h-4" />Export</>}
          </button>
        </div>
      </div>
    </div>
  );
};
