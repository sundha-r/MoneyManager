import { assets } from "../assets/assets";

const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LandingFooter = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-955 py-10 border-t border-gray-200/60 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8 rounded-full" />
          <span className="text-base font-bold bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
            Money Manager
          </span>
        </div>
        
        <p className="text-xs text-slate-505 dark:text-slate-400 text-center">
          &copy; {new Date().getFullYear()} Money Manager. All rights reserved. Built with precision and care.
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
