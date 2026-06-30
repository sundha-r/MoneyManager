import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { addThousandsSeparator } from "../util/util";
import { AppContext } from "../context/AppContext";

const FinancePieChart = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
  const { theme } = useContext(AppContext);
  // Prepare data for the pie chart
  const data = [
    { name: "Total Balance", value: Number(totalBalance), color: "#6d28d9" }, // Purple
    { name: "Total Expenses", value: Number(totalExpense), color: "#9f1239" }, // Rose Red
    { name: "Total Income", value: Number(totalIncome), color: "#065f46" } // Emerald Green
  ];

  // Filter out any zero or negative values to prevent chart errors, but default to balance if everything is 0
  const chartData = data.filter(item => item.value > 0);
  
  // If all values are 0, add a dummy segment to show a clean grey ring
  if (chartData.length === 0) {
    chartData.push({ name: "No Data", value: 1, color: theme === "dark" ? "#1e293b" : "#e2e8f0" });
  }

  return (
    <div className="relative flex items-center justify-center w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centered balance display */}
      <div className="absolute text-center flex flex-col items-center justify-center">
        <span className="text-[11px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">Total Balance</span>
        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 tracking-tight">
          ₹{addThousandsSeparator(totalBalance)}
        </span>
      </div>
    </div>
  );
};

export default FinancePieChart;
