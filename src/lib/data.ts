// =============================================
// TYPES & DATA MODELS
// =============================================

export type OrderStatus =
  | 'diterima'
  | 'dijemput'
  | 'di_outlet'
  | 'dicuci'
  | 'pengeringan'
  | 'quality_control'
  | 'selesai'
  | 'siap_kirim'
  | 'pesanan_selesai';

export type DeliveryMethod = 'outlet' | 'pickup' | 'delivery';
export type PaymentStatus = 'belum_bayar' | 'dp' | 'lunas';
export type PaymentMethod = 'cash' | 'transfer' | 'qris' | 'ewallet';
export type UserRole = 'admin' | 'owner';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimasi: string;
  icon: string;
  popular?: boolean;
  color: string;
}

export interface Customer {
  id: string;
  nama: string;
  whatsapp: string;
  alamat: string;
  totalOrders?: number;
}

export interface OrderDetail {
  serviceId: string;
  serviceName: string;
  jumlahSepatu: number;
  merekSepatu: string;
  harga: number;
}

export interface Order {
  id: string;
  kodeOrder: string;
  customerId: string;
  customerName: string;
  customerWA: string;
  customerAlamat: string;
  details: OrderDetail[];
  deliveryMethod: DeliveryMethod;
  bookingDate: string;
  pickupTime: string;
  status: OrderStatus;
  estimasiSelesai: string;
  totalHarga: number;
  paymentStatus: PaymentStatus;
  catatan?: string;
  adminNotes?: string;
  fotoSepatu?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  kodeOrder: string;
  totalBiaya: number;
  jumlahDibayar: number;
  sisaPembayaran: number;
  metode: PaymentMethod;
  status: PaymentStatus;
  buktiPembayaran?: string;
  tanggalPembayaran: string;
}

export interface GalleryItem {
  id: string;
  fotoBefore: string;
  fotoAfter: string;
  deskripsi: string;
  layanan: string;
  tanggalUpload: string;
}

export interface Testimonial {
  id: string;
  namaPelanggan: string;
  komentar: string;
  rating: number;
  foto?: string;
  statusTampil: boolean;
  layanan: string;
}

// =============================================
// STATUS CONFIG
// =============================================

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; step: number }> = {
  diterima: { label: 'Pesanan Diterima', color: 'badge-blue', step: 1 },
  dijemput: { label: 'Sepatu Dijemput', color: 'badge-purple', step: 2 },
  di_outlet: { label: 'Diterima di Outlet', color: 'badge-cyan', step: 3 },
  dicuci: { label: 'Sedang Dicuci', color: 'badge-blue', step: 4 },
  pengeringan: { label: 'Proses Pengeringan', color: 'badge-yellow', step: 5 },
  quality_control: { label: 'Quality Control', color: 'badge-purple', step: 6 },
  selesai: { label: 'Selesai', color: 'badge-green', step: 7 },
  siap_kirim: { label: 'Siap Diambil/Dikirim', color: 'badge-cyan', step: 8 },
  pesanan_selesai: { label: 'Pesanan Selesai', color: 'badge-green', step: 9 },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string }> = {
  belum_bayar: { label: 'Belum Bayar', color: 'badge-red' },
  dp: { label: 'DP', color: 'badge-yellow' },
  lunas: { label: 'Lunas', color: 'badge-green' },
};

export const DELIVERY_METHOD_CONFIG: Record<DeliveryMethod, { label: string; icon: string }> = {
  outlet: { label: 'Antar ke Outlet', icon: '🏪' },
  pickup: { label: 'Pickup Kurir', icon: '🚗' },
  delivery: { label: 'Delivery Setelah Selesai', icon: '📦' },
};

// =============================================
// SEED DATA
// =============================================

