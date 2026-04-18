import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Filter,
  Heart,
  MessageCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Star,
  Calendar,
  CreditCard,
  Clock,
  ShieldCheck,
  Users,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import { Property, View } from "./types";
import { PROPERTIES } from "./data";

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const navigateTo = (view: View, property?: Property) => {
    setCurrentView(view);
    if (property) setSelectedProperty(property);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const featuredProperties = PROPERTIES.filter(p => p.isFeatured);

  const CONTACT_PHONE = "+2250708536904";
  const CONTACT_PHONE_2 = "+2250505410916";
  const WHATSAPP_LINK = `https://wa.me/2250708536904?text=${encodeURIComponent("Bonjour, je suis intéressé par vos services immobiliers.")}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent shadow-lg shadow-primary/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black leading-none tracking-tight ${scrolled ? "text-primary" : "text-white"}`}>
                A.I.F
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? "text-slate-400" : "text-white/60"}`}>
                La Foi Immobilier
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Accueil', view: 'home' },
              { label: 'Nos Biens', view: 'properties' },
              { label: 'Services', view: 'services' },
              { label: 'Rendez-vous', view: 'appointment' },
              { label: 'Paiement', view: 'payment' },
              { label: 'Contact', view: 'contact' }
            ].map((item) => (
              <button 
                key={item.view}
                onClick={() => navigateTo(item.view as View)}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${scrolled ? "text-slate-600 hover:text-primary" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="px-5 py-2.5 bg-accent text-primary text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> Appeler
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden p-2 ${scrolled ? "text-primary" : "text-white"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden border-t border-slate-100"
            >
              <div className="p-6 flex flex-col gap-4">
                {[
                  { label: 'Accueil', view: 'home' },
                  { label: 'Nos Biens', view: 'properties' },
                  { label: 'Services', view: 'services' },
                  { label: 'À Propos', view: 'about' },
                  { label: 'Rendez-vous', view: 'appointment' },
                  { label: 'Paiement', view: 'payment' },
                  { label: 'Contact', view: 'contact' }
                ].map((item) => (
                  <button 
                    key={item.view}
                    onClick={() => navigateTo(item.view as View)}
                    className="text-sm font-bold text-slate-700 text-left py-3 border-b border-slate-50 uppercase tracking-wider"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a href={`tel:${CONTACT_PHONE}`} className="flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold text-sm">
                    <Phone className="w-4 h-4" /> Appeler
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 bg-success text-white rounded-2xl font-bold text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover"
                  alt="Abidjan Real Estate"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-slate-50" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent font-bold uppercase tracking-widest text-[10px] backdrop-blur-sm">
                    <MapPin className="w-3 h-3" />
                    Basé à Koumassi, Terrain In’challah
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-4xl mx-auto">
                    Trouvez votre logement <span className="text-accent">facilement</span> à Abidjan
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-medium">
                    A.I.F vous accompagne dans l'achat, la vente et la location de studios, 
                    appartements et maisons adaptés à votre budget.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button 
                      onClick={() => navigateTo('properties')}
                      className="px-8 py-4 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent/20"
                    >
                      Voir les biens
                    </button>
                    <button 
                      onClick={() => navigateTo('appointment')}
                      className="px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-black/5"
                    >
                      Prendre RDV
                    </button>
                  </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-4xl mx-auto bg-white p-2 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2"
                >
                  <div className="flex-grow flex items-center px-6 gap-4 py-4 md:py-0">
                    <Search className="text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Quel quartier recherchez-vous ? (Koumassi, Marcory...)" 
                      className="w-full outline-none text-slate-700 font-bold placeholder:text-slate-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => navigateTo('properties')}
                    className="px-10 py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all"
                  >
                    Rechercher
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Featured Properties */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div className="space-y-4">
                  <div className="text-accent font-black uppercase tracking-[0.2em] text-xs">Sélection exclusive</div>
                  <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Biens Récents</h2>
                </div>
                <button 
                  onClick={() => navigateTo('properties')}
                  className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all group"
                >
                  Voir tout le catalogue <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {featuredProperties.map((prop, i) => (
                  <motion.div 
                    key={prop.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-5 left-5 flex gap-2">
                        <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                          {prop.type}
                        </span>
                        <span className={`px-4 py-1.5 ${prop.status === 'vente' ? "bg-accent" : "bg-success"} text-white text-[10px] font-black uppercase tracking-widest rounded-full`}>
                          À {prop.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-primary group-hover:text-accent transition-colors cursor-pointer leading-tight" onClick={() => navigateTo('detail', prop)}>
                          {prop.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold">
                          <MapPin className="w-4 h-4 text-accent" />
                          {prop.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-5 border-y border-slate-50">
                        <div className="flex flex-col items-center gap-1">
                          <Bed className="w-5 h-5 text-accent" />
                          <span className="text-xs font-black text-primary">{prop.bedrooms || 0} Ch.</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Bath className="w-5 h-5 text-accent" />
                          <span className="text-xs font-black text-primary">{prop.bathrooms || 0} Sdb.</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Maximize className="w-5 h-5 text-accent" />
                          <span className="text-xs font-black text-primary">{prop.area} m²</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-2xl font-black text-primary tracking-tight">
                          {formatPrice(prop.price)}
                          {prop.status === 'location' && <span className="text-xs font-bold text-slate-400">/mois</span>}
                        </div>
                        <button 
                          onClick={() => navigateTo('detail', prop)}
                          className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Services Overview */}
            <section className="bg-primary py-32 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center space-y-4 mb-20">
                  <div className="text-accent font-black uppercase tracking-[0.3em] text-xs">Nos expertises</div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Pourquoi nous faire confiance ?</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Gestion Immobilière", 
                      desc: "Nous gérons vos biens avec rigueur et transparence pour maximiser votre rentabilité.",
                      icon: <ShieldCheck className="w-8 h-8" />
                    },
                    { 
                      title: "Conseil & Investissement", 
                      desc: "Des experts pour vous guider dans vos choix stratégiques d'achat et de vente.",
                      icon: <Star className="w-8 h-8" />
                    },
                    { 
                      title: "Accompagnement Étudiant", 
                      desc: "Des logements abordables et propres adaptés aux besoins des étudiants et jeunes travailleurs.",
                      icon: <Users className="w-8 h-8" />
                    }
                  ].map((service, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[40px] space-y-6 hover:bg-white/10 transition-all"
                    >
                      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-accent/20">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-black text-white">{service.title}</h3>
                      <p className="text-white/60 leading-relaxed font-medium">{service.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-20">
                <div className="text-accent font-black uppercase tracking-[0.2em] text-xs">Ils nous font confiance</div>
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Témoignages Clients</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { name: "M. Kouassi", role: "Locataire", text: "Grâce à A.I.F, j'ai trouvé mon studio à Koumassi en moins de 48h. Service rapide et efficace !" },
                  { name: "Mlle. Traoré", role: "Étudiante", text: "Des logements propres et surtout adaptés à mon budget d'étudiante. Je recommande vivement." }
                ].map((t, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                    <div className="flex gap-1 text-accent">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-slate-600 text-lg italic font-medium leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full" />
                      <div>
                        <div className="font-black text-primary">{t.name}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6">
              <div className="max-w-5xl mx-auto bg-accent rounded-[48px] p-12 md:p-20 text-center space-y-10 shadow-2xl shadow-accent/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-none">
                    Prêt à trouver votre <br /> futur chez-vous ?
                  </h2>
                  <p className="text-primary/70 text-xl font-bold max-w-xl mx-auto">
                    Contactez-nous dès aujourd'hui pour une visite gratuite ou un conseil personnalisé.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <a 
                      href={`tel:${CONTACT_PHONE}`}
                      className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3"
                    >
                      <Phone className="w-5 h-5" /> Appeler maintenant
                    </a>
                    <a 
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-5 bg-success text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-success/20 flex items-center gap-3"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'properties' && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
              <div className="space-y-2">
                <h1 className="text-5xl font-black text-primary tracking-tighter">Nos Biens</h1>
                <p className="text-slate-500 font-bold">Explorez notre catalogue complet à Abidjan.</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-grow md:w-96 bg-white px-6 py-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
                  <Search className="text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Rechercher par quartier ou type..." 
                    className="w-full outline-none text-sm font-bold text-primary placeholder:text-slate-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="p-4 bg-white border border-slate-100 rounded-3xl text-primary hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
                  <Filter className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PROPERTIES.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.location.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((prop, i) => (
                <motion.div 
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={prop.images[0]} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {prop.type}
                      </span>
                      <span className={`px-4 py-1.5 ${prop.status === 'vente' ? "bg-accent" : "bg-success"} text-white text-[10px] font-black uppercase tracking-widest rounded-full`}>
                        À {prop.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(prop.id)}
                      className={`absolute top-5 right-5 p-2.5 rounded-full backdrop-blur-md transition-all ${favorites.includes(prop.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white hover:text-red-500"}`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(prop.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-black text-primary group-hover:text-accent transition-colors cursor-pointer leading-tight" onClick={() => navigateTo('detail', prop)}>
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold">
                      <MapPin className="w-4 h-4 text-accent" />
                      {prop.location}
                    </div>
                    <div className="flex items-center justify-between py-5 border-y border-slate-50">
                      <div className="flex flex-col items-center gap-1">
                        <Bed className="w-5 h-5 text-accent" />
                        <span className="text-xs font-black text-primary">{prop.bedrooms || 0} Ch.</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Bath className="w-5 h-5 text-accent" />
                        <span className="text-xs font-black text-primary">{prop.bathrooms || 0} Sdb.</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Maximize className="w-5 h-5 text-accent" />
                        <span className="text-xs font-black text-primary">{prop.area} m²</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-2xl font-black text-primary tracking-tight">
                        {formatPrice(prop.price)}
                        {prop.status === 'location' && <span className="text-xs font-bold text-slate-400">/mois</span>}
                      </div>
                      <button 
                        onClick={() => navigateTo('detail', prop)}
                        className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'detail' && selectedProperty && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <button 
              onClick={() => navigateTo('properties')}
              className="flex items-center gap-2 text-slate-500 hover:text-primary mb-10 font-black uppercase tracking-widest text-xs transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180 text-accent" /> Retour aux annonces
            </button>

            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-16">
                {/* Gallery */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 aspect-video rounded-[48px] overflow-hidden shadow-2xl">
                    <img src={selectedProperty.images[0]} className="w-full h-full object-cover" alt={selectedProperty.title} />
                  </div>
                  {selectedProperty.images.slice(1).map((img, i) => (
                    <div key={i} className="aspect-video rounded-[32px] overflow-hidden shadow-xl">
                      <img src={img} className="w-full h-full object-cover" alt={`${selectedProperty.title} ${i + 2}`} />
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-5 py-2 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-full border border-accent/20">
                      {selectedProperty.type}
                    </span>
                    <span className="px-5 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      À {selectedProperty.status}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter">
                    {selectedProperty.title}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-500 text-xl font-bold">
                    <MapPin className="w-6 h-6 text-accent" />
                    {selectedProperty.location}, {selectedProperty.city}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 py-10 border-y border-slate-100">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-accent shadow-sm">
                      <Bed className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Chambres</span>
                    <span className="text-xl font-black text-primary">{selectedProperty.bedrooms || 0}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-accent shadow-sm">
                      <Bath className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Salles de bain</span>
                    <span className="text-xl font-black text-primary">{selectedProperty.bathrooms || 0}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-accent shadow-sm">
                      <Maximize className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Surface</span>
                    <span className="text-xl font-black text-primary">{selectedProperty.area} m²</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-primary tracking-tight">Description</h3>
                  <p className="text-slate-600 leading-relaxed text-xl font-medium">
                    {selectedProperty.description}
                  </p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-primary tracking-tight">Caractéristiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {selectedProperty.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-700 font-bold text-lg">
                        <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl sticky top-32">
                  <div className="text-4xl font-black text-primary mb-10 tracking-tighter">
                    {formatPrice(selectedProperty.price)}
                    {selectedProperty.status === 'location' && <span className="text-sm font-bold text-slate-400">/mois</span>}
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-[32px]">
                      <img src={selectedProperty.agent.image} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt={selectedProperty.agent.name} />
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agent A.I.F</div>
                        <div className="text-lg font-black text-primary">{selectedProperty.agent.name}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <a 
                        href={`tel:${selectedProperty.agent.phone}`}
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
                      >
                        <Phone className="w-5 h-5" /> Appeler l'agent
                      </a>
                      <a 
                        href={`https://wa.me/${selectedProperty.agent.phone.replace('+', '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé par le bien : ${selectedProperty.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-success text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-success/20"
                      >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </a>
                      <button 
                        onClick={() => navigateTo('appointment')}
                        className="w-full py-5 border-2 border-slate-100 text-primary rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                      >
                        <Calendar className="w-5 h-5 text-accent" /> Réserver une visite
                      </button>
                    </div>

                    <div className="pt-10 border-t border-slate-100">
                      <h4 className="text-xl font-black text-primary mb-6 tracking-tight">Plus d'informations</h4>
                      <form className="space-y-4">
                        <input type="text" placeholder="Votre nom complet" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm border border-transparent focus:border-accent/30 transition-all" />
                        <input type="email" placeholder="Votre email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm border border-transparent focus:border-accent/30 transition-all" />
                        <textarea placeholder="Votre message..." rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm border border-transparent focus:border-accent/30 transition-all resize-none"></textarea>
                        <button className="w-full py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-accent/20">
                          Envoyer la demande
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'appointment' && (
          <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[48px] p-12 md:p-20 border border-slate-100 shadow-2xl space-y-12">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-accent/20 rounded-[28px] flex items-center justify-center text-accent mx-auto mb-6">
                  <Calendar className="w-10 h-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">Prendre Rendez-vous</h1>
                <p className="text-slate-500 font-bold text-lg">Planifiez une visite ou une consultation avec nos experts.</p>
              </div>

              <form className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                  <input type="text" placeholder="Ex: Jean Koffi" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                  <input type="tel" placeholder="Ex: +225 07..." className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type de Service</label>
                  <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all appearance-none">
                    <option>Visite de bien</option>
                    <option>Conseil en investissement</option>
                    <option>Gestion immobilière</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Date Souhaitée</label>
                  <input type="date" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message (Optionnel)</label>
                  <textarea rows={4} placeholder="Dites-nous en plus sur votre projet..." className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all resize-none"></textarea>
                </div>
                <button className="md:col-span-2 py-6 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20">
                  Confirmer le rendez-vous
                </button>
              </form>
            </div>
          </div>
        )}

        {currentView === 'payment' && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent/20 rounded-[28px] flex items-center justify-center text-accent mx-auto mb-6">
                <CreditCard className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">Modes de Paiement</h1>
              <p className="text-slate-500 font-bold text-xl max-w-2xl mx-auto">
                Réglez vos frais d'agence ou vos loyers en toute simplicité via nos partenaires mobiles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Wave", color: "bg-sky-500", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Wave_Logo_Blue.svg/1200px-Wave_Logo_Blue.svg.png" },
                { name: "Orange Money", color: "bg-orange-500", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png" },
                { name: "MTN MoMo", color: "bg-yellow-400", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MTN_Logo.svg/1200px-MTN_Logo.svg.png" }
              ].map((pay, i) => (
                <div key={i} className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl text-center space-y-8 group hover:scale-105 transition-all">
                  <div className={`w-24 h-24 ${pay.color} rounded-[32px] flex items-center justify-center mx-auto shadow-xl overflow-hidden p-4`}>
                    <img src={pay.icon} alt={pay.name} className="w-full h-full object-contain brightness-0 invert" />
                  </div>
                  <h3 className="text-3xl font-black text-primary">{pay.name}</h3>
                  <p className="text-slate-400 font-bold">Disponible pour tous vos règlements sécurisés.</p>
                  <div className="pt-4">
                    <div className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Numéro de compte</div>
                    <div className="text-xl font-black text-primary tracking-widest">{CONTACT_PHONE}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="text-accent font-black uppercase tracking-[0.3em] text-xs">Nous contacter</div>
                  <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none">Parlons de votre <br /> projet.</h1>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg">
                    Notre agence est située à Koumassi, Abidjan. Passez nous voir ou 
                    appelez-nous directement.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 bg-primary rounded-[24px] flex items-center justify-center text-accent shadow-xl shadow-primary/20">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Téléphones</div>
                      <div className="text-xl font-black text-primary">{CONTACT_PHONE}</div>
                      <div className="text-xl font-black text-primary">{CONTACT_PHONE_2}</div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 bg-primary rounded-[24px] flex items-center justify-center text-accent shadow-xl shadow-primary/20">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Adresse</div>
                      <div className="text-xl font-black text-primary">Koumassi – Terrain In’challah</div>
                      <div className="text-sm font-bold text-slate-400">Abidjan, Côte d'Ivoire</div>
                    </div>
                  </div>
                </div>

                <div className="aspect-video rounded-[48px] overflow-hidden bg-slate-200 shadow-2xl relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                    [ Google Maps Placeholder - Koumassi ]
                  </div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.868777174154!2d-3.956789!3d5.297890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ef68962285e9%3A0x6a0c0c0c0c0c0c0c!2sKoumassi%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1620000000000!5m2!1sfr!2sci" 
                    className="w-full h-full border-0 grayscale opacity-80"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white p-12 md:p-16 rounded-[64px] border border-slate-100 shadow-2xl space-y-10">
                <h3 className="text-3xl font-black text-primary tracking-tight">Envoyez un message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
                      <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Sujet</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                    <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-primary border border-transparent focus:border-accent/30 transition-all resize-none"></textarea>
                  </div>
                  <button className="w-full py-6 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20">
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {['about', 'services'].includes(currentView) && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent/20 rounded-[28px] flex items-center justify-center text-accent mx-auto mb-6">
                {currentView === 'about' ? <Building2 className="w-10 h-10" /> : <Star className="w-10 h-10" />}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
                {currentView === 'about' ? 'À Propos de A.I.F' : 'Nos Services Experts'}
              </h1>
              <p className="text-slate-500 font-bold text-xl max-w-2xl mx-auto">
                {currentView === 'about' 
                  ? "L'Agence Immobilière La Foi (A.I.F) est votre partenaire de confiance à Koumassi pour tous vos projets immobiliers."
                  : "Nous offrons une gamme complète de services pour répondre à tous vos besoins immobiliers à Abidjan."}
              </p>
            </div>

            {currentView === 'about' ? (
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl font-black text-primary leading-tight">Une vision moderne de l'immobilier à Abidjan</h2>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    Située au cœur de Koumassi, A.I.F est née d'une volonté de simplifier l'accès au logement 
                    pour tous. Que vous soyez étudiant, jeune travailleur ou une famille, nous mettons 
                    notre expertise à votre service pour trouver le bien qui vous correspond.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-lg">
                      <div className="text-3xl font-black text-accent mb-1">500+</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Biens gérés</div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-lg">
                      <div className="text-3xl font-black text-accent mb-1">1000+</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clients satisfaits</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="A.I.F Office" />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Location", desc: "Chambres, studios et appartements propres et sécurisés." },
                  { title: "Vente", desc: "Maisons basses, villas et terrains avec documents certifiés." },
                  { title: "Gestion", desc: "Gestion locative complète pour les propriétaires." },
                  { title: "Conseil", desc: "Accompagnement juridique et stratégique pour vos achats." },
                  { title: "Investissement", desc: "Opportunités de projets immobiliers rentables." },
                  { title: "Achat", desc: "Recherche personnalisée selon vos critères et budget." }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all space-y-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-primary">{s.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent shadow-lg shadow-primary/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none tracking-tight text-primary">A.I.F</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">La Foi Immobilier</span>
              </div>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              Votre agence de confiance à Koumassi pour trouver votre logement 
              facilement et en toute sécurité à Abidjan.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Accueil', 'Nos Biens', 'Services', 'À propos', 'Rendez-vous', 'Contact'].map((item, i) => {
                const views: View[] = ['home', 'properties', 'services', 'about', 'appointment', 'contact'];
                return (
                  <li key={item}>
                    <button onClick={() => navigateTo(views[i])} className="text-slate-500 font-bold hover:text-primary transition-colors">
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-slate-500 font-bold">
                  {CONTACT_PHONE} <br />
                  {CONTACT_PHONE_2}
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-slate-500 font-bold">
                  Koumassi Terrain In’challah, <br /> Abidjan, Côte d'Ivoire
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-slate-500 text-sm font-bold">Recevez nos dernières offres immobilières à Koumassi.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-grow px-5 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm border border-transparent focus:border-accent/30 transition-all"
              />
              <button className="p-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2026 Agence Immobilière La Foi (A.I.F). Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a 
          href={WHATSAPP_LINK}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-success text-white rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-primary font-black text-xs uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-slate-100">
            WhatsApp
          </span>
        </a>
        
        {/* Call Button */}
        <a 
          href={`tel:${CONTACT_PHONE}`}
          className="w-16 h-16 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative"
        >
          <Phone className="w-8 h-8" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-primary font-black text-xs uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none border border-slate-100">
            Appeler
          </span>
        </a>
      </div>
    </div>
  );
}
