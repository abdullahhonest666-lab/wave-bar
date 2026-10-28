import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'wave_bar_luxury_salon_secret_key_2026';

app.use(express.json());

// In-Memory & MongoDB Unified Database Store
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
  source?: 'Google Maps' | 'Website';
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

const googleRating = 4.9;
const googleReviewCount = 161;

const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Straight Blow-dry (Standard)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 1500,
    description: 'Straight blow-dry at the Standard menu price.',
    popular: true,
  },
  {
    id: 'srv-2',
    name: 'Straight Blow-dry (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 2000,
    description: 'Straight blow-dry at the L’Oréal menu price.',
  },
  {
    id: 'srv-3',
    name: 'Curl / Wavy Blow-dry (Standard)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 1500,
    description: 'Curl or wavy blow-dry at the Standard menu price.',
    popular: true,
  },
  {
    id: 'srv-4',
    name: 'Curl / Wavy Blow-dry (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 2000,
    description: 'Curl or wavy blow-dry at the L’Oréal menu price.',
  },
  {
    id: 'srv-5',
    name: 'In & Out (Standard)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 1500,
    description: 'In & Out service at the Standard menu price.',
  },
  {
    id: 'srv-6',
    name: 'In & Out (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 2000,
    description: 'In & Out service at the L’Oréal menu price.',
  },
  {
    id: 'srv-7',
    name: 'Hair Wash (Standard)',
    category: 'Hair Services',
    durationMinutes: 30,
    price: 500,
    description: 'Hair wash at the Standard menu price.',
  },
  {
    id: 'srv-8',
    name: 'Hair Wash (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 30,
    price: 750,
    description: 'Hair wash at the L’Oréal menu price.',
  },
  {
    id: 'srv-9',
    name: 'Blow-dry Refresh (Standard)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 800,
    description: 'Blow-dry refresh at the Standard menu price.',
  },
  {
    id: 'srv-10',
    name: 'Blow-dry Refresh (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 45,
    price: 1500,
    description: 'Blow-dry refresh at the L’Oréal menu price.',
  },
  {
    id: 'srv-11',
    name: 'Hairdo (Standard)',
    category: 'Hair Services',
    durationMinutes: 60,
    price: 1500,
    description: 'Hairdo at the Standard menu price.',
  },
  {
    id: 'srv-12',
    name: 'Hairdo (L’Oréal)',
    category: 'Hair Services',
    durationMinutes: 60,
    price: 1750,
    description: 'Hairdo at the L’Oréal menu price.',
  },
  {
    id: 'srv-13',
    name: 'Hair Oiling & Head Massage',
    category: 'Hair Treatments',
    durationMinutes: 60,
    price: 2500,
    description: 'Hair oiling and head massage at the listed menu price.',
    popular: true,
  },
  {
    id: 'srv-14',
    name: 'Protein Treatment with Paddle Dry',
    category: 'Hair Treatments',
    durationMinutes: 90,
    price: 2500,
    description: 'Protein treatment with paddle dry at the listed menu price.',
  },
  {
    id: 'srv-15',
    name: 'L’Oréal Treatment with Paddle Dry',
    category: 'Hair Treatments',
    durationMinutes: 90,
    price: 3000,
    description: 'L’Oréal treatment with paddle dry at the listed menu price.',
  },
  {
    id: 'srv-16',
    name: 'Hair Cut (Standard)',
    category: 'Haircuts',
    durationMinutes: 60,
    price: 4000,
    description: 'Hair cut at the Standard menu price.',
  },
  {
    id: 'srv-17',
    name: 'Hair Cut (L’Oréal)',
    category: 'Haircuts',
    durationMinutes: 60,
    price: 4250,
    description: 'Hair cut at the L’Oréal menu price.',
  },
  {
    id: 'srv-18',
    name: 'Straight Trim',
    category: 'Haircuts',
    durationMinutes: 30,
    price: 600,
    description: 'Straight trim at the listed menu price.',
  },
  {
    id: 'srv-19',
    name: 'Root Touch-up (Standard)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 2500,
    description: 'Root touch-up application at the Standard menu price.',
  },
  {
    id: 'srv-20',
    name: 'Root Touch-up (L’Oréal)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 3000,
    description: 'Root touch-up application at the L’Oréal menu price.',
  },
  {
    id: 'srv-21',
    name: 'Root Touch-up (Majirel)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 4500,
    description: 'Majirel root touch-up at the listed price.',
  },
  {
    id: 'srv-22',
    name: 'Root Touch-up (Inoa)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 5500,
    description: 'Inoa root touch-up at the listed price.',
  },
  {
    id: 'srv-23',
    name: 'Gloss (Full Head)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 6500,
    description: 'Full-head gloss at the listed price.',
  },
  {
    id: 'srv-24',
    name: 'Tone / Refresh (Full Head)',
    category: 'Hair Colour',
    durationMinutes: 90,
    price: 5000,
    description: 'Full-head tone or refresh at the listed price.',
  },
  {
    id: 'srv-25',
    name: 'Full Base Colour',
    category: 'Hair Colour',
    durationMinutes: 120,
    price: 8000,
    description: 'Full base colour; final price depends on the service.',
    badge: 'Starting at',
  },
  {
    id: 'srv-26',
    name: 'Highlights (Half Head)',
    category: 'Hair Colour',
    durationMinutes: 150,
    price: 15000,
    description: 'Half-head highlights; final price depends on the service.',
    badge: 'Starting at',
  },
  {
    id: 'srv-27',
    name: 'Highlights (Full Head)',
    category: 'Hair Colour',
    durationMinutes: 180,
    price: 20000,
    description: 'Full-head highlights; final price depends on the service.',
    badge: 'Starting at',
  },
  {
    id: 'srv-28',
    name: 'Balayage',
    category: 'Hair Colour',
    durationMinutes: 180,
    price: 15000,
    description: 'Balayage; final price depends on the service.',
    badge: 'Starting at',
    popular: true,
  },
  {
    id: 'srv-29',
    name: 'Haircut with Visiting Stylist Salma Abbas',
    category: 'Haircuts',
    durationMinutes: 60,
    price: 7000,
    description: 'Haircut with visiting stylist Salma Abbas at the listed price.',
  },
  {
    id: 'srv-30',
    name: 'Kids Haircut',
    category: 'Haircuts',
    durationMinutes: 45,
    price: 4000,
    description: 'Kids haircut at the listed price.',
  },
  {
    id: 'srv-31',
    name: 'Hand, Neck & Shoulders Massage (15 min)',
    category: 'Dry Massage',
    durationMinutes: 15,
    price: 1000,
    description: '15-minute dry massage at the listed price.',
  },
  {
    id: 'srv-32',
    name: 'Foot Massage (15 min)',
    category: 'Dry Massage',
    durationMinutes: 15,
    price: 1000,
    description: '15-minute dry massage at the listed price.',
  },
  {
    id: 'srv-33',
    name: 'Hand, Neck & Shoulders Massage (30 min)',
    category: 'Dry Massage',
    durationMinutes: 30,
    price: 1500,
    description: '30-minute dry massage at the listed price.',
  },
  {
    id: 'srv-34',
    name: 'Foot Massage (30 min)',
    category: 'Dry Massage',
    durationMinutes: 30,
    price: 1500,
    description: '30-minute dry massage at the listed price.',
  },
  {
    id: 'srv-35',
    name: 'Eyebrow Threading',
    category: 'Threading',
    durationMinutes: 15,
    price: 400,
    description: 'Eyebrow threading at the listed price.',
  },
  {
    id: 'srv-36',
    name: 'Upper Lip Threading',
    category: 'Threading',
    durationMinutes: 15,
    price: 400,
    description: 'Upper lip threading at the listed price.',
  },
  {
    id: 'srv-37',
    name: 'Chin Threading',
    category: 'Threading',
    durationMinutes: 15,
    price: 400,
    description: 'Chin threading at the listed price.',
  },
  {
    id: 'srv-38',
    name: 'Sideburn Threading',
    category: 'Threading',
    durationMinutes: 15,
    price: 400,
    description: 'Sideburn threading at the listed price.',
  },
  {
    id: 'srv-39',
    name: 'Full Face Threading',
    category: 'Threading',
    durationMinutes: 30,
    price: 1500,
    description: 'Full face threading at the listed price.',
  },
  {
    id: 'srv-40',
    name: 'Simple Eyeliner',
    category: 'Beauty Services',
    durationMinutes: 15,
    price: 300,
    description: 'Simple eyeliner at the listed price.',
  },
  {
    id: 'srv-41',
    name: 'Vintage Eyeliner',
    category: 'Beauty Services',
    durationMinutes: 20,
    price: 500,
    description: 'Vintage eyeliner at the listed price.',
  },
  {
    id: 'srv-42',
    name: 'Runway Chic Eyeliner',
    category: 'Beauty Services',
    durationMinutes: 30,
    price: 700,
    description: 'Runway Chic eyeliner at the listed price.',
  },
  {
    id: 'srv-43',
    name: 'OPI Nail Colour (Hands)',
    category: 'Nail Services',
    durationMinutes: 45,
    price: 1000,
    description: 'OPI nail colour for hands at the listed price.',
  },
  {
    id: 'srv-44',
    name: 'OPI Nail Colour (Feet)',
    category: 'Nail Services',
    durationMinutes: 45,
    price: 1000,
    description: 'OPI nail colour for feet at the listed price.',
  },
  {
    id: 'srv-45',
    name: 'Nail Application / File / Cut / Colour',
    category: 'Nail Services',
    durationMinutes: 30,
    price: 500,
    description: 'Each listed nail application service is Rs. 500.',
  },
  {
    id: 'srv-46',
    name: 'Nail Filling',
    category: 'Nail Services',
    durationMinutes: 30,
    price: 500,
    description: 'Nail filling at the listed price.',
  },
  {
    id: 'srv-47',
    name: 'AOD Nail Colour (Hands)',
    category: 'Nail Services',
    durationMinutes: 45,
    price: 800,
    description: 'AOD nail colour for hands at the listed price.',
  },
  {
    id: 'srv-48',
    name: 'AOD Nail Colour (Feet)',
    category: 'Nail Services',
    durationMinutes: 45,
    price: 800,
    description: 'AOD nail colour for feet at the listed price.',
  },
  {
    id: 'srv-49',
    name: 'AOD Nail Application / File / Cut / Colour',
    category: 'Nail Services',
    durationMinutes: 30,
    price: 500,
    description: 'Each listed nail application service is Rs. 500.',
  },
  {
    id: 'srv-50',
    name: 'AOD Nail Filling',
    category: 'Nail Services',
    durationMinutes: 30,
    price: 500,
    description: 'AOD nail filling at the listed price.',
  },
  {
    id: 'srv-51',
    name: 'Wave Tab (Standard)',
    category: 'Gift Cards',
    durationMinutes: 60,
    price: 6000,
    description: 'Standard Wave Tab at the listed gift-card price.',
  },
  {
    id: 'srv-52',
    name: 'Wave Tab (L’Oréal)',
    category: 'Gift Cards',
    durationMinutes: 60,
    price: 8000,
    description: 'L’Oréal Wave Tab at the listed gift-card price.',
  },
];

