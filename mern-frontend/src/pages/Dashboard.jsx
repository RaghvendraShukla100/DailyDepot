// src/pages/Dashboard.jsx
import Sidebar from "../components/sellerPanel/Sidebar";
import Topbar from "../components/sellerPanel/Topbar";
import StatsCards from "../components/sellerPanel/StatsCards";
import SalesChart from "../components/sellerPanel/SalesChart";
import OrdersTable from "../components/sellerPanel/OrdersTable";
import TopSellingProducts from "../components/sellerPanel/TopSellingProducts";

const Dashboard = () => {
  return (
    <div className="flex  ">
      <Sidebar />
      <div className=" bg-gray-50 pt-5 px-8 w-full pb-10">
        <Topbar />
        <StatsCards />

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4  py-10">
          <SalesChart />
          <TopSellingProducts />
        </div>
        <OrdersTable />
      </div>
    </div>
  );
};

export default Dashboard;
