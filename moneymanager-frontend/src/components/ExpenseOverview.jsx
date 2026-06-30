import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import ExpenseLineChart from "./ExpenseLineChart";
import { Plus } from "lucide-react";

 const ExpenseOverview = ({ transactions ,onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 mt-2 transition-all duration-300">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">
                Expense Overview
            </h2>

            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                Track your spending over time and analyze your expense trends.
            </p>
        </div>

        <button
            onClick={onAddExpense}
            className="text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/15 border border-rose-200/40 dark:border-rose-500/20 px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-rose-200 dark:hover:bg-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-bold text-sm shadow-sm"
        >
            <Plus size={16} strokeWidth={2.5} />
            Add Expense
        </button>
    </div>

    <div className="mt-10">
        <ExpenseLineChart data={chartData} />
    </div>
</div>
    );
};
export default ExpenseOverview;