const initialStylists: StylistItem[] = [
  {
    id: 'sty-1',
    name: 'Reema',
    role: 'Wave Bar Artist',
    bio: 'Mentioned in a Google Maps review for blow-dry styling and beachy waves.',
    specialties: ['Blow-dry', 'Beachy waves'],
    avatar: '',
    rating: 0,
    reviewsCount: 0,
  },
  {
    id: 'sty-2',
    name: 'Kiran',
    role: 'Wave Bar Artist',
    bio: 'Mentioned in a Google Maps review for hair colour and haircut services.',
    specialties: ['Hair colour', 'Haircuts'],
    avatar: '',
    rating: 0,
    reviewsCount: 0,
  },
  {
    id: 'sty-3',
    name: 'Avril',
    role: 'Wave Bar Artist',
    bio: 'Mentioned in a Google Maps review for scalp treatment and blow-dry services.',
    specialties: ['Scalp treatment', 'Blow-dry'],
    avatar: '',
    rating: 0,
    reviewsCount: 0,
  },
  {
    id: 'sty-4',
    name: 'Aarti',
    role: 'Wave Bar Artist',
    bio: 'Mentioned in a Google Maps review for scalp treatment and pedicure services.',
    specialties: ['Scalp treatment', 'Pedicure'],
    avatar: '',
    rating: 0,
    reviewsCount: 0,
  },
];

