import Link from 'next/link';
import { Instagram, MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E2E8F0]" style={{ background: '#F8FAFC' }}>
      <div className="glow-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Bersih</span>
                <span className="text-[#0F172A]"> Treatment</span>
              </span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              Bikin Sepatumu Bersih, Wangi, dan Siap Dipakai Lagi. Layanan cuci sepatu profesional dengan teknologi terkini.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-all duration-200"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-all duration-200"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#0F172A] font-semibold mb-5">Menu</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/layanan', label: 'Layanan' },
                { href: '/booking', label: 'Booking Online' },
                { href: '/cek-pesanan', label: 'Cek Status Pesanan' },
                { href: '/galeri', label: 'Galeri' },
                { href: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#64748B] hover:text-[#F97316] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#0F172A] font-semibold mb-5">Layanan</h4>
            <ul className="space-y-3">
              {['Deep Clean', 'Fast Clean', 'Unyellowing', 'Repaint', 'Premium Treatment', 'Bag Cleaning'].map((s) => (
                <li key={s}>
                  <Link href="/layanan" className="text-[#64748B] hover:text-[#F97316] text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#0F172A] font-semibold mb-5">Informasi</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-[#64748B]">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span>Jl. Contoh No. 123, Kota, Indonesia</span>
              </li>
              <li className="flex gap-3 text-sm text-[#64748B]">
                <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span>0812-3456-7890</span>
              </li>
              <li className="flex gap-3 text-sm text-[#64748B]">
                <Instagram className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span>@bersihtreatment</span>
              </li>
              <li className="flex gap-3 text-sm text-[#64748B]">
                <Clock className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <div>
                  <p>Senin–Sabtu: 08.00–20.00</p>
                  <p>Minggu: 09.00–17.00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="glow-line mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748B]">
          <p>© {new Date().getFullYear()} Bersih Treatment. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:text-[#0F172A] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
