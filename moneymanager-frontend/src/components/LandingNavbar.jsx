import { useState } from "react";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";

const LandingNavbar = ({ isScrolled, scrollToSection, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? "py-3 bg-white/75 dark:bg-[#0b0f19]/75 backdrop-blur-xl border-b border-slate-200/40 dark:border-slate-800/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.15)]" 
        : "py-5 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={assets.logo} alt="Money Manager Logo" className="h-10 w-10 rounded-full group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-sm" />
          <span className="text-xl font-black bg-gradient-to-r from-purple-650 via-fuchsia-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent tracking-tight">
            Money Manager
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer border-none bg-transparent relative group py-1">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection("about")} className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer border-none bg-transparent relative group py-1">
            About us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer border-none bg-transparent relative group py-1">
            Contact us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => navigate("/login")} 
            className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-purple-650 dark:hover:text-purple-400 transition-colors cursor-pointer border-none bg-transparent"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/signup")} 
            className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-650 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer border-none"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-none bg-transparent"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-4 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-left text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 py-1 cursor-pointer border-none bg-transparent">
              Home
            </button>
            <button onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }} className="text-left text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 py-1 cursor-pointer border-none bg-transparent">
              About us
            </button>
            <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="text-left text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 py-1 cursor-pointer border-none bg-transparent">
              Contact us
            </button>
          </nav>
          <div className="h-px bg-slate-150 dark:bg-slate-800 my-2" />
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} 
              className="w-full text-center py-2.5 font-semibold border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-transparent"
            >
              Login
            </button>
            <button 
              onClick={() => { navigate("/signup"); setMobileMenuOpen(false); }} 
              className="w-full text-center py-2.5 font-semibold bg-gradient-to-r from-purple-600 to-indigo-650 text-white rounded-xl transition-colors cursor-pointer border-none"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