const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'ayesha rafique',
    rating: 5,
    serviceName: 'Blow-dry & beachy waves',
    stylistName: 'Reema',
    comment: 'Reema did my blowdry with beachy waves, she did amazing job.',
    date: '7 months ago',
    verified: true,
    source: 'Google Maps',
  },
  {
    id: 'rev-2',
    clientName: 'HM A',
    rating: 5,
    serviceName: 'Hair colour, haircut & beauty services',
    stylistName: 'Kiran & Reema',
    comment: 'Amazing service, so friendly and welcoming! ... Highly recommended!',
    date: '4 months ago',
    verified: true,
    source: 'Google Maps',
  },
  {
    id: 'rev-3',
    clientName: 'Hurrem Sultan',
    rating: 5,
    serviceName: 'Scalp treatment, blow-dry & pedicure',
    stylistName: 'Avril & Aarti',
    comment: 'Staff was so kind and helpful. Really had relaxing spa day.',
    date: '2 months ago',
    verified: true,
    source: 'Google Maps',
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Long, Defined Waves',
    category: 'Hair Transformations',
    image: '/images/wavebar-long-waves_enhanced.jpg',
    stylist: 'Wave Bar Team',
    description: 'A finished look from the Wave Bar client photo collection.',
  },
  {
    id: 'gal-2',
    title: 'Soft, Beachy Waves',
    category: 'Hair Transformations',
    image: '/images/wavebar-beach-waves_enhanced.jpg',
    stylist: 'Wave Bar Team',
    description: 'A finished look from the Wave Bar client photo collection.',
  },
  {
    id: 'gal-3',
    title: 'Wave Bar Salon Interior',
    category: 'Salon',
    image: '/images/wavebar-salon-interior_enhanced.jpg',
    stylist: 'Wave Bar',
    description: 'Inside the Wave Bar salon in Karachi.',
  },
  {
    id: 'gal-4',
    title: 'Wave Bar Storefront',
    category: 'Salon',
    image: '/images/wavebar-storefront_enhanced.jpg',
    stylist: 'Wave Bar',
    description: 'The Wave Bar storefront in Karachi.',
  },
  {
    id: 'gal-5',
    title: 'Salon Styling',
    category: 'Hair Transformations',
    image: '/images/wavebar-styling_enhanced.jpg',
    stylist: 'Wave Bar Team',
    description: 'A salon styling moment from the Wave Bar photo collection.',
  },
  {
    id: 'gal-6',
    title: 'Salon Seating',
    category: 'Salon',
    image: '/images/wavebar-salon-seating_enhanced.jpg',
    stylist: 'Wave Bar',
    description: 'A view of the Wave Bar salon interior.',
  },
  {
    id: 'gal-7',
    title: 'Finished Hair Look',
    category: 'Hair Transformations',
    image: '/images/wavebar-hair-finish_enhanced.jpg',
    stylist: 'Wave Bar Team',
    description: 'A finished look from the Wave Bar client photo collection.',
  },
];

