
import React, { useEffect, useState, useRef } from 'react';
import { Model } from '../types';
import { X, Phone, MessageCircle, Heart, ShieldCheck, ChevronLeft, ChevronRight, Share2, Ruler, Weight, User, MapPin } from 'lucide-react';

interface ModelModalProps {
  model: Model;
  onClose: () => void;
}

const ModelModal: React.FC<ModelModalProps> = ({ model, onClose }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % model.photos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + model.photos.length) % model.photos.length);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-0 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-[30px] animate-in fade-in duration-700 cursor-zoom-out" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-zinc-950 w-full h-full md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_150px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-20 duration-700 border border-white/10">
        
        {/* Gallery Section */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-full bg-black relative flex flex-col group/gallery">
          
          {/* Main Visualizer */}
          <div className="relative flex-grow flex items-center justify-center overflow-hidden bg-[#050505]">
            <img 
              key={activePhotoIndex}
              src={model.photos[activePhotoIndex]} 
              alt={model.name} 
              className="w-full h-full object-contain md:object-cover animate-in fade-in duration-1000 select-none pointer-events-none transition-transform duration-[3s] group-hover/gallery:scale-105"
            />
            
            {/* Desktop Navigation Arrows */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover/gallery:opacity-100 transition-opacity hidden md:flex">
              <button onClick={prevPhoto} className="p-5 bg-black/40 hover:bg-amber-600 rounded-full backdrop-blur-xl border border-white/10 transition-all text-white active:scale-90">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextPhoto} className="p-5 bg-black/40 hover:bg-amber-600 rounded-full backdrop-blur-xl border border-white/10 transition-all text-white active:scale-90">
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Mobile Controls Overlay */}
            <div className="absolute top-6 left-6 z-30 flex gap-2 md:hidden">
              <button onClick={onClose} className="p-3 bg-black/60 backdrop-blur-xl rounded-full text-white border border-white/10"><X size={20} /></button>
            </div>

            {/* Pagination Info */}
            <div className="absolute bottom-8 left-8 z-30 pointer-events-none">
              <div className="px-5 py-2 glass rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="text-amber-500">{(activePhotoIndex + 1).toString().padStart(2, '0')}</span>
                <div className="w-4 h-px bg-white/20"></div>
                <span className="opacity-40">{model.photos.length.toString().padStart(2, '0')} Vistas</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 inset-x-0 z-40 px-6 flex justify-center pointer-events-none">
            <div className="glass p-2.5 rounded-[2.5rem] flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-full pointer-events-auto snap-x">
              {model.photos.map((photo, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative shrink-0 w-12 h-16 rounded-2xl overflow-hidden transition-all duration-500 snap-center border-2 ${
                    activePhotoIndex === idx 
                      ? 'w-16 md:w-20 border-amber-600 scale-105' 
                      : 'opacity-30 border-transparent grayscale hover:opacity-100'
                  }`}
                >
                  <img src={photo} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-[40%] flex flex-col bg-zinc-950 border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
          <div className="p-8 md:p-16 flex flex-col min-h-full">
            
            {/* Desktop Close */}
            <div className="hidden md:flex justify-end mb-12">
               <button onClick={onClose} className="p-4 bg-white/5 hover:bg-zinc-800 hover:text-white rounded-full transition-all text-zinc-500 border border-white/5 active:scale-90">
                 <X size={24} />
               </button>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-3 py-1 bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-widest rounded-full">{model.category}</span>
                {model.verified && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-widest rounded-full">
                    <ShieldCheck size={12} /> Verificada
                  </span>
                )}
              </div>
              
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                {model.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-5 text-zinc-500 font-bold text-xs uppercase tracking-widest">
                <span className="flex items-center gap-2"><Heart size={14} className="text-amber-500" /> {model.age} Anos</span>
                <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                <span className="flex items-center gap-2"><MapPin size={14} className="text-amber-600" /> {model.city}</span>
              </div>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-12">
              {[
                { label: 'Altura', val: model.height, icon: <Ruler size={14}/> },
                { label: 'Peso', val: model.weight, icon: <Weight size={14}/> },
                { label: 'Cabelos', val: model.hair, icon: <User size={14}/> },
                { label: 'Sessão VIP', val: model.price, highlight: true }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-950 p-6 space-y-2">
                  <p className="text-[9px] uppercase text-zinc-600 font-black tracking-[0.2em] flex items-center gap-2">{stat.icon} {stat.label}</p>
                  <p className={`text-xl font-black tracking-tight ${stat.highlight ? 'text-amber-500' : 'text-white'}`}>
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Narrative */}
            <div className="mb-16">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 italic">Sobre o Perfil</h4>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-medium selection:bg-amber-600/30">
                {model.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/${model.whatsapp}`} 
                target="_blank"
                className="flex items-center justify-center gap-3 w-full bg-amber-600 hover:bg-amber-500 text-white py-6 rounded-[2rem] font-black text-lg transition-all shadow-[0_20px_40px_rgba(217,119,6,0.2)] hover:-translate-y-1 active:scale-95"
              >
                <MessageCircle size={24} /> RESERVAR AGORA
              </a>
              <a 
                href={`tel:${model.whatsapp}`}
                className="flex items-center justify-center gap-3 w-full py-5 text-zinc-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all"
              >
                <Phone size={16} /> Solicitar Ligação VIP
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelModal;
