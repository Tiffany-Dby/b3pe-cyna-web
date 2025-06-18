import BaseCard from "@/shared/ui/components/BaseCard";
import DataTable from "@/shared/ui/components/DataTable";
import { useMemo } from "react";
import AdminsColumns from "@/users/ui/components/AdminsColumns";
import { useAdminStore } from "@/users/store/adminStore";

const AdminsList = () => {
  const { admins, error } = useAdminStore();
  const columns = useMemo(() => AdminsColumns(), []);

  return (
    <BaseCard
      className="w-full"
      title={<h2>Administrateurs</h2>}
      description={
        <>
          <p>
            Recherchez, mettez à jour ou supprimez les administrateurs du site
          </p>
          {error && <p className="text-danger">{error}</p>}
        </>
      }
      content={<DataTable columns={columns} data={admins} />}
    />
  );
};

export default AdminsList;
