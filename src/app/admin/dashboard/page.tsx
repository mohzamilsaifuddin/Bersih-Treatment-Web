'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag, CheckCircle, Clock, TrendingUp,
  Users, ArrowRight, AlertCircle
} from 'lucide-react';
import { getOrders } from '@/lib/storage';
import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, type Order } from '@/lib/data';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const totalRevenue = orders.filter((o) => o.paymentStatus === 'lunas').reduce((s, o) => s + o.totalHarga, 0);
  const pending = orders.filter((o) => o.status !== 'pesanan_selesai').length;
  const done = orders.filter((o) => o.status === 'pesanan_selesai').length;
  const unpaid = orders.filter((o) => o.paymentStatus === 'belum_bayar').length;

  const stats = [
    { label: 'Total Pesanan', value: orders.length, icon: ShoppingBag, color: 'text-[#EA580C]', bg: '#FFF7ED', border: '#FED7AA' },
    { label: 'Dalam Proses', value: pending, icon: Clock, color: 'text-[#F59E0B]', bg: '#FEF3C7', border: '#FDE68A' },
    { label: 'Selesai', value: done, icon: CheckCircle, color: 'text-[#22C55E]', bg: '#DCFCE7', border: '#BBF7D0' },
    { label: 'Total Pendapatan', value: `Rp ${(totalRevenue / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-[#0EA5E9]', bg: '#E0F2FE', border: '#BAE6FD' },
  ];

  const recent = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Dashboard</h1>
        <p className="text-[#64748B] text-sm">Selamat datang kembali! Berikut ringkasan hari ini.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#0F172A] mb-1">{s.value}</p>
            <p className="text-[#64748B] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alert: Belum Bayar */}
      {unpaid > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
          <p className="text-[#0F172A] text-sm">
            Ada <span className="text-[#EF4444] font-bold">{unpaid} pesanan</span> yang belum dibayar.
            <Link href="/admin/pembayaran" className="text-[#F97316] hover:underline ml-2">Kelola pembayaran →</Link>
          </p>
        </div>
      )}

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#0F172A] font-bold text-lg">Pesanan Terbaru</h2>
          <Link href="/admin/pesanan" className="text-[#F97316] text-sm hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          {/* Table Header */}
          <div className="grid grid-cols-5 px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide bg-[#F8FAFC]" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <span>Kode</span>
            <span>Pelanggan</span>
            <span className="hidden md:block">Layanan</span>
            <span className="hidden md:block">Total</span>
            <span>Status</span>
          </div>

          {recent.length === 0 && (
            <div className="text-center py-12 text-[#64748B] text-sm bg-[#FFFFFF]">Belum ada pesanan.</div>
          )}

          {recent.map((order, i) => {
            const statusCfg = ORDER_STATUS_CONFIG[order.status];
            const paymentCfg = PAYMENT_STATUS_CONFIG[order.paymentStatus];
            return (
              <div
                key={order.id}
                className="grid grid-cols-5 px-5 py-4 items-center text-sm transition-colors hover:bg-[#F8FAFC]"
                style={i < recent.length - 1 ? { borderBottom: '1px solid #E2E8F0' } : {}}
              >
                <span className="text-[#EA580C] font-mono font-semibold text-xs">{order.kodeOrder}</span>
                <div>
                  <p className="text-[#0F172A] font-medium text-sm">{order.customerName}</p>
                  <p className="text-[#64748B] text-xs">{order.customerWA}</p>
                </div>
                <span className="hidden md:block text-[#64748B] text-xs">{order.details[0]?.serviceName}</span>
                <span className="hidden md:block text-[#0F172A] font-semibold text-xs">Rp {order.totalHarga.toLocaleString('id-ID')}</span>
                <div className="flex flex-col gap-1">
                  <span className={`badge ${statusCfg.color} text-[10px]`}>{statusCfg.label}</span>
                  <span className={`badge ${paymentCfg.color} text-[10px]`}>{paymentCfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-[#0F172A] font-bold text-lg mb-5">Aksi Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: '/admin/pesanan', label: 'Tambah Pesanan', icon: ShoppingBag, color: '#FFF7ED', border: '#FED7AA', text: 'text-[#EA580C]' },
            { href: '/admin/pelanggan', label: 'Data Pelanggan', icon: Users, color: '#F3E8FF', border: '#E9D5FF', text: 'text-[#9333EA]' },
            { href: '/admin/pembayaran', label: 'Catat Pembayaran', icon: CheckCircle, color: '#DCFCE7', border: '#BBF7D0', text: 'text-[#16A34A]' },
            { href: '/admin/laporan', label: 'Lihat Laporan', icon: TrendingUp, color: '#E0F2FE', border: '#BAE6FD', text: 'text-[#0284C7]' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1"
              style={{ background: action.color, border: `1px solid ${action.border}` }}
            >
              <action.icon className={`w-6 h-6 ${action.text}`} />
              <span className="text-[#0F172A] text-xs font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
