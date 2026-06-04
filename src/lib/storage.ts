import { Order, Payment, DUMMY_ORDERS } from './data';

const ORDERS_KEY = 'bt_orders';
const PAYMENTS_KEY = 'bt_payments';

// =============================================
// ORDERS
// =============================================

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return DUMMY_ORDERS;
  const data = localStorage.getItem(ORDERS_KEY);
  if (!data) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DUMMY_ORDERS));
    return DUMMY_ORDERS;
  }
  return JSON.parse(data);
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function updateOrder(id: string, updates: Partial<Order>): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx !== -1) {
    orders[idx] = { ...orders[idx], ...updates };
    saveOrders(orders);
  }
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter((o) => o.id !== id);
  saveOrders(orders);
}

export function getOrderByCode(code: string): Order | undefined {
  return getOrders().find((o) => o.kodeOrder.toLowerCase() === code.toLowerCase());
}

export function generateOrderCode(): string {
  const orders = getOrders();
  const year = new Date().getFullYear();
  const num = orders.length + 1;
  return `BT-${year}-${String(num).padStart(3, '0')}`;
}

// =============================================
// PAYMENTS
// =============================================

export function getPayments(): Payment[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(PAYMENTS_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export function savePayments(payments: Payment[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

export function addPayment(payment: Payment): void {
  const payments = getPayments();
  payments.unshift(payment);
  savePayments(payments);
}

export function updatePayment(id: string, updates: Partial<Payment>): void {
  const payments = getPayments();
  const idx = payments.findIndex((p) => p.id === id);
  if (idx !== -1) {
    payments[idx] = { ...payments[idx], ...updates };
    savePayments(payments);
  }
}

// =============================================
// AUTH
// =============================================

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('bt_admin_logged_in') === 'true';
}

export function loginAdmin(email: string, password: string): boolean {
  // Demo credentials
  if (email === 'admin@bersihtreatment.com' && password === 'admin123') {
    localStorage.setItem('bt_admin_logged_in', 'true');
    localStorage.setItem('bt_admin_role', 'admin');
    return true;
  }
  if (email === 'owner@bersihtreatment.com' && password === 'owner123') {
    localStorage.setItem('bt_admin_logged_in', 'true');
    localStorage.setItem('bt_admin_role', 'owner');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('bt_admin_logged_in');
  localStorage.removeItem('bt_admin_role');
}

export function getAdminRole(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('bt_admin_role') || 'admin';
}

// =============================================
// REPORTS
// =============================================

export function getRevenueByMonth(): { month: string; revenue: number; orders: number }[] {
  const orders = getOrders();
  const months: Record<string, { revenue: number; orders: number }> = {};
  
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    if (!months[key]) months[key] = { revenue: 0, orders: 0 };
    if (order.paymentStatus === 'lunas') months[key].revenue += order.totalHarga;
    months[key].orders += 1;
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, val]) => ({
      month: Object.keys(months).indexOf(Object.keys(months).find((k) => k)!) + '',
      ...val,
    }))
    .slice(-6);
}
