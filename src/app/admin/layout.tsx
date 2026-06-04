'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Users, Wrench,
  CreditCard, Image, BarChart3, Settings, LogOut,
  Menu, X, Sparkles, ChevronRight,
} from 'lucide-react';
import { isAdminLoggedIn, logoutAdmin, getAdminRole } from '@/lib/storage';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pesanan', label: 'Pesanan', icon: ShoppingBag },
  { href: '/admin/pelanggan', label: 'Pelanggan', icon: Users },
  { href: '/admin/layanan', label: 'Layanan', icon: Wrench },
  { href: '/admin/pembayaran', label: 'Pembayaran', icon: CreditCard },
  { href: '/admin/galeri', label: 'Galeri', icon: Image },
  { href: '/admin/laporan', label: 'Laporan', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('admin');

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (!isAdminLoggedIn()) {
      router.replace('/admin/login');
    } else {
      setRole(getAdminRole());
    }
  }, [router, pathname]);

  const handleLogout = () => {
    logoutAdmin();
    router.replace('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:relative lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '260px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0' }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: '#E2E8F0' }}>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[#0F172A] font-bold text-sm">Bersih Treatment</p>
              <p className="text-[#64748B] text-xs capitalize">{role}</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#64748B] hover:text-[#0F172A] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${active ? 'text-[#EA580C]' : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'}`}
                style={active ? { background: '#FFF7ED', border: '1px solid #FED7AA' } : {}}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#F97316]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`} />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#F97316]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 space-y-1 border-t pt-4" style={{ borderColor: '#E2E8F0' }}>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200">
            <Settings className="w-4 h-4 text-[#64748B]" />
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full"
          >
            <LogOut className="w-4 h-4 text-[#64748B]" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-4 border-b" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
          <button onClick={() => setSidebarOpen(true)} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-[#0F172A] font-semibold text-sm">Bersih Treatment Admin</span>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
