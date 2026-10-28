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

// Initial Seed Data with brand-aligned luxury salon assets
const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Signature Wave & Silk Blowout',
    category: 'Cuts & Styling',
    durationMinutes: 60,
    price: 95,
    description: 'Custom scalp cleansing ritual, tailored conditioning mask, and precision blowout finished with relaxed, high-gloss waves.',
    badge: 'Signature',
    popular: true,
  },
  {
    id: 'srv-2',
    name: 'Bespoke Architectural Cut',
    category: 'Cuts & Styling',
    durationMinutes: 75,
    price: 135,
    description: 'In-depth hair architecture consultation, precision dry & wet texturizing cut, and bespoke styling with thermal finishing.',
    badge: 'Popular',
    popular: true,
  },
  {
    id: 'srv-3',
    name: 'Rose-Gold & Copper Dimensional Balayage',
    category: 'Color & Balayage',
    durationMinutes: 180,
    price: 320,
    description: 'Hand-painted multi-tonal dimensional lightening infused with copper-rose glaze, bond-building treatment, and signature gloss.',
    badge: 'Salon Icon',
    popular: true,
  },
  {
    id: 'srv-4',
    name: 'Full Luxury Foilyage & Gloss Glaze',
    category: 'Color & Balayage',
    durationMinutes: 210,
    price: 380,
    description: 'High-lift seamless foil artistry for maximum brightness and soft root transition, complete with custom peptide gloss.',
    popular: false,
  },
  {
    id: 'srv-5',
    name: 'Root Melt & Tone Refresh',
    category: 'Color & Balayage',
    durationMinutes: 90,
    price: 165,
    description: 'Seamless shadow root application with customized shade balancing gloss to revitalize tone between full color visits.',
    popular: false,
  },
  {
    id: 'srv-6',
    name: 'Caviar & Botanical Hair Spa Treatment',
    category: 'Treatments & Hair Spa',
    durationMinutes: 60,
    price: 150,
    description: 'Intense cellular rejuvenation in our private wash sanctuary with steam mist infusion and 20-minute rhythmic scalp massage.',
    badge: 'Spa Ritual',
    popular: true,
  },
  {
    id: 'srv-7',
    name: 'Liquid Silk Keratin Infusion',
    category: 'Treatments & Hair Spa',
    durationMinutes: 150,
    price: 350,
    description: 'Formaldehyde-free smoothing therapy that eliminates frizz, locks in glass-like shine, and shortens home blowout time by 70%.',
    popular: false,
  },
  {
    id: 'srv-8',
    name: 'Bridal & Red Carpet Wave Artistry',
    category: 'Bridal & Glam',
    durationMinutes: 90,
    price: 240,
    description: 'Sculpted Old-Hollywood or romantic effortless waves with humidity-resistant hold, veil placement, and hair accessory tailoring.',
    badge: 'Event Glam',
    popular: true,
  },
];

const initialStylists: StylistItem[] = [
  {
    id: 'sty-1',
    name: 'Elena Rostova',
    role: 'Founder & Creative Director',
    bio: 'Vogue-featured wave architect with 14 years across Paris and Beverly Hills. Elena pioneered the salon’s signature brush-wave technique.',
    specialties: ['Signature Waves', 'Architectural Cuts', 'Editorial Styling'],
    avatar: '/images/salon_team_master_stylist_1793149645353.jpg',
    rating: 5.0,
    reviewsCount: 68,
  },
  {
    id: 'sty-2',
    name: 'Marcus Vance',
    role: 'Master Colorist & Balayage Director',
    bio: 'Specialist in dimensional copper, champagne blonde, and damage-free blonding with custom bond-protection chemistry.',
    specialties: ['Copper & Rose Gold Balayage', 'Corrective Color', 'Glossing'],
    avatar: '/images/salon_hair_balayage_copper_1793149644947.jpg',
    rating: 5.0,
    reviewsCount: 54,
  },
  {
    id: 'sty-3',
    name: 'Chloe Nguyen',
    role: 'Senior Stylist & Hair Spa Lead',
    bio: 'Certified trichologist and styling visionary devoted to scalp health, restorative moisture therapies, and effortless French girl cuts.',
    specialties: ['Hair Spa Rituals', 'Keratin Therapy', 'Textured Bobs'],
    avatar: '/images/salon_hair_styling_waves_1793149644985.jpg',
    rating: 5.0,
    reviewsCount: 34,
  },
];

