import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  StylistItem,
  AppointmentItem,
  ReviewItem,
  GalleryItem,
  PageRoute,
} from '../types';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface SalonContextType {
  services: ServiceItem[];
  stylists: StylistItem[];
  reviews: ReviewItem[];
  gallery: GalleryItem[];
  appointments: AppointmentItem[];
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  preselectedServiceId: string | null;
  openBookingWithService: (serviceId?: string) => void;
  activeReceiptAppointment: AppointmentItem | null;
  setActiveReceiptAppointment: (apt: AppointmentItem | null) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  adminToken: string | null;
  isAdminLoggedIn: boolean;
  adminLogin: (token: string) => void;
  adminLogout: () => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  // Actions
  bookAppointment: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceId: string;
    stylistId: string;
    date: string;
    time: string;
    notes?: string;
  }) => Promise<{ success: boolean; appointment?: AppointmentItem; error?: string }>;
  submitReview: (data: {
    clientName: string;
    rating: number;
    serviceName: string;
    stylistName: string;
    comment: string;
  }) => Promise<{ success: boolean; review?: ReviewItem; error?: string }>;
  submitContact: (data: {
    name: string;
    email: string;
    phone: string;
    serviceInterest: string;
    message: string;
  }) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateAppointmentStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => Promise<boolean>;
  deleteAppointment: (id: string) => Promise<boolean>;
  createService: (service: Omit<ServiceItem, 'id'>) => Promise<boolean>;
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  createGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  refreshData: () => Promise<void>;
  averageRating: number;
  totalReviewsCount: number;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [stylists, setStylists] = useState<StylistItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [averageRating, setAverageRating] = useState<number>(4.9);
  const [totalReviewsCount, setTotalReviewsCount] = useState<number>(161);

  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [activeReceiptAppointment, setActiveReceiptAppointment] = useState<AppointmentItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('wave_bar_admin_token') || null;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openBookingWithService = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setIsBookingOpen(true);
  };

  const adminLogin = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('wave_bar_admin_token', token);
    addToast('Welcome to Wave Bar Management Console', 'success');
  };

  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('wave_bar_admin_token');
    addToast('Admin session closed', 'info');
  };

  const refreshData = async () => {
    try {
      // 1. Fetch Services
      const srvRes = await fetch('/api/services');
      if (srvRes.ok) {
        const data = await srvRes.json();
        if (data.services) setServices(data.services);
      }

      // 2. Fetch Stylists
      const styRes = await fetch('/api/stylists');
      if (styRes.ok) {
        const data = await styRes.json();
        if (data.stylists) setStylists(data.stylists);
      }

      // 3. Fetch Reviews
      const revRes = await fetch('/api/reviews');
      if (revRes.ok) {
        const data = await revRes.json();
        if (data.reviews) setReviews(data.reviews);
        if (data.average) setAverageRating(data.average);
        if (data.totalCount) setTotalReviewsCount(data.totalCount);
      }

      // 4. Fetch Gallery
      const galRes = await fetch('/api/gallery');
      if (galRes.ok) {
        const data = await galRes.json();
        if (data.gallery) setGallery(data.gallery);
      }

      // 5. Fetch Appointments
      const aptRes = await fetch('/api/appointments');
      if (aptRes.ok) {
        const data = await aptRes.json();
        if (data.appointments) setAppointments(data.appointments);
      }
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Actions
  const bookAppointment = async (payload: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceId: string;
    stylistId: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to book appointment' };
      }
      setAppointments((prev) => [data.appointment, ...prev]);
      addToast(`Appointment confirmed! Booking code: ${data.appointment.code}`, 'success');
      return { success: true, appointment: data.appointment };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const submitReview = async (payload: {
    clientName: string;
    rating: number;
    serviceName: string;
    stylistName: string;
    comment: string;
  }) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to submit review' };
      }
      setReviews((prev) => [data.review, ...prev]);
      addToast('Thank you for your review!', 'success');
      return { success: true, review: data.review };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const submitContact = async (payload: {
    name: string;
    email: string;
    phone: string;
    serviceInterest: string;
    message: string;
  }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to send message' };
      }
      addToast('Your inquiry has been received. We will respond shortly.', 'success');
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments((prev) => prev.map((a) => (a.id === id ? data.appointment : a)));
        addToast(`Appointment updated to ${status}`, 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        addToast('Appointment removed', 'info');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const createService = async (service: Omit<ServiceItem, 'id'>) => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(service),
      });
      if (res.ok) {
        const data = await res.json();
        setServices((prev) => [data.service, ...prev]);
        addToast('New service added successfully', 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? data.service : s)));
        addToast('Service updated', 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteService = async (id: string) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        addToast('Service deleted', 'info');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const createGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const data = await res.json();
        setGallery((prev) => [data.item, ...prev]);
        addToast('Gallery item added', 'success');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!adminToken) return false;
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
        addToast('Gallery item removed', 'info');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SalonContext.Provider
      value={{
        services,
        stylists,
        reviews,
        gallery,
        appointments,
        activePage,
        setActivePage,
        isBookingOpen,
        setIsBookingOpen,
        preselectedServiceId,
        openBookingWithService,
        activeReceiptAppointment,
        setActiveReceiptAppointment,
        isReviewModalOpen,
        setIsReviewModalOpen,
        adminToken,
        isAdminLoggedIn: !!adminToken,
        adminLogin,
        adminLogout,
        toasts,
        addToast,
        removeToast,
        bookAppointment,
        submitReview,
        submitContact,
        updateAppointmentStatus,
        deleteAppointment,
        createService,
        updateService,
        deleteService,
        createGalleryItem,
        deleteGalleryItem,
        refreshData,
        averageRating,
        totalReviewsCount,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
