import React, { useContext } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { AppContext } from "../context/AppContext";

const CustomTooltip = ({ active, payload }) => {
    const { theme } = useContext(AppContext);
    if (!active || !payload || !payload.length) {
        return null;
    }

    const data = payload[0].payload;

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-lg p-3 min-w-[150px]">
            <p className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                {data.month}
            </p>

            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                Total: ₹{data.totalAmount.toLocaleString()}
            </p>

            <div className="border-t border-gray-200 dark:border-slate-800 mt-2 pt-2">
                <p className="text-[10px] uppercase text-gray-400 dark:text-slate-500 font-semibold">
                    Details
                </p>

                <div className="mt-1 space-y-1 max-h-32 overflow-y-auto">
                    {data.items?.map((income, index) => (
                        <div
                            key={index}
                            className="flex justify-between text-[11px]"
                        >
                            <span className="text-gray-650 dark:text-slate-400">
                                {income.name}
                            </span>

                            <span className="font-medium text-gray-800 dark:text-slate-200">
                                ₹{Number(income.amount).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const IncomeLineChart = ({ data }) => {
    const { theme } = useContext(AppContext);
    const isDark = theme === "dark";

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="incomeGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#10b981"
                                stopOpacity={isDark ? 0.25 : 0.4}
                            />
                            <stop
                                offset="100%"
                                stopColor="#10b981"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        stroke={isDark ? "#1e293b" : "#e5e7eb"}
                        vertical={false}
                    />

                    <XAxis
                        dataKey="month"
                        tick={{
                            fontSize: 12,
                            fill: isDark ? "#94a3b8" : "#6b7280",
                        }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tick={{
                            fontSize: 12,
                            fill: isDark ? "#94a3b8" : "#6b7280",
                        }}
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#10b981",
                            strokeDasharray: "4 4",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#10b981"
                        strokeWidth={4}
                        fill="url(#incomeGradient)"
                        dot={{
                            r: 5,
                            fill: "#10b981",
                            stroke: isDark ? "#0f172a" : "#fff",
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 8,
                            fill: "#10b981",
                            stroke: isDark ? "#0f172a" : "#fff",
                            strokeWidth: 3,
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IncomeLineChart;
