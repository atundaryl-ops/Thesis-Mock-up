import React, { useState, useEffect } from 'react';
import {
  Shield, Camera, Bell, LogOut, Search, Filter, Eye, Menu, X,
  FileText, DollarSign, TrendingUp, Users, Settings, BarChart3,
  FileWarning, Gavel, Car, Download, Plus, Edit, Wifi, WifiOff,
  Activity, Printer, UserCheck, RefreshCw, AlertTriangle, Database,
  Power, Save, RotateCcw, Loader2, MapPin, Clock, Calendar, ChevronLeft,
} from 'lucide-react';
import { Toast, Skeleton, TableSkeleton, StatusBadge, ConfirmModal } from '../components/UIComponents';
import { ViolationDetailsModal, DisputeDetailsModal, UserDetailsModal, DeviceDetailsModal, FilterModal, ExportModal, NotificationPanel, ReportModal } from '../components/Modals';
import { sampleViolations, sampleDisputes, sampleUsers, sampleDevices, sampleDrivers } from '../data/sampleData';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ─────────────────────────────────────────────────────────────
// SUPERVISOR / ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

// Enforcer locations data
const enforcerLocations = [
  { id: 'ENF-001', name: 'Officer Garcia', lat: 14.5995, lng: 120.9842, status: 'active', area: 'Ermita, Manila' },
  { id: 'ENF-002', name: 'Officer Santos', lat: 14.6091, lng: 120.9897, status: 'active', area: 'Quiapo, Manila' },
  { id: 'ENF-003', name: 'Officer Reyes', lat: 14.5547, lng: 121.0244, status: 'active', area: 'Makati CBD' },
  { id: 'ENF-004', name: 'Officer Cruz', lat: 14.6507, lng: 121.0495, status: 'break', area: 'Quezon City' },
  { id: 'ENF-005', name: 'Officer Lopez', lat: 14.5832, lng: 120.9797, status: 'active', area: 'Malate, Manila' },
];

