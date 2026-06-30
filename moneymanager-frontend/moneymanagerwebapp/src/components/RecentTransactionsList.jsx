import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { History, TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentTransactionsList = ({ transactions = [] }) => {
  const navigate = useNavigate();

  // Limit recent transactions to 3 items
  const displayedTransactions = transactions.slice(0, 3);

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 flex flex-col min-h-[420px] transition-all duration-300">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100/80 dark:border-slate-800">
        <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-800 dark:text-purple-300">
          <History className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-gray-800 dark:text-slate-100 text-base">Recent Transactions</h4>
      </div>

      {transactions.length > 0 ? (
        <>
          <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[340px] pr-1 flex-grow">
            {displayedTransactions.map((item) => (
              <TransactionInfoCard
                key={`${item.type}-${item.id}`}
                title={item.name}
                icon={item.icon}
                date={moment(item.date).format('Do MMM YYYY')}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn={true}
              />
            ))}
          </div>

          <div className="mt-auto pt-4 flex gap-3 border-t border-slate-100/80 dark:border-slate-800">
            <button
              onClick={() => navigate("/income")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/20 border border-emerald-100/50 dark:border-emerald-900/30 cursor-pointer transition-all duration-200 hover:shadow-sm"
            >
              <TrendingUp className="w-4 h-4 animate-pulse" />
              View Income
            </button>
            <button
              onClick={() => navigate("/expense")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100/80 dark:hover:bg-rose-900/20 border border-rose-100/50 dark:border-rose-900/30 cursor-pointer transition-all duration-200 hover:shadow-sm"
            >
              <TrendingDown className="w-4 h-4 animate-pulse" />
              View Expenses
            </button>
          </div>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-400 py-12">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No transactions recorded yet.</p>
          <p className="text-xs text-slate-400 dark:text-slate-550 mt-1">Start adding income or expenses to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactionsList;
