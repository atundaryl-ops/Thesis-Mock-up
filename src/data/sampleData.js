// ─────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────

export const sampleViolations = [
  { id: 'VIO-2024-001', plate: 'ABC 1234', type: 'Running Red Light', location: 'Intersection of Rizal Ave & Main St', date: '2024-03-15', time: '14:32', fine: 1500, status: 'unpaid', image: '🚦', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'CAM-001', evidence: ['snapshot1.jpg', 'snapshot2.jpg'] },
  { id: 'VIO-2024-002', plate: 'ABC 1234', type: 'Illegal Parking', location: 'No Parking Zone - City Hall', date: '2024-03-10', time: '09:15', fine: 500, status: 'paid', image: '🅿️', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'ENF-001', evidence: ['photo1.jpg'], paidDate: '2024-03-11', paidAmount: 500, paymentMethod: 'GCash' },
  { id: 'VIO-2024-003', plate: 'ABC 1234', type: 'Over Speeding', location: 'Highway 54 - 80km/h zone (Recorded: 112km/h)', date: '2024-03-05', time: '22:45', fine: 2000, status: 'disputed', image: '⚡', driver: 'Juan Dela Cruz', driverId: 'DRV-001', email: 'juan@email.com', phone: '09171234567', license: 'N01-12-345678', vehicleBrand: 'Toyota', vehicleModel: 'Vios', vehicleColor: 'White', capturedBy: 'CAM-002', evidence: ['speed_capture.jpg'], disputeId: 'DIS-2024-001' },
  { id: 'VIO-2024-004', plate: 'XYZ 5678', type: 'No Helmet', location: 'Quezon Blvd', date: '2024-03-14', time: '11:20', fine: 1000, status: 'unpaid', image: '⛑️', driver: 'Maria Santos', driverId: 'DRV-002', email: 'maria@email.com', phone: '09181234567', license: 'N02-12-345678', vehicleBrand: 'Honda', vehicleModel: 'Click 125i', vehicleColor: 'Red', capturedBy: 'ENF-002', evidence: ['apprehension1.jpg'] },
  { id: 'VIO-2024-005', plate: 'DEF 9012', type: 'Counterflow', location: 'EDSA Northbound', date: '2024-03-13', time: '08:30', fine: 2500, status: 'pending', image: '↩️', driver: 'Pedro Reyes', driverId: 'DRV-003', email: 'pedro@email.com', phone: '09191234567', license: 'N03-12-345678', vehicleBrand: 'Mitsubishi', vehicleModel: 'Montero', vehicleColor: 'Black', capturedBy: 'CAM-003', evidence: ['counterflow1.jpg', 'counterflow2.jpg'] },
  { id: 'VIO-2024-006', plate: 'GHI 3456', type: 'Beating Red Light', location: 'Shaw Blvd & Ortigas Ave', date: '2024-03-12', time: '17:45', fine: 1500, status: 'unpaid', image: '🚦', driver: 'Ana Garcia', driverId: 'DRV-004', email: 'ana@email.com', phone: '09201234567', license: 'N04-12-345678', vehicleBrand: 'Ford', vehicleModel: 'EcoSport', vehicleColor: 'Blue', capturedBy: 'CAM-001', evidence: ['redlight1.jpg'] },
  { id: 'VIO-2024-007', plate: 'JKL 7890', type: 'Illegal U-Turn', location: 'Commonwealth Ave', date: '2024-03-11', time: '13:20', fine: 1000, status: 'paid', image: '🔄', driver: 'Roberto Cruz', driverId: 'DRV-005', email: 'roberto@email.com', phone: '09211234567', license: 'N05-12-345678', vehicleBrand: 'Hyundai', vehicleModel: 'Accent', vehicleColor: 'Silver', capturedBy: 'ENF-001', evidence: ['uturn1.jpg'], paidDate: '2024-03-12', paidAmount: 1000, paymentMethod: 'Credit Card' },
];

