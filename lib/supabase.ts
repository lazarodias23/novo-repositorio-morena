
import { createClient } from '@supabase/supabase-js';

// NOTA PARA O DESENVOLVEDOR:
// Substitua as variáveis abaixo pelas suas credenciais do Supabase.
// Você pode encontrá-las em Project Settings -> API.
const supabaseUrl = (window as any).env?.SUPABASE_URL || 'https://SUA_URL.supabase.co';
const supabaseAnonKey = (window as any).env?.SUPABASE_ANON_KEY || 'SUA_ANON_KEY';

// Verifica se as chaves ainda são os placeholders
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl && 
    supabaseUrl !== '' && 
    supabaseUrl !== 'https://SUA_URL.supabase.co' && 
    supabaseAnonKey !== 'SUA_ANON_KEY'
  );
};

// Se não estiver configurado, criamos um cliente dummy para não quebrar o código
// mas as chamadas de banco falharão graciosamente ou serão interceptadas pelo service
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-projects.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'no-key'
);
