/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { EmailReceiptModal } from './components/EmailReceiptModal';
import { ReviewModal } from './components/ReviewModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, toasts, removeToast } = useSalon();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C2C2C]">
      {/* Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'gallery' && <GalleryPage />}
        {activePage === 'reviews' && <ReviewsPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <BookingModal />
      <EmailReceiptModal />
      <ReviewModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl border text-xs backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-[#2C2C2C]/90 text-white border-stone-600'
                : 'bg-[#2C2C2C]/95 text-white border-[#B76E79]/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#C9A27C] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#C9A27C] shrink-0" />
              )}
              <span className="font-medium leading-relaxed">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white ml-2 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <MainContent />
    </SalonProvider>
  );
}
