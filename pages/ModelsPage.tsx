
import React, { useState, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Model, Category, Region } from '../types';
import ModelCard from '../components/ModelCard';
import ModelModal from '../components/ModelModal';
import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react';

const ModelsPage: React.FC = () => {
  const { models } = useAdmin();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtra apenas modelos ativas do Dashboard
  const activeModels = useMemo(() => models.filter(m => m.isActive), [models]);

  // Lista de localizações/regiões solicitadas
  const locationOptions = [
    'Cachoeira do Sul',
    'Cachoeirinha',
    'Serra Gaúcha',
    'Torres',
    'Florianópolis'
  ];

  const filteredModels = useMemo(() => {
    return activeModels.filter(model => {
      const matchesCategory = filterCategory === 'All' || model.category === filterCategory;
      const matchesLocation = filterLocation === 'All' || 
                             model.region === filterLocation || 
                             model.city === filterLocation;
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           model.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [filterCategory, filterLocation, searchQuery, activeModels]);

  const clearFilters = () => {
    setFilterCategory('All');
    setFilterLocation('All');
    setSearchQuery('');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative bg-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6">
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-600/10 rounded-full border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-reveal">
            Portfolio de Elite
          </div>
          <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.85] animate-reveal">
            Perfis <br/> <span className="gold-gradient font-serif italic uppercase">PREMIUM.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed animate-reveal">
            Curadoria rigorosa e sigilo absoluto. Escolha sua companhia perfeita entre as modelos mais desejadas da região.
          </p>
        </header>

        {/* Filters */}
        <div className="glass p-8 rounded-[3rem] mb-20 border-white/5 sticky top-28 z-40 shadow-3xl animate-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-4 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Filtrar por Nome</label>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={16}/>
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-amber-600 transition-all outline-none" 
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Localização</label>
              <select 
                value={filterLocation} 
                onChange={(e) => setFilterLocation(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-amber-600 transition-all outline-none cursor-pointer appearance-none"
              >
                <option value="All">Todas as Cidades</option>
                {locationOptions.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Categorias</label>
              <div className="flex gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                {['All', Category.DIAMOND, Category.GOLD, Category.PREMIUM].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setFilterCategory(cat)} 
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filterCategory === cat ? 'bg-amber-600 text-white shadow-lg' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {cat === 'All' ? 'Tudo' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
               <button 
                onClick={clearFilters}
                className="w-full h-[58px] bg-white/5 hover:bg-zinc-800 text-zinc-500 hover:text-amber-500 rounded-2xl flex items-center justify-center transition-all border border-white/5"
               >
                 <X size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} onClick={(m) => setSelectedModel(m)} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center glass rounded-[4rem] border-dashed border-white/10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 text-zinc-700">
               <SlidersHorizontal size={40} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Nenhum perfil encontrado</h3>
            <p className="text-zinc-500 max-w-sm mx-auto font-medium">Tente ajustar seus filtros ou <button onClick={clearFilters} className="text-amber-500 underline underline-offset-4">resetar busca</button>.</p>
          </div>
        )}
      </div>

      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  );
};

export default ModelsPage;
