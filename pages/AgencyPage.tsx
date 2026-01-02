
import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { HOUSE_PHOTOS, QUALITY_SEALS } from '../constants';
import { Model, Region } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { MapPin, Camera, ArrowUpRight, X, MessageCircle, Lock, Info, Award, ShieldCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const AgencyPage: React.FC = () => {
  const { models } = useAdmin();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filtra modelos para o carrossel da agência
  const carouselModels = models.filter(m => m.isAgencyCarousel).length > 0
    ? models.filter(m => m.isAgencyCarousel)
    : models.slice(0, 6);

  useEffect(() => {
    if (isHouseModalOpen || selectedRegion || selectedModel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isHouseModalOpen, selectedRegion, selectedModel]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const regions = [
    { name: 'Cachoeirinha', count: models.filter(m => m.region === 'Cachoeirinha').length, image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800' },
    { name: 'Serra Gaúcha', count: models.filter(m => m.region === 'Serra Gaúcha').length, image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Torres', count: models.filter(m => m.region === 'Torres').length, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Florianópolis', count: models.filter(m => m.region === 'Florianópolis').length, image: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?auto=format&fit=crop&q=80&w=800' },
  ];

  const filteredModels = models.filter(m => m.region === selectedRegion);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award size={24} />;
      case 'Lock': return <Lock size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'Users': return <Users size={24} />;
      default: return <Info size={24} />;
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-900/5 blur-[150px] rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Section 1: Hero & Sobre Nós */}
        <section className="mb-24 md:mb-32">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.5em] text-amber-500 mb-4 block animate-pulse">Agência Morena Bruta</span>
            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-6">
              O Novo Padrão de <br className="hidden md:block"/> <span className="gold-gradient italic font-serif uppercase">LUXO E PRAZER.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter">Sobre a Agência</h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                A Morena Bruta nasceu da necessidade de elevar o mercado de acompanhantes de luxo a um nível de profissionalismo nunca antes visto. Nossa curadoria é focada na inteligência, postura e estética impecável.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {QUALITY_SEALS.map((seal) => (
                  <div key={seal.id} className="glass p-5 md:p-6 rounded-2xl border-white/5 hover:neon-border-gold transition-all group">
                    <div className="text-amber-500 mb-3 group-hover:scale-110 transition-transform">
                      {getIcon(seal.icon)}
                    </div>
                    <h4 className="text-white font-bold mb-1.5 uppercase text-[11px] md:text-sm tracking-widest">{seal.name}</h4>
                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">{seal.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-amber-600/10 blur-[100px] rounded-full"></div>
              <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover grayscale opacity-60" 
                  alt="Luxo" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Modelos da Agência (Carrossel) */}
        <section className="mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter">Modelos da Agência</h2>
              <p className="text-amber-500 font-bold uppercase text-[9px] tracking-[0.4em] mt-2 italic">Seleção Platinum</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollCarousel('left')} className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-all border-white/10">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scrollCarousel('right')} className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-all border-white/10">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 scroll-smooth">
            {carouselModels.map((model) => (
              <div key={model.id} className="min-w-[280px] md:min-w-[380px] snap-center">
                <ModelCard model={model} onClick={(m) => setSelectedModel(m)} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Local de Atendimento (Sede) */}
        <section className="mb-24 md:mb-32">
          <div className="glass p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 rounded-full border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-widest">
                  <MapPin size={12}/> Cachoeira do Sul - RS
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1] md:leading-[0.9]">
                  Nossa Sede <br/> <span className="gold-gradient italic font-serif uppercase">PRIVATIVA.</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  Localizada discretamente, nossa sede é um oásis de sofisticação com bar privativo e suítes temáticas de alto padrão.
                </p>
                <div className="p-4 glass rounded-2xl border-white/5 flex items-center gap-4">
                  <div className="p-2 bg-amber-600/10 rounded-xl text-amber-500 shrink-0"><Lock size={18}/></div>
                  <div>
                    <p className="text-white font-bold text-xs">Endereço Confidencial</p>
                    <p className="text-gray-500 text-[10px]">Liberado após agendamento confirmado.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsHouseModalOpen(true)}
                  className="w-full md:w-auto bg-white text-black hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  <Camera size={18} /> Galeria da Casa
                </button>
              </div>

              <div className="h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 grayscale">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55307.3916055544!2d-52.9248434!3d-30.0336215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9504838641a17141%3A0x6a1575417855b76b!2sCachoeira%20do%20Sul%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1709123456789!5m2!1spt-BR!2sbr" 
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%)' }} loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Atendimento Multirregional */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-3">Pólos <span className="gold-gradient italic font-serif uppercase">ESTRATÉGICOS</span></h2>
            <p className="text-gray-500 font-medium text-sm">Operamos nas principais regiões com logística de alto padrão.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {regions.map((region) => (
              <div 
                key={region.name}
                onClick={() => setSelectedRegion(region.name)}
                className="group relative h-72 md:h-96 rounded-[2rem] overflow-hidden cursor-pointer glass border-white/5 hover:neon-border-gold transition-all"
              >
                <img src={region.image} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" alt={region.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{region.name}</h3>
                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">{region.count} VIP Models</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* House Photos Modal */}
      {isHouseModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setIsHouseModalOpen(false)}></div>
          <div className="relative glass w-full max-w-6xl h-[95vh] md:h-[90vh] rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <button onClick={() => setIsHouseModalOpen(false)} className="absolute top-5 right-5 z-30 p-2.5 bg-black/50 text-white rounded-full border border-white/10">
              <X size={20} />
            </button>

            <div className="w-full md:w-[60%] h-[50vh] md:h-full overflow-y-auto scrollbar-hide bg-black/40 p-2 md:p-4 md:border-r border-white/5">
              <div className="grid grid-cols-1 gap-2 md:gap-4">
                {HOUSE_PHOTOS.map((photo, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden bg-black/50 aspect-video md:aspect-auto">
                    <img src={photo} alt="Casa" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-zinc-950">
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">Explore o <span className="gold-gradient font-serif italic uppercase">SANTUÁRIO.</span></h3>
                <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">Estrutura privativa com segurança 24h e total sigilo operacional em Cachoeira do Sul.</p>
                <div className="flex flex-col gap-3 pt-4">
                  <a href="https://wa.me/5551996554609" target="_blank" className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-4 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95">
                    <MessageCircle size={20} /> RESERVA VIP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regional Models Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedRegion(null)}></div>
          <div className="relative glass w-full max-w-6xl h-[95vh] md:h-[85vh] rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-12 overflow-y-auto custom-scrollbar border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex items-center justify-between mb-8 md:mb-12 sticky top-0 bg-transparent py-2 z-10">
               <div>
                 <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Elite <span className="gold-gradient font-serif italic uppercase">{selectedRegion.toUpperCase()}</span></h2>
                 <p className="text-gray-500 font-bold uppercase text-[9px] tracking-[0.4em] mt-2">Catálogo Regional Exclusivo</p>
               </div>
               <button onClick={() => setSelectedRegion(null)} className="p-2.5 bg-white/5 hover:bg-amber-600 text-white rounded-full transition-all border border-white/10">
                  <X size={20}/>
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} onClick={(m) => setSelectedModel(m)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default AgencyPage;
