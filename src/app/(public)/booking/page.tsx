'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Upload, ArrowRight, ArrowLeft, Loader } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { addOrder, generateOrderCode } from '@/lib/storage';
import type { Order, DeliveryMethod } from '@/lib/data';

const STEPS = ['Informasi', 'Layanan', 'Pengiriman', 'Konfirmasi'];

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [kodeOrder, setKodeOrder] = useState('');

  const [form, setForm] = useState({
    nama: '',
    whatsapp: '',
    alamat: '',
    serviceId: searchParams.get('service') || '',
    jumlahSepatu: 1,
    merekSepatu: '',
    catatan: '',
    fotoSepatu: '',
    deliveryMethod: 'outlet' as DeliveryMethod,
    bookingDate: '',
    pickupTime: '10:00',
  });

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const selectedService = SERVICES.find((s) => s.id === form.serviceId);
  const totalHarga = selectedService ? selectedService.price * form.jumlahSepatu : 0;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const code = generateOrderCode();
    const order: Order = {
      id: `ord-${Date.now()}`,
      kodeOrder: code,
      customerId: `cust-${Date.now()}`,
      customerName: form.nama,
      customerWA: form.whatsapp,
      customerAlamat: form.alamat,
      details: [{
        serviceId: form.serviceId,
        serviceName: selectedService?.name || '',
        jumlahSepatu: form.jumlahSepatu,
        merekSepatu: form.merekSepatu,
        harga: totalHarga,
      }],
      deliveryMethod: form.deliveryMethod,
      bookingDate: form.bookingDate,
      pickupTime: form.pickupTime,
      status: 'diterima',
      estimasiSelesai: '',
      totalHarga,
      paymentStatus: 'belum_bayar',
      catatan: form.catatan,
      fotoSepatu: form.fotoSepatu,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    setKodeOrder(code);
    setStep(5);
    setLoading(false);
  };

  // Step 5 = Success
  if (step === 5) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#DCFCE7', border: '2px solid #BBF7D0' }}>
          <CheckCircle className="w-10 h-10 text-[#16A34A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Booking Berhasil! 🎉</h2>
        <p className="text-[#64748B] mb-6">Pesanan kamu telah kami terima. Admin akan segera menghubungi kamu.</p>
        <div className="inline-block rounded-2xl px-8 py-5 mb-8" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
          <p className="text-[#64748B] text-sm mb-1">Kode Pesanan Kamu</p>
          <p className="text-3xl font-bold gradient-text tracking-wider">{kodeOrder}</p>
          <p className="text-[#64748B] text-xs mt-1">Simpan kode ini untuk tracking pesanan</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => router.push(`/cek-pesanan?code=${kodeOrder}`)} className="btn-primary py-3 px-6">
            Cek Status Pesanan
          </button>
          <a
            href={`https://wa.me/6281234567890?text=Halo%20Bersih%20Treatment%2C%20saya%20baru%20booking%20dengan%20kode%20${kodeOrder}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-3 px-6"
          >
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-px" style={{ background: '#E2E8F0' }} />
        {STEPS.map((s, i) => (
          <div key={s} className="relative flex flex-col items-center gap-2 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step > i + 1 ? 'bg-[#22C55E] text-white' : step === i + 1 ? 'text-white' : 'text-[#64748B]'
            }`} style={step === i + 1 ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : step > i + 1 ? {} : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-[#EA580C]' : step > i + 1 ? 'text-[#22C55E]' : 'text-[#64748B]'}`}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Info Pelanggan */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-[#0F172A] font-bold text-xl mb-6">Informasi Pelanggan</h3>
          <div>
            <label className="block text-[#64748B] text-sm mb-2">Nama Lengkap *</label>
            <input id="input-nama" className="input-field" placeholder="Masukkan nama lengkap" value={form.nama} onChange={(e) => set('nama', e.target.value)} />
          </div>
          <div>
            <label className="block text-[#64748B] text-sm mb-2">Nomor WhatsApp *</label>
            <input id="input-wa" className="input-field" placeholder="08xx-xxxx-xxxx" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
          </div>
          <div>
            <label className="block text-[#64748B] text-sm mb-2">Alamat Lengkap *</label>
            <textarea id="input-alamat" className="input-field resize-none" rows={3} placeholder="Jalan, kelurahan, kecamatan, kota..." value={form.alamat} onChange={(e) => set('alamat', e.target.value)} />
          </div>
          <button
            id="step1-next-btn"
            className="btn-primary w-full py-4 justify-center"
            disabled={!form.nama || !form.whatsapp || !form.alamat}
            onClick={() => setStep(2)}
            style={!form.nama || !form.whatsapp || !form.alamat ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Lanjut <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 2: Pilih Layanan */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="text-[#0F172A] font-bold text-xl mb-6">Pilih Layanan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                id={`select-service-${s.id}`}
                onClick={() => set('serviceId', s.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${form.serviceId === s.id ? 'ring-2 ring-orange-500' : 'hover:border-orange-500/30'}`}
                style={form.serviceId === s.id ? { background: '#FFF7ED', border: '1px solid #FED7AA' } : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-[#0F172A] font-semibold text-sm">{s.name}</p>
                    <p className="text-[#EA580C] text-xs font-bold">Rp {s.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <p className="text-[#64748B] text-xs">{s.estimasi}</p>
              </button>
            ))}
          </div>

          {selectedService && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-[#64748B] text-sm mb-2">Jumlah Sepatu *</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => set('jumlahSepatu', Math.max(1, form.jumlahSepatu - 1))} className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0F172A] font-bold" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>-</button>
                  <span className="text-[#0F172A] font-bold text-xl w-8 text-center">{form.jumlahSepatu}</span>
                  <button onClick={() => set('jumlahSepatu', form.jumlahSepatu + 1)} className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0F172A] font-bold" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>+</button>
                  <span className="text-[#64748B] text-sm ml-2">pasang</span>
                </div>
              </div>
              <div>
                <label className="block text-[#64748B] text-sm mb-2">Merek / Jenis Sepatu *</label>
                <input id="input-merek" className="input-field" placeholder="contoh: Nike Air Max, Adidas Ultraboost..." value={form.merekSepatu} onChange={(e) => set('merekSepatu', e.target.value)} />
              </div>
              <div>
                <label className="block text-[#64748B] text-sm mb-2">Catatan Tambahan</label>
                <textarea id="input-catatan" className="input-field resize-none" rows={2} placeholder="Perhatian khusus, kondisi sepatu, dll..." value={form.catatan} onChange={(e) => set('catatan', e.target.value)} />
              </div>
              <div className="rounded-xl p-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-[#EA580C]">{selectedService.name} × {form.jumlahSepatu}</span>
                  <span className="text-[#0F172A] font-bold">Rp {totalHarga.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary py-4 px-6"><ArrowLeft className="w-5 h-5" /></button>
            <button id="step2-next-btn" className="btn-primary flex-1 py-4 justify-center" disabled={!form.serviceId || !form.merekSepatu} onClick={() => setStep(3)} style={!form.serviceId || !form.merekSepatu ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
              Lanjut <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Pengiriman */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="text-[#0F172A] font-bold text-xl mb-6">Metode Pengiriman</h3>

          <div className="grid grid-cols-1 gap-3">
            {([
              { value: 'outlet', label: 'Antar ke Outlet', desc: 'Bawa langsung sepatu ke outlet kami', icon: '🏪' },
              { value: 'pickup', label: 'Pickup oleh Kurir', desc: 'Kurir kami jemput ke lokasi Anda', icon: '🚗' },
              { value: 'delivery', label: 'Delivery Setelah Selesai', desc: 'Kami kirim sepatu yang sudah selesai', icon: '📦' },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                id={`delivery-${opt.value}`}
                onClick={() => set('deliveryMethod', opt.value)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${form.deliveryMethod === opt.value ? 'ring-2 ring-orange-500' : ''}`}
                style={form.deliveryMethod === opt.value ? { background: '#FFF7ED', border: '1px solid #FED7AA' } : { background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="text-[#0F172A] font-semibold">{opt.label}</p>
                    <p className="text-[#64748B] text-sm">{opt.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#64748B] text-sm mb-2">Tanggal Booking *</label>
              <input id="input-tanggal" type="date" className="input-field" min={new Date().toISOString().split('T')[0]} value={form.bookingDate} onChange={(e) => set('bookingDate', e.target.value)} />
            </div>
            <div>
              <label className="block text-[#64748B] text-sm mb-2">Jam</label>
              <select id="input-jam" className="input-field" value={form.pickupTime} onChange={(e) => set('pickupTime', e.target.value)}>
                {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'].map((t) => (
                  <option key={t} value={t} style={{ background: '#FFFFFF' }}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary py-4 px-6"><ArrowLeft className="w-5 h-5" /></button>
            <button id="step3-next-btn" className="btn-primary flex-1 py-4 justify-center" disabled={!form.bookingDate} onClick={() => setStep(4)} style={!form.bookingDate ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
              Review <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Konfirmasi */}
      {step === 4 && (
        <div className="space-y-5">
          <h3 className="text-[#0F172A] font-bold text-xl mb-6">Konfirmasi Pesanan</h3>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
            {[
              { label: 'Nama', value: form.nama },
              { label: 'WhatsApp', value: form.whatsapp },
              { label: 'Alamat', value: form.alamat },
              { label: 'Layanan', value: selectedService?.name || '-' },
              { label: 'Jumlah Sepatu', value: `${form.jumlahSepatu} pasang` },
              { label: 'Merek Sepatu', value: form.merekSepatu },
              { label: 'Metode', value: form.deliveryMethod === 'outlet' ? 'Antar ke Outlet' : form.deliveryMethod === 'pickup' ? 'Pickup Kurir' : 'Delivery' },
              { label: 'Tanggal', value: form.bookingDate },
              { label: 'Jam', value: form.pickupTime },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-[#FFFFFF]'}`}>
                <span className="text-[#64748B]">{row.label}</span>
                <span className="text-[#0F172A] font-medium text-right max-w-[60%]">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between px-5 py-4 font-bold" style={{ borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span className="text-[#64748B]">Total Estimasi</span>
              <span className="text-[#EA580C] text-lg">Rp {totalHarga.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <p className="text-[#64748B] text-xs text-center">Harga dapat berubah setelah pengecekan kondisi sepatu oleh admin.</p>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="btn-secondary py-4 px-6"><ArrowLeft className="w-5 h-5" /></button>
            <button
              id="submit-booking-btn"
              className="btn-primary flex-1 py-4 justify-center"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <>Konfirmasi Booking <CheckCircle className="w-5 h-5" /></>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Booking Online
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Form <span className="gradient-text">Booking</span> Sepatu
          </h1>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Isi form di bawah ini dan sepatu kesayanganmu akan segera kami tangani!
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card-glass" style={{ border: '1px solid #E2E8F0' }}>
          <Suspense fallback={<div className="text-center text-slate-400 py-10">Loading...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
