import { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/UseUser";
import { AppContext } from "../context/AppContext";
import axiosconfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { addThousandsSeparator } from "../util/util";
import SummaryCard from "../components/SummaryCard";
import RecentTransactionsList from "../components/RecentTransactionsList";
import FinanceOverview from "../components/FinanceOverview";
import toast from "react-hot-toast";
import {
  Wallet,
  LoaderCircle,
  Coins
} from "lucide-react";

const Home = () => {
  useUser();
  const { user } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosconfig.get(API_ENDPOINTS.DASHBOARD);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error(error.response?.data?.message || "Failed to load dashboard overview");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="relative my-5 mx-auto max-w-6xl px-4 z-10">

        {/* Background ambient light effects */}
        <div className="absolute top-[-10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-purple-250/20 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-blue-250/20 blur-[150px] pointer-events-none -z-10" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400">
            <LoaderCircle className="w-12 h-12 animate-spin text-purple-800 mb-4" />
            <p className="text-base font-semibold text-slate-500">Loading your financial overview...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Welcome & Balance Card */}
              {/* Total Balance Card */}
              <SummaryCard
                variant="purple"
                label="Total Balance"
                value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                icon={Wallet}
              />

              {/* Total Income Card */}
              <SummaryCard
                variant="emerald"
                label="Total Income"
                value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                icon={Wallet}
              />

              {/* Total Expense Card */}
              <SummaryCard
                variant="rose"
                label="Total Expenses"
                value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                icon={Coins}
              />

            </div>

            {/* Bottom Grid: Recent Transactions & Analytics Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Recent Transactions list */}
              <RecentTransactionsList transactions={dashboardData?.recentTransactions} />

              {/* Finance Overview (Donut/Pie Chart) */}
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance}
                totalIncome={dashboardData?.totalIncome}
                totalExpense={dashboardData?.totalExpense}
              />

            </div>

          </div>
        )}

      </div>
    </Dashboard>
  );
};

export default Home;
