import { AppState, User, Customer, Vehicle, Service, Booking, Payment, InventoryItem, InventoryTransaction, Membership, Expense, Notification, AuditLog } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'driveshine_state';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
const lastMonth = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
const nextYear = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];

function generateSeedData(): AppState {
  const adminId = uuidv4();
  const staff1Id = uuidv4();
  const staff2Id = uuidv4();

  const users: User[] = [
    { id: adminId, name: 'Admin User', email: 'admin@driveshine.com', phone: '+233 20 1234567', role: 'admin', password: 'admin123', createdAt: lastMonth },
    { id: staff1Id, name: 'Kwame Asante', email: 'kwame@driveshine.com', phone: '+233 20 2345678', role: 'staff', password: 'staff123', createdAt: lastMonth },
    { id: staff2Id, name: 'Ama Serwaa', email: 'ama@driveshine.com', phone: '+233 20 3456789', role: 'manager', password: 'manager123', createdAt: lastMonth },
  ];

  const customerIds = Array.from({ length: 12 }, () => uuidv4());
  const customers: Customer[] = [
    { id: customerIds[0], name: 'John Mensah', phone: '+233 24 1111111', email: 'john.mensah@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[1], name: 'Michael Adams', phone: '+233 24 2222222', email: 'm.adams@email.com', location: 'Tema', status: 'active', createdAt: lastMonth },
    { id: customerIds[2], name: 'Sarah Owusu', phone: '+233 24 3333333', email: 'sarah.o@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[3], name: 'Daniel Boateng', phone: '+233 24 4444444', email: 'd.boateng@email.com', location: 'Tema', status: 'active', createdAt: lastMonth },
    { id: customerIds[4], name: 'Grace Appiah', phone: '+233 24 5555555', email: 'grace.a@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[5], name: 'Emmanuel Tetteh', phone: '+233 24 6666666', email: 'e.tetteh@email.com', location: 'Tema', status: 'inactive', createdAt: lastMonth },
    { id: customerIds[6], name: 'Abena Pokua', phone: '+233 24 7777777', email: 'abena.p@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[7], name: 'Kofi Annan Jr', phone: '+233 24 8888888', email: 'kofi.annan@email.com', location: 'Tema', status: 'active', createdAt: lastMonth },
    { id: customerIds[8], name: 'Felicia Nkrumah', phone: '+233 24 9999999', email: 'felicia.n@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[9], name: 'Patrick Osei', phone: '+233 24 0000000', email: 'p.osei@email.com', location: 'Tema', status: 'active', createdAt: lastMonth },
    { id: customerIds[10], name: 'Linda Asiedu', phone: '+233 24 1212121', email: 'linda.a@email.com', location: 'Accra', status: 'active', createdAt: lastMonth },
    { id: customerIds[11], name: 'Robert Darko', phone: '+233 24 3434343', email: 'r.darko@email.com', location: 'Tema', status: 'inactive', createdAt: lastMonth },
  ];

  const vehicleIds = Array.from({ length: 12 }, () => uuidv4());
  const vehicles: Vehicle[] = [
    { id: vehicleIds[0], customerId: customerIds[0], make: 'Toyota', model: 'Camry', year: 2022, color: 'Silver', plateNumber: 'GT 1234-22', type: 'sedan', notes: '' },
    { id: vehicleIds[1], customerId: customerIds[1], make: 'Honda', model: 'Civic', year: 2021, color: 'Black', plateNumber: 'GT 5678-21', type: 'sedan', notes: '' },
    { id: vehicleIds[2], customerId: customerIds[2], make: 'Mercedes', model: 'C300', year: 2023, color: 'White', plateNumber: 'GT 9012-23', type: 'sedan', notes: 'Premium customer' },
    { id: vehicleIds[3], customerId: customerIds[3], make: 'BMW', model: 'X5', year: 2022, color: 'Blue', plateNumber: 'GT 3456-22', type: 'suv', notes: '' },
    { id: vehicleIds[4], customerId: customerIds[4], make: 'Hyundai', model: 'Tucson', year: 2023, color: 'Red', plateNumber: 'GT 7890-23', type: 'suv', notes: '' },
    { id: vehicleIds[5], customerId: customerIds[5], make: 'Ford', model: 'Ranger', year: 2021, color: 'White', plateNumber: 'GT 2345-21', type: 'truck', notes: '' },
    { id: vehicleIds[6], customerId: customerIds[6], make: 'Kia', model: 'Sportage', year: 2022, color: 'Grey', plateNumber: 'GT 6789-22', type: 'suv', notes: '' },
    { id: vehicleIds[7], customerId: customerIds[7], make: 'Lexus', model: 'RX350', year: 2023, color: 'Black', plateNumber: 'GT 0123-23', type: 'suv', notes: 'VIP' },
    { id: vehicleIds[8], customerId: customerIds[8], make: 'Volkswagen', model: 'Golf', year: 2021, color: 'Blue', plateNumber: 'GT 4567-21', type: 'hatchback', notes: '' },
    { id: vehicleIds[9], customerId: customerIds[9], make: 'Nissan', model: 'Patrol', year: 2022, color: 'White', plateNumber: 'GT 8901-22', type: 'suv', notes: '' },
    { id: vehicleIds[10], customerId: customerIds[10], make: 'Mazda', model: 'CX-5', year: 2023, color: 'Red', plateNumber: 'GT 1122-23', type: 'suv', notes: '' },
    { id: vehicleIds[11], customerId: customerIds[11], make: 'Chevrolet', model: 'Malibu', year: 2020, color: 'Silver', plateNumber: 'GT 3344-20', type: 'sedan', notes: '' },
  ];

  const serviceIds = Array.from({ length: 8 }, () => uuidv4());
  const services: Service[] = [
    { id: serviceIds[0], name: 'Basic Wash', description: 'Exterior wash and dry', price: 50, duration: 30, category: 'Wash', active: true },
    { id: serviceIds[1], name: 'Premium Wash', description: 'Exterior wash, dry, and tire shine', price: 80, duration: 45, category: 'Wash', active: true },
    { id: serviceIds[2], name: 'Interior Cleaning', description: 'Full interior vacuum and wipe down', price: 100, duration: 60, category: 'Interior', active: true },
    { id: serviceIds[3], name: 'Exterior Detailing', description: 'Clay bar, polish, and wax', price: 200, duration: 120, category: 'Detailing', active: true },
    { id: serviceIds[4], name: 'Full Detailing', description: 'Complete interior and exterior detail', price: 350, duration: 180, category: 'Detailing', active: true },
    { id: serviceIds[5], name: 'Waxing', description: 'Premium carnauba wax application', price: 150, duration: 90, category: 'Protection', active: true },
    { id: serviceIds[6], name: 'Ceramic Coating', description: 'Professional ceramic coating', price: 800, duration: 480, category: 'Protection', active: true },
    { id: serviceIds[7], name: 'Engine Bay Cleaning', description: 'Deep clean engine compartment', price: 120, duration: 60, category: 'Interior', active: true },
  ];

  const bookingIds = Array.from({ length: 15 }, () => uuidv4());
  const bookings: Booking[] = [
    { id: bookingIds[0], customerId: customerIds[0], vehicleId: vehicleIds[0], serviceId: serviceIds[0], date: today, startTime: '09:00', endTime: '09:30', staffId: staff1Id, price: 50, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: today },
    { id: bookingIds[1], customerId: customerIds[1], vehicleId: vehicleIds[1], serviceId: serviceIds[2], date: today, startTime: '10:30', endTime: '11:30', staffId: staff1Id, price: 100, paymentStatus: 'pending', status: 'confirmed', notes: 'Customer prefers eco products', createdAt: today },
    { id: bookingIds[2], customerId: customerIds[2], vehicleId: vehicleIds[2], serviceId: serviceIds[4], date: today, startTime: '13:00', endTime: '16:00', staffId: staff2Id, price: 350, paymentStatus: 'pending', status: 'pending', notes: 'VIP customer', createdAt: today },
    { id: bookingIds[3], customerId: customerIds[3], vehicleId: vehicleIds[3], serviceId: serviceIds[1], date: yesterday, startTime: '08:00', endTime: '08:45', staffId: staff1Id, price: 80, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: yesterday },
    { id: bookingIds[4], customerId: customerIds[4], vehicleId: vehicleIds[4], serviceId: serviceIds[5], date: yesterday, startTime: '11:00', endTime: '12:30', staffId: staff2Id, price: 150, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: yesterday },
    { id: bookingIds[5], customerId: customerIds[5], vehicleId: vehicleIds[5], serviceId: serviceIds[0], date: lastWeek, startTime: '09:00', endTime: '09:30', staffId: staff1Id, price: 50, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: lastWeek },
    { id: bookingIds[6], customerId: customerIds[6], vehicleId: vehicleIds[6], serviceId: serviceIds[3], date: lastWeek, startTime: '14:00', endTime: '16:00', staffId: staff2Id, price: 200, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: lastWeek },
    { id: bookingIds[7], customerId: customerIds[7], vehicleId: vehicleIds[7], serviceId: serviceIds[6], date: today, startTime: '08:00', endTime: '16:00', staffId: staff1Id, price: 800, paymentStatus: 'pending', status: 'in_progress', notes: 'Ceramic coating - multi day', createdAt: today },
    { id: bookingIds[8], customerId: customerIds[8], vehicleId: vehicleIds[8], serviceId: serviceIds[2], date: today, startTime: '15:00', endTime: '16:00', staffId: staff2Id, price: 100, paymentStatus: 'pending', status: 'pending', notes: '', createdAt: today },
    { id: bookingIds[9], customerId: customerIds[9], vehicleId: vehicleIds[9], serviceId: serviceIds[1], date: yesterday, startTime: '10:00', endTime: '10:45', staffId: staff1Id, price: 80, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: yesterday },
    { id: bookingIds[10], customerId: customerIds[10], vehicleId: vehicleIds[10], serviceId: serviceIds[4], date: today, startTime: '11:00', endTime: '14:00', staffId: staff1Id, price: 350, paymentStatus: 'pending', status: 'confirmed', notes: '', createdAt: today },
    { id: bookingIds[11], customerId: customerIds[0], vehicleId: vehicleIds[0], serviceId: serviceIds[0], date: new Date(Date.now() + 86400000).toISOString().split('T')[0], startTime: '09:00', endTime: '09:30', staffId: staff1Id, price: 50, paymentStatus: 'pending', status: 'confirmed', notes: 'Regular customer', createdAt: today },
    { id: bookingIds[12], customerId: customerIds[3], vehicleId: vehicleIds[3], serviceId: serviceIds[7], date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], startTime: '10:00', endTime: '11:00', staffId: staff2Id, price: 120, paymentStatus: 'pending', status: 'pending', notes: '', createdAt: today },
    { id: bookingIds[13], customerId: customerIds[4], vehicleId: vehicleIds[4], serviceId: serviceIds[0], date: lastWeek, startTime: '14:00', endTime: '14:30', staffId: staff1Id, price: 50, paymentStatus: 'failed', status: 'cancelled', notes: 'Customer cancelled', createdAt: lastWeek },
    { id: bookingIds[14], customerId: customerIds[1], vehicleId: vehicleIds[1], serviceId: serviceIds[3], date: yesterday, startTime: '15:00', endTime: '17:00', staffId: staff2Id, price: 200, paymentStatus: 'paid', status: 'completed', notes: '', createdAt: yesterday },
  ];

  const paymentIds = Array.from({ length: 10 }, () => uuidv4());
  const payments: Payment[] = [
    { id: paymentIds[0], bookingId: bookingIds[0], amount: 50, method: 'cash', date: today, status: 'paid', createdAt: today },
    { id: paymentIds[1], bookingId: bookingIds[3], amount: 80, method: 'mobile_money', date: yesterday, status: 'paid', createdAt: yesterday },
    { id: paymentIds[2], bookingId: bookingIds[4], amount: 150, method: 'card', date: yesterday, status: 'paid', createdAt: yesterday },
    { id: paymentIds[3], bookingId: bookingIds[5], amount: 50, method: 'cash', date: lastWeek, status: 'paid', createdAt: lastWeek },
    { id: paymentIds[4], bookingId: bookingIds[6], amount: 200, method: 'bank_transfer', date: lastWeek, status: 'paid', createdAt: lastWeek },
    { id: paymentIds[5], bookingId: bookingIds[9], amount: 80, method: 'mobile_money', date: yesterday, status: 'paid', createdAt: yesterday },
    { id: paymentIds[6], bookingId: bookingIds[14], amount: 200, method: 'cash', date: yesterday, status: 'paid', createdAt: yesterday },
    { id: paymentIds[7], bookingId: bookingIds[1], amount: 100, method: 'cash', date: today, status: 'pending', createdAt: today },
    { id: paymentIds[8], bookingId: bookingIds[2], amount: 350, method: 'card', date: today, status: 'pending', createdAt: today },
    { id: paymentIds[9], bookingId: bookingIds[13], amount: 50, method: 'mobile_money', date: lastWeek, status: 'refunded', createdAt: lastWeek },
  ];

  const inventoryItems: InventoryItem[] = [
    { id: uuidv4(), name: 'Microfiber Towels', category: 'Cleaning Supplies', quantity: 45, unit: 'pieces', minStock: 20, costPerUnit: 5, supplier: 'AutoSupply Co', lastUpdated: today },
    { id: uuidv4(), name: 'Car Shampoo', category: 'Cleaning Supplies', quantity: 12, unit: 'liters', minStock: 5, costPerUnit: 15, supplier: 'ChemClean Ltd', lastUpdated: today },
    { id: uuidv4(), name: 'Wax Compound', category: 'Protection', quantity: 8, unit: 'containers', minStock: 3, costPerUnit: 45, supplier: 'AutoSupply Co', lastUpdated: today },
    { id: uuidv4(), name: 'Ceramic Coating Kit', category: 'Protection', quantity: 3, unit: 'kits', minStock: 2, costPerUnit: 250, supplier: 'ProCoat International', lastUpdated: today },
    { id: uuidv4(), name: 'Tire Shine', category: 'Cleaning Supplies', quantity: 6, unit: 'bottles', minStock: 4, costPerUnit: 20, supplier: 'ChemClean Ltd', lastUpdated: today },
    { id: uuidv4(), name: 'Glass Cleaner', category: 'Cleaning Supplies', quantity: 15, unit: 'bottles', minStock: 5, costPerUnit: 8, supplier: 'ChemClean Ltd', lastUpdated: today },
    { id: uuidv4(), name: 'Leather Conditioner', category: 'Interior', quantity: 4, unit: 'bottles', minStock: 3, costPerUnit: 35, supplier: 'AutoSupply Co', lastUpdated: today },
    { id: uuidv4(), name: 'Air Freshener', category: 'Interior', quantity: 2, unit: 'boxes', minStock: 5, costPerUnit: 12, supplier: 'FreshScents', lastUpdated: today },
    { id: uuidv4(), name: 'Clay Bar', category: 'Detailing', quantity: 10, unit: 'pieces', minStock: 4, costPerUnit: 18, supplier: 'ProCoat International', lastUpdated: today },
    { id: uuidv4(), name: 'Polishing Compound', category: 'Detailing', quantity: 5, unit: 'containers', minStock: 3, costPerUnit: 40, supplier: 'ProCoat International', lastUpdated: today },
    { id: uuidv4(), name: 'Water Hose (50m)', category: 'Equipment', quantity: 2, unit: 'pieces', minStock: 1, costPerUnit: 150, supplier: 'EquipMaster', lastUpdated: lastWeek },
    { id: uuidv4(), name: 'Pressure Washer Nozzle', category: 'Equipment', quantity: 4, unit: 'pieces', minStock: 2, costPerUnit: 25, supplier: 'EquipMaster', lastUpdated: lastWeek },
  ];

  const inventoryTransactions: InventoryTransaction[] = [
    { id: uuidv4(), itemId: inventoryItems[0].id, type: 'stock_out', quantity: 5, previousQuantity: 50, newQuantity: 45, reason: 'Used for customer services', userId: staff1Id, date: today },
    { id: uuidv4(), itemId: inventoryItems[1].id, type: 'stock_in', quantity: 10, previousQuantity: 2, newQuantity: 12, reason: 'Restocked from supplier', userId: adminId, date: lastWeek },
    { id: uuidv4(), itemId: inventoryItems[7].id, type: 'stock_out', quantity: 3, previousQuantity: 5, newQuantity: 2, reason: 'Used for interior services', userId: staff2Id, date: yesterday },
  ];

  const membershipIds = Array.from({ length: 5 }, () => uuidv4());
  const memberships: Membership[] = [
    { id: membershipIds[0], customerId: customerIds[0], type: 'premium', price: 200, startDate: lastMonth, expiryDate: nextMonth, includedServices: 8, servicesUsed: 3, paymentStatus: 'paid', status: 'active' },
    { id: membershipIds[1], customerId: customerIds[2], type: 'vip', price: 500, startDate: lastMonth, expiryDate: nextYear, includedServices: 20, servicesUsed: 5, paymentStatus: 'paid', status: 'active' },
    { id: membershipIds[2], customerId: customerIds[7], type: 'vip', price: 500, startDate: lastMonth, expiryDate: nextYear, includedServices: 20, servicesUsed: 2, paymentStatus: 'paid', status: 'active' },
    { id: membershipIds[3], customerId: customerIds[4], type: 'basic', price: 100, startDate: lastMonth, expiryDate: nextMonth, includedServices: 4, servicesUsed: 4, paymentStatus: 'paid', status: 'active' },
    { id: membershipIds[4], customerId: customerIds[5], type: 'basic', price: 100, startDate: new Date(Date.now() - 60 * 86400000).toISOString().split('T')[0], expiryDate: lastWeek, includedServices: 4, servicesUsed: 2, paymentStatus: 'paid', status: 'expired' },
  ];

  const expenses: Expense[] = [
    { id: uuidv4(), category: 'Water', description: 'Monthly water bill', amount: 300, date: today, paymentMethod: 'bank_transfer', supplier: 'Ghana Water Co', addedBy: adminId, createdAt: today },
    { id: uuidv4(), category: 'Cleaning Chemicals', description: 'Monthly chemical supply', amount: 450, date: lastWeek, paymentMethod: 'bank_transfer', supplier: 'ChemClean Ltd', addedBy: adminId, createdAt: lastWeek },
    { id: uuidv4(), category: 'Electricity', description: 'Monthly electricity bill', amount: 500, date: today, paymentMethod: 'bank_transfer', supplier: 'ECG', addedBy: adminId, createdAt: today },
    { id: uuidv4(), category: 'Equipment', description: 'New pressure washer parts', amount: 200, date: yesterday, paymentMethod: 'cash', supplier: 'EquipMaster', addedBy: staff2Id, createdAt: yesterday },
    { id: uuidv4(), category: 'Staff Expenses', description: 'Staff lunch allowance', amount: 150, date: today, paymentMethod: 'cash', supplier: '', addedBy: adminId, createdAt: today },
    { id: uuidv4(), category: 'Maintenance', description: 'Bay floor repair', amount: 350, date: lastWeek, paymentMethod: 'bank_transfer', supplier: 'FixIt Services', addedBy: adminId, createdAt: lastWeek },
    { id: uuidv4(), category: 'Transport', description: 'Fuel for pickup vehicle', amount: 100, date: yesterday, paymentMethod: 'cash', supplier: '', addedBy: staff1Id, createdAt: yesterday },
  ];

  const notifications: Notification[] = [
    { id: uuidv4(), title: 'New Booking', message: 'John Mensah booked a Basic Wash for today at 9:00 AM', type: 'booking', read: false, date: today },
    { id: uuidv4(), title: 'Payment Received', message: 'Payment of GH₵50 received from John Mensah', type: 'payment', read: false, date: today },
    { id: uuidv4(), title: 'Low Stock Alert', message: 'Air Freshener is below minimum stock level', type: 'inventory', read: false, date: today },
    { id: uuidv4(), title: 'Membership Expiring', message: "Emmanuel Tetteh's membership expires next week", type: 'membership', read: true, date: yesterday },
    { id: uuidv4(), title: 'Booking Completed', message: 'Daniel Boateng\'s Premium Wash has been completed', type: 'booking', read: true, date: yesterday },
  ];

  const auditLogs: AuditLog[] = [
    { id: uuidv4(), userId: adminId, action: 'login', entity: 'user', entityId: adminId, metadata: {}, timestamp: new Date().toISOString() },
    { id: uuidv4(), userId: staff1Id, action: 'booking_created', entity: 'booking', entityId: bookingIds[0], metadata: { customer: 'John Mensah' }, timestamp: new Date().toISOString() },
    { id: uuidv4(), userId: adminId, action: 'payment_created', entity: 'payment', entityId: paymentIds[0], metadata: { amount: 50 }, timestamp: new Date().toISOString() },
  ];

  return {
    users,
    customers,
    vehicles,
    services,
    bookings,
    payments,
    inventory: inventoryItems,
    inventoryTransactions,
    memberships,
    expenses,
    notifications,
    auditLogs,
    currentUserId: adminId,
  };
}

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  const seed = generateSeedData();
  saveState(seed);
  return seed;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function resetState(): AppState {
  const seed = generateSeedData();
  saveState(seed);
  return seed;
}
