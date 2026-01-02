
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Agência', path: '/agencia' },
    { name: 'Modelos', path: '/modelos' },
    { name: 'Boates', path: '/boates' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled 
          ? 'bg-[#050505]/95 backdrop-blur-2xl py-5 border-b border-white/5' 
          : 'bg-transparent py-10 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-500 overflow-hidden">
            <img 
              src="https://morenabrutacanais.vercel.app/logo.png" 
              alt="Morena Bruta Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-[0.3em] uppercase text-white leading-none">
              Morena <span className="text-amber-500 font-serif italic not-italic gold-gradient uppercase">BRUTA</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.6em] text-zinc-500 mt-1">Elite Luxury Agency</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-2xl ${
                isActive(link.path) 
                  ? 'bg-amber-600/10 text-amber-500' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link to="/contato" className="bg-white text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-amber-600 hover:text-white flex items-center gap-3 group shadow-2xl active:scale-95">
            CONCIERGE VIP
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-3 glass rounded-2xl border-white/10 active:scale-90 transition-transform" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center transition-all duration-700 ease-expo ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <button 
          className="absolute top-10 right-10 text-zinc-500 hover:text-white p-3"
          onClick={() => setIsOpen(false)}
        >
          <X size={40} strokeWidth={1} />
        </button>

        <nav className="flex flex-col items-center w-full px-12 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black uppercase tracking-[0.3em] transition-colors text-center w-full py-6 border-b border-white/5 ${
                isActive(link.path) ? 'text-amber-500' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            to="/contato" 
            onClick={() => setIsOpen(false)} 
            className="w-full bg-amber-600 text-white py-7 rounded-[2rem] text-center font-black text-xs uppercase tracking-[0.4em] mt-12 shadow-3xl shadow-amber-900/40"
          >
            CONTATO VIP
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
