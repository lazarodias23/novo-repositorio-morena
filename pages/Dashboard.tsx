
import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { DatabaseService } from '../services/database';
import { isSupabaseConfigured } from '../lib/supabase';
import { Model, Category, ServiceType, Region, Club } from '../types';
import { 
  LayoutDashboard, Users, MapPin, Plus, Edit2, Trash2, 
  ExternalLink, Database, RefreshCcw, Loader2, AlertTriangle, 
  Eye, ShieldCheck, Star, Camera, Settings, Info, Search, Building2, Clock, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { models, clubs, loading, refreshData, addModel, updateModel, deleteModel, addClub, updateClub } = useAdmin();
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'clubs' | 'database'>('overview');
  
  // States para Modelos
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [modelPhotosInput, setModelPhotosInput] = useState('');
  
  // States para Boates
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [clubPhotosInput, setClubPhotosInput] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const regions: Region[] = ['Cachoeirinha', 'Serra Gaúcha', 'Torres', 'Florianópolis', 'Cachoeira do Sul'];

  const [modelForm, setModelForm] = useState<Partial<Model>>({
    name: '', age: 22, category: Category.GOLD, price: 'R$ 600/h', 
    verified: true, mainPhoto: '', city: '',
    region: 'Cachoeira do Sul', isHero: false, isAgencyCarousel: false,
    isActive: true, height: '1.70m', weight: '60kg', hair: 'Morena', 
    description: '', whatsapp: '5551996554609', services: [ServiceType.INCALL]
  });

  const [clubForm, setClubForm] = useState<Partial<Club>>({
    name: '', location: '', address: '', description: '',
    openingHours: '24h', rating: 5, mapsUrl: '', mainPhoto: '', photos: [], isActive: true
  });

  const handleOpenModelModal = (model?: Model) => {
    setErrorMessage(null);
    if (model) {
      setEditingModel(model);
      setModelForm(model);
      setModelPhotosInput(model.photos?.join(', ') || '');
    } else {
      setEditingModel(null);
      setModelForm({
        id: Math.random().toString(36).substr(2, 9),
        name: '', age: 22, category: Category.GOLD, region: 'Cachoeira do Sul', 
        city: '', price: 'R$ 600/h', verified: true, 
        mainPhoto: '', services: [ServiceType.INCALL], whatsapp: '5551996554609', 
        photos: [], description: '', height: '1.70m', weight: '60kg', hair: 'Morena',
        isHero: false, isAgencyCarousel: false, isActive: true
      });
      setModelPhotosInput('');
    }
    setIsModelModalOpen(true);
  };

  const handleOpenClubModal = (club?: Club) => {
    setErrorMessage(null);
    if (club) {
      setEditingClub(club);
      setClubForm(club);
      setClubPhotosInput(club.photos?.join(', ') || '');
    } else {
      setEditingClub(null);
      setClubForm({
        id: Math.random().toString(36).substr(2, 9),
        name: '', location: '', address: '', description: '',
        openingHours: '24h', rating: 5, mapsUrl: '', mainPhoto: '', photos: [], isActive: true
      });
      setClubPhotosInput('');
    }
    setIsClubModalOpen(true);
  };

  const handleSaveModel = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const photoArray = modelPhotosInput.split(',').map(s => s.trim()).filter(s => s !== '');
      const finalModel = { ...modelForm, photos: photoArray } as Model;
      
      let success = false;
      if (editingModel) {
        success = await DatabaseService.updateModel(finalModel);
      } else {
        success = await DatabaseService.addModel(finalModel);
      }
      
      if (success) {
        await refreshData();
        setIsModelModalOpen(false);
      } else {
        setErrorMessage("Erro ao salvar no Supabase. Verifique a conexão.");
      }
    } catch (e) {
      setErrorMessage("Erro crítico: " + (e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveClub = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const photoArray = clubPhotosInput.split(',').map(s => s.trim()).filter(s => s !== '');
      const finalClub = { ...clubForm, photos: photoArray } as Club;
      
      const success = await DatabaseService.saveClub(finalClub);
      if (success) {
        await refreshData();
        setIsClubModalOpen(false);
      } else {
        setErrorMessage("Erro ao salvar boate.");
      }
    } catch (e) {
      setErrorMessage("Erro crítico: " + (e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = clubs.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <Loader2 size={64} className="text-amber-500 animate-spin" />
        <p className="text-zinc-500 font-black uppercase tracking-widest animate-pulse">Iniciando Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] pt-24 pb-12 flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 border-b lg:border-r border-white/5 px-6 py-8 flex flex-col bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-12">
          <img src="https://morenabrutacanais.vercel.app/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-widest uppercase text-white">Administrador</span>
            <span className="text-[8px] text-amber-500 font-bold tracking-widest uppercase">Morena Bruta Elite</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Resumo Geral', icon: <LayoutDashboard size={18} /> },
            { id: 'models', label: 'Modelos VIP', icon: <Users size={18} /> },
            { id: 'clubs', label: 'Boates / Casas', icon: <Building2 size={18} /> },
            { id: 'database', label: 'Config. Cloud', icon: <Database size={18} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5 space-y-4">
          <Link to="/" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-amber-500 transition-colors">
            <ExternalLink size={14} /> Ir para o Site
          </Link>
          <div className={`flex items-center gap-2 text-[9px] font-black uppercase ${isSupabaseConfigured() ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
            <div className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}></div>
            {isSupabaseConfigured() ? 'Supabase Online' : 'Modo Demo (Local)'}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-12 py-8 overflow-y-auto custom-scrollbar">
        {!isSupabaseConfigured() && (
          <div className="mb-8 p-6 bg-amber-950/20 border border-amber-600/30 rounded-3xl flex items-center gap-6">
            <AlertTriangle className="text-amber-500" size={32} />
            <div>
              <h4 className="text-white font-black uppercase text-xs">Atenção: Supabase não configurado</h4>
              <p className="text-zinc-400 text-xs mt-1">As alterações que você fizer aqui serão temporárias e não serão salvas permanentemente até configurar as chaves em <code>lib/supabase.ts</code>.</p>
            </div>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'models' && 'Gestão de Modelos'}
              {activeTab === 'clubs' && 'Gestão de Boates'}
              {activeTab === 'database' && 'Configurações'}
            </h1>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {(activeTab === 'models' || activeTab === 'clubs') && (
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm text-white w-full md:w-64 focus:border-amber-600 transition-all outline-none"
                />
              </div>
            )}
            <button onClick={() => refreshData()} className="p-3 bg-white/5 text-zinc-500 hover:text-white rounded-xl border border-white/5 transition-all">
              <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            {activeTab === 'models' && (
              <button onClick={() => handleOpenModelModal()} className="bg-amber-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/20">
                <Plus size={18} /> Adicionar Modelo
              </button>
            )}
            {activeTab === 'clubs' && (
              <button onClick={() => handleOpenClubModal()} className="bg-amber-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/20">
                <Plus size={18} /> Adicionar Boate
              </button>
            )}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Modelos VIP', val: models.length, icon: <Users className="text-blue-500" /> },
              { label: 'Boates / Casas', val: clubs.length, icon: <Building2 className="text-amber-500" /> },
              { label: 'Modelos no Banner Hero', val: models.filter(m => m.isHero).length, icon: <Star className="text-amber-500" /> },
            ].map((stat, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-white/5">
                <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6">{stat.icon}</div>
                <p className="text-5xl font-black text-white mb-2">{stat.val}</p>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-4">
            {filteredModels.map(model => (
              <div key={model.id} className="glass p-6 rounded-[2rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-amber-600/30 transition-all">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="relative shrink-0">
                    <img src={model.mainPhoto} className="w-16 h-20 rounded-2xl object-cover border border-white/10" />
                    {model.verified && <div className="absolute -top-2 -right-2 bg-blue-600 p-1 rounded-full text-white shadow-lg"><ShieldCheck size={10} /></div>}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-white uppercase tracking-tight">{model.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-[9px] font-bold uppercase text-zinc-500 flex items-center gap-1"><MapPin size={10} className="text-amber-600" /> {model.city || 'N/A'} • {model.region}</span>
                      <span className="text-[9px] font-black uppercase text-amber-500">{model.category}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                       {model.isHero && <span className="px-2 py-0.5 bg-amber-600/10 text-amber-500 text-[8px] font-black uppercase rounded-md border border-amber-600/20">Hero Banner</span>}
                       {model.isAgencyCarousel && <span className="px-2 py-0.5 bg-blue-600/10 text-blue-500 text-[8px] font-black uppercase rounded-md border border-blue-600/20">Agência</span>}
                       {!model.isActive && <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[8px] font-black uppercase rounded-md border border-red-600/20">Oculta</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => handleOpenModelModal(model)} className="flex-1 md:flex-none p-4 bg-white/5 text-white rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center">
                    <Edit2 size={18}/>
                  </button>
                  <button onClick={() => deleteModel(model.id)} className="flex-1 md:flex-none p-4 bg-white/5 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-4">
            {filteredClubs.map(club => (
              <div key={club.id} className="glass p-6 rounded-[2rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-amber-600/30 transition-all">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <img src={club.mainPhoto} className="w-24 h-16 rounded-2xl object-cover border border-white/10 shrink-0" />
                  <div>
                    <h3 className="font-black text-xl text-white uppercase tracking-tight">{club.name}</h3>
                    <p className="text-[9px] font-bold uppercase text-zinc-500 mt-1 flex items-center gap-1"><MapPin size={10} className="text-amber-600" /> {club.location}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => handleOpenClubModal(club)} className="flex-1 md:flex-none p-4 bg-white/5 text-white rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center">
                    <Edit2 size={18}/></button>
                  <button onClick={() => DatabaseService.saveClub({...club, isActive: false})} className="flex-1 md:flex-none p-4 bg-white/5 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center">
                    <Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'database' && (
          <div className="glass p-12 rounded-[3rem] border-white/5 text-center">
            <Database size={64} className="mx-auto text-amber-500 mb-8" />
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Configuração Supabase</h2>
            <p className="text-zinc-500 max-w-lg mx-auto mb-10 text-sm font-medium">
              Sincronize seu catálogo de modelos com o banco de dados oficial para que as alterações fiquem salvas para todos os visitantes.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <button onClick={() => DatabaseService.exportJSON()} className="px-8 py-5 bg-white/5 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                  Baixar Backup Local (JSON)
               </button>
               <a href="https://supabase.com" target="_blank" className="px-8 py-5 bg-amber-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-amber-900/20">
                  Criar Conta no Supabase
               </a>
            </div>
          </div>
        )}

        {/* Modal Modelo Completo */}
        {isModelModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !isSaving && setIsModelModalOpen(false)}></div>
            <div className="relative glass w-full max-w-5xl p-8 md:p-12 rounded-[3rem] border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl animate-reveal">
              <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                   {editingModel ? 'Editar Perfil VIP' : 'Novo Cadastro Elite'}
                </h2>
                <button onClick={() => setIsModelModalOpen(false)} className="p-3 bg-white/5 rounded-full text-zinc-500 hover:text-white"><Plus className="rotate-45" /></button>
              </header>

              {errorMessage && (
                <div className="mb-8 p-5 bg-red-600/10 border border-red-600/30 rounded-2xl flex items-center gap-4 text-red-500 text-xs font-black uppercase animate-pulse">
                   <AlertTriangle size={18} /> {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Nome Artístico</label>
                    <input value={modelForm.name} onChange={e => setModelForm({...modelForm, name: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-600 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Idade</label>
                      <input type="number" value={modelForm.age} onChange={e => setModelForm({...modelForm, age: Number(e.target.value)})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Preço/h</label>
                      <input value={modelForm.price} onChange={e => setModelForm({...modelForm, price: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Ex: R$ 800/h" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Região Principal</label>
                    <select 
                      value={modelForm.region} 
                      onChange={e => setModelForm({...modelForm, region: e.target.value as Region})}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-600"
                    >
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Cidade de Atuação</label>
                    <input value={modelForm.city} onChange={e => setModelForm({...modelForm, city: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-600" placeholder="Ex: Torres, RS" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Biografia / Descrição</label>
                    <textarea value={modelForm.description} onChange={e => setModelForm({...modelForm, description: e.target.value})} rows={5} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-amber-600 resize-none text-sm" placeholder="Descreva os encantos da modelo..." />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Link Foto Principal</label>
                    <input value={modelForm.mainPhoto} onChange={e => setModelForm({...modelForm, mainPhoto: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="https://exemplo.com/foto.jpg" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Galeria (Links separados por vírgula)</label>
                    <textarea value={modelPhotosInput} onChange={e => setModelPhotosInput(e.target.value)} rows={4} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none resize-none text-[10px]" placeholder="link1, link2, link3..." />
                  </div>
                  
                  <div className="p-6 glass rounded-3xl border-white/5 grid grid-cols-2 gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={modelForm.isHero} onChange={e => setModelForm({...modelForm, isHero: e.target.checked})} className="w-5 h-5 accent-amber-600 rounded" />
                      <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Hero Banner</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={modelForm.isAgencyCarousel} onChange={e => setModelForm({...modelForm, isAgencyCarousel: e.target.checked})} className="w-5 h-5 accent-amber-600 rounded" />
                      <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Agência</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={modelForm.verified} onChange={e => setModelForm({...modelForm, verified: e.target.checked})} className="w-5 h-5 accent-blue-600 rounded" />
                      <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Verificada</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={modelForm.isActive} onChange={e => setModelForm({...modelForm, isActive: e.target.checked})} className="w-5 h-5 accent-green-600 rounded" />
                      <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Perfil Ativo</span>
                    </label>
                  </div>

                  <button onClick={handleSaveModel} disabled={isSaving} className="w-full py-6 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all mt-6 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={20}/> : <Check size={20}/>}
                    {isSaving ? 'Salvando...' : 'Publicar Perfil VIP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Boate Completo */}
        {isClubModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !isSaving && setIsClubModalOpen(false)}></div>
            <div className="relative glass w-full max-w-4xl p-8 md:p-12 rounded-[3rem] border-white/10 shadow-2xl animate-reveal">
              <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                   {editingClub ? 'Editar Boate' : 'Nova Boate Parceira'}
                </h2>
                <button onClick={() => setIsClubModalOpen(false)} className="p-3 bg-white/5 rounded-full text-zinc-500 hover:text-white"><Plus className="rotate-45" /></button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Nome da Casa</label>
                    <input value={clubForm.name} onChange={e => setClubForm({...clubForm, name: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-amber-600" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Localização Curta</label>
                    <input value={clubForm.location} onChange={e => setClubForm({...clubForm, location: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Ex: Centro, Cachoeira do Sul - RS" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Endereço Completo</label>
                    <input value={clubForm.address} onChange={e => setClubForm({...clubForm, address: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Horário de Funcionamento</label>
                    <input value={clubForm.openingHours} onChange={e => setClubForm({...clubForm, openingHours: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" placeholder="Ex: Terça a Sábado: 22h às 06h" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Foto Principal (URL)</label>
                    <input value={clubForm.mainPhoto} onChange={e => setClubForm({...clubForm, mainPhoto: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-4 text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase px-1 mb-2 block">Descrição / Atmosfera</label>
                    <textarea value={clubForm.description} onChange={e => setClubForm({...clubForm, description: e.target.value})} rows={5} className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-5 text-white outline-none resize-none text-sm" placeholder="Fale sobre o ambiente da casa..." />
                  </div>
                  <button onClick={handleSaveClub} disabled={isSaving} className="w-full py-6 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all mt-6 shadow-xl flex items-center justify-center gap-3">
                    {isSaving ? <Loader2 className="animate-spin" size={20}/> : <Check size={20}/>}
                    {isSaving ? 'Gravando...' : 'Salvar Boate Parceira'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
