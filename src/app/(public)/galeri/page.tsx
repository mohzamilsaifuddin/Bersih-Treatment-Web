'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/data';

export default function GaleriPage() {
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [view, setView] = useState<'before' | 'after'>('after');

  return (
    <div className="pt-20 min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#EA580C' }}>
            Galeri Before-After
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Hasil Nyata <span className="gradient-text">Bersih Treatment</span>
          </h1>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Lihat transformasi sepatu pelanggan kami. Dari kotor menjadi bersih bersinar!
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`gallery-${item.id}`}
              className="card-glass overflow-hidden cursor-pointer group"
              onClick={() => { setSelected(item); setView('after'); }}
            >
              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-3 mb-5 relative">
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute top-2 left-2 z-10 badge-red text-xs">Before</div>
                  <img
                    src={item.fotoBefore}
                    alt={`Before - ${item.deskripsi}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute top-2 left-2 z-10 badge-green text-xs">After</div>
                  <img
                    src={item.fotoAfter}
                    alt={`After - ${item.deskripsi}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[#0F172A] font-semibold mb-1">{item.deskripsi}</h3>
                  <p className="text-[#64748B] text-xs">{item.tanggalUpload}</p>
                </div>
                <span className="badge-orange text-xs ml-3 flex-shrink-0">{item.layanan}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))', border: '1px solid #FED7AA' }}>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Mau Sepatu Kamu Jadi Seperti Ini?</h2>
          <p className="text-[#64748B] mb-6">Booking sekarang dan buktikan kualitas Bersih Treatment!</p>
          <a href="/booking" className="btn-primary py-3 px-8 inline-flex">
            Booking Sekarang →
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
          <div className="max-w-3xl w-full" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '24px' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[#0F172A] font-bold text-lg">{selected.deskripsi}</h3>
                <span className="badge-orange text-xs">{selected.layanan}</span>
              </div>
              <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle */}
            <div className="flex gap-2 mb-4">
              {(['before', 'after'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${view === v ? 'text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                  style={view === v ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : { background: '#F8FAFC' }}
                >
                  {v === 'before' ? 'Sebelum' : 'Sesudah'}
                </button>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={view === 'before' ? selected.fotoBefore : selected.fotoAfter}
                alt={selected.deskripsi}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
