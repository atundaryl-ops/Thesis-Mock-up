import React, { useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizes[size]} animate-spin text-violet-500`} />
      <p className="text-sm text-slate-500 animate-pulse">{text}</p>
    </div>
  );
};

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
);

export const CardSkeleton = () => (
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

export const TableSkeleton = ({ rows = 5 }) => (
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

export const Toast = ({ message, type = 'success', onClose }) => {
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

export const StatusBadge = ({ status }) => {
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

export const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', confirmColor = 'bg-violet-600 hover:bg-violet-700' }) => (
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
