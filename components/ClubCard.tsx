
import React from 'react';
import { Club } from '../types';
import { MapPin, Star, Clock } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onClick }) => {
  return (
    <div 
      className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2"
      onClick={() => onClick(club)}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={club.mainPhoto} 
          alt={club.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black uppercase tracking-tight">{club.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-bold">{club.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {club.description}
        </p>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2"><MapPin size={14} className="text-red-600" /> {club.location}</div>
          <div className="flex items-center gap-2"><Clock size={14} className="text-red-600" /> {club.openingHours}</div>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
