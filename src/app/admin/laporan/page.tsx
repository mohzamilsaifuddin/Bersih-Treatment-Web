'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp, ShoppingBag, CheckCircle, Clock, Download
} from 'lucide-react';
import { getOrders } from '@/lib/storage';
import { SERVICES, ORDER_STATUS_CONFIG, type Order } from '@/lib/data';

export default function AdminLaporanPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [range, setRange] = useState('all');

  useEffect(() => { setOrders(getOrders()); }, []);

  const filterByRange = (os: Order[]) => {
    const now = new Date();
    if (range === 'today') {
      const today = now.toISOString().split('T')[0];
      return os.filter((o) => o.createdAt.startsWith(today));
    }
    if (range === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return os.filter((o) => new Date(o.createdAt) >= weekAgo);
    }
    if (range === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return os.filter((o) => new Date(o.createdAt) >= monthAgo);
    }
    return os;
  };

  const filtered = filterByRange(orders);

  const totalRevenue = filtered.filter((o) => o.paymentStatus === 'lunas').reduce((s, o) => s + o.totalHarga, 0);
  const done = filtered.filter((o) => o.status === 'pesanan_selesai').length;
  const inProgress = filtered.filter((o) => o.status !== 'pesanan_selesai').length;

  // Service popularity
  const svcCount: Record<string, number> = {};
  filtered.forEach((o) => {
    const name = o.details[0]?.serviceName || 'Lainnya';
    svcCount[name] = (svcCount[name] || 0) + 1;
  });
  const sortedSvc = Object.entries(svcCount).sort((a, b) => b[1] - a[1]);
  const maxSvc = sortedSvc[0]?.[1] || 1;

  // Monthly revenue
  const monthlyMap: Record<string, number> = {};
  orders.forEach((o) => {
    if (o.paymentStatus !== 'lunas') return;
    const month = new Date(o.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    monthlyMap[month] = (monthlyMap[month] || 0) + o.totalHarga;
  });
  const months = Object.entries(monthlyMap).slice(-6);
  const maxRev = Math.max(...months.map(([, v]) => v), 1);

  const handleExport = () => {
    const rows = [
      ['Kode', 'Pelanggan', 'WA', 'Layanan', 'Jumlah', 'Total', 'Status', 'Status Bayar', 'Tanggal'],
      ...filtered.map((o) => [
        o.kodeOrder, o.customerName, o.customerWA,
        o.details[0]?.serviceName, o.details[0]?.jumlahSepatu,
        o.totalHarga, ORDER_STATUS_CONFIG[o.status].label,
        o.paymentStatus, o.createdAt.split('T')[0],
      ]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-bersih-treatment-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Laporan Usaha</h1>
          <p className="text-[#64748B] text-sm">Ringkasan performa Bersih Treatment</p>
        </div>
        <button id="export-csv-btn" onClick={handleExport} className="btn-secondary py-2.5 px-5 text-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Range Filter */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'today', label: 'Hari Ini' },
          { value: 'week', label: '7 Hari' },
          { value: 'month', label: '30 Hari' },
          { value: 'all', label: 'Semua' },
        ].map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${range === r.value ? 'text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            style={range === r.value ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pesanan', value: filtered.length, icon: ShoppingBag, color: 'text-[#EA580C]', bg: '#FFF7ED', border: '#FED7AA' },
          { label: 'Selesai', value: done, icon: CheckCircle, color: 'text-[#16A34A]', bg: '#DCFCE7', border: '#BBF7D0' },
          { label: 'Dalam Proses', value: inProgress, icon: Clock, color: 'text-[#F59E0B]', bg: '#FEF3C7', border: '#FDE68A' },
          { label: 'Total Pendapatan', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, icon: TrendingUp, color: 'text-[#0EA5E9]', bg: '#E0F2FE', border: '#BAE6FD' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-[#0F172A] mb-1">{s.value}</p>
            <p className="text-[#64748B] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (Custom Bar) */}
        <div className="card-glass" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
          <h3 className="text-[#0F172A] font-bold text-lg mb-6">Pendapatan Bulanan</h3>
          {months.length === 0 ? (
            <p className="text-[#64748B] text-sm text-center py-8">Belum ada data pendapatan.</p>
          ) : (
            <div className="space-y-3">
              {months.map(([month, rev]) => (
                <div key={month}>
                  <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
                    <span>{month}</span>
                    <span className="text-[#0F172A] font-semibold">Rp {rev.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: '8px', background: '#F8FAFC' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(rev / maxRev) * 100}%`, background: 'linear-gradient(90deg, #F97316, #EA580C)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Popularity */}
        <div className="card-glass" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
          <h3 className="text-[#0F172A] font-bold text-lg mb-6">Layanan Terpopuler</h3>
          {sortedSvc.length === 0 ? (
            <p className="text-[#64748B] text-sm text-center py-8">Belum ada data.</p>
          ) : (
            <div className="space-y-3">
              {sortedSvc.map(([name, count], i) => (
                <div key={name}>
                  <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
                    <span className="flex items-center gap-2">
                      {i === 0 && <span className="text-yellow-400">🏆</span>}
                      {name}
                    </span>
                    <span className="text-[#0F172A] font-semibold">{count}x</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: '8px', background: '#F8FAFC' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(count / maxSvc) * 100}%`,
                        background: i === 0
                          ? 'linear-gradient(90deg, #F59E0B, #D97706)'
                          : 'linear-gradient(90deg, #9333EA, #7E22CE)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Table */}
      <div className="card-glass" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
        <h3 className="text-[#0F172A] font-bold text-lg mb-5">Rincian Pesanan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                {['Kode', 'Pelanggan', 'Layanan', 'Total', 'Status Bayar', 'Tanggal'].map((h) => (
                  <th key={h} className="text-left pb-3 text-[#64748B] font-semibold text-xs uppercase tracking-wide pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center text-[#64748B] py-8">Tidak ada data untuk periode ini.</td></tr>
              )}
              {filtered.map((o, i) => (
                <tr key={o.id} className="transition-colors hover:bg-[#F8FAFC]" style={i < filtered.length - 1 ? { borderBottom: '1px solid #E2E8F0' } : {}}>
                  <td className="py-3 pr-4 text-[#EA580C] font-mono text-xs font-semibold">{o.kodeOrder}</td>
                  <td className="py-3 pr-4 text-[#0F172A] text-xs font-medium">{o.customerName}</td>
                  <td className="py-3 pr-4 text-[#64748B] text-xs">{o.details[0]?.serviceName}</td>
                  <td className="py-3 pr-4 text-[#0F172A] font-semibold text-xs">Rp {o.totalHarga.toLocaleString('id-ID')}</td>
                  <td className="py-3 pr-4">
                    <span className={`badge text-[10px] ${o.paymentStatus === 'lunas' ? 'badge-green' : o.paymentStatus === 'dp' ? 'badge-yellow' : 'badge-red'}`}>
                      {o.paymentStatus === 'lunas' ? 'Lunas' : o.paymentStatus === 'dp' ? 'DP' : 'Belum Bayar'}
                    </span>
                  </td>
                  <td className="py-3 text-[#64748B] text-xs">{o.createdAt.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
