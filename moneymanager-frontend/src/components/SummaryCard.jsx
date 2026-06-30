import React from "react";

const SummaryCard = ({
  variant = "purple", // "purple", "emerald", "rose"
  value,
  label,
  icon: Icon
}) => {
  const isEmerald = variant === "emerald";
  const isPurple = variant === "purple";
  
  const cardBorderHover = isEmerald 
    ? "hover:shadow-emerald-500/5 hover:border-emerald-200/50 dark:hover:border-emerald-800/40" 
    : isPurple
    ? "hover:shadow-purple-500/5 hover:border-purple-200/50 dark:hover:border-purple-800/40"
    : "hover:shadow-rose-500/5 hover:border-rose-200/50 dark:hover:border-rose-800/40";
    
  const iconContainerStyles = isEmerald
    ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/25"
    : isPurple
    ? "bg-purple-800 text-white shadow-md shadow-purple-800/25"
    : "bg-rose-900 text-white shadow-md shadow-rose-900/25";

  return (
    <div className={`bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[20px] p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${cardBorderHover}`}>
      {Icon && (
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconContainerStyles}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {label && <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">{label}</span>}
        <span className="text-xl font-extrabold mt-0.5 tracking-tight text-slate-800 dark:text-slate-100 block truncate">
          {value !== undefined && value !== null && (typeof value === 'string' && value.startsWith('₹') ? value : `₹${value}`)}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
