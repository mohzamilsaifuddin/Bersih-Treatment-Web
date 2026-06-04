'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle, Package } from 'lucide-react';
import { getOrderByCode } from '@/lib/storage';
import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, DELIVERY_METHOD_CONFIG, type Order } from '@/lib/data';

function StatusTimeline({ order }: { order: Order }) {
  const statuses = Object.entries(ORDER_STATUS_CONFIG).sort((a, b) => a[1].step - b[1].step);
  const currentStep = ORDER_STATUS_CONFIG[order.status].step;

  return (
    <div className="space-y-0">
      {statuses.map(([key, cfg], i) => {
        const isDone = cfg.step < currentStep;
        const isCurrent = cfg.step === currentStep;
        const isLast = i === statuses.length - 1;

        return (
          <div key={key} className="flex gap-4">
            {/* Line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isDone ? 'bg-[#22C55E]' : isCurrent ? '' : ''
              }`} style={isCurrent ? { background: 'linear-gradient(135deg,#F97316,#EA580C)', boxShadow: '0 0 16px rgba(249,115,22,0.5)' } : isDone ? {} : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                {isDone ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : isCurrent ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                ) : (
                  <span className="text-[#64748B] text-xs font-bold">{cfg.step}</span>
                )}
              </div>
              {!isLast && (
                <div className={`w-px flex-1 my-1 ${isDone ? 'bg-[#22C55E]/40' : 'bg-[#E2E8F0]'}`} style={{ minHeight: '24px' }} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-5 ${isLast ? '' : ''}`}>
              <p className={`font-semibold text-sm ${isDone ? 'text-[#16A34A]' : isCurrent ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                {cfg.label}
              </p>
              {isCurrent && (
                <p className="text-[#F97316] text-xs mt-0.5">Status saat ini</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const statusCfg = ORDER_STATUS_CONFIG[order.status];
  const paymentCfg = PAYMENT_STATUS_CONFIG[order.paymentStatus];
  const deliveryCfg = DELIVERY_METHOD_CONFIG[order.deliveryMethod];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card-glass" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <p className="text-[#64748B] text-sm mb-1">Kode Pesanan</p>
            <p className="text-2xl font-bold gradient-text">{order.kodeOrder}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={`badge ${statusCfg.color}`}>{statusCfg.label}</span>
            <span className={`badge ${paymentCfg.color}`}>{paymentCfg.label}</span>
          </div>
        </div>

        <div className="glow-line mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Nama', value: order.customerName },
            { label: 'WhatsApp', value: order.customerWA },
            { label: 'Layanan', value: order.details[0]?.serviceName || '-' },
            { label: 'Jumlah Sepatu', value: `${order.details[0]?.jumlahSepatu || 0} pasang` },
            { label: 'Merek', value: order.details[0]?.merekSepatu || '-' },
            { label: 'Metode', value: `${deliveryCfg.icon} ${deliveryCfg.label}` },
            { label: 'Tanggal Booking', value: order.bookingDate },
            { label: 'Jam', value: order.pickupTime },
          ].map((row) => (
            <div key={row.label} className="flex flex-col gap-0.5">
              <span className="text-[#64748B] text-xs">{row.label}</span>
              <span className="text-[#0F172A] font-medium">{row.value}</span>
            </div>
          ))}
        </div>

        {order.catatan && (
          <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <span className="text-[#64748B]">Catatan: </span>
            <span className="text-[#0F172A]">{order.catatan}</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <span className="text-[#0F172A] font-semibold">Total Biaya</span>
          <span className="text-[#EA580C] font-bold text-xl">Rp {order.totalHarga.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="card-glass">
        <h3 className="text-[#0F172A] font-bold text-lg mb-6">Progress Pengerjaan</h3>
        <StatusTimeline order={order} />
      </div>

      {/* Admin Notes */}
      {order.adminNotes && (
        <div className="card-glass" style={{ border: '1px solid #FEF08A', background: '#FEF9C3' }}>
          <p className="text-[#CA8A04] font-semibold text-sm mb-1">📝 Catatan Admin</p>
          <p className="text-[#854D0E] text-sm">{order.adminNotes}</p>
        </div>
      )}

      {/* WhatsApp */}
      <a
        href={`https://wa.me/6281234567890?text=Halo%20Bersih%20Treatment%2C%20saya%20ingin%20tanya%20pesanan%20kode%20${order.kodeOrder}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary w-full py-4 justify-center block text-center"
      >
        Hubungi Admin via WhatsApp
      </a>
    </div>
  );
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const [kode, setKode] = useState(searchParams.get('code') || '');
  const [searched, setSearched] = useState(!!searchParams.get('code'));
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!kode.trim()) return;
    const found = getOrderByCode(kode.trim());
    setSearched(true);
    if (found) {
      setOrder(found);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  // Auto-search if code in URL
  useState(() => {
    if (searchParams.get('code')) {
      const found = getOrderByCode(searchParams.get('code')!);
      if (found) setOrder(found);
      else setNotFound(true);
    }
  });

  return (
    <div>
      {/* Search */}
      <div className="card-glass mb-8" style={{ border: '1px solid #E2E8F0' }}>
        <h2 className="text-[#0F172A] font-bold text-xl mb-2">Cek Status Pesanan</h2>
        <p className="text-[#64748B] text-sm mb-5">Masukkan kode pesanan kamu (contoh: BT-2026-001)</p>
        <div className="flex gap-3">
          <input
            id="input-kode-pesanan"
            className="input-field flex-1"
            placeholder="BT-2026-001"
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button id="search-order-btn" onClick={handleSearch} className="btn-primary px-6 py-3 flex-shrink-0">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Cari</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && order && <OrderCard order={order} />}

      {searched && notFound && (
        <div className="card-glass text-center py-12">
          <Package className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
          <p className="text-[#0F172A] font-semibold mb-2">Pesanan tidak ditemukan</p>
          <p className="text-[#64748B] text-sm mb-5">Pastikan kode pesanan yang kamu masukkan sudah benar.</p>
          <a
            href="https://wa.me/6281234567890?text=Halo%2C%20saya%20kesulitan%20menemukan%20pesanan%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-3 px-6 inline-flex"
          >
            Hubungi Admin
          </a>
        </div>
      )}

      {!searched && (
        <div className="text-center py-8">
          <p className="text-[#64748B] text-sm">Masukkan kode pesanan untuk melihat status terbaru sepatu kamu.</p>
          <p className="text-[#94A3B8] text-xs mt-2">Kode pesanan dikirim setelah booking berhasil.</p>
        </div>
      )}
    </div>
  );
}

export default function CekPesananPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Tracking Pesanan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Cek <span className="gradient-text">Status Pesanan</span>
          </h1>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Pantau perkembangan pengerjaan sepatu kamu secara real-time.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-[#64748B] text-center py-10">Loading...</div>}>
          <TrackingContent />
        </Suspense>
      </div>
    </div>
  );
}
