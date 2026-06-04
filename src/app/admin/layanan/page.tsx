'use client';

import { useState } from 'react';
import { Edit2, Plus, X, CheckCircle } from 'lucide-react';
import { SERVICES as INITIAL_SERVICES } from '@/lib/data';
import type { Service } from '@/lib/data';

export default function AdminLayananPage() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [showModal, setShowModal] = useState(false);
  const [editSvc, setEditSvc] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  const openAdd = () => {
    setEditSvc(null);
    setForm({ name: '', description: '', price: 0, estimasi: '', icon: '🫧', color: 'from-blue-600 to-cyan-500', popular: false });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditSvc(s);
    setForm({ ...s });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editSvc) {
      setServices((prev) => prev.map((s) => (s.id === editSvc.id ? { ...s, ...form } as Service : s)));
    } else {
      setServices((prev) => [...prev, { id: `svc-${Date.now()}`, ...form } as Service]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Manajemen Layanan</h1>
          <p className="text-[#64748B] text-sm">{services.length} layanan tersedia</p>
        </div>
        <button onClick={openAdd} id="add-service-btn" className="btn-primary py-2.5 px-5 text-sm">
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.id} className="card-glass group relative" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
            {s.popular && <div className="absolute top-4 right-4 badge-orange text-xs">Populer</div>}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${s.color.replace('from-blue-600', 'from-orange-500').replace('to-cyan-500', 'to-yellow-500')}`}>
              {s.icon}
            </div>
            <h3 className="text-[#0F172A] font-bold text-lg mb-1">{s.name}</h3>
            <p className="text-[#64748B] text-xs mb-4 leading-relaxed">{s.description}</p>
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
              <div>
                <p className="text-[#0F172A] font-bold">Rp {s.price.toLocaleString('id-ID')}</p>
                <p className="text-[#64748B] text-xs">{s.estimasi}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0EA5E9] hover:bg-[#E0F2FE] transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
              <h3 className="text-[#0F172A] font-bold text-lg">{editSvc ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Nama Layanan</label>
                  <input className="input-field text-sm" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Harga (Rp)</label>
                  <input type="number" className="input-field text-sm" value={form.price || 0} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div>
                <label className="block text-[#64748B] text-xs mb-1.5">Deskripsi</label>
                <textarea className="input-field text-sm resize-none" rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Estimasi</label>
                  <input className="input-field text-sm" value={form.estimasi || ''} onChange={(e) => setForm({ ...form, estimasi: e.target.value })} placeholder="2-3 hari" />
                </div>
                <div>
                  <label className="block text-[#64748B] text-xs mb-1.5">Icon (Emoji)</label>
                  <input className="input-field text-sm" value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🫧" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="popular-check" checked={form.popular || false} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="w-4 h-4 rounded accent-orange-500" />
                <label htmlFor="popular-check" className="text-[#64748B] text-sm cursor-pointer">Tandai sebagai populer</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t" style={{ borderColor: '#E2E8F0' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-3 justify-center">Batal</button>
              <button onClick={handleSave} className="btn-primary flex-1 py-3 justify-center">
                <CheckCircle className="w-4 h-4" />
                {editSvc ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
