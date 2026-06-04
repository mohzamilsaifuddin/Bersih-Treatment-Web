'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Star, Shield, Clock, Truck, CheckCircle,
  Sparkles, ChevronRight, MessageCircle, MapPin, Phone
} from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '@/lib/data';

// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c < 1200 ? c + 30 : 1200));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 animate-pulse-slow" style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-8 animate-pulse-slow" style={{ background: 'radial-gradient(circle, #EA580C, transparent 70%)', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #F97316, transparent 60%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Layanan Cuci Sepatu Profesional #1
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-[#0F172A]">Bikin Sepatumu</span>
              <br />
              <span className="gradient-text">Bersih, Wangi</span>
              <br />
              <span className="text-[#0F172A]">& Siap Dipakai</span>
            </h1>

            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed max-w-xl">
              Bersih Treatment hadir dengan layanan cuci sepatu profesional. Booking online mudah, pickup & delivery, dan hasil dijamin memuaskan!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" id="hero-booking-btn" className="btn-primary text-base py-4 px-8 text-center">
                Booking Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/cek-pesanan" id="hero-track-btn" className="btn-secondary text-base py-4 px-8 text-center">
                Cek Status Pesanan
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: `${count}+`, label: 'Pelanggan' },
                { value: '98%', label: 'Kepuasan' },
                { value: '6', label: 'Jenis Layanan' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-[#64748B] text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="card-glass p-8 rounded-3xl" style={{ border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg,#F97316,#EA580C)' }}>
                    🫧
                  </div>
                  <div>
                    <p className="text-[#0F172A] font-bold text-lg">Deep Clean</p>
                    <p className="text-[#64748B] text-sm">Layanan Terpopuler</p>
                  </div>
                  <div className="ml-auto badge-orange">Popular</div>
                </div>

                <div className="space-y-3 mb-6">
                  {['Pembersihan upper & outsole', 'Insole dicuci terpisah', 'Hasil bersih & wangi'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[#64748B] text-sm">
                      <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-[#0F172A]">Rp 45K</span>
                    <span className="text-[#64748B] text-sm"> / pasang</span>
                  </div>
                  <Link href="/booking" className="btn-primary py-2.5 px-5 text-sm">
                    Pesan
                  </Link>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 animate-float">
                <Star className="w-4 h-4 text-[#F97316]" fill="currentColor" />
                <span className="text-[#0F172A] text-sm font-semibold">4.9 / 5.0</span>
              </div>

              <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 flex items-center gap-2" style={{ animationDelay: '1s' }}>
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                <span className="text-[#0F172A] text-sm font-semibold">Pesanan Baru Masuk!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 0C1200 40 900 60 720 60C540 60 240 40 0 0L0 60Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}

// ── Keunggulan Section ────────────────────────────────────────
function KeunggulanSection() {
  const items = [
    { icon: Shield, title: 'Dijamin Aman', desc: 'Sepatu ditangani oleh tenaga profesional berpengalaman dengan bahan-bahan berkualitas.', color: 'text-[#F97316]' },
    { icon: Clock, title: 'Pengerjaan Cepat', desc: 'Fast Clean selesai dalam 1 hari, tidak perlu menunggu lama untuk sepatu bersih.', color: 'text-[#EA580C]' },
    { icon: Truck, title: 'Antar-Jemput', desc: 'Layanan pickup dan delivery ke lokasi Anda tanpa biaya tambahan di area tertentu.', color: 'text-[#F97316]' },
    { icon: Star, title: 'Rating Terbaik', desc: 'Lebih dari 98% pelanggan puas dengan hasil kerja dan pelayanan Bersih Treatment.', color: 'text-[#EA580C]' },
    { icon: MessageCircle, title: 'Mudah Dihubungi', desc: 'Admin responsif via WhatsApp setiap hari untuk menjawab pertanyaan pelanggan.', color: 'text-[#F97316]' },
    { icon: CheckCircle, title: 'Tracking Online', desc: 'Pantau status pengerjaan sepatu Anda secara real-time melalui website.', color: 'text-[#EA580C]' },
  ];

  return (
    <section className="py-24" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Mengapa Memilih Kami
          </div>
          <h2 className="section-title text-[#0F172A]">
            Keunggulan <span className="gradient-text">Bersih Treatment</span>
          </h2>
          <p className="section-subtitle">
            Kami berkomitmen memberikan layanan terbaik dengan standar profesional yang tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="card-glass group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                style={{ background: '#FFF7ED' }}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Layanan Populer Section ───────────────────────────────────
function LayananSection() {
  const popular = SERVICES.filter((s) => s.popular);
  const all = SERVICES.slice(0, 4);

  return (
    <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Layanan Kami
          </div>
          <h2 className="section-title text-[#0F172A]">
            Layanan <span className="gradient-text">Pilihan Terbaik</span>
          </h2>
          <p className="section-subtitle">
            Dari pembersihan biasa hingga perawatan premium untuk sepatu branded kesayanganmu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {SERVICES.slice(0, 4).map((service) => (
            <div key={service.id} className="card-glass group relative overflow-hidden">
              {service.popular && (
                <div className="absolute top-4 right-4 badge-blue text-xs">Populer</div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-gradient-to-br from-orange-500 to-amber-500 opacity-90`}>
                {service.icon}
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">{service.name}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">Rp {service.price.toLocaleString('id-ID')}</p>
                  <p className="text-[#64748B] text-xs">{service.estimasi}</p>
                </div>
                <Link href="/booking" className="w-9 h-9 rounded-xl flex items-center justify-center text-[#F97316] hover:text-[#EA580C] hover:bg-[#FFF7ED] transition-all duration-200 hover:scale-110" style={{ background: '#FFF7ED' }}>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/layanan" id="see-all-services-btn" className="btn-secondary py-3 px-8">
            Lihat Semua Layanan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Booking Online', desc: 'Isi form booking dengan detail sepatu dan pilih layanan yang kamu mau.', icon: '📱' },
    { num: '02', title: 'Pickup / Antar', desc: 'Pilih antar langsung ke outlet atau kami jemput ke lokasi kamu.', icon: '🚗' },
    { num: '03', title: 'Proses Pengerjaan', desc: 'Tim profesional kami mengerjakan sepatumu dengan penuh ketelitian.', icon: '🫧' },
    { num: '04', title: 'Selesai & Antar Balik', desc: 'Sepatu bersih diantar kembali atau bisa diambil di outlet.', icon: '✨' },
  ];

  return (
    <section className="py-24" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Cara Kerja
          </div>
          <h2 className="section-title text-[#0F172A]">
            Cara Order yang <span className="gradient-text">Mudah & Cepat</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-px" style={{ background: 'linear-gradient(90deg, #F97316, transparent)' }} />
              )}
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
                {step.icon}
              </div>
              <div className="text-[#F97316] font-bold text-xs mb-2 tracking-widest">{step.num}</div>
              <h3 className="text-[#0F172A] font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/booking" id="howitworks-booking-btn" className="btn-primary py-4 px-10 text-base">
            Mulai Booking
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Testimoni Section ─────────────────────────────────────────
function TestimoniSection() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Testimoni
          </div>
          <h2 className="section-title text-[#0F172A]">
            Kata Mereka yang <span className="gradient-text">Sudah Percaya</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="card-glass">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F97316]" fill="currentColor" />
                ))}
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed mb-5">&ldquo;{t.komentar}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  {t.namaPelanggan[0]}
                </div>
                <div>
                  <p className="text-[#0F172A] font-semibold text-sm">{t.namaPelanggan}</p>
                  <p className="text-[#64748B] text-xs">{t.layanan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24" style={{ background: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-3xl p-12 overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #EA580C, transparent)' }} />

          <div className="relative">
            <div className="text-5xl mb-6">👟</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Sepatumu Butuh <span className="gradient-text">Perawatan?</span>
            </h2>
            <p className="text-[#64748B] text-lg mb-8">
              Jangan biarkan sepatu favoritmu kotor. Booking sekarang dan rasakan perbedaannya!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" id="cta-booking-btn" className="btn-primary py-4 px-10 text-base">
                Booking Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Bersih%20Treatment%2C%20saya%20ingin%20booking%20layanan%20cuci%20sepatu."
                target="_blank"
                rel="noopener noreferrer"
                id="cta-wa-btn"
                className="btn-secondary py-4 px-10 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <KeunggulanSection />
      <LayananSection />
      <HowItWorks />
      <TestimoniSection />
      <CTASection />
    </>
  );
}
