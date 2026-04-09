import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Bell, LogOut, Search, Filter, Eye, Menu, X,
  FileText, DollarSign, TrendingUp, Users, Settings, BarChart3, 
  FileWarning, Gavel, Car, Download, Plus, Edit, Wifi, WifiOff,
  Activity, Printer, UserCheck, RefreshCw, AlertTriangle, Database, 
  Power, Save, RotateCcw, Loader2
} from 'lucide-react';
import { Toast, Skeleton, TableSkeleton, StatusBadge, ConfirmModal } from '../components/UIComponents';
import { ViolationDetailsModal, DisputeDetailsModal, UserDetailsModal, DeviceDetailsModal, FilterModal, ExportModal } from '../components/Modals';
import { sampleViolations, sampleDisputes, sampleUsers, sampleDevices } from '../data/sampleData';

// ─────────────────────────────────────────────────────────────
// SUPERVISOR / ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

const SupervisorDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All');
  
  // Modal states
  const [showNotif, setShowNotif] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const [showViolationDetails, setShowViolationDetails] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [showReportModal, setShowReportModal] = useState(null);
  
  // Selected items
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => { 
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t); 
  }, []);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
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

  // ─────────────────────────────────────────────────────────────
  // SIDEBAR
  // ─────────────────────────────────────────────────────────────

  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transform transition-transform z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold">STVMS Admin</h1>
            <p className="text-xs text-slate-400">Traffic Chief</p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => { setActiveSection(item.id); setSidebarOpen(false); setSearchQuery(''); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === item.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.id === 'disputes' && (
              <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                {sampleDisputes.filter(d => d.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition">
          <LogOut className="w-5 h-5" /><span>Logout</span>
        </button>
      </div>
    </aside>
  );

  // ─────────────────────────────────────────────────────────────
  // NOTIFICATION PANEL
  // ─────────────────────────────────────────────────────────────

  const NotificationPanel = ({ onClose }) => (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border w-80 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b font-bold">Notifications</div>
        {[
          { msg: 'New violation recorded', detail: 'VIO-2024-008', time: '2 mins ago', unread: true },
          { msg: 'Payment received', detail: '₱2,500 from Pedro Reyes', time: '15 mins ago', unread: true },
          { msg: 'Dispute submitted', detail: 'DIS-2024-004 awaiting review', time: '1 hour ago', unread: false },
          { msg: 'Camera CAM-003 offline', detail: 'EDSA Northbound location', time: '2 hours ago', unread: false },
        ].map((n, i) => (
          <div key={i} className={`p-4 border-b text-sm hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-violet-50/50' : ''}`}>
            <p className="font-medium">{n.msg}</p>
            <p className="text-xs text-slate-500">{n.detail}</p>
            <p className="text-xs text-slate-400 mt-1">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // REPORT MODAL
  // ─────────────────────────────────────────────────────────────

  const ReportModal = ({ report, onClose, onGenerate }) => {
    const [period, setPeriod] = useState('monthly');
    const [generating, setGenerating] = useState(false);

    const handleGenerate = () => {
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        onGenerate(report.title, period);
        onClose();
      }, 1500);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${report.bg} rounded-xl flex items-center justify-center`}>
              <report.icon className={`w-6 h-6 ${report.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold">{report.title}</h3>
              <p className="text-sm text-slate-500">Generate report</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Period</label>
              <div className="grid grid-cols-3 gap-2">
                {['daily', 'weekly', 'monthly'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setPeriod(p)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition ${period === p ? 'bg-violet-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 border rounded-xl font-medium hover:bg-slate-50 transition">Cancel</button>
            <button onClick={handleGenerate} disabled={generating} className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition flex items-center justify-center gap-2">
              {generating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Printer className="w-4 h-4" />Generate</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // DASHBOARD CONTENT
  // ─────────────────────────────────────────────────────────────

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />) : (
          <>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('violations')}>
              <div className="flex items-center justify-between mb-2">
                <FileWarning className="w-8 h-8 text-violet-500" />
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+12%</span>
              </div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-slate-500">Total Violations</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-emerald-500" />
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+8%</span>
              </div>
              <p className="text-2xl font-bold">₱2.4M</p>
              <p className="text-sm text-slate-500">Fines Collected</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('disputes')}>
              <div className="flex items-center justify-between mb-2">
                <Gavel className="w-8 h-8 text-amber-500" />
                <span className="text-xs text-amber-500 font-medium">+5 new</span>
              </div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-slate-500">Pending Disputes</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setActiveSection('devices')}>
              <div className="flex items-center justify-between mb-2">
                <Camera className="w-8 h-8 text-blue-500" />
                <span className="text-xs text-emerald-500 font-medium">3 online</span>
              </div>
              <p className="text-2xl font-bold">3/4</p>
              <p className="text-sm text-slate-500">Active Cameras</p>
            </div>
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></>) : (
          <>
            {/* Violations by Type */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Violations by Type</h3>
              <div className="space-y-3">
                {[
                  { type: 'Running Red Light', percent: 35, color: 'from-rose-500 to-pink-500' },
                  { type: 'Over Speeding', percent: 28, color: 'from-amber-500 to-orange-500' },
                  { type: 'Illegal Parking', percent: 22, color: 'from-blue-500 to-cyan-500' },
                  { type: 'No Helmet', percent: 15, color: 'from-violet-500 to-purple-500' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.type}</span>
                        <span className="text-slate-500">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New violation recorded', detail: 'VIO-2024-008 - Running Red Light', time: '2 mins ago', icon: FileWarning, color: 'text-rose-500 bg-rose-100', section: 'violations' },
                  { action: 'Payment received', detail: '₱2,500 from Pedro Reyes', time: '15 mins ago', icon: DollarSign, color: 'text-emerald-500 bg-emerald-100', section: null },
                  { action: 'Dispute submitted', detail: 'DIS-2024-004 awaiting review', time: '1 hour ago', icon: Gavel, color: 'text-amber-500 bg-amber-100', section: 'disputes' },
                  { action: 'Camera CAM-003 offline', detail: 'EDSA Northbound location', time: '2 hours ago', icon: Camera, color: 'text-slate-500 bg-slate-100', section: 'devices' }
                ].map((item, i) => (
                  <div key={i} onClick={() => item.section && setActiveSection(item.section)} className="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                    </div>
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

  // ─────────────────────────────────────────────────────────────
  // VIOLATIONS CONTENT
  // ─────────────────────────────────────────────────────────────

  const ViolationsContent = () => (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search by ID, plate, driver, type..." 
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" 
          />
        </div>
        <button onClick={() => setShowFilter(true)} className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition">
          <Filter className="w-4 h-4" />Filter
        </button>
        <button onClick={() => setShowExport(true)} className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-slate-50 transition">
          <Download className="w-4 h-4" />Export
        </button>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border p-6"><TableSkeleton rows={5} /></div>
      ) : (
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
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-2">{v.image} {v.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{v.plate}</td>
                    <td className="px-4 py-3 text-sm">{v.driver}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{v.date}</td>
                    <td className="px-4 py-3 text-sm font-medium">₱{v.fine.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setSelectedViolation(v); setShowViolationDetails(true); }} className="text-violet-600 hover:underline text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredViolations.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">No violations found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // DISPUTES CONTENT
  // ─────────────────────────────────────────────────────────────

  const DisputesContent = () => (
    <div className="space-y-4">
      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {sampleDisputes.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{d.id}</p>
                  <p className="text-sm text-slate-500">{d.driver}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{d.reason}</p>
              <p className="text-xs text-slate-400 mb-3">For: {d.violationId}</p>
              <button onClick={() => { setSelectedDispute(d); setShowDisputeDetails(true); }} className="w-full py-2 text-sm border rounded-lg hover:bg-slate-50 transition">
                View Details
              </button>
              {d.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setShowConfirm({ 
                      title: 'Approve Dispute', 
                      message: `Approve ${d.id} and dismiss the related violation?`, 
                      onConfirm: () => { setShowConfirm(null); showToast('Dispute approved! Violation dismissed.', 'success'); } 
                    })}
                    className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => setShowConfirm({ 
                      title: 'Reject Dispute', 
                      message: `Reject ${d.id}? The driver will be notified.`, 
                      confirmText: 'Reject', 
                      confirmColor: 'bg-rose-500 hover:bg-rose-600', 
                      onConfirm: () => { setShowConfirm(null); showToast('Dispute rejected. Driver notified.', 'warning'); } 
                    })}
                    className="flex-1 py-2 text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // USERS CONTENT
  // ─────────────────────────────────────────────────────────────

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
            {activeUserTab === 'enforcers' && (
              <button onClick={() => setShowAddEnforcer(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />Add Enforcer
              </button>
            )}
          </div>
        </div>

        {/* Info Banner for Drivers */}
        {activeUserTab === 'drivers' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">Driver records synced from LTO Database</p>
              <p className="text-xs text-blue-600">Manual driver registration is disabled. All records are automatically imported.</p>
            </div>
          </div>
        )}

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
                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-violet-600">{u.name.charAt(0)}</span>
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

  // ─────────────────────────────────────────────────────────────
  // DEVICES CONTENT
  // ─────────────────────────────────────────────────────────────

  const DevicesContent = () => {
    const [showAddCamera, setShowAddCamera] = useState(false);
    const [addingCamera, setAddingCamera] = useState(false);
    const [newCamera, setNewCamera] = useState({
      id: '', location: '', ipAddress: '', type: 'speed',
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
              <input type="text" placeholder="CAM-XXX" value={newCamera.id} onChange={(e) => setNewCamera({ ...newCamera, id: e.target.value.toUpperCase() })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <p className="text-xs text-slate-400 mt-1">Format: CAM-001, CAM-002, etc.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Location / Intersection *</label>
              <input type="text" placeholder="e.g., Rizal Ave & Main St" value={newCamera.location} onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">IP Address *</label>
              <input type="text" placeholder="192.168.1.XXX" value={newCamera.ipAddress} onChange={(e) => setNewCamera({ ...newCamera, ipAddress: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Camera Type *</label>
              <select value={newCamera.type} onChange={(e) => setNewCamera({ ...newCamera, type: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="speed">Speed Detection</option>
                <option value="redlight">Red Light Detection</option>
                <option value="multi">Multi-Purpose (Speed + Red Light)</option>
                <option value="lpr">License Plate Recognition (LPR)</option>
                <option value="surveillance">General Surveillance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Installation Date</label>
              <input type="date" value={newCamera.installDate} onChange={(e) => setNewCamera({ ...newCamera, installDate: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500" />
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
                  showToast('Please fill in all required fields', 'warning');
                  return;
                }
                setAddingCamera(true);
                setTimeout(() => {
                  setAddingCamera(false);
                  setShowAddCamera(false);
                  setNewCamera({ id: '', location: '', ipAddress: '', type: 'speed', installDate: new Date().toISOString().split('T')[0] });
                  showToast(`Camera ${newCamera.id} added successfully! Awaiting network connection.`, 'success');
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
            <button onClick={() => showToast('Refreshing device status...', 'info')} className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition flex items-center gap-2">
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
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center"><Camera className="w-5 h-5 text-violet-600" /></div>
              <div><p className="text-2xl font-bold">{sampleDevices.length}</p><p className="text-xs text-slate-500">Total Cameras</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center"><Wifi className="w-5 h-5 text-emerald-600" /></div>
              <div><p className="text-2xl font-bold text-emerald-600">{sampleDevices.filter(d => d.status === 'online').length}</p><p className="text-xs text-slate-500">Online</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center"><WifiOff className="w-5 h-5 text-rose-600" /></div>
              <div><p className="text-2xl font-bold text-rose-600">{sampleDevices.filter(d => d.status === 'offline').length}</p><p className="text-xs text-slate-500">Offline</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Activity className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-blue-600">{sampleDevices.reduce((acc, d) => acc + (d.captures || 0), 0).toLocaleString()}</p><p className="text-xs text-slate-500">Total Captures</p></div>
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
              <div key={d.id} onClick={() => { setSelectedDevice(d); setShowDeviceDetails(true); }} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md cursor-pointer transition group">
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
            <div onClick={() => setShowAddCamera(true)} className="bg-slate-50 rounded-xl p-4 border-2 border-dashed border-slate-300 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition flex flex-col items-center justify-center min-h-[180px] group">
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

  // ─────────────────────────────────────────────────────────────
  // REPORTS CONTENT
  // ─────────────────────────────────────────────────────────────

  const ReportsContent = () => {
    const reports = [
      { title: 'Violations Report', desc: 'Summary of all violations by type, location, and time period', icon: FileWarning, color: 'text-rose-500', bg: 'bg-rose-100' },
      { title: 'Revenue Report', desc: 'Collection statistics and payment analysis', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100' },
      { title: 'Enforcer Performance', desc: 'Staff activity metrics and apprehension statistics', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-100' },
    ];
    return (
      <div className="space-y-4">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div key={report.title} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition cursor-pointer" onClick={() => setShowReportModal(report)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.bg} mb-3`}>
                  <report.icon className={`w-5 h-5 ${report.color}`} />
                </div>
                <h3 className="font-bold mb-1">{report.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{report.desc}</p>
                <button className="text-violet-600 text-sm flex items-center gap-1 hover:underline">
                  <Printer className="w-4 h-4" />Generate Report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // SETTINGS CONTENT
  // ─────────────────────────────────────────────────────────────

  const SettingsContent = () => {
    const [saving, setSaving] = useState(false);
    const [selectedCamera, setSelectedCameraForSettings] = useState(null);
    const [cameraSettings, setCameraSettings] = useState({});

    useEffect(() => {
      const initialSettings = {};
      sampleDevices.forEach(device => {
        initialSettings[device.id] = { speedLimit: 60, redLightGrace: 2, confidenceScore: 85, enabled: device.status === 'online' };
      });
      setCameraSettings(initialSettings);
    }, []);

    const handleSave = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        showToast(selectedCamera ? `Settings saved for ${selectedCamera}!` : 'Global settings saved!', 'success');
      }, 1500);
    };

    const handleCameraSettingChange = (cameraId, field, value) => {
      setCameraSettings(prev => ({ ...prev, [cameraId]: { ...prev[cameraId], [field]: value } }));
    };

    return (
      <div className="space-y-6">
        {loading ? (<><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-48 rounded-xl" /></>) : (
          <>
            {/* Camera Detection Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Camera className="w-5 h-5 text-violet-600" />Camera Detection Settings</h3>
              <p className="text-sm text-slate-500 mb-4">Select a camera to configure its detection parameters, or configure global defaults.</p>

              {/* Camera Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button onClick={() => setSelectedCameraForSettings(null)} className={`p-4 rounded-xl border-2 transition text-left ${selectedCamera === null ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-violet-600" />
                    <span className="font-semibold text-sm">Global Default</span>
                  </div>
                  <p className="text-xs text-slate-500">Apply to all cameras</p>
                </button>

                {sampleDevices.map((device) => (
                  <button key={device.id} onClick={() => setSelectedCameraForSettings(device.id)} className={`p-4 rounded-xl border-2 transition text-left ${selectedCamera === device.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
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
                  {selectedCamera && <StatusBadge status={sampleDevices.find(d => d.id === selectedCamera)?.status} />}
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Speed Limit (km/h)</label>
                      <input type="number" value={selectedCamera ? cameraSettings[selectedCamera]?.speedLimit || 60 : 60}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'speedLimit', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Red Light Grace (sec)</label>
                      <input type="number" value={selectedCamera ? cameraSettings[selectedCamera]?.redLightGrace || 2 : 2}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'redLightGrace', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Confidence Score (%)</label>
                      <input type="number" value={selectedCamera ? cameraSettings[selectedCamera]?.confidenceScore || 85 : 85}
                        onChange={(e) => selectedCamera && handleCameraSettingChange(selectedCamera, 'confidenceScore', parseInt(e.target.value))}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white" />
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
                      <button onClick={() => handleCameraSettingChange(selectedCamera, 'enabled', !cameraSettings[selectedCamera]?.enabled)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${cameraSettings[selectedCamera]?.enabled ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {cameraSettings[selectedCamera]?.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition flex items-center gap-2">
                      {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Settings</>}
                    </button>
                    {selectedCamera && (
                      <button onClick={() => {
                        handleCameraSettingChange(selectedCamera, 'speedLimit', 60);
                        handleCameraSettingChange(selectedCamera, 'redLightGrace', 2);
                        handleCameraSettingChange(selectedCamera, 'confidenceScore', 85);
                        showToast('Reset to default values', 'info');
                      }} className="px-6 py-2.5 border rounded-xl hover:bg-white transition flex items-center gap-2">
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
                <button onClick={() => showToast('Database sync triggered!', 'info')} className="ml-auto text-xs text-emerald-700 border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />Sync Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER CONTENT
  // ─────────────────────────────────────────────────────────────

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

  // ─────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showConfirm && <ConfirmModal {...showConfirm} onCancel={() => setShowConfirm(null)} />}
      {showFilter && <FilterModal onClose={() => setShowFilter(false)} onApply={(f) => showToast('Filters applied!', 'info')} />}
      {showExport && <ExportModal onClose={() => setShowExport(false)} onExport={(fmt) => showToast(`Exported as ${fmt.toUpperCase()} successfully!`, 'success')} />}
      {showReportModal && <ReportModal report={showReportModal} onClose={() => setShowReportModal(null)} onGenerate={(title, period) => showToast(`${title} for ${period} generated!`, 'success')} />}
      {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
      
      {showViolationDetails && selectedViolation && (
        <ViolationDetailsModal violation={selectedViolation} userType="supervisor" onClose={() => setShowViolationDetails(false)}
          onApprove={() => { setShowViolationDetails(false); showToast('Violation approved!', 'success'); }}
          onReject={() => { setShowViolationDetails(false); showToast('Violation rejected.', 'warning'); }} />
      )}
      {showDisputeDetails && selectedDispute && (
        <DisputeDetailsModal dispute={selectedDispute} userType="supervisor" onClose={() => setShowDisputeDetails(false)}
          onApprove={() => { setShowDisputeDetails(false); showToast('Dispute approved!', 'success'); }}
          onReject={() => { setShowDisputeDetails(false); showToast('Dispute rejected.', 'warning'); }} />
      )}
      {showUserDetails && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setShowUserDetails(false)}
          onSuspend={(u) => { setShowUserDetails(false); setShowConfirm({ title: 'Suspend Account', message: `Suspend ${u.name}'s account? They will lose access to the portal.`, confirmText: 'Suspend', confirmColor: 'bg-rose-500 hover:bg-rose-600', onConfirm: () => { setShowConfirm(null); showToast(`${u.name}'s account suspended.`, 'warning'); } }); }}
          onActivate={(u) => { setShowUserDetails(false); setShowConfirm({ title: 'Reactivate Account', message: `Reactivate ${u.name}'s account?`, confirmText: 'Reactivate', onConfirm: () => { setShowConfirm(null); showToast(`${u.name}'s account reactivated.`, 'success'); } }); }} />
      )}
      {showDeviceDetails && selectedDevice && (
        <DeviceDetailsModal device={selectedDevice} onClose={() => setShowDeviceDetails(false)}
          onDiagnostic={(d) => showToast(`${d.id} diagnostic complete — all systems normal.`, 'info')}
          onRestart={(d) => showToast(`${d.id} restarted successfully!`, 'success')} />
      )}
      
      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      
      <div className="lg:pl-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition">
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-lg capitalize">{activeSection}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-violet-600">TC</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">{renderContent()}</main>
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

export default SupervisorDashboard;