const initialAppointments: AppointmentItem[] = [];

// Data store
let services = [...initialServices];
let stylists = [...initialStylists];
let reviews = [...initialReviews];
let gallery = [...initialGallery];
let appointments = [...initialAppointments];
let contactMessages: ContactMessageItem[] = [];

// JWT token helpers
function generateToken(payload: { email: string; role: string }) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 })
  ).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (expectedSig !== signature) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
  }
  (req as any).user = decoded;
  next();
}

// REST API Endpoints

// 1. Services
app.get('/api/services', (_req: Request, res: Response) => {
  res.json({ success: true, count: services.length, services });
});

app.post('/api/services', requireAuth, (req: Request, res: Response) => {
  const { name, category, durationMinutes, price, description, badge, popular } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }
  const newService: ServiceItem = {
    id: `srv-${Date.now()}`,
    name,
    category,
    durationMinutes: Number(durationMinutes) || 60,
    price: Number(price) || 100,
    description: description || '',
    badge,
    popular: Boolean(popular),
  };
  services.unshift(newService);
  res.status(201).json({ success: true, service: newService });
});

app.put('/api/services/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }
  services[idx] = { ...services[idx], ...req.body };
  res.json({ success: true, service: services[idx] });
});

app.delete('/api/services/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  services = services.filter((s) => s.id !== id);
  res.json({ success: true, message: 'Service removed' });
});

// 2. Stylists
app.get('/api/stylists', (_req: Request, res: Response) => {
  res.json({ success: true, stylists });
});

// 3. Appointments
app.get('/api/appointments', (req: Request, res: Response) => {
  // Can filter by stylist, date or return all for admin
  const { date, stylistId } = req.query;
  let filtered = [...appointments];
  if (date) {
    filtered = filtered.filter((a) => a.date === date);
  }
  if (stylistId && stylistId !== 'any') {
    filtered = filtered.filter((a) => a.stylistId === stylistId);
  }
  res.json({ success: true, count: filtered.length, appointments: filtered });
});

