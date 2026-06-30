import { Sparkles, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const LandingContact = () => {
  return (
    <section id="contact" className="relative py-20 md:py-28 border-t border-gray-200/60 dark:border-slate-850/60 transition-colors duration-300 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Contact Details */}
          <div className="flex flex-col justify-center text-left lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
              <Sparkles size={12} className="text-purple-600 dark:text-purple-450 animate-pulse" />
              Get In Touch
            </div>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              Let's discuss how we can <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">help you</span>
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-350 mb-8 leading-relaxed">
              Have questions about Money Manager? Drop us a message, report a bug, or request a feature. We would love to hear from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-955/40 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                  <a href="mailto:sundharapandi2005@gmail.com" className="text-sm font-semibold text-slate-805 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    sundharapandi2005@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-955/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Phone Helpline</p>
                  <a href="tel:93604434" className="text-sm font-semibold text-slate-805 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    93604434
                  </a>
                </div>
              </div>

              {/* HQ Card */}
              <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-955/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">HQ Location</p>
                  <p className="text-sm font-semibold text-slate-805 dark:text-slate-200">
                    Madurai, Tamilnadu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-left overflow-hidden">
            {/* Decorative gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500"></div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We'll get back to you soon."); }} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="John Doe" 
                  className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 dark:focus:ring-purple-400/10 transition-all text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="john@example.com" 
                  className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-955/50 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 dark:focus:ring-purple-400/10 transition-all text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Message</label>
                <textarea 
                  id="message" 
                  required 
                  rows={4} 
                  placeholder="Tell us what you think..." 
                  className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-955/50 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 dark:focus:ring-purple-400/10 transition-all text-sm resize-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 cursor-pointer text-sm border-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingContact;
