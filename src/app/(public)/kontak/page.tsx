'use client';

import { useState } from 'react';
import { MapPin, Phone, Instagram, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function KontakPage() {
  const [form, setForm] = useState({ nama: '', wa: '', pesan: '' });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.nama || !form.pesan) return;
    const text = encodeURIComponent(`Halo Bersih Treatment!\n\nNama: ${form.nama}\nWA: ${form.wa}\n\nPesan:\n${form.pesan}`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contacts = [
    { icon: MapPin, label: 'Alamat', value: 'Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Indonesia', color: 'text-[#F97316]' },
    { icon: Phone, label: 'WhatsApp', value: '0812-3456-7890', color: 'text-[#22C55E]', href: 'https://wa.me/6281234567890' },
    { icon: Instagram, label: 'Instagram', value: '@bersihtreatment', color: 'text-[#EA580C]', href: 'https://instagram.com/bersihtreatment' },
  ];

  const hours = [
    { day: 'Senin – Jumat', time: '08.00 – 20.00' },
    { day: 'Sabtu', time: '08.00 – 20.00' },
    { day: 'Minggu', time: '09.00 – 17.00' },
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Hubungi Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Kontak & <span className="gradient-text">Lokasi</span>
          </h1>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Ada pertanyaan? Kami siap membantu kamu setiap hari.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contacts.map((c) => (
              <div key={c.label} className="card-glass flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF7ED' }}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={`font-semibold ${c.color} hover:underline`}>{c.value}</a>
                  ) : (
                    <p className="text-[#0F172A] font-semibold">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="card-glass">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF7ED' }}>
                  <Clock className="w-5 h-5 text-[#F97316]" />
                </div>
                <p className="text-[#0F172A] font-semibold">Jam Operasional</p>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-[#64748B]">{h.day}</span>
                    <span className="text-[#0F172A] font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="card-glass overflow-hidden p-0">
              <div className="w-full flex items-center justify-center rounded-2xl" style={{ height: '220px', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.05))' }}>
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-[#F97316] mx-auto mb-2" />
                  <p className="text-[#64748B] text-sm">Google Maps</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F97316] text-xs hover:text-[#EA580C] transition-colors"
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="card-glass" style={{ border: '1px solid #E2E8F0' }}>
              <h2 className="text-[#0F172A] font-bold text-xl mb-6">Kirim Pesan</h2>

              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
                  <p className="text-[#0F172A] font-semibold mb-1">Pesan Terkirim!</p>
                  <p className="text-[#64748B] text-sm">Kami akan segera merespons pesanmu.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#64748B] text-sm mb-2">Nama *</label>
                    <input id="contact-nama" className="input-field" placeholder="Nama kamu" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[#64748B] text-sm mb-2">WhatsApp</label>
                    <input id="contact-wa" className="input-field" placeholder="08xx-xxxx-xxxx" value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[#64748B] text-sm mb-2">Pesan *</label>
                    <textarea id="contact-pesan" className="input-field resize-none" rows={5} placeholder="Tulis pesanmu di sini..." value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} />
                  </div>
                  <button
                    id="send-message-btn"
                    onClick={handleSend}
                    disabled={!form.nama || !form.pesan}
                    className="btn-primary w-full py-4 justify-center"
                    style={!form.nama || !form.pesan ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    <Send className="w-5 h-5" />
                    Kirim via WhatsApp
                  </button>

                  <div className="glow-line" />

                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Bersih%20Treatment!"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="direct-wa-btn"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', boxShadow: '0 4px 20px rgba(34,197,94,0.25)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat Langsung WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