export const sampleDisputes = [
  { id: 'DIS-2024-001', violationId: 'VIO-2024-003', driver: 'Juan Dela Cruz', driverId: 'DRV-001', reason: 'Speed camera malfunction - was traveling at legal speed. Dashcam footage shows speedometer at 78km/h.', status: 'pending', date: '2024-03-06', attachment: 'dashcam_footage.mp4', phone: '09171234567', email: 'juan@email.com' },
  { id: 'DIS-2024-002', violationId: 'VIO-2024-001', driver: 'Maria Santos', driverId: 'DRV-002', reason: 'Traffic light was not functioning properly at the time. Several witnesses can confirm.', status: 'approved', date: '2024-03-12', attachment: 'witness_statement.pdf', phone: '09181234567', email: 'maria@email.com', reviewedBy: 'Supervisor Admin', reviewDate: '2024-03-14', reviewNotes: 'Verified with traffic management - signal malfunction confirmed.' },
  { id: 'DIS-2024-003', violationId: 'VIO-2024-004', driver: 'Pedro Reyes', driverId: 'DRV-003', reason: 'Vehicle was reported stolen at the time of violation. Police report attached.', status: 'rejected', date: '2024-03-08', attachment: 'police_report.pdf', phone: '09191234567', email: 'pedro@email.com', reviewedBy: 'Supervisor Admin', reviewDate: '2024-03-10', reviewNotes: 'Police report dated after violation date. Claim not substantiated.' },
];

export const sampleUsers = [
  { id: 1, odId: 'DRV-001', name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '09171234567', role: 'driver', vehicles: 2, violations: 3, status: 'active', license: 'N01-12-345678', address: '123 Rizal St, Manila' },
  { id: 2, odId: 'DRV-002', name: 'Maria Santos', email: 'maria@email.com', phone: '09181234567', role: 'driver', vehicles: 1, violations: 1, status: 'active', license: 'N02-12-345678', address: '456 Mabini Ave, Quezon City' },
  { id: 3, odId: 'DRV-003', name: 'Pedro Reyes', email: 'pedro@email.com', phone: '09191234567', role: 'driver', vehicles: 3, violations: 2, status: 'suspended', license: 'N03-12-345678', address: '789 Bonifacio Blvd, Makati' },
  { id: 4, odId: 'ENF-001', name: 'Officer Garcia', email: 'garcia@lto.gov.ph', phone: '09221234567', role: 'enforcer', badge: 'ENF-001', status: 'active', station: 'District 1', apprehensions: 156 },
  { id: 5, odId: 'ENF-002', name: 'Officer Lopez', email: 'lopez@lto.gov.ph', phone: '09231234567', role: 'enforcer', badge: 'ENF-002', status: 'active', station: 'District 2', apprehensions: 203 },
];

export const sampleDevices = [
  { id: 'CAM-001', location: 'Rizal Ave & Main St', status: 'online', captures: 1245, lastActive: '2 mins ago', ipAddress: '192.168.1.101', installDate: '2023-06-15' },
  { id: 'CAM-002', location: 'Highway 54 KM 12', status: 'online', captures: 892, lastActive: '1 min ago', ipAddress: '192.168.1.102', installDate: '2023-07-20' },
  { id: 'CAM-003', location: 'EDSA Northbound', status: 'offline', captures: 2341, lastActive: '2 hours ago', ipAddress: '192.168.1.103', installDate: '2023-05-10' },
  { id: 'CAM-004', location: 'Quezon Blvd Junction', status: 'online', captures: 567, lastActive: '30 secs ago', ipAddress: '192.168.1.104', installDate: '2023-08-01' },
];

export const sampleDrivers = [
  { id: 'DRV-001', name: 'Juan Dela Cruz', plate: 'ABC 1234', license: 'N01-12-345678', violations: 3, unpaidFines: 3500, status: 'active' },
  { id: 'DRV-002', name: 'Maria Santos', plate: 'XYZ 5678', license: 'N02-12-345678', violations: 1, unpaidFines: 1000, status: 'active' },
  { id: 'DRV-003', name: 'Pedro Reyes', plate: 'DEF 9012', license: 'N03-12-345678', violations: 2, unpaidFines: 2500, status: 'suspended' },
  { id: 'DRV-004', name: 'Ana Garcia', plate: 'GHI 3456', license: 'N04-12-345678', violations: 1, unpaidFines: 1500, status: 'active' },
  { id: 'DRV-005', name: 'Roberto Cruz', plate: 'JKL 7890', license: 'N05-12-345678', violations: 1, unpaidFines: 0, status: 'active' },
];
