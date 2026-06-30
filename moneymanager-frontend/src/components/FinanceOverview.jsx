import React from "react";
import FinancePieChart from "./FinancePieChart";
import { Activity } from "lucide-react";

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 min-h-[420px] transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100/80 dark:border-slate-800">
        <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-800 dark:text-purple-300">
          <Activity className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-gray-800 dark:text-slate-100 text-base">Financial Overview</h4>
      </div>

      {/* Pie Chart Component */}
      <div className="flex-grow flex items-center justify-center my-4 w-full min-w-0">
        <FinancePieChart
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-slate-100/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#6d28d9] shrink-0" />
          <span>Total Balance</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#9f1239] shrink-0" />
          <span>Total Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#065f46] shrink-0" />
          <span>Total Income</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
