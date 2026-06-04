'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Halo Bersih Treatment, saya ingin booking layanan cuci sepatu.'
  );
  const href = `https://wa.me/6281234567890?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl text-white font-semibold text-sm shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-500/20 group"
      style={{
        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
        boxShadow: '0 8px 32px rgba(34,197,94,0.35)',
      }}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-300 animate-ping" />
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400" />
    </a>
  );
}
