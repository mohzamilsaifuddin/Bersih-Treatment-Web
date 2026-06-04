'use client';

import { useEffect, useState } from 'react';
import { CreditCard, CheckCircle, X, Plus } from 'lucide-react';
import { getOrders, updateOrder, addPayment, getPayments } from '@/lib/storage';
import { PAYMENT_STATUS_CONFIG, ORDER_STATUS_CONFIG, type Order, type PaymentMethod, type PaymentStatus } from '@/lib/data';

const METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: '💵 Cash',
  transfer: '🏦 Transfer Bank',
  qris: '📱 QRIS',
  ewallet: '💳 E-Wallet',
};

function PaymentModal({ order, onClose, onSave }: {
  order: Order;
  onClose: () => void;
  onSave: (orderId: string, jumlah: number, metode: PaymentMethod, status: PaymentStatus) => void;
}) {
  const [jumlah, setJumlah] = useState(order.totalHarga);
  const [metode, setMetode] = useState<PaymentMethod>('cash');
  const [status, setStatus] = useState<PaymentStatus>('lunas');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <h3 className="text-[#0F172A] font-bold text-lg">Catat Pembayaran</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="rounded-xl p-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <p className="text-[#64748B] text-xs mb-1">Kode Pesanan</p>
            <p className="text-[#EA580C] font-bold">{order.kodeOrder}</p>
            <p className="text-[#0F172A] text-sm mt-1">{order.customerName} · {order.details[0]?.serviceName}</p>
            <p className="text-[#0F172A] font-bold mt-2">Total: Rp {order.totalHarga.toLocaleString('id-ID')}</p>
          </div>

          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Jumlah Dibayar (Rp)</label>
            <input type="number" className="input-field text-sm" value={jumlah} onChange={(e) => setJumlah(parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Metode Pembayaran</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(METHOD_LABELS) as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetode(m)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${metode === m ? 'text-white' : 'text-[#64748B]'}`}
                  style={metode === m ? { background: '#F97316', border: '1px solid #EA580C' } : { background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                >
                  {METHOD_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs mb-1.5">Status Pembayaran</label>
            <select
              className="input-field text-sm"
              style={{ background: '#FFFFFF' }}
              value={status}
              onChange={(e) => setStatus(e.target.value as PaymentStatus)}
            >
              <option value="dp" style={{ background: '#FFFFFF' }}>DP (Sebagian)</option>
              <option value="lunas" style={{ background: '#FFFFFF' }}>Lunas</option>
            </select>
          </div>
          {jumlah < order.totalHarga && (
            <div className="text-xs text-[#CA8A04] px-3 py-2 rounded-lg" style={{ background: '#FEF9C3' }}>
              Sisa: Rp {(order.totalHarga - jumlah).toLocaleString('id-ID')}
            </div>
          )}
        </div>
        <div className="flex gap-3 p-6 border-t" style={{ borderColor: '#E2E8F0' }}>
          <button onClick={onClose} className="btn-secondary flex-1 py-3 justify-center">Batal</button>
          <button onClick={() => onSave(order.id, jumlah, metode, status)} className="btn-primary flex-1 py-3 justify-center">
            <CheckCircle className="w-4 h-4" /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPembayaranPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterPayment, setFilterPayment] = useState('all');

  const refresh = () => setOrders(getOrders());

  useEffect(() => { refresh(); }, []);

  const filtered = orders.filter((o) =>
    filterPayment === 'all' ? true : o.paymentStatus === filterPayment
  );

  const handleSave = (orderId: string, jumlah: number, metode: PaymentMethod, status: PaymentStatus) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    updateOrder(orderId, { paymentStatus: status });
    addPayment({
      id: `pay-${Date.now()}`,
      orderId,
      kodeOrder: order.kodeOrder,
      totalBiaya: order.totalHarga,
      jumlahDibayar: jumlah,
      sisaPembayaran: Math.max(0, order.totalHarga - jumlah),
      metode,
      status,
      tanggalPembayaran: new Date().toISOString(),
    });
    refresh();
    setSelectedOrder(null);
  };

  const totalRevenue = orders.filter((o) => o.paymentStatus === 'lunas').reduce((s, o) => s + o.totalHarga, 0);
  const totalDP = orders.filter((o) => o.paymentStatus === 'dp').reduce((s, o) => s + o.totalHarga * 0.5, 0);
  const totalUnpaid = orders.filter((o) => o.paymentStatus === 'belum_bayar').reduce((s, o) => s + o.totalHarga, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Manajemen Pembayaran</h1>
        <p className="text-[#64748B] text-sm">Kelola dan catat semua pembayaran pelanggan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Lunas', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, color: 'text-[#16A34A]', bg: '#DCFCE7', border: '#BBF7D0' },
          { label: 'DP / Cicilan', value: `Rp ${totalDP.toLocaleString('id-ID')}`, color: 'text-[#D97706]', bg: '#FEF3C7', border: '#FDE68A' },
          { label: 'Belum Bayar', value: `Rp ${totalUnpaid.toLocaleString('id-ID')}`, color: 'text-[#EF4444]', bg: '#FEF2F2', border: '#FECACA' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <p className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-[#64748B] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'Semua' },
          { value: 'belum_bayar', label: 'Belum Bayar' },
          { value: 'dp', label: 'DP' },
          { value: 'lunas', label: 'Lunas' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterPayment(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterPayment === f.value ? 'text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            style={filterPayment === f.value ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                {['Kode', 'Pelanggan', 'Layanan', 'Total', 'Status Bayar', 'Status Order', 'Aksi'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-[#64748B] py-12">Tidak ada data.</td></tr>
              )}
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#F8FAFC] transition-colors"
                  style={i < filtered.length - 1 ? { borderBottom: '1px solid #E2E8F0' } : {}}
                >
                  <td className="px-5 py-4">
                    <span className="text-[#EA580C] font-mono font-semibold text-xs">{order.kodeOrder}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#0F172A] font-medium text-sm">{order.customerName}</p>
                    <p className="text-[#64748B] text-xs">{order.customerWA}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#64748B] text-xs">{order.details[0]?.serviceName}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#0F172A] font-bold text-sm">Rp {order.totalHarga.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${PAYMENT_STATUS_CONFIG[order.paymentStatus].color} text-xs`}>
                      {PAYMENT_STATUS_CONFIG[order.paymentStatus].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${ORDER_STATUS_CONFIG[order.status].color} text-xs`}>
                      {ORDER_STATUS_CONFIG[order.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {order.paymentStatus !== 'lunas' && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-80"
                        style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
                      >
                        <Plus className="w-3 h-3" /> Catat
                      </button>
                    )}
                    {order.paymentStatus === 'lunas' && (
                      <span className="text-green-400 text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Lunas
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <PaymentModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onSave={handleSave} />
      )}
    </div>
  );
}
