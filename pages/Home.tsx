
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Model } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { ChevronRight, ChevronDown, Users, Zap, Verified, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { models } = useAdmin();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  
  // Filtra apenas modelos marcadas como heróis E ativas no Dashboard
  const heroModels = models.filter(m => m.isHero && m.isActive);
  const featuredModels = heroModels.length > 0 
    ? heroModels.slice(0, 4)
    : models.filter(m => m.isActive).slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Background Video for Hero Section */}
      <div className="absolute inset-0 w-full h-screen -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>
        
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
        >
          <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=330f61208a54d48523c1e95640107e3ca0324831&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4">
        <div className="relative animate-float-slow flex items-center justify-center">
          <div className="absolute w-[140%] h-[140%] border border-dashed border-amber-900/20 rounded-full animate-spin-slow"></div>
          <div className="relative z-10 group cursor-pointer animate-reveal">
             <img 
               src="https://morenabrutacanais.vercel.app/logo.png" 
               alt="Morena Bruta Official" 
               className="w-64 h-64 md:w-[380px] md:h-[380px] object-contain group-hover:scale-105 transition-transform duration-1000 drop-shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
             />
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer animate-bounce">
           <span className="text-[8px] font-black uppercase tracking-[0.4em] text-amber-500 mb-2">Deslize para o Luxo</span>
           <ChevronDown size={24} className="text-amber-500" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 glass border-x-0 border-white/5 mx-4 md:mx-auto max-w-7xl rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-8 px-12 relative z-20 shadow-2xl -mt-10">
        <div className="text-center md:border-r border-white/5">
           <p className="text-3xl md:text-4xl font-black text-white">{models.filter(m => m.isActive).length}+</p>
           <p className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Modelos Ativas</p>
        </div>
        <div className="text-center md:border-r border-white/5">
           <p className="text-3xl md:text-4xl font-black text-white">24/7</p>
           <p className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Concierge VIP</p>
        </div>
        <div className="text-center md:border-r border-white/5">
           <p className="text-3xl md:text-4xl font-black text-white">100%</p>
           <p className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Sigilo Total</p>
        </div>
        <div className="text-center">
           <p className="text-3xl md:text-4xl font-black text-white">Elite</p>
           <p className="text-[10px] uppercase font-bold text-amber-600 mt-1 tracking-widest">Standard Premium</p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-amber-600 font-black uppercase text-[10px] tracking-[0.5em] mb-4 block">Seleção de Elite</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">Destaques da <br/> <span className="gold-gradient italic font-serif uppercase">SEMANA.</span></h2>
            </div>
            <Link to="/modelos" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all border border-white/10">
              Explorar Elenco <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredModels.map((model) => (
              <ModelCard key={model.id} model={model} onClick={(m) => setSelectedModel(m)} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer-CTA Section */}
      <section className="py-40 container mx-auto px-6 text-center relative bg-black">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-amber-600/10 blur-[180px] -z-10"></div>
         <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 text-white uppercase leading-[0.85]">
            Experiência <br/> <span className="gold-gradient italic font-serif uppercase">INESQUECÍVEL.</span>
         </h2>
         <Link to="/contato" className="inline-flex items-center gap-4 bg-amber-600 hover:bg-amber-500 text-white px-12 py-6 rounded-3xl font-black text-xl tracking-tight transition-all shadow-[0_20px_50px_rgba(217,119,6,0.3)] hover:scale-105 active:scale-95">
           RESERVAR AGORA
           <ArrowRight size={24} />
         </Link>
      </section>

      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default Home;