// CCTV locations data
const cctvLocations = [
  { id: 'CAM-001', location: 'EDSA-Ayala Intersection', lat: 14.5547, lng: 121.0194, status: 'online', type: 'Speed + Red Light' },
  { id: 'CAM-002', location: 'Quezon Ave-EDSA', lat: 14.6285, lng: 121.0325, status: 'online', type: 'Multi-Purpose' },
  { id: 'CAM-003', location: 'Roxas Blvd-UN Ave', lat: 14.5820, lng: 120.9787, status: 'offline', type: 'LPR Camera' },
  { id: 'CAM-004', location: 'C5-Katipunan', lat: 14.6312, lng: 121.0756, status: 'online', type: 'Speed Detection' },
  { id: 'CAM-005', location: 'Taft Ave-Vito Cruz', lat: 14.5636, lng: 120.9945, status: 'online', type: 'Red Light' },
  { id: 'CAM-006', location: 'España Blvd-Lacson', lat: 14.6110, lng: 120.9880, status: 'online', type: 'Multi-Purpose' },
];


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
  const [showReportPreview, setShowReportPreview] = useState(null);
  const [enforcerList, setEnforcerList] = useState(sampleUsers.filter(u => u.role === 'enforcer'));
  const [deviceList, setDeviceList] = useState(sampleDevices);
  const [cameraEnabled, setCameraEnabled] = useState(
    Object.fromEntries(sampleDevices.map(d => [d.id, d.status === 'online']))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployTarget, setDeployTarget] = useState(null);
  const [deployForm, setDeployForm] = useState({ area: '', shift: '', date: '' });
  const [deploying, setDeploying] = useState(false);

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, [activeSection]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'violations', label: 'Violations', icon: FileWarning },
    { id: 'disputes', label: 'Disputes', icon: Gavel },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'devices', label: 'Devices', icon: Camera },
    { id: 'map', label: 'Map View', icon: MapPin },
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
                { action: 'Payment received', detail: '₱2,500 from Pedro Reyes', time: '15 mins ago', icon: ({ className }) => <span className={`font-bold flex items-center justify-center ${className}`}>₱</span>, color: 'text-emerald-500 bg-emerald-100', section: null },
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

  const DisputesContent = () => {
  const [disputeFilter, setDisputeFilter] = useState('all');
  const [disputes, setDisputes] = useState(sampleDisputes);

  const filteredDisputes = disputes.filter(d =>
    disputeFilter === 'all' ? true : d.status === disputeFilter
  );

  const handleApprove = (d) => {
    setShowConfirm({
      title: 'Approve Dispute',
      message: `Approve ${d.id} and dismiss the related violation?`,
      onConfirm: () => {
        setDisputes(prev => prev.map(x => x.id === d.id ? { ...x, status: 'approved', reviewedBy: 'Supervisor Admin', reviewDate: new Date().toISOString().split('T')[0] } : x));
        setShowConfirm(null);
        setToast({ message: 'Dispute approved! Violation dismissed.', type: 'success' });
      }
    });
  };

  const handleReject = (d) => {
    setShowConfirm({
      title: 'Reject Dispute',
      message: `Reject ${d.id}? The driver will be notified.`,
      confirmText: 'Reject',
      confirmColor: 'bg-rose-500 hover:bg-rose-600',
      onConfirm: () => {
        setDisputes(prev => prev.map(x => x.id === d.id ? { ...x, status: 'rejected', reviewedBy: 'Supervisor Admin', reviewDate: new Date().toISOString().split('T')[0] } : x));
        setShowConfirm(null);
        setToast({ message: 'Dispute rejected. Driver notified.', type: 'warning' });
      }
    });
  };

  const counts = {
    all: disputes.length,
    pending: disputes.filter(d => d.status === 'pending').length,
    approved: disputes.filter(d => d.status === 'approved').length,
    rejected: disputes.filter(d => d.status === 'rejected').length,
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all',      label: 'All',      color: 'bg-violet-600' },
          { id: 'pending',  label: 'Pending',  color: 'bg-amber-500' },
          { id: 'approved', label: 'Approved', color: 'bg-emerald-500' },
          { id: 'rejected', label: 'Rejected', color: 'bg-rose-500' },
        ].map(f => (
          <button key={f.id} onClick={() => setDisputeFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              disputeFilter === f.id ? `${f.color} text-white` : 'bg-white border hover:bg-slate-50'
            }`}>
            {f.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
              disputeFilter === f.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
      ) : filteredDisputes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border shadow-sm">
          <Gavel className="w-12 h-12 mx-auto text-slate-200 mb-3" />
          <p className="text-slate-500">No {disputeFilter !== 'all' ? disputeFilter : ''} disputes found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-slate-50 border-b text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <div className="col-span-2">Dispute ID</div>
            <div className="col-span-2">Driver</div>
            <div className="col-span-2">Violation</div>
            <div className="col-span-3">Reason</div>
            <div className="col-span-1">Evidence</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {filteredDisputes.map((d) => {
              const violation = sampleViolations.find(v => v.id === d.violationId);
              return (
                <div key={d.id} className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-slate-50 transition text-sm">
                  
                  {/* Dispute ID + date */}
                  <div className="col-span-2">
                    <p className="font-mono font-semibold text-xs">{d.id}</p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{d.date}
                    </p>
                  </div>

                  {/* Driver */}
                  <div className="col-span-2">
                    <p className="font-medium">{d.driver}</p>
                    <p className="text-xs text-slate-400">{d.phone}</p>
                  </div>

                  {/* Violation */}
                  <div className="col-span-2">
                    <p className="font-mono text-xs text-slate-500">{d.violationId}</p>
                    {violation && (
                      <>
                        <p className="text-xs font-medium text-slate-700">{violation.type}</p>
                        <p className="text-xs text-rose-500 font-semibold">₱{violation.fine.toLocaleString()}</p>
                      </>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="col-span-3">
                    <p className="text-xs text-slate-600 line-clamp-2">{d.reason}</p>
                    {d.reviewNotes && (
                      <p className="text-xs text-slate-400 mt-1 italic line-clamp-1">
                        Note: {d.reviewNotes}
                      </p>
                    )}
                  </div>

                  {/* Evidence */}
                  <div className="col-span-1">
                    {d.attachment ? (
                      <span className="inline-flex items-center gap-1 text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-lg">
                        <FileText className="w-3 h-3" />File
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300">None</span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <StatusBadge status={d.status} />
                    {d.reviewedBy && (
                      <p className="text-[10px] text-slate-400 mt-1">{d.reviewDate}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <button
                      onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }}
                      className="text-xs px-2 py-1 border rounded-lg hover:bg-slate-100 transition text-slate-600">
                      View
                    </button>
                    {d.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(d)}
                          className="text-xs px-2 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                          Approve
                        </button>
                        <button onClick={() => handleReject(d)}
                          className="text-xs px-2 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
                          Reject
                        </button>
                      </>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

  // USERS: Drivers synced from LTO, Enforcers can be added manually
  const UsersContent = () => {
    const [activeUserTab, setActiveUserTab] = useState('drivers');
    const [showAddEnforcer, setShowAddEnforcer] = useState(false);
    const [newEnforcer, setNewEnforcer] = useState({ name: '', badge: '', email: '', phone: '', station: '' });
    const [addingEnforcer, setAddingEnforcer] = useState(false);

    const drivers = sampleUsers.filter(u => u.role === 'driver' &&
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())));
    const enforcers = enforcerList.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddEnforcer = () => {
      if (!newEnforcer.name || !newEnforcer.badge || !newEnforcer.email || !newEnforcer.station) {
        setToast({ message: 'Please fill in all required fields.', type: 'warning' }); return;
      }
      setAddingEnforcer(true);
      setTimeout(() => {
        const added = {
          id: Date.now(), odId: newEnforcer.badge, name: newEnforcer.name,
          email: newEnforcer.email, phone: newEnforcer.phone, role: 'enforcer',
          badge: newEnforcer.badge, status: 'active', station: newEnforcer.station, apprehensions: 0,
        };
        setEnforcerList(prev => [...prev, added]);
        setAddingEnforcer(false);
        setShowAddEnforcer(false);
        setNewEnforcer({ name: '', badge: '', email: '', phone: '', station: '' });
        setToast({ message: `Enforcer ${added.name} added successfully!`, type: 'success' });
      }, 1200);
    };

    // Add Enforcer Modal
    const AddEnforcerModal = () => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-violet-600" />Add New Enforcer</h3>
            <button onClick={() => setShowAddEnforcer(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name *</label>
              <input type="text" value={newEnforcer.name} onChange={e => setNewEnforcer(f => ({ ...f, name: e.target.value }))}
                placeholder="Officer Name" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Badge Number *</label>
              <input type="text" value={newEnforcer.badge} onChange={e => setNewEnforcer(f => ({ ...f, badge: e.target.value.toUpperCase() }))}
                placeholder="ENF-XXX" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <input type="email" value={newEnforcer.email} onChange={e => setNewEnforcer(f => ({ ...f, email: e.target.value }))}
                placeholder="officer@lto.gov.ph" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone Number</label>
              <input type="tel" value={newEnforcer.phone} onChange={e => setNewEnforcer(f => ({ ...f, phone: e.target.value }))}
                placeholder="09XX XXX XXXX" className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Assigned Station *</label>
              <select value={newEnforcer.station} onChange={e => setNewEnforcer(f => ({ ...f, station: e.target.value }))}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="">Select Station</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
                <option value="District 3">District 3</option>
                <option value="Highway Patrol">Highway Patrol</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAddEnforcer(false)} className="flex-1 py-3 border rounded-xl font-medium hover:bg-slate-50">Cancel</button>
            <button onClick={handleAddEnforcer} disabled={addingEnforcer}
              className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 flex items-center justify-center gap-2">
              {addingEnforcer ? <><Loader2 className="w-4 h-4 animate-spin" />Adding...</> : <><Plus className="w-4 h-4" />Add Enforcer</>}
            </button>
          </div>
        </div>
      </div>
    );
    const DeployEnforcerModal = () => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-violet-600" />Deploy Enforcer
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{deployTarget?.name} — {deployTarget?.badge}</p>
            </div>
            <button onClick={() => setShowDeployModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Deployment Area *</label>
              <select value={deployForm.area} onChange={e => setDeployForm(f => ({ ...f, area: e.target.value }))}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm">
                <option value="">Select area</option>
                {['Ermita, Manila', 'Quiapo, Manila', 'Binondo, Manila', 'Tondo, Manila',
                  'Malate, Manila', 'Paco, Manila', 'Sampaloc, Manila', 'Santa Ana, Manila'].map(a => (
                    <option key={a}>{a}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Shift *</label>
              <div className="grid grid-cols-3 gap-2">
                {['Morning', 'Afternoon', 'Night'].map(s => (
                  <button key={s} onClick={() => setDeployForm(f => ({ ...f, shift: s }))}
                    className={`py-2 rounded-xl text-sm font-medium border transition ${deployForm.shift === s ? 'bg-violet-600 text-white border-violet-600' : 'hover:bg-slate-50 border-slate-200'
                      }`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Date *</label>
              <input type="date" value={deployForm.date} onChange={e => setDeployForm(f => ({ ...f, date: e.target.value }))}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" />
            </div>
          </div>
          <div className="p-4 border-t flex gap-3">
            <button onClick={() => setShowDeployModal(false)} className="flex-1 py-2.5 border rounded-xl text-sm font-medium hover:bg-slate-50">Cancel</button>
            <button
              disabled={!deployForm.area || !deployForm.shift || !deployForm.date || deploying}
              onClick={() => {
                setDeploying(true);
                setTimeout(() => {
                  setDeploying(false);
                  setShowDeployModal(false);
                  setDeployForm({ area: '', shift: '', date: '' });
                  setToast({ message: `${deployTarget.name} deployed to ${deployForm.area} (${deployForm.shift} shift)`, type: 'success' });
                }, 1500);
              }}
              className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {deploying ? <><Loader2 className="w-4 h-4 animate-spin" />Deploying...</> : <><MapPin className="w-4 h-4" />Deploy</>}
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <div className="space-y-4">
        {showAddEnforcer && <AddEnforcerModal />}
        {showDeployModal && deployTarget && <DeployEnforcerModal />}
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
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeUserTab === 'enforcers' ? 'bg-white/20' : 'bg-slate-100'}`}>{enforcerList.length}</span>
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
                            <button onClick={() => { setDeployTarget(u); setShowDeployModal(true); }}
                              className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1">
                              <MapPin className="w-4 h-4" />Deploy
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
      id: '', location: '', ipAddress: '', type: 'speed',
      installDate: new Date().toISOString().split('T')[0]
    });

    const toggleCamera = (id) => {
      setCameraEnabled(prev => {
        const next = { ...prev, [id]: !prev[id] };
        setToast({ message: `${id} ${next[id] ? 'enabled — now Online' : 'disabled — now Offline'}.`, type: next[id] ? 'success' : 'warning' });
        return next;
      });
    };

    const handleDeployCamera = () => {
      if (!newCamera.id || !newCamera.location || !newCamera.ipAddress) {
        setToast({ message: 'Please fill in all required fields.', type: 'warning' });
        return;
      }
      setAddingCamera(true);
      setTimeout(() => {
        const deployed = {
          id: newCamera.id,
          location: newCamera.location,
          status: 'offline',
          captures: 0,
          lastActive: 'Just deployed',
          ipAddress: newCamera.ipAddress,
          installDate: newCamera.installDate,
          type: newCamera.type,
        };
        setDeviceList(prev => [...prev, deployed]);
        setCameraEnabled(prev => ({ ...prev, [deployed.id]: false }));
        setAddingCamera(false);
        setShowAddCamera(false);
        setNewCamera({ id: '', location: '', ipAddress: '', type: 'speed', installDate: new Date().toISOString().split('T')[0] });
        setToast({ message: `Camera ${deployed.id} deployed! Awaiting network connection.`, type: 'success' });
      }, 1500);
    };

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
              onClick={handleDeployCamera}
              disabled={addingCamera}
              className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2"
            >
              {addingCamera ? <><Loader2 className="w-4 h-4 animate-spin" />Deploying...</> : <><Plus className="w-4 h-4" />Deploy Camera</>}
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
                <p className="text-2xl font-bold">{deviceList.length}</p>
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
                <p className="text-2xl font-bold text-emerald-600">{deviceList.filter(d => cameraEnabled[d.id]).length}</p>
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
                <p className="text-2xl font-bold text-rose-600">{deviceList.filter(d => !cameraEnabled[d.id]).length}</p>
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
                <p className="text-2xl font-bold text-blue-600">{deviceList.reduce((acc, d) => acc + (d.captures || 0), 0).toLocaleString()}</p>
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
            {deviceList.map((d) => {
              const enabled = cameraEnabled[d.id] ?? false;
              const displayStatus = enabled ? (d.status === 'online' ? 'online' : 'online') : 'offline';
              return (
                <div key={d.id} className={`bg-white rounded-xl p-4 shadow-sm border transition group ${!enabled ? 'opacity-60' : 'hover:shadow-md'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedDevice(d); setShowDeviceDetails(true); }}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${enabled ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        <Camera className={`w-6 h-6 ${enabled ? 'text-emerald-600' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{d.id}</p>
                        <p className="text-xs text-slate-500">{d.location}</p>
                      </div>
                    </div>
                    <StatusBadge status={displayStatus} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="bg-slate-50 rounded-lg p-2">
                      <p className="text-xs text-slate-500">Captures</p>
                      <p className="font-semibold">{(d.captures || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                      <p className="text-xs text-slate-500">Last Active</p>
                      <p className="font-semibold text-xs">{d.lastActive}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-slate-400 font-mono">{d.ipAddress}</span>
                    <button
                      onClick={() => toggleCamera(d.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${enabled
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}>
                      <Power className="w-3 h-3" />
                      {enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              );
            })}

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

  // ── MAP VIEW ──────────────────────────────────────────────────
  const MapContent = () => {
    const [selectedCam, setSelectedCam] = useState(null);
    const [mapFilter, setMapFilter] = useState('all');

    // Simulated camera positions on a stylized SVG city grid
    const cameras = [
      { ...sampleDevices[0], coords: [10.6970, 122.5644], violations: 312, hotspot: true },  // Iznart St & Quezon St
      { ...sampleDevices[1], coords: [10.7020, 122.5621], violations: 198, hotspot: false }, // Jaro Plaza area
      { ...sampleDevices[2], coords: [10.6951, 122.5698], violations: 87, hotspot: false }, // SM City Iloilo
      { ...sampleDevices[3], coords: [10.6890, 122.5601], violations: 241, hotspot: true },  // Molo Plaza area
    ];

    const violationHotspots = [
      { coords: [10.6970, 122.5644], radius: 150, border: '#ef4444' }, // Iznart-Quezon intersection
      { coords: [10.6890, 122.5601], radius: 120, border: '#f97316' }, // Molo
      { coords: [10.7020, 122.5621], radius: 100, border: '#eab308' }, // Jaro
      { coords: [10.6951, 122.5698], radius: 80, border: '#22c55e' }, // SM area
    ];

    const filtered = cameras.filter(c =>
      mapFilter === 'all' ? true :
        mapFilter === 'online' ? c.status === 'online' :
          mapFilter === 'offline' ? c.status === 'offline' :
            c.hotspot
    );
    const cameraIcon = (isOnline) => L.divIcon({
      className: '',
      html: `<div style="
    width:34px;height:34px;
    background:${isOnline ? '#22c55e' : '#94a3b8'};
    border:3px solid white;
    border-radius:50%;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    display:flex;align-items:center;justify-content:center;
    font-size:15px;
  ">📷</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20],
    });
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-semibold text-lg">Camera & Violation Map</h3>
            <p className="text-sm text-slate-500">Live camera locations, status, and violation hotspots</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Cameras' },
              { id: 'online', label: 'Online' },
              { id: 'offline', label: 'Offline' },
              { id: 'hotspot', label: '🔥 Hotspots' },
            ].map(f => (
              <button key={f.id} onClick={() => setMapFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${mapFilter === f.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}>{f.label}</button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* SVG Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ height: '420px', width: '100%' }}>
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ height: '420px', width: '100%', position: 'relative' }}>
  <MapContainer
    center={[10.6970, 122.5644]}
    zoom={15}
    style={{ height: '100%', width: '100%' }}
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    {filtered.map(cam => (
      <Marker
        key={cam.id}
        position={cam.coords}
        icon={cameraIcon(cam.status === 'online')}z
        eventHandlers={{ click: () => setSelectedCam(cam) }}
      >
        <Popup>{cam.id} — {cam.location}</Popup>
      </Marker>
    ))}
  </MapContainer>

  {/* Legend */}
  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 shadow text-xs space-y-1 border z-[1000]">
    <p className="font-semibold text-slate-700 mb-1">Legend</p>
    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Online Camera</div>
    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>Offline Camera</div>
    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-400/40 border border-rose-400 inline-block"></span>High Violations</div>
    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400/30 border border-amber-400 inline-block"></span>Medium Violations</div>
    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400/20 border border-emerald-400 inline-block"></span>Low Violations</div>
  </div>
</div>
</div>

          {/* Side Panel */}
          <div className="space-y-3">
            {selectedCam ? (
              <div className="bg-white rounded-2xl shadow-sm border p-4 animate-scale-in">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-800">{selectedCam.id}</h4>
                  <button onClick={() => setSelectedCam(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-400" /></button>
                </div>
                <StatusBadge status={selectedCam.status} />
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /><span className="text-slate-600">{selectedCam.location}</span></div>
                  <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-slate-400" /><span className="text-slate-600">{selectedCam.captures?.toLocaleString()} total captures</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span className="text-slate-600">Last active: {selectedCam.lastActive}</span></div>
                  <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-400" /><span className="text-slate-600">{selectedCam.violations} violations recorded</span></div>
                </div>
                <div className={`mt-3 rounded-xl p-3 text-xs font-medium ${selectedCam.hotspot ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-50 text-slate-600'}`}>
                  {selectedCam.hotspot ? '🔥 High violation hotspot area' : '✅ Normal violation rate'}
                </div>
                <button onClick={() => setActiveSection('devices')} className="w-full mt-3 py-2 text-xs border rounded-xl hover:bg-slate-50 text-violet-600 font-medium">
                  View in Devices →
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border p-4">
                <p className="text-sm text-slate-500 text-center py-4">Click a camera marker on the map to see details</p>
              </div>
            )}

            {/* Camera list */}
            <div className="bg-white rounded-2xl shadow-sm border p-4">
              <h4 className="font-semibold text-sm mb-3 text-slate-700">All Cameras</h4>
              <div className="space-y-2">
                {cameras.map(c => (
                  <button key={c.id} onClick={() => setSelectedCam(selectedCam?.id === c.id ? null : c)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition border ${selectedCam?.id === c.id ? 'border-violet-400 bg-violet-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      <span className="text-sm font-medium">{c.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-rose-500 font-semibold">{c.violations} violations</span>
                      {c.hotspot && <span className="ml-1 text-xs">🔥</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotspot summary */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl border border-rose-200 p-4">
              <h4 className="font-semibold text-sm text-rose-700 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Violation Summary</h4>
              <div className="space-y-1.5 text-xs">
                {[['Running Red Light', '35%', 'rose'], ['Over Speeding', '28%', 'orange'], ['Illegal Parking', '22%', 'amber'], ['No Helmet', '15%', 'yellow']].map(([type, pct, color]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-slate-600">{type}</span>
                    <span className={`font-bold text-${color}-600`}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── REPORT PREVIEW MODAL ──────────────────────────────────────
  const ReportPreviewModal = ({ report, period, onClose }) => {
    const [printing, setPrinting] = useState(false);
    const today = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });

    const handlePrint = () => {
      setPrinting(true);
      setTimeout(() => { setPrinting(false); setToast({ message: `${report.title} printed successfully!`, type: 'success' }); onClose(); }, 1800);
    };

    // ── VIOLATIONS REPORT content ──
    const ViolationsReportBody = () => {
      const rows = sampleViolations.slice(0, 8);
      const totalFines = rows.reduce((a, b) => a + b.fine, 0);
      const paidCount = rows.filter(v => v.status === 'paid').length;
      const unpaidCount = rows.filter(v => v.status === 'unpaid').length;
      const disputedCount = rows.filter(v => v.status === 'disputed').length;
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Violations', value: rows.length, color: 'violet' },
              { label: 'Paid', value: paidCount, color: 'emerald' },
              { label: 'Unpaid', value: unpaidCount, color: 'rose' },
              { label: 'Disputed', value: disputedCount, color: 'amber' },
            ].map(s => (
              <div key={s.label} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-3 text-center`}>
                <p className={`text-xl font-bold text-${s.color}-700`}>{s.value}</p>
                <p className={`text-xs text-${s.color}-500`}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border">
            <h4 className="font-semibold text-sm mb-3 text-slate-700">Violations by Type</h4>
            <div className="space-y-2">
              {[['Running Red Light', 35, 'rose'], ['Over Speeding', 28, 'amber'], ['Illegal Parking', 22, 'blue'], ['No Helmet', 15, 'violet']].map(([type, pct, color]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-36 shrink-0">{type}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-8">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-slate-700">Violation Records</h4>
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b">
                  <tr>{['ID', 'Type', 'Plate', 'Driver', 'Date', 'Fine', 'Status'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-slate-600">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map(v => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-mono text-slate-500">{v.id}</td>
                      <td className="px-3 py-2">{v.image} {v.type}</td>
                      <td className="px-3 py-2 font-medium">{v.plate}</td>
                      <td className="px-3 py-2">{v.driver}</td>
                      <td className="px-3 py-2 text-slate-500">{v.date}</td>
                      <td className="px-3 py-2 font-medium">₱{v.fine.toLocaleString()}</td>
                      <td className="px-3 py-2"><StatusBadge status={v.status} /></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t">
                  <tr>
                    <td colSpan="5" className="px-3 py-2 text-right font-semibold text-slate-600">Total Fines:</td>
                    <td className="px-3 py-2 font-bold text-violet-700">₱{totalFines.toLocaleString()}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      );
    };

    // ── ENFORCER PERFORMANCE content ──
    const EnforcerPerformanceBody = () => {
      const enforcers = sampleUsers.filter(u => u.role === 'enforcer');
      const topEnforcer = [...enforcers].sort((a, b) => b.apprehensions - a.apprehensions)[0];
      const totalApprehensions = enforcers.reduce((a, b) => a + (b.apprehensions || 0), 0);
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Total Enforcers', value: enforcers.length, color: 'blue' },
              { label: 'Total Apprehensions', value: totalApprehensions.toLocaleString(), color: 'violet' },
              { label: 'Avg per Enforcer', value: Math.round(totalApprehensions / enforcers.length).toLocaleString(), color: 'emerald' },
            ].map(s => (
              <div key={s.label} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-3 text-center`}>
                <p className={`text-xl font-bold text-${s.color}-700`}>{s.value}</p>
                <p className={`text-xs text-${s.color}-500`}>{s.label}</p>
              </div>
            ))}
          </div>
          {topEnforcer && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center shrink-0">
                <span className="font-bold text-amber-700 text-lg">{topEnforcer.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Top Performer</p>
                <p className="font-bold text-amber-800">{topEnforcer.name}</p>
                <p className="text-xs text-amber-600">{topEnforcer.badge} · {topEnforcer.station} · {topEnforcer.apprehensions} apprehensions</p>
              </div>
            </div>
          )}
          <div className="bg-slate-50 rounded-xl p-4 border">
            <h4 className="font-semibold text-sm mb-3 text-slate-700">Apprehensions per Enforcer</h4>
            <div className="space-y-3">
              {enforcers.map(e => {
                const pct = Math.round(((e.apprehensions || 0) / (topEnforcer?.apprehensions || 1)) * 100);
                return (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-blue-600">{e.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{e.name} <span className="text-slate-400">({e.badge})</span></span>
                        <span className="font-semibold text-blue-600">{e.apprehensions || 0}</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-slate-700">Enforcer Details</h4>
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b">
                  <tr>{['Name', 'Badge', 'Station', 'Apprehensions', 'Status'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-slate-600">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y">
                  {enforcers.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-medium">{e.name}</td>
                      <td className="px-3 py-2 font-mono text-slate-500">{e.badge}</td>
                      <td className="px-3 py-2">{e.station}</td>
                      <td className="px-3 py-2 text-center font-bold text-blue-600">{e.apprehensions || 0}</td>
                      <td className="px-3 py-2"><StatusBadge status={e.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    };

    // ── FINANCIAL SUMMARY content ──
    const FinancialSummaryBody = () => {
      const paid = sampleViolations.filter(v => v.status === 'paid');
      const unpaid = sampleViolations.filter(v => v.status === 'unpaid');
      const disputed = sampleViolations.filter(v => v.status === 'disputed');
      const totalCollected = paid.reduce((a, b) => a + (b.paidAmount || b.fine), 0);
      const totalPending = unpaid.reduce((a, b) => a + b.fine, 0);
      const totalDisputed = disputed.reduce((a, b) => a + b.fine, 0);
      const collectionRate = Math.round((paid.length / sampleViolations.length) * 100);
      const byMethod = paid.reduce((acc, v) => {
        const m = v.paymentMethod || 'Cash'; acc[m] = (acc[m] || 0) + (v.paidAmount || v.fine); return acc;
      }, {});
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Collected', value: `₱${totalCollected.toLocaleString()}`, color: 'emerald' },
              { label: 'Pending Collection', value: `₱${totalPending.toLocaleString()}`, color: 'rose' },
              { label: 'Under Dispute', value: `₱${totalDisputed.toLocaleString()}`, color: 'amber' },
              { label: 'Collection Rate', value: `${collectionRate}%`, color: 'blue' },
            ].map(s => (
              <div key={s.label} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-3 text-center`}>
                <p className={`text-lg font-bold text-${s.color}-700`}>{s.value}</p>
                <p className={`text-xs text-${s.color}-500`}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border">
            <h4 className="font-semibold text-sm mb-3 text-slate-700">Revenue Breakdown</h4>
            <div className="space-y-2">
              {[
                { label: 'Collected', amount: totalCollected, total: totalCollected + totalPending + totalDisputed, color: 'emerald' },
                { label: 'Pending', amount: totalPending, total: totalCollected + totalPending + totalDisputed, color: 'rose' },
                { label: 'Disputed', amount: totalDisputed, total: totalCollected + totalPending + totalDisputed, color: 'amber' },
              ].map(item => {
                const pct = Math.round((item.amount / item.total) * 100) || 0;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-20 shrink-0">{item.label}</span>
                    <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-${item.color}-500 rounded-full`} style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 w-28 text-right">₱{item.amount.toLocaleString()} ({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
          {Object.keys(byMethod).length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border">
              <h4 className="font-semibold text-sm mb-3 text-slate-700">Payment Methods</h4>
              <div className="space-y-2">
                {Object.entries(byMethod).map(([method, amount]) => (
                  <div key={method} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                    <span className="text-xs font-medium text-slate-700">{method}</span>
                    <span className="text-xs font-bold text-emerald-600">₱{amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-sm mb-2 text-slate-700">Paid Violations</h4>
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b">
                  <tr>{['ID', 'Type', 'Driver', 'Fine', 'Paid Date', 'Method'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-slate-600">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y">
                  {paid.map(v => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-mono text-slate-500">{v.id}</td>
                      <td className="px-3 py-2">{v.type}</td>
                      <td className="px-3 py-2 font-medium">{v.driver}</td>
                      <td className="px-3 py-2 font-bold text-emerald-600">₱{(v.paidAmount || v.fine).toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-500">{v.paidDate || '—'}</td>
                      <td className="px-3 py-2">{v.paymentMethod || 'Cash'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t">
                  <tr>
                    <td colSpan="3" className="px-3 py-2 text-right font-semibold text-slate-600">Total Collected:</td>
                    <td className="px-3 py-2 font-bold text-emerald-700">₱{totalCollected.toLocaleString()}</td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      );
    };

    const bodyMap = {
      'Violations Report': <ViolationsReportBody />,
      'Enforcer Performance': <EnforcerPerformanceBody />,

    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl animate-scale-in my-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b bg-slate-50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg flex items-center gap-1 text-sm text-slate-600 font-medium">
                <ChevronLeft className="w-4 h-4" />Back
              </button>
              <h3 className="font-bold text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-violet-600" />Report Preview</h3>
            </div>
            <button onClick={handlePrint} disabled={printing}
              className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 flex items-center gap-2">
              {printing ? <><Loader2 className="w-4 h-4 animate-spin" />Printing...</> : <><Printer className="w-4 h-4" />Print / Export</>}
            </button>
          </div>

          {/* Report Document */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Letterhead */}
            <div className="text-center border-b pb-4">
              <div className={`w-14 h-14 ${report.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <report.icon className={`w-7 h-7 ${report.color}`} />
              </div>
              <h1 className="text-xl font-bold text-slate-800">Smart Traffic Violation Monitoring System</h1>
              <p className="text-sm text-slate-500">City Traffic Management Office</p>
              <div className="mt-3 inline-block bg-violet-50 border border-violet-200 rounded-xl px-4 py-2">
                <p className="text-sm font-bold text-violet-700">{report.title}</p>
                <p className="text-xs text-violet-500">Period: {period} &nbsp;|&nbsp; Generated: {today}</p>
              </div>
            </div>

            {/* Report-specific body */}
            {bodyMap[report.title] || <p className="text-slate-500 text-sm text-center py-8">No preview available for this report type.</p>}

            {/* Footer */}
            <div className="border-t pt-4 flex items-center justify-between text-xs text-slate-400">
              <span>STVMS — Confidential Report</span>
              <span>Generated: {today}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReportsContent = () => {
    const [reportPreview, setReportPreview] = useState(null);
    const reports = [
      { title: 'Violations Report', desc: 'Summary of all violations by type, location, and time period', icon: FileWarning, color: 'text-rose-500', bg: 'bg-rose-100' },
      { title: 'Enforcer Performance', desc: 'Staff activity metrics and apprehension statistics', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-100' },
    ];
    return (
      <div className="space-y-4">
        {reportPreview && (
          <ReportPreviewModal
            report={reportPreview.report}
            period={reportPreview.period}
            onClose={() => setReportPreview(null)}
          />
        )}
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
      case 'map': return <MapContent />;
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
      {showReportModal && <ReportModal report={showReportModal} onClose={() => setShowReportModal(null)} onGenerate={(title, period) => { setShowReportModal(null); setShowReportPreview({ report: showReportModal, period }); }} />}
      {showReportPreview && <ReportPreviewModal report={showReportPreview.report} period={showReportPreview.period} onClose={() => setShowReportPreview(null)} />}
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

export default SupervisorDashboard;