app.post('/api/appointments', (req: Request, res: Response) => {
  const {
    clientName,
    clientEmail,
    clientPhone,
    serviceId,
    stylistId,
    date,
    time,
    notes,
  } = req.body;

  if (!clientName || !clientEmail || !clientPhone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Please provide all required appointment fields.' });
  }

  // Find service
  const service = services.find((s) => s.id === serviceId);
  const stylist = stylists.find((s) => s.id === stylistId) || stylists[0];

  // Check collision (same stylist, same date, same time)
  const existingConflict = appointments.find(
    (a) => a.stylistId === (stylistId === 'any' ? stylist.id : stylistId) &&
           a.date === date &&
           a.time === time &&
           a.status !== 'cancelled'
  );

  if (existingConflict) {
    return res.status(409).json({
      error: `This time slot is already booked for ${stylist.name}. Please select another time or stylist.`,
    });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `WB-${randomNum}`;

  const newAppointment: AppointmentItem = {
    id: `apt-${Date.now()}`,
    code,
    clientName,
    clientEmail,
    clientPhone,
    serviceId,
    serviceName: service?.name || 'Custom Salon Service',
    stylistId: stylist.id,
    stylistName: stylist.name,
    date,
    time,
    price: service?.price || 120,
    durationMinutes: service?.durationMinutes || 60,
    notes: notes || '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(newAppointment);

  res.status(201).json({
    success: true,
    message: 'Appointment confirmed successfully',
    appointment: newAppointment,
  });
});

app.patch('/api/appointments/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes, time, date } = req.body;
  const apt = appointments.find((a) => a.id === id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  if (status) apt.status = status;
  if (notes !== undefined) apt.notes = notes;
  if (time) apt.time = time;
  if (date) apt.date = date;
  res.json({ success: true, appointment: apt });
});

app.delete('/api/appointments/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  appointments = appointments.filter((a) => a.id !== id);
  res.json({ success: true, message: 'Appointment cancelled and removed' });
});

// 4. Reviews
app.get('/api/reviews', (_req: Request, res: Response) => {
  res.json({
    success: true,
    average: googleRating,
    totalCount: googleReviewCount,
    reviews,
  });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { clientName, rating, serviceName, stylistName, comment } = req.body;
  if (!clientName || !comment) {
    return res.status(400).json({ error: 'Name and review text are required.' });
  }
  const newReview: ReviewItem = {
    id: `rev-${Date.now()}`,
    clientName,
    rating: Number(rating) || 5,
    serviceName: serviceName || 'Signature Styling',
    stylistName: stylistName || 'Wave Bar Salon Artist',
    comment,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    source: 'Website',
  };
  reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// 5. Gallery
app.get('/api/gallery', (_req: Request, res: Response) => {
  res.json({ success: true, gallery });
});

app.post('/api/gallery', requireAuth, (req: Request, res: Response) => {
  const { title, category, image, stylist, description } = req.body;
  if (!title || !image) {
    return res.status(400).json({ error: 'Title and image URL are required.' });
  }
  const newItem: GalleryItem = {
    id: `gal-${Date.now()}`,
    title,
    category: category || 'Signature Waves',
    image,
    stylist: stylist || 'Wave Bar Artist',
    description: description || '',
  };
  gallery.unshift(newItem);
  res.status(201).json({ success: true, item: newItem });
});

app.delete('/api/gallery/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  gallery = gallery.filter((g) => g.id !== id);
  res.json({ success: true, message: 'Gallery item removed' });
});

// 6. Contact & Concierge
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, serviceInterest, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  const newMsg: ContactMessageItem = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    serviceInterest: serviceInterest || 'General Inquiry',
    message,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };
  contactMessages.unshift(newMsg);
  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out to Wave Bar. Our concierge will contact you within 24 hours.',
    contactMessage: newMsg,
  });
});

app.get('/api/contact-messages', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true, count: contactMessages.length, messages: contactMessages });
});

// 7. Admin Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Default demo admin account
  if (
    (email === 'admin@wavebar.com' && password === 'wavebar2026') ||
    (email === 'admin' && password === 'admin')
  ) {
    const token = generateToken({ email: 'admin@wavebar.com', role: 'admin' });
    return res.json({
      success: true,
      token,
      user: {
        name: 'Wave Bar Admin',
        email: 'admin@wavebar.com',
        role: 'admin',
      },
    });
  }
  return res.status(401).json({ error: 'Invalid credentials. Use admin@wavebar.com / wavebar2026' });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ valid: false });
  }
  res.json({ valid: true, user: decoded });
});

// Admin Stats
app.get('/api/admin/stats', requireAuth, (_req: Request, res: Response) => {
  const totalAppointments = appointments.length;
  const activeBookings = appointments.filter((a) => a.status === 'confirmed').length;
  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.price || 0), 0);
  const totalReviews = googleReviewCount + (reviews.length - initialReviews.length);

  res.json({
    success: true,
    stats: {
      totalAppointments,
      activeBookings,
      totalRevenue,
      totalReviews,
      totalServices: services.length,
      totalStylists: stylists.length,
    },
  });
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✨ Wave Bar Luxury Salon Server running on port ${PORT}`);
  });
}

const isMainModule =
  process.argv[1] !== undefined &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMainModule && process.env.VERCEL !== '1') {
  void startServer();
}
