
import { Model, Club } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MODELS, CLUBS } from '../constants';

// Variáveis locais para simular persistência em modo demo (Live Server sem Supabase)
let mockModels = [...MODELS];
let mockClubs = [...CLUBS];

export const DatabaseService = {
  // Buscar todas as modelos
  getModels: async (): Promise<Model[]> => {
    if (!isSupabaseConfigured()) {
      console.warn('Modo Demo: Supabase não configurado. Exibindo dados de constants.tsx');
      return mockModels;
    }

    try {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Model[];
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
      return mockModels; // Fallback se o fetch falhar
    }
  },

  // Adicionar uma modelo
  addModel: async (model: Model): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      mockModels = [model, ...mockModels];
      return true;
    }

    try {
      const { id, ...modelData } = model;
      // Postgres UUID auto-gen
      const payload = id.length > 20 ? { ...model } : modelData;

      const { error } = await supabase
        .from('models')
        .insert([payload]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao adicionar modelo no Supabase:', error);
      return false;
    }
  },

  // Atualizar uma modelo
  updateModel: async (model: Model): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      mockModels = mockModels.map(m => m.id === model.id ? model : m);
      return true;
    }

    try {
      const { error } = await supabase
        .from('models')
        .update(model)
        .eq('id', model.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao atualizar modelo:', error);
      return false;
    }
  },

  // Deletar uma modelo
  deleteModel: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      mockModels = mockModels.filter(m => m.id !== id);
      return true;
    }

    try {
      const { error } = await supabase
        .from('models')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar modelo:', error);
      return false;
    }
  },

  // Buscar boates
  getClubs: async (): Promise<Club[]> => {
    if (!isSupabaseConfigured()) return mockClubs;

    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Club[];
    } catch (error) {
      console.error('Erro ao buscar boates:', error);
      return mockClubs;
    }
  },

  // Adicionar/Atualizar Club
  saveClub: async (club: Club): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      const exists = mockClubs.find(c => c.id === club.id);
      if (exists) {
        mockClubs = mockClubs.map(c => c.id === club.id ? club : c);
      } else {
        mockClubs = [club, ...mockClubs];
      }
      return true;
    }

    try {
      const { id, ...clubData } = club;
      const payload = id.length > 20 ? club : { ...clubData };

      const { error } = await supabase
        .from('clubs')
        .upsert([payload]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao salvar club:', error);
      return false;
    }
  },

  exportJSON: async () => {
    const models = await DatabaseService.getModels();
    const clubs = await DatabaseService.getClubs();
    const data = {
      models,
      clubs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `morena_bruta_backup_${new Date().toLocaleDateString()}.json`;
    a.click();
  }
};
