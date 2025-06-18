import DataTableActions from "@/shared/ui/components/DataTableActions";
import DataTableColumnHeader from "@/shared/ui/components/DataTableColumnHeader";
import { formatDate } from "@/shared/utils/date";
import { UserResponse } from "@/users/types/SignIn";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";

const ClientsColumns = (): ColumnDef<UserResponse>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      meta: {
        title: "Email",
        filterable: true,
        filterPlaceholder: "Filtrer par email",
      },

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "firstName",
      meta: { title: "Prénom" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prénom" />
      ),
    },
    {
      accessorKey: "lastName",
      meta: { title: "Nom" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
    },
    {
      accessorKey: "registrationDate",
      meta: { title: "Date d'inscription" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date d'inscription" />
      ),
      cell: ({ row }) => {
        const registrationDate = row.original.registrationDate;

        return <p>{formatDate(registrationDate, "fr")}</p>;
      },
    },
    {
      id: "actions",
      enableSorting: false,
      meta: { title: "Actions" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Actions"
          className="text-right pr-1"
        />
      ),
      cell: ({ row }) => {
        const client = row.original;

        return (
          <DataTableActions
            items={[
              {
                key: "updateClient",
                label: "Modifier",
                onClick: () => console.log("Modifier", client.email),
              },
              {
                key: "deleteClient",
                label: "Supprimer",
                onClick: () => console.log("Supprimer", client.email),
              },
              {
                key: "displaySubs",
                label: "Abonnements",
                onClick: () => console.log("Abonnements", client.email),
              },
            ]}
          />
        );
      },
    },
  ];
};

export default ClientsColumns;
