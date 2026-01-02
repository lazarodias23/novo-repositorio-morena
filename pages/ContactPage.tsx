
import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle, Facebook } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">Fale Conosco</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              A equipe Morena Bruta está disponível para agendamentos e informações com total sigilo. Atendemos em Cachoeira do Sul e região.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-amber-700/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-all">
                  <Phone className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Telefone / WhatsApp</h4>
                  <p className="text-gray-400 font-medium">(51) 99655-4609</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-amber-700/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-all">
                  <Mail className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">E-mail</h4>
                  <p className="text-gray-400 font-medium">contato@morenabruta.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-amber-700/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-all">
                  <MapPin className="text-amber-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Localização</h4>
                  <p className="text-gray-400 font-medium">Cachoeira do Sul - RS</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
               <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Redes Sociais Oficiais</h4>
               <div className="flex flex-wrap gap-4">
                  <a href="#" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-gray-300 rounded-xl transition-all">
                    <Instagram size={20} className="text-amber-600" />
                    <span className="font-bold">Instagram</span>
                  </a>
                  <a href="#" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-gray-300 rounded-xl transition-all">
                    <Facebook size={20} className="text-blue-500" />
                    <span className="font-bold">Facebook</span>
                  </a>
                  <a href="https://wa.me/5551996554609" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-gray-300 rounded-xl transition-all">
                    <MessageCircle size={20} className="text-green-500" />
                    <span className="font-bold">WhatsApp</span>
                  </a>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-zinc-900/50 p-10 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-black text-white uppercase mb-8">Solicitar Agendamento</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest px-1">Seu Nome</label>
                  <input type="text" className="w-full bg-black border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-600" placeholder="Seu Nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest px-1">WhatsApp</label>
                  <input type="text" className="w-full bg-black border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-600" placeholder="(51) 99999-9999" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest px-1">Detalhes do Pedido</label>
                <textarea rows={5} className="w-full bg-black border border-white/5 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-amber-600 resize-none" placeholder="Qual modelo e horário você deseja?"></textarea>
              </div>

              <button className="w-full gold-bg text-black py-5 rounded-xl font-black text-lg transition-all transform hover:scale-[1.02] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                ENVIAR PARA CONCIERGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
