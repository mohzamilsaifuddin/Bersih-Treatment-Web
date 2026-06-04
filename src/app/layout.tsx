import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bersih Treatment — Cuci Sepatu Profesional',
    template: '%s | Bersih Treatment',
  },
  description:
    'Bersih Treatment adalah layanan cuci sepatu profesional dengan teknologi terkini. Booking online mudah, tracking pesanan realtime, hasil terjamin bersih dan wangi.',
  keywords: ['cuci sepatu', 'laundry sepatu', 'bersih treatment', 'shoe cleaning', 'sepatu bersih'],
  openGraph: {
    title: 'Bersih Treatment — Cuci Sepatu Profesional',
    description: 'Bikin Sepatumu Bersih, Wangi, dan Siap Dipakai Lagi.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
