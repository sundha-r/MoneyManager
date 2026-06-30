import { Sparkles } from "lucide-react";

const LandingHero = ({ scrollToSection, navigate }) => {
  return (
    <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background ambient blobs inside section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 dark:bg-purple-900/5 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse duration-[8000ms]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-955/40 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold mb-8 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors duration-300 cursor-default select-none shadow-sm shadow-purple-500/5">
          <Sparkles size={12} className="animate-spin duration-[4000ms] text-purple-655 dark:text-purple-400" />
          <span>Smart Financial Companion</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
          Take Control of Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-650 bg-clip-text text-transparent filter drop-shadow-sm">Finances Today</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-550 dark:text-slate-350 font-normal leading-relaxed max-w-2xl mx-auto mb-12">
          Your foundation for secure, intelligent financial management. Effortlessly track your income and expenses, set smart targets, and achieve financial freedom.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4.5 max-w-md mx-auto sm:max-w-none">
          <button 
            onClick={() => scrollToSection("about")} 
            className="w-full sm:w-auto bg-white hover:bg-slate-55 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200/85 dark:border-slate-805 text-slate-700 dark:text-slate-300 text-base font-bold px-8 py-4.5 rounded-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Learn More</span>
            <span className="text-slate-400 dark:text-slate-505 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