export const SERVICES: Service[] = [
  {
    id: 'svc-1',
    name: 'Deep Clean',
    description: 'Pembersihan menyeluruh bagian upper, midsole, outsole, dan insole. Cocok untuk sepatu yang sangat kotor.',
    price: 45000,
    estimasi: '2-3 hari',
    icon: '🫧',
    popular: true,
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'svc-2',
    name: 'Fast Clean',
    description: 'Pembersihan ringan untuk sepatu yang tidak terlalu kotor. Hasil cepat dan praktis.',
    price: 25000,
    estimasi: '1 hari',
    icon: '⚡',
    popular: false,
    color: 'from-sky-500 to-blue-400',
  },
  {
    id: 'svc-3',
    name: 'Unyellowing',
    description: 'Perawatan khusus untuk mengurangi noda kuning pada midsole agar sepatu terlihat lebih bersih.',
    price: 55000,
    estimasi: '3-4 hari',
    icon: '✨',
    popular: false,
    color: 'from-yellow-500 to-orange-400',
  },
  {
    id: 'svc-4',
    name: 'Repaint',
    description: 'Pewarnaan ulang bagian sepatu yang pudar agar terlihat seperti baru kembali.',
    price: 80000,
    estimasi: '4-5 hari',
    icon: '🎨',
    popular: false,
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 'svc-5',
    name: 'Premium Treatment',
    description: 'Perawatan khusus untuk sepatu branded atau material sensitif seperti suede, nubuck, dan leather.',
    price: 120000,
    estimasi: '5-7 hari',
    icon: '👑',
    popular: true,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    id: 'svc-6',
    name: 'Bag Cleaning',
    description: 'Layanan pembersihan tas untuk berbagai jenis material. Hasilkan tas yang bersih dan terawat.',
    price: 65000,
    estimasi: '2-3 hari',
    icon: '👜',
    popular: false,
    color: 'from-rose-500 to-pink-400',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    namaPelanggan: 'Rizky Pratama',
    komentar: 'Sepatu Nike Air Max saya yang udah kusam banget jadi kayak baru lagi! Pelayanannya cepat dan hasilnya memuaskan. Recommended banget!',
    rating: 5,
    statusTampil: true,
    layanan: 'Deep Clean',
  },
  {
    id: 'test-2',
    namaPelanggan: 'Siti Rahayu',
    komentar: 'Udah lama nyari yang bisa bersihin sepatu putih saya yang kuning. Alhamdulillah ketemu Bersih Treatment, hasilnya luar biasa!',
    rating: 5,
    statusTampil: true,
    layanan: 'Unyellowing',
  },
  {
    id: 'test-3',
    namaPelanggan: 'Dimas Aditya',
    komentar: 'Service premium untuk sepatu Yeezy saya. Harganya worth it banget, hasilnya rapi dan wangi. Pasti balik lagi!',
    rating: 5,
    statusTampil: true,
    layanan: 'Premium Treatment',
  },
  {
    id: 'test-4',
    namaPelanggan: 'Aulia Putri',
    komentar: 'Fast clean-nya cepet banget, sehari udah selesai! Cocok buat yang butuh sepatu cepat bersih. Highly recommended!',
    rating: 4,
    statusTampil: true,
    layanan: 'Fast Clean',
  },
  {
    id: 'test-5',
    namaPelanggan: 'Bagas Santoso',
    komentar: 'Repaint sepatu lama saya hasilnya bagus banget, warnanya rata dan nggak ngelotok. Keren!',
    rating: 5,
    statusTampil: true,
    layanan: 'Repaint',
  },
  {
    id: 'test-6',
    namaPelanggan: 'Mira Andriani',
    komentar: 'Booking online mudah, pengiriman tepat waktu, hasil bersih dan rapi. Total puas sama Bersih Treatment!',
    rating: 5,
    statusTampil: true,
    layanan: 'Deep Clean',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    fotoBefore: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    fotoAfter: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop',
    deskripsi: 'Nike Air Max kotor menjadi bersih bersinar',
    layanan: 'Deep Clean',
    tanggalUpload: '2026-05-20',
  },
  {
    id: 'gal-2',
    fotoBefore: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop',
    fotoAfter: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    deskripsi: 'Adidas Superstar yellowing kini putih bersih',
    layanan: 'Unyellowing',
    tanggalUpload: '2026-05-22',
  },
  {
    id: 'gal-3',
    fotoBefore: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
    fotoAfter: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    deskripsi: 'Jordan 1 pudar kembali berwarna cerah',
    layanan: 'Repaint',
    tanggalUpload: '2026-05-25',
  },
  {
    id: 'gal-4',
    fotoBefore: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop',
    fotoAfter: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop',
    deskripsi: 'Yeezy Boost premium treatment',
    layanan: 'Premium Treatment',
    tanggalUpload: '2026-05-28',
  },
];

