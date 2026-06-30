import { Trash, Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { addThousandsSeparator } from "../util/util";


const TransactionInfoCard = ({icon,title,date,amount,type,hideDeleteBtn,onDelete}) => {
    const getAmountStyles=()=> type==="income"
        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100/60 dark:border-emerald-900/40 shadow-sm shadow-emerald-100/30 dark:shadow-none"
        : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-100/60 dark:border-rose-900/40 shadow-sm shadow-rose-100/30 dark:shadow-none";
  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-2xl border border-gray-100/50 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 hover:border-gray-200/80 dark:hover:border-slate-700 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full shadow-inner dark:shadow-none">

                {icon ?(
                    <img src={icon} alt={title} className="w-6 h-6 object-contain" />
                ):(
                    <UtensilsCrossed className="text-purple-500 w-5 h-5"/>
                )}
        </div>
        <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="truncate">
                <p className="text-sm text-gray-800 dark:text-slate-100 font-semibold truncate">{title}</p>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium mt-1">{date}</p>
            </div>
            <div className="flex items-center gap-2.5 ml-3">
                {!hideDeleteBtn && (
                    <button 
                        onClick={onDelete}
                        className="text-gray-300 dark:text-slate-600 hover:text-red-650 dark:hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                            <Trash2 size={16} />
                    </button>
                )}

                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border ${getAmountStyles()} font-semibold text-xs whitespace-nowrap`}>
                    <span>
                        {type === "income" ? "+" : "-"}₹{addThousandsSeparator(amount)}
                    </span>
                    {type === "income" ? (
                        <TrendingUp size={14} className="shrink-0" />
                    ) : (
                        <TrendingDown size={14} className="shrink-0" />
                    )}
                </div>
            </div>

        </div>
    </div>
  )
}

export default TransactionInfoCard