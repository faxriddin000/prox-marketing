import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CMSProvider } from './context/CMSContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LeadModal } from './components/common/LeadModal';
import { FloatingAdminButton } from './components/common/FloatingAdminButton';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { ServicesPage } from './components/services/ServicesPage';
import { PricingPage } from './components/pricing/PricingPage';
import { PartnersPage } from './components/partners/PartnersPage';
import { ContactPage } from './components/contact/ContactPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationInitialService, setConsultationInitialService] = useState('Marketing');
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [servicesCategory, setServicesCategory] = useState('all');

  // Handle URL hash or direct routing simulation
  useEffect(() => {
    const handleRoute = () => {
      const rawHash = window.location.hash.replace('#', '').replace(/^\//, '').toLowerCase();
      const rawPath = window.location.pathname.replace(/^\//, '').toLowerCase();

      const isAuthed = isAuthenticated || Boolean(localStorage.getItem('prox_marketing_auth_user'));

      // Secret direct paths: /admin, #/admin, #admin, /management, #/management
      if (rawHash === 'admin' || rawHash === 'management' || rawPath === 'admin' || rawPath === 'management') {
        if (!isAuthed) {
          setAdminLoginModalOpen(true);
        } else {
          setCurrentView('admin');
          setAdminLoginModalOpen(false);
        }
        return;
      }

      if (['home', 'about', 'services', 'tariffs', 'contact'].includes(rawHash)) {
        setCurrentView(rawHash);
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, [isAuthenticated]);

  // Reset view to home upon logout if previously in admin view
  useEffect(() => {
    if (!isAuthenticated && currentView === 'admin') {
      setCurrentView('home');
      window.location.hash = 'home';
    }
  }, [isAuthenticated, currentView]);

  const handleViewChange = (view) => {
    if (view === 'admin' && !isAuthenticated) {
      setAdminLoginModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (service = 'Marketing') => {
    setConsultationInitialService(service);
    setConsultationModalOpen(true);
  };

  const handleSelectServiceCategory = (cat) => {
    setServicesCategory(cat);
  };

  // If in Admin View and authenticated
  if (currentView === 'admin' && isAuthenticated) {
    return (
      <AdminDashboard
        onBackToSite={() => handleViewChange('home')}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      {/* Header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onSelectCategory={handleSelectServiceCategory}
        onOpenConsultation={() => handleOpenConsultation('Konsultatsiya')}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onViewChange={handleViewChange}
            onOpenConsultation={handleOpenConsultation}
            onSelectCategory={handleSelectServiceCategory}
          />
        )}
        {currentView === 'about' && (
          <AboutPage
            onOpenConsultation={handleOpenConsultation}
          />
        )}
        {currentView === 'services' && (
          <ServicesPage
            activeCategory={servicesCategory}
            onOpenConsultation={handleOpenConsultation}
          />
        )}
        {currentView === 'tariffs' && (
          <PricingPage
            onOpenConsultation={handleOpenConsultation}
          />
        )}
        {currentView === 'partners' && (
          <PartnersPage
            onOpenConsultation={handleOpenConsultation}
          />
        )}
        {currentView === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onViewChange={handleViewChange}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
      />

      {/* Subtle Dark Glassmorphism Admin Panel Button */}
      <FloatingAdminButton
        onClick={() => {
          if (isAuthenticated || Boolean(localStorage.getItem('prox_marketing_auth_user'))) {
            setCurrentView('admin');
            window.location.hash = 'admin';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setAdminLoginModalOpen(true);
          }
        }}
      />

      {/* Consultation Modal */}
      <LeadModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialService={consultationInitialService}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={() => {
          setAdminLoginModalOpen(false);
          setCurrentView('admin');
          window.location.hash = 'admin';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <CMSProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CMSProvider>
    </LanguageProvider>
  );
}
