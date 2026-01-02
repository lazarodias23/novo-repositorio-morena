
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Club } from '../types';
import ClubCard from '../components/ClubCard';
import ClubModal from '../components/ClubModal';

const ClubsPage: React.FC = () => {
  const { clubs } = useAdmin();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Boates <span className="gold-gradient italic font-serif uppercase">Parceiras</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Os ambientes mais seguros e luxuosos para você desfrutar de bons drinks e da melhor companhia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} onClick={(c) => setSelectedClub(c)} />
          ))}
        </div>
        
        <div className="mt-24 p-12 glass rounded-[3rem] border-amber-900/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">Ambientes Credenciados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400">
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Trabalhamos apenas com casas noturnas que atendem aos nossos padrões de excelência. Todos os locais parceiros possuem infraestrutura premium, segurança privada e ambiente climatizado.
                </p>
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                  <span>✓</span> Prioridade na Entrada
                </div>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Nossas modelos possuem livre acesso a estas casas, facilitando encontros espontâneos em locais de alta classe. Consulte a disponibilidade de cada parceira.
                </p>
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                  <span>✓</span> Reservas de Camarote
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedClub && <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />}
    </div>
  );
};

export default ClubsPage;
