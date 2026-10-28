export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  price: number;
  description: string;
  badge?: string;
  popular?: boolean;
}

export interface StylistItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  avatar: string;
  rating: number;
  reviewsCount: number;
}

export interface AppointmentItem {
  id: string;
  code: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  price: number;
  durationMinutes: number;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  rating: number;
  serviceName: string;
  stylistName: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  stylist: string;
  description: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export type PageRoute = 'home' | 'about' | 'services' | 'gallery' | 'reviews' | 'contact' | 'admin';