// =============================================
// DUMMY ORDERS (for admin demo)
// =============================================

export const DUMMY_ORDERS: Order[] = [
  {
    id: 'ord-1',
    kodeOrder: 'BT-2026-001',
    customerId: 'cust-1',
    customerName: 'Rizky Pratama',
    customerWA: '08123456789',
    customerAlamat: 'Jl. Merdeka No. 12, Jakarta Selatan',
    details: [{ serviceId: 'svc-1', serviceName: 'Deep Clean', jumlahSepatu: 2, merekSepatu: 'Nike Air Max', harga: 90000 }],
    deliveryMethod: 'pickup',
    bookingDate: '2026-06-01',
    pickupTime: '10:00',
    status: 'dicuci',
    estimasiSelesai: '2026-06-04',
    totalHarga: 90000,
    paymentStatus: 'dp',
    catatan: 'Hati-hati bagian sol',
    createdAt: '2026-06-01T09:00:00Z',
  },
  {
    id: 'ord-2',
    kodeOrder: 'BT-2026-002',
    customerId: 'cust-2',
    customerName: 'Siti Rahayu',
    customerWA: '08987654321',
    customerAlamat: 'Jl. Sudirman No. 45, Bandung',
    details: [{ serviceId: 'svc-3', serviceName: 'Unyellowing', jumlahSepatu: 1, merekSepatu: 'Adidas Superstar', harga: 55000 }],
    deliveryMethod: 'outlet',
    bookingDate: '2026-06-02',
    pickupTime: '14:00',
    status: 'selesai',
    estimasiSelesai: '2026-06-05',
    totalHarga: 55000,
    paymentStatus: 'lunas',
    createdAt: '2026-06-02T10:00:00Z',
  },
  {
    id: 'ord-3',
    kodeOrder: 'BT-2026-003',
    customerId: 'cust-3',
    customerName: 'Dimas Aditya',
    customerWA: '08551234567',
    customerAlamat: 'Jl. Pemuda No. 8, Surabaya',
    details: [{ serviceId: 'svc-5', serviceName: 'Premium Treatment', jumlahSepatu: 1, merekSepatu: 'Yeezy 350', harga: 120000 }],
    deliveryMethod: 'delivery',
    bookingDate: '2026-06-03',
    pickupTime: '09:00',
    status: 'quality_control',
    estimasiSelesai: '2026-06-08',
    totalHarga: 120000,
    paymentStatus: 'dp',
    catatan: 'Material suede, ekstra hati-hati',
    createdAt: '2026-06-03T08:30:00Z',
  },
  {
    id: 'ord-4',
    kodeOrder: 'BT-2026-004',
    customerId: 'cust-4',
    customerName: 'Aulia Putri',
    customerWA: '08761234567',
    customerAlamat: 'Jl. Asia Afrika No. 33, Bandung',
    details: [{ serviceId: 'svc-2', serviceName: 'Fast Clean', jumlahSepatu: 3, merekSepatu: 'Converse Chuck Taylor', harga: 75000 }],
    deliveryMethod: 'outlet',
    bookingDate: '2026-06-04',
    pickupTime: '11:00',
    status: 'diterima',
    estimasiSelesai: '2026-06-05',
    totalHarga: 75000,
    paymentStatus: 'belum_bayar',
    createdAt: '2026-06-04T07:00:00Z',
  },
  {
    id: 'ord-5',
    kodeOrder: 'BT-2026-005',
    customerId: 'cust-5',
    customerName: 'Bagas Santoso',
    customerWA: '08901234567',
    customerAlamat: 'Jl. Gatot Subroto No. 17, Yogyakarta',
    details: [{ serviceId: 'svc-4', serviceName: 'Repaint', jumlahSepatu: 1, merekSepatu: 'Jordan 1 Retro', harga: 80000 }],
    deliveryMethod: 'pickup',
    bookingDate: '2026-06-03',
    pickupTime: '13:00',
    status: 'pesanan_selesai',
    estimasiSelesai: '2026-06-07',
    totalHarga: 80000,
    paymentStatus: 'lunas',
    createdAt: '2026-06-03T12:00:00Z',
  },
];
