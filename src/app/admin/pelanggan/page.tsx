'use client';

import { useEffect, useState } from 'react';
import { Users, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { getOrders } from '@/lib/storage';
import type { Order } from '@/lib/data';

interface CustomerSummary {
  id: string;
  nama: string;
  whatsapp: string;
  alamat: string;
  totalOrders: number;
  totalSpend: number;
  lastOrder: string;
}

export default function AdminPelangganPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const orders = getOrders();
    const map: Record<string, CustomerSummary> = {};
    orders.forEach((o: Order) => {
      const key = o.customerWA;
      if (!map[key]) {
        map[key] = {
          id: o.customerId,
          nama: o.customerName,
          whatsapp: o.customerWA,
          alamat: o.customerAlamat,
          totalOrders: 0,
          totalSpend: 0,
          lastOrder: o.createdAt,
        };
      }
      map[key].totalOrders += 1;
      map[key].totalSpend += o.totalHarga;
      if (o.createdAt > map[key].lastOrder) map[key].lastOrder = o.createdAt;
    });
    setCustomers(Object.values(map));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Data Pelanggan</h1>
        <p className="text-[#64748B] text-sm">{customers.length} pelanggan terdaftar</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Pelanggan', value: customers.length, icon: Users, color: 'text-[#EA580C]', bg: '#FFF7ED', border: '#FED7AA' },
          { label: 'Total Pesanan', value: customers.reduce((s, c) => s + c.totalOrders, 0), icon: ShoppingBag, color: 'text-[#9333EA]', bg: '#F3E8FF', border: '#E9D5FF' },
          { label: 'Total Transaksi', value: `Rp ${(customers.reduce((s, c) => s + c.totalSpend, 0) / 1000).toFixed(0)}K`, icon: ShoppingBag, color: 'text-[#16A34A]', bg: '#DCFCE7', border: '#BBF7D0' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
            <p className="text-[#64748B] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
        <input
          id="search-customer"
          className="input-field pl-10 text-sm"
          placeholder="Cari nama atau nomor WhatsApp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Pelanggan</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Alamat</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Pesanan</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide hidden sm:table-cell">Total Spend</th>
                <th className="text-left px-5 py-3.5 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center text-[#64748B] py-12">Tidak ada pelanggan.</td></tr>
              )}
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  className="hover:bg-[#F8FAFC] transition-colors"
                  style={i < filtered.length - 1 ? { borderBottom: '1px solid #E2E8F0' } : {}}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                        {c.nama[0]}
                      </div>
                      <div>
                        <p className="text-[#0F172A] font-medium">{c.nama}</p>
                        <p className="text-[#64748B] text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />{c.whatsapp}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-[#64748B] text-xs max-w-[200px] truncate">{c.alamat || '-'}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge-orange">{c.totalOrders}x</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <p className="text-[#0F172A] font-semibold text-sm">Rp {c.totalSpend.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(c.nama)}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-80"
                      style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
                    >
                      <Phone className="w-3 h-3" /> WA
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
