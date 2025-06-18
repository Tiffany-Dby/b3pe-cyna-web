import { useAdminStore } from "@/users/store/adminStore";
import { useEffect } from "react";
import ClientsList from "@/users/ui/components/ClientsList";
import { UserRole } from "@/users/types/UserRole";

const AdminAllClientsView = () => {
  const { getUsersByRole } = useAdminStore();

  useEffect(() => {
    getUsersByRole(UserRole.user);
  }, [getUsersByRole]);

  return (
    <div className="@container flex flex-wrap gap-4">
      <ClientsList />
    </div>
  );
};

export default AdminAllClientsView;
