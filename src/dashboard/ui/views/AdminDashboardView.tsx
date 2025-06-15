import RevenuesChart from "@/dashboard/ui/components/RevenuesChart";
import SalesChart from "@/dashboard/ui/components/SalesChart";
import SalesByCategoryChart from "@/dashboard/ui/components/SalesByCategoryChart";
import RevenuesByCategoryChart from "@/dashboard/ui/components/RevenuesByCategoryChart";

const AdminDashboardView = () => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-[2fr_1fr] gap-4">
        <SalesChart />
        <SalesByCategoryChart />
        <RevenuesChart />
        <RevenuesByCategoryChart />
      </div>
    </div>
  );
};

export default AdminDashboardView;
