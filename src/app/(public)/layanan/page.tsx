import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Layanan Cuci Sepatu',
  description: 'Pilih layanan cuci sepatu Bersih Treatment sesuai kebutuhan. Deep Clean, Fast Clean, Unyellowing, Repaint, hingga Premium Treatment.',
};

export default function LayananPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Katalog Layanan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Semua <span className="gradient-text">Layanan</span> Kami
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Dari pembersihan ringan hingga perawatan premium, kami siap melayani semua kebutuhan perawatan sepatumu.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} id={`service-${service.id}`} className="card-glass group relative overflow-hidden flex flex-col">
              {service.popular && (
                <div className="absolute top-5 right-5 badge-orange text-xs">🔥 Populer</div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 bg-gradient-to-br from-orange-500 to-amber-500 bg-opacity-80`}>
                {service.icon}
              </div>

              <h2 className="text-[#0F172A] font-bold text-2xl mb-3">{service.name}</h2>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.name === 'Deep Clean' && ['Pembersihan upper & outsole', 'Cuci insole terpisah', 'Proteksi setelah cuci', 'Aroma wangi tahan lama'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {service.name === 'Fast Clean' && ['Pembersihan cepat & efisien', 'Cocok untuk sepatu ringan', 'Siap dalam 1 hari', 'Harga terjangkau'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {service.name === 'Unyellowing' && ['Hilangkan noda kuning', 'Proses UV khusus', 'Midsole putih kembali', 'Tahan lama'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {service.name === 'Repaint' && ['Cat premium berkualitas', 'Warna merata & rata', 'Tidak cepat ngelotok', 'Pilihan warna lengkap'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {service.name === 'Premium Treatment' && ['Untuk sepatu branded', 'Material sensitif aman', 'Conditioner khusus', 'Hasil seperti baru'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {service.name === 'Bag Cleaning' && ['Berbagai jenis material', 'Pembersihan dalam & luar', 'Hilangkan noda membandel', 'Deodorizer alami'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#64748B] text-sm">
                    <CheckCircle className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="glow-line mb-6" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#64748B] text-sm mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    {service.estimasi}
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A]">
                    Rp {service.price.toLocaleString('id-ID')}
                    <span className="text-[#64748B] text-sm font-normal"> / pasang</span>
                  </p>
                </div>
                <Link
                  href={`/booking?service=${service.id}`}
                  id={`book-${service.id}-btn`}
                  className="btn-primary py-3 px-5 text-sm"
                >
                  Booking
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 rounded-2xl p-8 text-center" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
          <p className="text-[#64748B] text-sm mb-2">Butuh konsultasi layanan yang tepat untuk sepatumu?</p>
          <a
            href="https://wa.me/6281234567890?text=Halo%2C%20saya%20butuh%20konsultasi%20layanan%20cuci%20sepatu."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F97316] font-semibold hover:text-[#EA580C] transition-colors"
          >
            Hubungi kami via WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
