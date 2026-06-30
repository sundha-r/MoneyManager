import { Layers, Wallet, Coins, BarChart3, Shield } from "lucide-react";

const LandingAbout = () => {
  return (
    <section id="about" className="relative py-20 md:py-28 border-t border-gray-200/60 dark:border-slate-850/60 bg-white/30 dark:bg-slate-900/10 backdrop-blur-3xl transition-colors duration-300 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-300/10 dark:bg-purple-900/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-300/10 dark:bg-blue-900/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
            <Layers size={12} className="text-purple-600 dark:text-purple-400" />
            About the Project
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Empowering Your <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-650 bg-clip-text text-transparent">Financial Freedom</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-350 leading-relaxed font-normal">
            Money Manager is designed to simplify your financial tracking, providing clear insights into your habits and helping you budget better, save more, and invest wisely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="relative group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-7 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-955/40 flex items-center justify-center mb-6 text-purple-655 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Wallet size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Income Tracking</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Log recurring salaries, side gigs, or investment payouts to keep your wallet balances up to date.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="relative group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-7 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-6 text-emerald-650 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Coins size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Expense Logs</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Record your daily spendings with categories and emoji tags to understand exactly where your cash flows.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="relative group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-7 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-6 text-indigo-650 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Visual Analytics</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Beautiful charts and lists present your financial summaries, categorizing balances automatically.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="relative group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-7 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-955/40 flex items-center justify-center mb-6 text-blue-650 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Secure Accounts</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Secure JWT-based user authentication and data encryption keeping your finances private and protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
