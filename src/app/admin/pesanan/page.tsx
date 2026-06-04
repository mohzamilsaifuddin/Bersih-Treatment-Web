'use client';

import { useEffect, useState } from 'react';
import {
  Plus, Search, Filter, Edit2, Trash2, X, CheckCircle, Loader
} from 'lucide-react';
import {
  getOrders, addOrder, updateOrder, deleteOrder, generateOrderCode
} from '@/lib/storage';
import {
  ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, SERVICES, type Order, type OrderStatus
} from '@/lib/data';

const ALL_STATUSES = Object.entries(ORDER_STATUS_CONFIG);

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = ORDER_STATUS_CONFIG[status];
  return <span className={`badge ${cfg.color} text-xs`}>{cfg.label}</span>;
}

function OrderModal({ order, onClose, onSave }: {
  order: Order | null;
  onClose: () => void;
  onSave: (o: Order) => void;
}) {
  const isNew = !order;
  const [form, setForm] = useState<Partial<Order>>(order || {
    customerName: '', customerWA: '', customerAlamat: '',
    deliveryMethod: 'outlet', bookingDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00', status: 'diterima', paymentStatus: 'belum_bayar',
    totalHarga: 0, catatan: '', adminNotes: '',
    details: [{ serviceId: 'svc-1', serviceName: 'Deep Clean', jumlahSepatu: 1, merekSepatu: '', harga: 45000 }],
  });

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    const svc = SERVICES.find((s) => s.id === form.details?.[0]?.serviceId);
    const detail = form.details?.[0];
    const total = svc && detail ? svc.price * (detail.jumlahSepatu || 1) : form.totalHarga || 0;
    const saved: Order = {
      id: order?.id || `ord-${Date.now()}`,
      kodeOrder: order?.kodeOrder || generateOrderCode(),
      customerId: order?.customerId || `cust-${Date.now()}`,
      customerName: form.customerName || '',
      customerWA: form.customerWA || '',
      customerAlamat: form.customerAlamat || '',
      details: form.details || [],
      deliveryMethod: form.deliveryMethod || 'outlet',
      bookingDate: form.bookingDate || '',
      pickupTime: form.pickupTime || '10:00',
      status: form.status || 'diterima',
      estimasiSelesai: form.estimasiSelesai || '',
      totalHarga: total,
      paymentStatus: form.paymentStatus || 'belum_bayar',
      catatan: form.catatan,
      adminNotes: form.adminNotes,
      createdAt: order?.createdAt || new Date().toISOString(),
    };
    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="text-[#0F172A] font-bold text-lg">{isNew ? 'Tambah Pesanan' : 'Edit Pesanan'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Nama Pelanggan *</label>
              <input className="input-field text-sm" value={form.customerName || ''} onChange={(e) => set('customerName', e.target.value)} placeholder="Nama pelanggan" />
            </div>
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">WhatsApp *</label>
              <input className="input-field text-sm" value={form.customerWA || ''} onChange={(e) => set('customerWA', e.target.value)} placeholder="08xx-xxxx-xxxx" />
            </div>
          </div>

          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Alamat</label>
            <textarea className="input-field text-sm resize-none" rows={2} value={form.customerAlamat || ''} onChange={(e) => set('customerAlamat', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Layanan *</label>
              <select className="input-field text-sm" style={{ background: '#FFFFFF' }}
                value={form.details?.[0]?.serviceId || 'svc-1'}
                onChange={(e) => {
                  const svc = SERVICES.find((s) => s.id === e.target.value);
                  set('details', [{ serviceId: svc!.id, serviceName: svc!.name, jumlahSepatu: form.details?.[0]?.jumlahSepatu || 1, merekSepatu: form.details?.[0]?.merekSepatu || '', harga: svc!.price }]);
                }}>
                {SERVICES.map((s) => <option key={s.id} value={s.id} style={{ background: '#FFFFFF' }}>{s.name} - Rp {s.price.toLocaleString('id-ID')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Jumlah Sepatu</label>
              <input type="number" min={1} className="input-field text-sm" value={form.details?.[0]?.jumlahSepatu || 1}
                onChange={(e) => set('details', [{ ...form.details![0], jumlahSepatu: parseInt(e.target.value) || 1 }])} />
            </div>
          </div>

          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Merek Sepatu</label>
            <input className="input-field text-sm" value={form.details?.[0]?.merekSepatu || ''} onChange={(e) => set('details', [{ ...form.details![0], merekSepatu: e.target.value }])} placeholder="Nike, Adidas, dll" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Tanggal Booking</label>
              <input type="date" className="input-field text-sm" value={form.bookingDate || ''} onChange={(e) => set('bookingDate', e.target.value)} />
            </div>
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Estimasi Selesai</label>
              <input type="date" className="input-field text-sm" value={form.estimasiSelesai || ''} onChange={(e) => set('estimasiSelesai', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Status Pesanan</label>
              <select className="input-field text-sm" style={{ background: '#FFFFFF' }} value={form.status || 'diterima'} onChange={(e) => set('status', e.target.value)}>
                {ALL_STATUSES.map(([key, cfg]) => <option key={key} value={key} style={{ background: '#FFFFFF' }}>{cfg.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[#64748B] text-xs mb-1.5">Status Pembayaran</label>
              <select className="input-field text-sm" style={{ background: '#FFFFFF' }} value={form.paymentStatus || 'belum_bayar'} onChange={(e) => set('paymentStatus', e.target.value)}>
                <option value="belum_bayar" style={{ background: '#FFFFFF' }}>Belum Bayar</option>
                <option value="dp" style={{ background: '#FFFFFF' }}>DP</option>
                <option value="lunas" style={{ background: '#FFFFFF' }}>Lunas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Catatan Admin</label>
            <textarea className="input-field text-sm resize-none" rows={2} value={form.adminNotes || ''} onChange={(e) => set('adminNotes', e.target.value)} placeholder="Catatan internal..." />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t" style={{ borderColor: '#E2E8F0' }}>
          <button onClick={onClose} className="btn-secondary flex-1 py-3 justify-center">Batal</button>
          <button onClick={handleSave} className="btn-primary flex-1 py-3 justify-center">
            <CheckCircle className="w-4 h-4" />
            {isNew ? 'Tambah Pesanan' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [delId, setDelId] = useState<string | null>(null);

  const refresh = () => setOrders(getOrders());

  useEffect(() => { refresh(); }, []);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.kodeOrder.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerWA.includes(search);
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSave = (o: Order) => {
    if (editOrder) {
      updateOrder(o.id, o);
    } else {
      addOrder(o);
    }
    refresh();
    setShowModal(false);
    setEditOrder(null);
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
    refresh();
    setDelId(null);
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateOrder(id, { status });
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Manajemen Pesanan</h1>
          <p className="text-[#64748B] text-sm">{orders.length} total pesanan</p>
        </div>
        <button
          id="add-order-btn"
          onClick={() => { setEditOrder(null); setShowModal(true); }}
          className="btn-primary py-2.5 px-5 text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Pesanan
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            id="search-order"
            className="input-field pl-10 text-sm"
            placeholder="Cari kode, nama, atau WA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <select
            id="filter-status"
            className="input-field pl-10 text-sm pr-8"
            style={{ background: '#FFFFFF', minWidth: '180px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all" style={{ background: '#FFFFFF' }}>Semua Status</option>
            {ALL_STATUSES.map(([key, cfg]) => (
              <option key={key} value={key} style={{ background: '#FFFFFF' }}>{cfg.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Kode</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Pelanggan</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Layanan</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide hidden lg:table-cell">Total</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Ubah Status</th>
                <th className="text-right px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-[#64748B] py-12">Tidak ada pesanan ditemukan.</td>
                </tr>
              )}
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  style={i < filtered.length - 1 ? { borderBottom: '1px solid #E2E8F0' } : {}}
                  className="hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="text-[#EA580C] font-mono font-semibold text-xs">{order.kodeOrder}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#0F172A] font-medium">{order.customerName}</p>
                    <p className="text-[#64748B] text-xs">{order.customerWA}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-[#64748B] text-xs">{order.details[0]?.serviceName}</p>
                    <p className="text-[#94A3B8] text-xs">{order.details[0]?.jumlahSepatu} pasang</p>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-[#0F172A] font-semibold">Rp {order.totalHarga.toLocaleString('id-ID')}</p>
                    <span className={`badge ${PAYMENT_STATUS_CONFIG[order.paymentStatus].color} text-[10px]`}>
                      {PAYMENT_STATUS_CONFIG[order.paymentStatus].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      className="text-xs rounded-lg px-2 py-1.5 text-[#0F172A] outline-none transition-all cursor-pointer"
                      style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    >
                      {ALL_STATUSES.map(([key, cfg]) => (
                        <option key={key} value={key} style={{ background: '#FFFFFF' }}>{cfg.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditOrder(order); setShowModal(true); }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0EA5E9] hover:bg-[#E0F2FE] transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDelId(order.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <OrderModal
          order={editOrder}
          onClose={() => { setShowModal(false); setEditOrder(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {delId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-sm w-full rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #FECACA' }}>
            <h3 className="text-[#0F172A] font-bold mb-2">Hapus Pesanan?</h3>
            <p className="text-[#64748B] text-sm mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="btn-secondary flex-1 py-2.5 justify-center">Batal</button>
              <button onClick={() => handleDelete(delId)} className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm transition-all bg-red-500 hover:bg-red-600">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
