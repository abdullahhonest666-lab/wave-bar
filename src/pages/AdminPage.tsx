import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import {
  Shield,
  Calendar,
  DollarSign,
  Users,
  Star,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Lock,
  LogOut,
  Image as ImageIcon,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    adminToken,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    services,
    createService,
    deleteService,
    gallery,
    createGalleryItem,
    deleteGalleryItem,
    reviews,
    averageRating,
  } = useSalon();

  const [email, setEmail] = useState('admin@wavebar.com');
  const [password, setPassword] = useState('wavebar2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'gallery'>('appointments');

  // Service form state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Cuts & Styling');
  const [newServicePrice, setNewServicePrice] = useState('120');
  const [newServiceDuration, setNewServiceDuration] = useState('60');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServiceBadge, setNewServiceBadge] = useState('');

  // Gallery form state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Signature Waves');
  const [newGalleryImage, setNewGalleryImage] = useState('/src/assets/images/salon_hair_styling_waves_1793149644985.jpg');
  const [newGalleryStylist, setNewGalleryStylist] = useState('Elena Rostova');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        adminLogin(data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Authentication server error');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    const ok = await createService({
      name: newServiceName,
      category: newServiceCategory,
      price: Number(newServicePrice) || 100,
      durationMinutes: Number(newServiceDuration) || 60,
      description: newServiceDescription,
      badge: newServiceBadge || undefined,
      popular: false,
    });
    if (ok) {
      setNewServiceName('');
      setNewServiceDescription('');
      setNewServiceBadge('');
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImage) return;
    const ok = await createGalleryItem({
      title: newGalleryTitle,
      category: newGalleryCategory,
      image: newGalleryImage,
      stylist: newGalleryStylist,
      description: newGalleryDesc,
    });
    if (ok) {
      setNewGalleryTitle('');
      setNewGalleryDesc('');
    }
  };

  // Calculations
  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.price || 0), 0);
  const activeCount = appointments.filter((a) => a.status === 'confirmed').length;

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 rounded-3xl border border-[#E8D5B7] luxury-card-shadow space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#2C2C2C] text-[#C9A27C] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-[#2C2C2C]">
              Wave Bar Staff Portal
            </h1>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Secure administrative access for salon reservations and service menus.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2C2C2C]">
                Staff Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] text-sm bg-[#FDFBF7]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2C2C2C]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8D5B7] text-sm bg-[#FDFBF7]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-gradient-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-[#E8D5B7]/50 text-xs text-[#6B6B6B]">
            <p className="text-[11px] mb-2 font-medium">Demo Staff Credentials (Pre-filled):</p>
            <div className="bg-[#F9F6F2] p-2 rounded-lg font-mono text-[11px] text-[#2C2C2C]">
              admin@wavebar.com / wavebar2026
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8D5B7] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2C2C2C] text-[#C9A27C] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#2C2C2C]">
              Wave Bar Salon Management
            </h1>
            <p className="text-xs text-[#6B6B6B]">
              Logged in as Elena Rostova (Director) · Live Backend Connected
            </p>
          </div>
        </div>

        <button
          onClick={adminLogout}
          className="self-start sm:self-auto px-4 py-2 rounded-full border border-stone-300 hover:border-stone-500 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-semibold">Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#B76E79]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C2C2C] font-mono tabular-nums">
            {appointments.length}
          </div>
          <div className="text-[11px] text-[#6B6B6B]">
            {activeCount} upcoming active
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C2C2C] font-mono tabular-nums">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#6B6B6B]">From confirmed reservations</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-semibold">Menu Offerings</span>
            <Sparkles className="w-4 h-4 text-[#C9A27C]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C2C2C] font-mono tabular-nums">
            {services.length}
          </div>
          <div className="text-[11px] text-[#6B6B6B]">Active salon services</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E8D5B7]/60 luxury-card-shadow space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs uppercase font-semibold">Average Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C2C2C] font-mono tabular-nums">
            {averageRating.toFixed(1)} ★
          </div>
          <div className="text-[11px] text-[#6B6B6B]">{reviews.length} reviews published</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8D5B7]/60 pb-3">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'appointments'
              ? 'bg-[#2C2C2C] text-white'
              : 'text-[#6B6B6B] hover:text-[#2C2C2C]'
          }`}
        >
          Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'services'
              ? 'bg-[#2C2C2C] text-white'
              : 'text-[#6B6B6B] hover:text-[#2C2C2C]'
          }`}
        >
          Services Manager ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-[#2C2C2C] text-white'
              : 'text-[#6B6B6B] hover:text-[#2C2C2C]'
          }`}
        >
          Gallery Lookbook ({gallery.length})
        </button>
      </div>

      {/* TAB 1: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-[#2C2C2C]">
              Client Reservations
            </h2>
            <span className="text-xs text-[#6B6B6B]">
              Real-time synchronization with client booking flow
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8D5B7]/60 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9F6F2] border-b border-[#E8D5B7]/60 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Stylist</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D5B7]/30 text-stone-700">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-stone-400">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-[#2C2C2C]">
                          {apt.code}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-stone-900">{apt.clientName}</div>
                          <div className="text-stone-400 text-[11px]">{apt.clientEmail}</div>
                          <div className="text-stone-400 text-[11px]">{apt.clientPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-stone-900">{apt.serviceName}</div>
                          <div className="text-stone-500 text-[11px] font-mono tabular-nums">
                            ${apt.price} · {apt.durationMinutes}m
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-[#B76E79]">
                          {apt.stylistName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-stone-900">{apt.date}</div>
                          <div className="text-stone-500">{apt.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              apt.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : apt.status === 'completed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          {apt.status !== 'completed' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                              title="Mark Completed"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                              title="Mark Cancelled"
                              className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            title="Delete"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Creation Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8D5B7]/60 luxury-card-shadow space-y-4">
            <h3 className="text-base font-serif font-bold text-[#2C2C2C]">
              Add New Salon Service
            </h3>
            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amber Glaze & Cut"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                  >
                    <option value="Cuts & Styling">Cuts & Styling</option>
                    <option value="Color & Balayage">Color & Balayage</option>
                    <option value="Treatments & Hair Spa">Treatments & Hair Spa</option>
                    <option value="Bridal & Glam">Bridal & Glam</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. New Ritual"
                    value={newServiceBadge}
                    onChange={(e) => setNewServiceBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details of procedure and finish..."
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-rose-gold-gradient text-white font-semibold uppercase tracking-wider text-xs cursor-pointer shadow-sm hover:opacity-95"
              >
                Add Service
              </button>
            </form>
          </div>

          {/* Existing Services List */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-base font-serif font-bold text-[#2C2C2C]">
              Active Services ({services.length})
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-white border border-[#E8D5B7]/60 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-stone-900 text-sm">{s.name}</div>
                    <div className="text-stone-500">
                      {s.category} · {s.durationMinutes}m · ${s.price}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GALLERY LOOKBOOK */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8D5B7]/60 luxury-card-shadow space-y-4">
            <h3 className="text-base font-serif font-bold text-[#2C2C2C]">
              Add Lookbook Item
            </h3>
            <form onSubmit={handleCreateGallery} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sculpted Sunset Wave"
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                >
                  <option value="Color & Balayage">Color & Balayage</option>
                  <option value="Signature Waves">Signature Waves</option>
                  <option value="Salon Experience">Salon Experience</option>
                  <option value="Cuts & Transformations">Cuts & Transformations</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Stylist Credit</label>
                <input
                  type="text"
                  value={newGalleryStylist}
                  onChange={(e) => setNewGalleryStylist(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newGalleryDesc}
                  onChange={(e) => setNewGalleryDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D5B7] bg-[#FDFBF7]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-rose-gold-gradient text-white font-semibold uppercase tracking-wider text-xs cursor-pointer"
              >
                Publish to Lookbook
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-base font-serif font-bold text-[#2C2C2C]">
              Current Gallery Entries ({gallery.length})
            </h3>
            <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="relative rounded-2xl overflow-hidden border border-[#E8D5B7]/60 bg-white group aspect-[4/3]"
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
                    <div>
                      <div className="font-bold">{g.title}</div>
                      <div className="text-[10px] text-[#E8D5B7]">{g.category}</div>
                    </div>
                    <button
                      onClick={() => deleteGalleryItem(g.id)}
                      className="self-end p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
