'use client';

import { useState } from 'react';
import { Plus, X, CheckCircle } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/data';
import type { GalleryItem } from '@/lib/data';

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Partial<GalleryItem>>({
    fotoBefore: '', fotoAfter: '', deskripsi: '', layanan: 'Deep Clean',
    tanggalUpload: new Date().toISOString().split('T')[0],
  });

  const handleSave = () => {
    setItems((prev) => [...prev, { id: `gal-${Date.now()}`, ...form } as GalleryItem]);
    setShowModal(false);
    setForm({ fotoBefore: '', fotoAfter: '', deskripsi: '', layanan: 'Deep Clean', tanggalUpload: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Galeri Before-After</h1>
          <p className="text-[#64748B] text-sm">{items.length} item galeri</p>
        </div>
        <button onClick={() => setShowModal(true)} id="add-gallery-btn" className="btn-primary py-2.5 px-5 text-sm">
          <Plus className="w-4 h-4" /> Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="card-glass group" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <div className="absolute top-2 left-2 z-10 badge-red text-xs">Before</div>
                <img src={item.fotoBefore} alt="before" className="w-full h-full object-cover" />
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <div className="absolute top-2 left-2 z-10 badge-green text-xs">After</div>
                <img src={item.fotoAfter} alt="after" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#0F172A] font-medium text-sm">{item.deskripsi}</p>
                <p className="text-[#64748B] text-xs mt-0.5">{item.layanan} · {item.tanggalUpload}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
              <h3 className="text-[#0F172A] font-bold text-lg">Tambah Foto Galeri</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[#64748B] text-xs mb-1.5">URL Foto Before</label>
                <input className="input-field text-sm" placeholder="https://..." value={form.fotoBefore || ''} onChange={(e) => setForm({ ...form, fotoBefore: e.target.value })} />
              </div>
              <div>
                <label className="block text-[#64748B] text-xs mb-1.5">URL Foto After</label>
                <input className="input-field text-sm" placeholder="https://..." value={form.fotoAfter || ''} onChange={(e) => setForm({ ...form, fotoAfter: e.target.value })} />
              </div>
              <div>
                <label className="block text-[#64748B] text-xs mb-1.5">Deskripsi</label>
                <input className="input-field text-sm" placeholder="Nike Air Max kotor jadi bersih..." value={form.deskripsi || ''} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Layanan</label>
                  <select className="input-field text-sm" style={{ background: '#FFFFFF' }} value={form.layanan || ''} onChange={(e) => setForm({ ...form, layanan: e.target.value })}>
                    {['Deep Clean','Fast Clean','Unyellowing','Repaint','Premium Treatment','Bag Cleaning'].map((l) => (
                      <option key={l} value={l} style={{ background: '#FFFFFF' }}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Tanggal</label>
                  <input type="date" className="input-field text-sm" value={form.tanggalUpload || ''} onChange={(e) => setForm({ ...form, tanggalUpload: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t" style={{ borderColor: '#E2E8F0' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-3 justify-center">Batal</button>
              <button onClick={handleSave} className="btn-primary flex-1 py-3 justify-center">
                <CheckCircle className="w-4 h-4" /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
