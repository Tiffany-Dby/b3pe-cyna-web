import BaseCard from "@/shared/ui/components/BaseCard";
import DataTable from "@/shared/ui/components/DataTable";
import { useMemo } from "react";
import { useAdminStore } from "@/users/store/adminStore";
import ClientsColumns from "@/users/ui/components/ClientsColumns";

const ClientsList = () => {
  const { clients, error } = useAdminStore();
  const columns = useMemo(() => ClientsColumns(), []);

  return (
    <BaseCard
      className="w-full"
      title={<h2>Clients</h2>}
      description={
        <>
          <p>Recherchez, mettez à jour ou supprimez les clients du site</p>
          {error && <p className="text-danger">{error}</p>}
        </>
      }
      content={<DataTable columns={columns} data={clients} />}
    />
  );
};

export default ClientsList;
