import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home as HomeIcon, 
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
  Instagram,
  Facebook,
  Twitter,
  Star
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

  const featuredProperties = PROPERTIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent">
              <Building2 className="w-6 h-6" />
            </div>
            <span className={`text-xl font-extrabold tracking-tight uppercase ${scrolled ? "text-primary" : "text-white"}`}>
              Ivoire <span className="text-accent">Prestige</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Accueil', 'Biens', 'Services', 'À propos', 'Contact'].map((item, i) => {
              const views: View[] = ['home', 'properties', 'services', 'about', 'contact'];
              return (
                <button 
                  key={item}
                  onClick={() => navigateTo(views[i])}
                  className={`text-sm font-bold transition-colors ${scrolled ? "text-slate-600 hover:text-accent" : "text-white/80 hover:text-white"}`}
                >
                  {item}
                </button>
              );
            })}
            <button 
              onClick={() => navigateTo('contact')}
              className="px-6 py-2.5 bg-accent text-primary text-sm font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              Publier une annonce
            </button>
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl p-6 flex flex-col gap-4 border-t border-slate-100"
            >
              {['Accueil', 'Biens', 'Services', 'À propos', 'Contact'].map((item, i) => {
                const views: View[] = ['home', 'properties', 'services', 'about', 'contact'];
                return (
                  <button 
                    key={item}
                    onClick={() => navigateTo(views[i])}
                    className="text-lg font-bold text-slate-700 text-left py-2 border-b border-slate-50"
                  >
                    {item}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover"
                  alt="Luxury Home"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent font-bold uppercase tracking-widest text-xs">
                    <Star className="w-3 h-3 fill-accent" />
                    L'immobilier d'exception en Côte d'Ivoire
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                    Trouvez la Maison de <span className="text-accent">vos Rêves</span>
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                    Découvrez notre sélection exclusive de villas, appartements et terrains 
                    dans les quartiers les plus prestigieux d'Abidjan.
                  </p>
                  
                  {/* Search Bar */}
                  <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                    <div className="flex-grow flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-2">
                      <Search className="text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Quartier, ville..." 
                        className="w-full outline-none text-slate-700 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => navigateTo('properties')}
                      className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      Rechercher
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Featured Properties */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-primary">Biens en Vedette</h2>
                  <p className="text-slate-500 max-w-xl">
                    Une sélection rigoureuse de nos propriétés les plus exceptionnelles 
                    actuellement disponibles sur le marché.
                  </p>
                </div>
                <button 
                  onClick={() => navigateTo('properties')}
                  className="flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all"
                >
                  Voir tout le catalogue <ArrowRight className="w-5 h-5" />
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
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full">
                          {prop.type}
                        </span>
                        <span className={`px-3 py-1 ${prop.status === 'vente' ? "bg-accent" : "bg-green-600"} text-white text-[10px] font-bold uppercase rounded-full`}>
                          À {prop.status}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${favorites.includes(prop.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white hover:text-red-500"}`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(prop.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors cursor-pointer" onClick={() => navigateTo('detail', prop)}>
                          {prop.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        {prop.location}, {prop.city}
                      </div>
                      <div className="flex items-center justify-between py-4 border-y border-slate-50">
                        {prop.bedrooms && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Bed className="w-4 h-4 text-accent" />
                            <span className="text-sm font-bold">{prop.bedrooms}</span>
                          </div>
                        )}
                        {prop.bathrooms && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Bath className="w-4 h-4 text-accent" />
                            <span className="text-sm font-bold">{prop.bathrooms}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600">
                          <Maximize className="w-4 h-4 text-accent" />
                          <span className="text-sm font-bold">{prop.area} m²</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xl font-extrabold text-primary">
                          {formatPrice(prop.price)}
                          {prop.status === 'location' && <span className="text-sm font-normal text-slate-400"> /mois</span>}
                        </div>
                        <button 
                          onClick={() => navigateTo('detail', prop)}
                          className="p-2 bg-slate-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-primary py-24">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                    Pourquoi choisir <span className="text-accent">Ivoire Prestige</span> ?
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Nous redéfinissons les standards de l'immobilier en Côte d'Ivoire avec 
                    une approche personnalisée et une expertise locale inégalée.
                  </p>
                  <div className="grid gap-6">
                    {[
                      { title: "Expertise Locale", desc: "Une connaissance approfondie du marché ivoirien." },
                      { title: "Accompagnement Sur-mesure", desc: "Un agent dédié pour chaque étape de votre projet." },
                      { title: "Transparence Totale", desc: "Des transactions sécurisées et des documents certifiés." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-accent w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.title}</h4>
                          <p className="text-white/40">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-[40px] overflow-hidden border-8 border-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
                      alt="Modern Office"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-accent p-8 rounded-3xl shadow-2xl">
                    <div className="text-4xl font-black text-primary mb-1">15+</div>
                    <div className="text-primary/70 font-bold uppercase tracking-wider text-xs">Années d'expérience</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'properties' && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold text-primary">Nos Propriétés</h1>
                <p className="text-slate-500">Découvrez tous nos biens disponibles en Côte d'Ivoire.</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-grow md:w-80 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                  <Search className="text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="w-full outline-none text-sm font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="p-3 bg-white border border-slate-100 rounded-2xl text-primary hover:bg-slate-50 transition-all">
                  <Filter className="w-5 h-5" />
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
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={prop.images[0]} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full">
                        {prop.type}
                      </span>
                      <span className={`px-3 py-1 ${prop.status === 'vente' ? "bg-accent" : "bg-green-600"} text-white text-[10px] font-bold uppercase rounded-full`}>
                        À {prop.status}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(prop.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${favorites.includes(prop.id) ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white hover:text-red-500"}`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(prop.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors cursor-pointer" onClick={() => navigateTo('detail', prop)}>
                      {prop.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {prop.location}, {prop.city}
                    </div>
                    <div className="flex items-center justify-between py-4 border-y border-slate-50">
                      {prop.bedrooms && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Bed className="w-4 h-4 text-accent" />
                          <span className="text-sm font-bold">{prop.bedrooms}</span>
                        </div>
                      )}
                      {prop.bathrooms && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Bath className="w-4 h-4 text-accent" />
                          <span className="text-sm font-bold">{prop.bathrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Maximize className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold">{prop.area} m²</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xl font-extrabold text-primary">
                        {formatPrice(prop.price)}
                        {prop.status === 'location' && <span className="text-sm font-normal text-slate-400"> /mois</span>}
                      </div>
                      <button 
                        onClick={() => navigateTo('detail', prop)}
                        className="p-2 bg-slate-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
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
              className="flex items-center gap-2 text-slate-500 hover:text-accent mb-8 font-bold transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" /> Retour aux annonces
            </button>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Gallery */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 aspect-video rounded-[32px] overflow-hidden">
                    <img src={selectedProperty.images[0]} className="w-full h-full object-cover" alt={selectedProperty.title} />
                  </div>
                  {selectedProperty.images.slice(1).map((img, i) => (
                    <div key={i} className="aspect-video rounded-3xl overflow-hidden">
                      <img src={img} className="w-full h-full object-cover" alt={`${selectedProperty.title} ${i + 2}`} />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full border border-accent/20">
                      {selectedProperty.type}
                    </span>
                    <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase rounded-full">
                      À {selectedProperty.status}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                    {selectedProperty.title}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-500 text-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                    {selectedProperty.location}, {selectedProperty.city}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-100">
                  {selectedProperty.bedrooms && (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-accent">
                        <Bed className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-slate-400">Chambres</span>
                      <span className="font-bold text-primary">{selectedProperty.bedrooms}</span>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-accent">
                        <Bath className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-slate-400">Salles de bain</span>
                      <span className="font-bold text-primary">{selectedProperty.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-accent">
                      <Maximize className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-slate-400">Surface</span>
                    <span className="font-bold text-primary">{selectedProperty.area} m²</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Description</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {selectedProperty.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Caractéristiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProperty.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl sticky top-32">
                  <div className="text-3xl font-black text-primary mb-8">
                    {formatPrice(selectedProperty.price)}
                    {selectedProperty.status === 'location' && <span className="text-sm font-normal text-slate-400"> /mois</span>}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <img src={selectedProperty.agent.image} className="w-14 h-14 rounded-xl object-cover" alt={selectedProperty.agent.name} />
                      <div>
                        <div className="text-sm text-slate-400">Agent immobilier</div>
                        <div className="font-bold text-primary">{selectedProperty.agent.name}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a 
                        href={`tel:${selectedProperty.agent.phone}`}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all"
                      >
                        <Phone className="w-5 h-5" /> Appeler l'agent
                      </a>
                      <a 
                        href={`https://wa.me/${selectedProperty.agent.phone.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all"
                      >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </a>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="font-bold text-primary mb-4">Demander plus d'infos</h4>
                      <form className="space-y-4">
                        <input type="text" placeholder="Votre nom" className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none text-sm" />
                        <input type="email" placeholder="Votre email" className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none text-sm" />
                        <textarea placeholder="Votre message" rows={3} className="w-full px-4 py-3 bg-slate-50 rounded-xl outline-none text-sm resize-none"></textarea>
                        <button className="w-full py-4 bg-accent text-primary rounded-2xl font-bold hover:bg-accent/90 transition-all">
                          Envoyer le message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {['about', 'services', 'contact'].includes(currentView) && (
          <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-[40px] p-12 md:p-24 border border-slate-100 shadow-xl text-center space-y-8">
              <div className="w-24 h-24 bg-accent/20 rounded-[32px] flex items-center justify-center text-accent mx-auto">
                {currentView === 'about' ? <Building2 className="w-12 h-12" /> : 
                 currentView === 'services' ? <Star className="w-12 h-12" /> : 
                 <Mail className="w-12 h-12" />}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                {currentView === 'about' ? 'À Propos de Nous' : 
                 currentView === 'services' ? 'Nos Services' : 
                 'Contactez-Nous'}
              </h1>
              <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
                {currentView === 'about' ? "Ivoire Prestige Immobilier est le leader de l'immobilier de luxe en Côte d'Ivoire depuis plus de 15 ans." : 
                 currentView === 'services' ? "Nous offrons une gamme complète de services : vente, location, gestion locative et conseil en investissement." : 
                 "Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigateTo('properties')}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all"
                >
                  Voir nos biens
                </button>
                <button 
                  onClick={() => navigateTo('home')}
                  className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight uppercase text-primary">
                Ivoire <span className="text-accent">Prestige</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Votre partenaire de confiance pour tous vos projets immobiliers 
              d'exception en Côte d'Ivoire.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-4">
              {['Accueil', 'Biens', 'Services', 'À propos', 'Contact'].map((item, i) => {
                const views: View[] = ['home', 'properties', 'services', 'about', 'contact'];
                return (
                  <li key={item}>
                    <button onClick={() => navigateTo(views[i])} className="text-slate-500 hover:text-accent transition-colors">
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Vente de biens', 'Location longue durée', 'Gestion locative', 'Conseil en investissement', 'Estimation gratuite'].map((item) => (
                <li key={item} className="text-slate-500">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-primary font-bold mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm">Inscrivez-vous pour recevoir nos dernières offres exclusives.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-grow px-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-accent/20 text-sm"
              />
              <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 Ivoire Prestige Immobilier. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Mentions légales</a>
            <a href="#" className="hover:text-primary">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/2250707070707" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-primary font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
          Besoin d'aide ?
        </span>
      </a>
    </div>
  );
}
