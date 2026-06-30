import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/UseUser";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import Model from "../components/Model";
import DeleteAlert from "../components/DeleteAlert";
import toast from "react-hot-toast";
import moment from "moment";
import { 
  LoaderCircle,
  Filter as FilterIcon,
  Download
} from "lucide-react";
import FilterPanel from "../components/FilterPanel";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income"); // "income" or "expense"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date"); // "date", "name", "amount"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const handleFilter = async () => {
    setIsLoading(true);
    try {
      const payload = {
        type: type,
        keyword: keyword.trim() || null,
        startDate: startDate || null,
        endDate: endDate || null,
        sortField: sortField,
        sortOrder: sortOrder
      };
      
      const response = await axiosconfig.post(API_ENDPOINTS.FILTER, payload);
      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Filter failed", error);
      toast.error(error.response?.data?.message || "Failed to fetch filtered transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setType("income");
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortField("date");
    setSortOrder("desc");
  };

  const handleDownloadFiltered = async () => {
    try {
      const params = {};
      if (type) params.type = type;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (keyword && keyword.trim()) params.keyword = keyword.trim();
      if (sortField) params.sortField = sortField;
      if (sortOrder) params.sortOrder = sortOrder;

      const response = await axiosconfig.get(API_ENDPOINTS.FILTER_EXCEL_DOWNLOAD, {
        params,
        responseType: "blob"
      });

      const filename = `filtered_${type}_report.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Filtered report downloaded successfully");
    } catch (error) {
      console.error("Error downloading filtered report", error);
      toast.error(error.response?.data?.message || "Failed to download filtered report");
    }
  };

  const handlePresetRange = (preset) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    let startStr = "";
    
    if (preset === "week") {
      const startOfWeek = new Date(today);
      const day = today.getDay(); // 0 is Sunday
      const diff = today.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startStr = startOfWeek.toISOString().split('T')[0];
    } else if (preset === "month") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startStr = startOfMonth.toISOString().split('T')[0];
    } else if (preset === "last30") {
      const start30 = new Date();
      start30.setDate(today.getDate() - 30);
      startStr = start30.toISOString().split('T')[0];
    }
    
    setStartDate(startStr);
    setEndDate(todayStr);
  };

  const deleteTransaction = async (id) => {
    try {
      const deleteUrl = type === "income" 
        ? API_ENDPOINTS.DELETE_INCOME(id) 
        : API_ENDPOINTS.DELETE_EXPENSE(id);
      
      const response = await axiosconfig.delete(deleteUrl);
      if (response.status === 200) {
        toast.success(`${type === "income" ? "Income" : "Expense"} transaction deleted successfully`);
        setOpenDeleteAlert({ show: false, data: null });
        handleFilter();
      }
    } catch (error) {
      console.error("Error deleting transaction", error);
      toast.error(error.response?.data?.message || "Failed to delete transaction");
    }
  };



  // Re-run the query automatically when type, sorting updates, or when page mounts
  useEffect(() => {
    handleFilter();
  }, [type, sortField, sortOrder]);

  // Calculate sum of matched transactions
  const totalAmount = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <Dashboard activeMenu="Filters">
      <div className="relative my-5 mx-auto max-w-6xl px-4 z-10">
        
        {/* Background ambient light effects */}
        <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-purple-250/20 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-250/20 blur-[150px] pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* Filters Control Panel (Left Column) */}
          <FilterPanel
            type={type}
            setType={setType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            keyword={keyword}
            setKeyword={setKeyword}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleFilter={handleFilter}
            handleReset={handleReset}
            handlePresetRange={handlePresetRange}
          />

          {/* Results Panel (Right Column) */}
          <div className="lg:w-2/3 w-full flex flex-col gap-5">
            
             {/* Stats Summary Card */}
            <div className={`rounded-[24px] border p-6 flex items-center justify-between transition-all duration-500 shadow-md ${
              type === "income" 
                ? "bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.02] dark:from-emerald-500/[0.15] dark:to-teal-500/[0.05] border-emerald-500/10 dark:border-emerald-500/20 shadow-emerald-100/20 dark:shadow-none" 
                : "bg-gradient-to-br from-rose-500/[0.08] to-orange-500/[0.02] dark:from-rose-500/[0.15] dark:to-orange-500/[0.05] border-rose-500/10 dark:border-rose-500/20 shadow-rose-100/20 dark:shadow-none"
            }`}>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">
                  Filtered Total ({transactions.length} items)
                </p>
                <h2 className={`text-3xl font-extrabold mt-1 tracking-tight ${type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-455"}`}>
                  {type === "income" ? "+" : "-"} ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </h2>
              </div>

              {transactions.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadFiltered}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 cursor-pointer ${
                    type === "income"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md hover:shadow-emerald-200/50 dark:hover:shadow-none"
                      : "bg-rose-600 hover:bg-rose-700 text-white hover:shadow-md hover:shadow-rose-200/50 dark:hover:shadow-none"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              )}
            </div>

            {/* Transaction Cards List Container */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 shadow-[0_8px_32px_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-[24px] p-6 lg:p-8 min-h-[450px] flex flex-col transition-all duration-300">
              <h4 className="font-bold text-gray-800 dark:text-slate-100 text-base mb-5 pb-3 border-b border-slate-100/80 dark:border-slate-800">Matched Transactions</h4>
              
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-10">
                  <LoaderCircle className="w-10 h-10 animate-spin text-purple-800 mb-3" />
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Fetching transactions...</p>
                </div>
              ) : transactions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transactions.map((item) => (
                    <TransactionInfoCard
                      key={item.id}
                      title={item.name}
                      icon={item.icon}
                      date={moment(item.date).format('Do MMM YYYY')}
                      amount={item.amount}
                      type={type}
                      hideDeleteBtn={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-16">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100/50 dark:border-slate-700 text-slate-300 dark:text-slate-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner dark:shadow-none">
                    <FilterIcon className="w-7 h-7" />
                  </div>
                  <h4 className="text-gray-700 dark:text-slate-200 font-bold mb-1">No Transactions Found</h4>
                  <p className="text-sm text-slate-400 dark:text-slate-500 text-center max-w-xs leading-relaxed">
                    We couldn't find any {type} transactions matching the current filters. Try expanding your parameters.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-5 text-xs font-bold text-purple-800 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm dark:shadow-none shadow-purple-50"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Delete Confirmation Alert Modal */}
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={`Delete ${type === "income" ? "Income" : "Expense"}`}
        >
          <DeleteAlert
            content={`Are you sure you want to permanently delete this ${type} transaction?`}
            onDelete={() => deleteTransaction(openDeleteAlert.data)}
          />
        </Model>

      </div>
    </Dashboard>
  );
};

export default Filter;