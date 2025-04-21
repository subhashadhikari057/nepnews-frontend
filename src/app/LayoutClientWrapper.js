'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastProvider from '../components/ToastProvider';
import Elegant from '../components/Elegant';

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Only run splash once, on first visit to homepage
    if (isHomePage && !sessionStorage.getItem('splashShown')) {
      const timer = setTimeout(() => {
        setSplashDone(true);
        sessionStorage.setItem('splashShown', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setSplashDone(true);
    }
  }, [isHomePage]);

  const showSplash = isHomePage && !splashDone;

  return (
    <>
      {!showSplash && <Navbar />}
      <ToastProvider />
      <main className="flex-grow relative">
        {showSplash && (
          <div className="fixed inset-0 z-50 bg-black">
            <Elegant />
          </div>
        )}
        {!showSplash && children}
      </main>
      {!showSplash && <Footer />}
    </>
  );
}
