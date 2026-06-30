import { User, Layers, CheckCircle2, Wallet, Coins, History, Activity } from "lucide-react";
import { assets } from "../assets/assets";

const LandingShowcase = () => {
  return (
    <div className="mt-16 sm:mt-20 mx-auto max-w-5xl rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/30 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:shadow-[0_30px_70px_rgba(109,40,217,0.08)] dark:hover:shadow-[0_30px_70px_rgba(109,40,217,0.15)] transition-all duration-700 group">
      <div className="rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-955/40 p-4 sm:p-6 transition-all duration-300">
        
        {/* Mockup Header */}
        <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/40 pb-4 mb-6">
          {/* Window Controls (Mac Style) */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm shadow-[#ff5f56]/30"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm shadow-[#ffbd2e]/30"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm shadow-[#27c93f]/30"></div>
          </div>
          
          {/* Address bar / Title */}
          <div className="flex-1 max-w-sm mx-4 bg-slate-100 dark:bg-slate-950/80 border border-slate-200/40 dark:border-slate-800/40 rounded-lg py-1.5 px-4 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate select-none shadow-inner">
            app.moneymanager.com/dashboard
          </div>

          {/* Logo display */}
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-6 w-6 rounded-full shadow-sm" />
            <span className="text-xs font-black bg-gradient-to-r from-purple-750 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent select-none tracking-tight">Money Manager</span>
          </div>
        </div>

        {/* Mockup Body */}
        <div className="flex gap-5 text-left">
          {/* Sidebar Mockup */}
          <div className="w-1/4 hidden md:flex flex-col items-center border-r border-slate-200/50 dark:border-slate-800/40 pr-5 select-none text-left">
            {/* Profile Badge card inside mockup */}
            <div className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800/40 shadow-sm mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-100 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/20 flex items-center justify-center shadow-inner border border-purple-200/20">
                <User className="w-4 h-4 text-purple-750 dark:text-purple-455" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100 truncate block">Bushan</span>
                <span className="text-[8px] font-bold text-purple-705 dark:text-purple-400 tracking-wider uppercase block mt-0.5 leading-none">Premium</span>
              </div>
            </div>
            
            <div className="w-full space-y-1">
              <div className="h-9 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-3 flex items-center gap-2.5 text-[11px] font-bold shadow-md shadow-purple-500/10 cursor-pointer">
                <Layers size={13} />
                <span>Dashboard</span>
              </div>
              <div className="h-9 bg-transparent text-slate-500 dark:text-slate-400 rounded-xl px-3 flex items-center gap-2.5 text-[11px] font-semibold hover:bg-white dark:hover:bg-slate-900/60 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/50 transition-all duration-200 cursor-pointer">
                <CheckCircle2 size={13} />
                <span>Category</span>
              </div>
              <div className="h-9 bg-transparent text-slate-500 dark:text-slate-400 rounded-xl px-3 flex items-center gap-2.5 text-[11px] font-semibold hover:bg-white dark:hover:bg-slate-900/60 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/50 transition-all duration-200 cursor-pointer">
                <Wallet size={13} />
                <span>Income</span>
              </div>
              <div className="h-9 bg-transparent text-slate-500 dark:text-slate-400 rounded-xl px-3 flex items-center gap-2.5 text-[11px] font-semibold hover:bg-white dark:hover:bg-slate-900/60 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/50 transition-all duration-200 cursor-pointer">
                <Coins size={13} />
                <span>Expense</span>
              </div>
            </div>
          </div>

          {/* Main Area Mockup */}
          <div className="flex-1 space-y-5">
            {/* 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Balance Card */}
              <div className="bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent dark:from-purple-950/10 dark:to-transparent border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md hover:border-purple-300/40 dark:hover:border-purple-800/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-purple-700 text-white shadow-md shadow-purple-800/25">
                  <Wallet className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-405 dark:text-slate-450 font-bold uppercase tracking-wider block">Total Balance</span>
                  <span className="text-lg font-black mt-0.5 text-slate-800 dark:text-slate-100 block leading-none tracking-tight">1,00,800</span>
                </div>
              </div>
              {/* Total Income Card */}
              <div className="bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent dark:from-emerald-950/10 dark:to-transparent border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md hover:border-emerald-300/40 dark:hover:border-emerald-800/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-emerald-600 text-white shadow-md shadow-emerald-800/20">
                  <Wallet className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-405 dark:text-slate-450 font-bold uppercase tracking-wider block">Total Income</span>
                  <span className="text-lg font-black mt-0.5 text-slate-800 dark:text-slate-100 block leading-none tracking-tight">1,50,000</span>
                </div>
              </div>
              {/* Total Expense Card */}
              <div className="bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-transparent dark:from-rose-955/10 dark:to-transparent border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md hover:border-rose-300/40 dark:hover:border-rose-800/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-rose-600 text-white shadow-md shadow-rose-900/20">
                  <Coins className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-405 dark:text-slate-450 font-bold uppercase tracking-wider block">Total Expense</span>
                  <span className="text-lg font-black mt-0.5 text-slate-800 dark:text-slate-100 block leading-none tracking-tight">49,200</span>
                </div>
              </div>
            </div>

            {/* Bottom Mockup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mockup Recent Transactions */}
              <div className="bg-white/80 dark:bg-slate-900/85 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left hover:shadow-md transition-shadow duration-300">
                <div>
                  <div className="flex items-center gap-3 pb-2.5 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-1.5 bg-purple-50 dark:bg-purple-955/40 rounded-lg text-purple-800 dark:text-purple-300">
                      <History className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-slate-100">Recent Transactions</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Transaction 1 */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-300">
                      <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shrink-0 shadow-sm">
                        🍕
                      </div>
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <div>
                          <p className="text-[11px] font-semibold text-gray-800 dark:text-slate-200 truncate leading-tight">Pizza Party</p>
                          <p className="text-[9px] text-gray-400 dark:text-slate-450 mt-1 leading-none">24th Jun 2026</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-955/20 text-rose-750 dark:text-rose-400 border border-rose-100/60 dark:border-rose-900/40 font-bold text-[10px] leading-none">
                          -₹1,200
                        </div>
                      </div>
                    </div>
                    {/* Transaction 2 */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-955/40 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-300">
                      <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shrink-0 shadow-sm">
                        💰
                      </div>
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <div>
                          <p className="text-[11px] font-semibold text-gray-800 dark:text-slate-200 truncate leading-tight">Freelance Work</p>
                          <p className="text-[9px] text-gray-400 dark:text-slate-450 mt-1 leading-none">23rd Jun 2026</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-455 border border-emerald-100/60 dark:border-emerald-900/40 font-bold text-[10px] leading-none">
                          +₹25,000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 flex gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex-1 text-center py-2 rounded-xl text-[10px] font-bold text-emerald-700 dark:text-emerald-440 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/20 cursor-pointer hover:bg-emerald-100/50 dark:hover:bg-emerald-900/10 transition-all duration-200">
                    View Income
                  </div>
                  <div className="flex-1 text-center py-2 rounded-xl text-[10px] font-bold text-rose-700 dark:text-rose-440 bg-rose-50 dark:bg-rose-955/20 border border-rose-100/50 dark:border-rose-900/20 cursor-pointer hover:bg-rose-100/50 dark:hover:bg-rose-900/10 transition-all duration-200">
                    View Expenses
                  </div>
                </div>
              </div>

              {/* Mockup Pie/Donut Chart */}
              <div className="bg-white/80 dark:bg-slate-900/85 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 pb-2.5 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-1.5 bg-purple-50 dark:bg-purple-955/40 rounded-lg text-purple-800 dark:text-purple-300">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-slate-100">Financial Overview</span>
                </div>

                {/* Donut Chart Mockup via SVG */}
                <div className="relative flex items-center justify-center my-4 h-32">
                  <svg className="w-28 h-28 transform -rotate-90 filter drop-shadow-md">
                    {/* Dummy background circle */}
                    <circle cx="56" cy="56" r="42" fill="transparent" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-slate-800" />
                    {/* Total Income segment (Green) - ~60% = 158.4 */}
                    <circle cx="56" cy="56" r="42" fill="transparent" stroke="#065f46" strokeWidth="8" strokeDasharray="158.4 264" strokeDashoffset="0" />
                    {/* Total Balance segment (Purple) - ~25% = 66 */}
                    <circle cx="56" cy="56" r="42" fill="transparent" stroke="#6d28d9" strokeWidth="8" strokeDasharray="66 264" strokeDashoffset="-158.4" />
                    {/* Total Expenses segment (Rose) - ~15% = 39.6 */}
                    <circle cx="56" cy="56" r="42" fill="transparent" stroke="#9f1239" strokeWidth="8" strokeDasharray="39.6 264" strokeDashoffset="-224.4" />
                  </svg>
                  {/* Centered text display inside mockup */}
                  <div className="absolute text-center flex flex-col items-center justify-center">
                    <span className="text-[8px] text-slate-400 dark:text-slate-450 font-extrabold uppercase tracking-widest leading-none">Total Balance</span>
                    <span className="text-base font-extrabold text-slate-850 dark:text-slate-100 leading-none mt-1 shadow-sm tracking-tight">₹1,00,800</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 hover:text-[#6d28d9] transition-colors duration-200">
                    <span className="w-2 h-2 rounded-full bg-[#6d28d9] shadow-sm shadow-purple-800/30" />
                    <span>Balance</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#9f1239] transition-colors duration-200">
                    <span className="w-2 h-2 rounded-full bg-[#9f1239] shadow-sm shadow-rose-900/30" />
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#065f46] transition-colors duration-200">
                    <span className="w-2 h-2 rounded-full bg-[#065f46] shadow-sm shadow-emerald-800/30" />
                    <span>Income</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingShowcase;
