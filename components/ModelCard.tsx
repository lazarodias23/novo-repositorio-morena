
import React from 'react';
import { Model, Category } from '../types';
import { ShieldCheck, MapPin, Star, ArrowUpRight } from 'lucide-react';

interface ModelCardProps {
  model: Model;
  onClick: (model: Model) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const getCategoryStyles = (cat: Category) => {
    switch (cat) {
      case Category.DIAMOND: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case Category.GOLD: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case Category.PREMIUM: return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div 
      className="group relative glass rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 p-3 hover:bg-white/[0.02] border-white/5 hover:border-amber-600/30 animate-reveal"
      onClick={() => onClick(model)}
    >
      {/* Visual Container */}
      <div className="aspect-[3/4] overflow-hidden rounded-[2rem] relative bg-zinc-900">
        <img 
          src={model.mainPhoto} 
          alt={model.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-[1.5s] ease-expo group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Badge Overlay */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <div className={`px-4 py-1.5 border rounded-full text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl shadow-2xl ${getCategoryStyles(model.category)}`}>
            {model.category}
          </div>
          {model.verified && (
            <div className="w-fit flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md">
              <ShieldCheck size={10} /> Verificada
            </div>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-0.5">Booking VIP</span>
            <span className="text-lg font-black text-white tracking-tight">{model.price}</span>
          </div>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* Info Body */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-amber-500 transition-colors">
            {model.name}
          </h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-lg border border-white/5">
            <span className="text-xs font-black text-zinc-400">{model.age}y</span>
          </div>
        </div>
        
        <div className="flex items-center text-[11px] font-bold text-zinc-500 uppercase tracking-widest gap-2">
          <MapPin size={12} className="text-amber-600" />
          <span>{model.city}</span>
          <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
          <span>{model.region}</span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
