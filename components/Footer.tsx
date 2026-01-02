
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Facebook, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-12 border-t border-white/5 relative bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform overflow-hidden">
                <img 
                  src="https://morenabrutacanais.vercel.app/logo.png" 
                  alt="Morena Bruta Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tighter">Morena <span className="text-amber-600">Bruta</span></span>
            </Link>
            <p className="text-gray-500 text-lg max-w-sm">
              A maior agência de acompanhantes de luxo de Cachoeira do Sul e região. Curadoria exclusiva e sigilo total.
            </p>
            <div className="flex gap-4">
               <a href="#" target="_blank" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-amber-600 transition-colors group">
                  <Instagram size={20} className="group-hover:text-white" />
               </a>
               <a href="#" target="_blank" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors group">
                  <Facebook size={20} className="group-hover:text-white" />
               </a>
               <a href="https://wa.me/5551996554609" target="_blank" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors group">
                  <MessageCircle size={20} className="group-hover:text-white" />
               </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Navegação</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/agencia" className="hover:text-white transition-colors">Agência</Link></li>
              <li><Link to="/modelos" className="hover:text-white transition-colors">Modelos</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Suporte</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li><Link to="/contato" className="hover:text-white transition-colors">Concierge</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="https://wa.me/5551996554609" className="hover:text-white transition-colors">Agendar</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
             <div className="glass p-6 rounded-3xl border-amber-900/20">
                <h4 className="text-white font-bold text-sm mb-4">Newsletter VIP</h4>
                <div className="relative">
                  <input type="email" placeholder="Seu e-mail" className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-amber-600" />
                  <button className="absolute right-2 top-1.5 p-1.5 bg-amber-600 rounded-lg text-white"><ArrowUpRight size={14}/></button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">© 2024 MORENA BRUTA - CACHOEIRA DO SUL. 18+ APENAS.</p>
          <div className="flex gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
