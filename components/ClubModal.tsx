
import React from 'react';
import { Club } from '../types';
import { X, MapPin, Clock, Star } from 'lucide-react';

interface ClubModalProps {
  club: Club;
  onClose: () => void;
}

const ClubModal: React.FC<ClubModalProps> = ({ club, onClose }) => {
  return (
    <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-0 md:p-4 lg:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-zinc-950 w-full max-w-5xl h-[95vh] md:h-auto md:max-h-[90vh] rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500 border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 bg-black/40 text-white rounded-full hover:bg-amber-600 transition-all border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          <div className="w-full h-[35vh] md:h-[45vh] relative">
             <img src={club.mainPhoto} className="w-full h-full object-cover" alt={club.name} />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          </div>

          <div className="p-6 md:p-12 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{club.name}</h2>
                <div className="flex flex-wrap gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-600" /> {club.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-600" /> {club.openingHours}</span>
                  <span className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor" /> {club.rating}</span>
                </div>
              </div>
              <button className="w-full md:w-auto bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
                Ver Ingressos
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">O Ambiente</h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium">{club.description}</p>
                </div>

                <div>
                   <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Galeria de Fotos</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                     {club.photos.map((p, idx) => (
                       <img key={idx} src={p} className="rounded-xl w-full h-24 md:h-32 object-cover border border-white/5" alt="Club" />
                     ))}
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Localização</h4>
                  <p className="text-xs text-gray-300 font-bold mb-4">{club.address}</p>
                  
                  <div className="aspect-video bg-black/50 rounded-xl overflow-hidden relative flex items-center justify-center border border-white/5 group">
                    <MapPin size={24} className="text-amber-600 animate-bounce" />
                  </div>
                  
                  <a href={club.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-amber-600 hover:text-white">
                    Abrir Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