const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Sienna Sterling',
    rating: 5,
    serviceName: 'Rose-Gold & Copper Dimensional Balayage',
    stylistName: 'Marcus Vance',
    comment: 'The absolute pinnacle of luxury hair. Marcus achieved the most breathtaking soft copper glaze with seamless dimension. My hair feels silkier than when I walked in!',
    date: '2026-10-22',
    verified: true,
  },
  {
    id: 'rev-2',
    clientName: 'Julianne Morales',
    rating: 5,
    serviceName: 'Signature Wave & Silk Blowout',
    stylistName: 'Elena Rostova',
    comment: 'Wave Bar lives up to every bit of the reputation. The salon interior feels like a sanctuary, the espresso is delicious, and Elena’s wave styling stayed immaculate for three full days.',
    date: '2026-10-18',
    verified: true,
  },
  {
    id: 'rev-3',
    clientName: 'Claire Beaumont',
    rating: 5,
    serviceName: 'Caviar & Botanical Hair Spa Treatment',
    stylistName: 'Chloe Nguyen',
    comment: 'The wash lounge with the rose-gold fixtures and warm steam mist was pure heaven. The scalp massage relieved a week of tension. Will never go anywhere else.',
    date: '2026-10-14',
    verified: true,
  },
  {
    id: 'rev-4',
    clientName: 'Victoria Hastings',
    rating: 5,
    serviceName: 'Bridal & Red Carpet Wave Artistry',
    stylistName: 'Elena Rostova',
    comment: 'Booked Wave Bar for my rehearsal dinner and wedding day. The compliments on my sculpted waves were endless. True master artists.',
    date: '2026-10-08',
    verified: true,
  },
  {
    id: 'rev-5',
    clientName: 'Aria Montgomery',
    rating: 5,
    serviceName: 'Bespoke Architectural Cut',
    stylistName: 'Elena Rostova',
    comment: 'Best haircut of my life. The face-framing layers and soft movement are sublime. Worth every single cent.',
    date: '2026-09-29',
    verified: true,
  },
];

const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Warm Copper & Rose-Gold Balayage',
    category: 'Color & Balayage',
    image: '/images/salon_hair_balayage_copper_1793149644947.jpg',
    stylist: 'Marcus Vance',
    description: 'Seamless low-maintenance foil work infused with custom copper and apricot gloss tones.',
  },
  {
    id: 'gal-2',
    title: 'The Signature Sculpted Waves',
    category: 'Signature Waves',
    image: '/images/salon_hair_styling_waves_1793149644985.jpg',
    stylist: 'Elena Rostova',
    description: 'Polished editorial waves with weightless movement and radiant mirror shine.',
  },
  {
    id: 'gal-3',
    title: 'Sanctuary Styling Floor',
    category: 'Salon Experience',
    image: '/images/hero_salon_luxury_interior_1793149644642.jpg',
    stylist: 'Wave Bar',
    description: 'Our signature illuminated rose-gold arched stations crafted for serene transformation.',
  },
  {
    id: 'gal-4',
    title: 'Private Hair Spa & Wash Sanctuary',
    category: 'Salon Experience',
    image: '/images/salon_interior_wash_lounge_1793149646187.jpg',
    stylist: 'Chloe Nguyen',
    description: 'Reclining massage wash loungers with steam infusion for the ultimate scalp renewal.',
  },
  {
    id: 'gal-5',
    title: 'Master Artistry in Action',
    category: 'Cuts & Transformations',
    image: '/images/salon_team_master_stylist_1793149645353.jpg',
    stylist: 'Elena Rostova',
    description: 'Consultation and precision dry-cutting tailored to unique bone structure and hair texture.',
  },
];

const initialAppointments: AppointmentItem[] = [
  {
    id: 'apt-1',
    code: 'WB-8921',
    clientName: 'Genevieve Dupré',
    clientEmail: 'genevieve.d@gmail.com',
    clientPhone: '+1 (310) 555-0194',
    serviceId: 'srv-3',
    serviceName: 'Rose-Gold & Copper Dimensional Balayage',
    stylistId: 'sty-2',
    stylistName: 'Marcus Vance',
    date: '2026-10-30',
    time: '11:00 AM',
    price: 320,
    durationMinutes: 180,
    notes: 'Desires a warmer autumn copper hue on ends.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-2',
    code: 'WB-8922',
    clientName: 'Amara Vance',
    clientEmail: 'amara.v@gmail.com',
    clientPhone: '+1 (310) 555-0182',
    serviceId: 'srv-1',
    serviceName: 'Signature Wave & Silk Blowout',
    stylistId: 'sty-1',
    stylistName: 'Elena Rostova',
    date: '2026-10-31',
    time: '02:00 PM',
    price: 95,
    durationMinutes: 60,
    notes: 'Event styling for evening gala.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

// Data store
let services = [...initialServices];
let stylists = [...initialStylists];
let reviews = [...initialReviews];
let gallery = [...initialGallery];
let appointments = [...initialAppointments];
let contactMessages: ContactMessageItem[] = [
  {
    id: 'msg-1',
    name: 'Harper Lin',
    email: 'harper.lin@luxuryweddings.com',
    phone: '+1 (415) 555-9012',
    serviceInterest: 'Bridal & Red Carpet Wave Artistry',
    message: 'Inquiring about on-site bridal party styling for 6 guests on December 12th.',
    createdAt: '2026-10-25T14:30:00.000Z',
    status: 'read',
  },
];

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
  // Compute overall average
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = reviews.length > 0 ? (total / reviews.length).toFixed(1) : '5.0';
  res.json({
    success: true,
    average: Number(average),
    totalCount: 156 + (reviews.length - initialReviews.length),
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
        name: 'Elena Rostova (Admin)',
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
  const totalReviews = 156 + (reviews.length - initialReviews.length);

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
