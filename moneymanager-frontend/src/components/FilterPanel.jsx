import React from "react";
import { 
  Search, 
  Calendar, 
  ArrowUpDown, 
  RotateCcw, 
  Filter as FilterIcon 
} from "lucide-react";

const FilterPanel = ({
  type,
  setType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  keyword,
  setKeyword,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  handleFilter,
  handleReset,
  handlePresetRange,
}) => {
  return (
    <div className="lg:w-1/3 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 self-start lg:sticky lg:top-24 transition-all duration-300">

      {/* Transaction Type Selection */}
      <div className="mb-5">
        <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
          Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType("income")}
            className={`py-2.5 px-3 text-sm rounded-xl border text-center transition-all cursor-pointer font-medium ${
              type === "income"
                ? "bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/50 shadow-[0_4px_12px_rgba(16,185,129,0.1)] dark:shadow-none font-bold"
                : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-450 dark:text-slate-400 border-slate-200/85 dark:border-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`py-2.5 px-3 text-sm rounded-xl border text-center transition-all cursor-pointer font-medium ${
              type === "expense"
                ? "bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-450 border-rose-200/80 dark:border-rose-800/50 shadow-[0_4px_12px_rgba(244,63,94,0.1)] dark:shadow-none font-bold"
                : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-450 dark:text-slate-400 border-slate-200/85 dark:border-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Keyword Search */}
      <div className="mb-5">
        <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
          Keyword
        </label>
        <div className="relative flex items-center bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:shadow-[0_4px_12px_rgba(124,58,237,0.06)] focus-within:ring-2 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-950/50 transition-all duration-205">
          <Search className="text-slate-400 dark:text-slate-500 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search transaction name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            className="w-full bg-transparent outline-none border-0 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
          />
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="mb-5">
        <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
          Date Range
        </label>
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:shadow-[0_4px_12px_rgba(124,58,237,0.06)] focus-within:ring-2 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-950/50 transition-all duration-205">
            <Calendar className="text-slate-400 dark:text-slate-500 w-4 h-4 mr-2" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent outline-none border-0 text-sm text-slate-700 dark:text-slate-200 cursor-pointer font-medium dark:[color-scheme:dark]"
            />
          </div>
          <div className="relative flex items-center bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:shadow-[0_4px_12px_rgba(124,58,237,0.06)] focus-within:ring-2 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-950/50 transition-all duration-205">
            <Calendar className="text-slate-400 dark:text-slate-500 w-4 h-4 mr-2" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent outline-none border-0 text-sm text-slate-700 dark:text-slate-200 cursor-pointer font-medium dark:[color-scheme:dark]"
            />
          </div>
        </div>
        
        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            type="button"
            onClick={() => handlePresetRange("week")}
            className="text-[11px] bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-3 py-1 rounded-full font-bold transition-all cursor-pointer border border-transparent hover:border-slate-200/40 dark:hover:border-slate-700/40"
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => handlePresetRange("month")}
            className="text-[11px] bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-3 py-1 rounded-full font-bold transition-all cursor-pointer border border-transparent hover:border-slate-200/40 dark:hover:border-slate-700/40"
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => handlePresetRange("last30")}
            className="text-[11px] bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-3 py-1 rounded-full font-bold transition-all cursor-pointer border border-transparent hover:border-slate-200/40 dark:hover:border-slate-700/40"
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
          Sort Results
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1 flex items-center bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:shadow-[0_4px_12px_rgba(124,58,237,0.06)] focus-within:ring-2 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-950/50 transition-all duration-205">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="w-full bg-transparent outline-none border-0 text-sm text-slate-750 dark:text-slate-200 cursor-pointer appearance-none pr-8 font-medium dark:[color-scheme:dark]"
            >
              <option value="date" className="dark:bg-slate-900 dark:text-slate-200">Date</option>
              <option value="name" className="dark:bg-slate-900 dark:text-slate-200">Name</option>
              <option value="amount" className="dark:bg-slate-900 dark:text-slate-200">Amount</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-3.5 h-3.5 pointer-events-none" />
          </div>
          <div className="relative w-28 flex items-center bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:shadow-[0_4px_12px_rgba(124,58,237,0.06)] focus-within:ring-2 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-950/50 transition-all duration-205">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-transparent outline-none border-0 text-sm text-slate-750 dark:text-slate-200 cursor-pointer appearance-none pr-8 font-medium dark:[color-scheme:dark]"
            >
              <option value="desc" className="dark:bg-slate-900 dark:text-slate-200">Desc</option>
              <option value="asc" className="dark:bg-slate-900 dark:text-slate-200">Asc</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-3.5 h-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 border-t border-slate-100/80 dark:border-slate-800 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-1.5 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-350 dark:hover:border-slate-700 py-2.5 px-4 rounded-xl text-sm cursor-pointer flex-1 font-bold transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          type="button"
          onClick={handleFilter}
          className="flex items-center justify-center gap-1.5 bg-purple-800 hover:bg-purple-900 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-2.5 px-4 rounded-xl text-sm cursor-pointer flex-1 font-bold shadow-md shadow-purple-200/60 dark:shadow-none hover:shadow-lg hover:shadow-purple-300/40 transition-all duration-205"
        >
          <FilterIcon className="w-4 h-4" />
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
