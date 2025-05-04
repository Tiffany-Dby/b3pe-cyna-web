import { Checkbox } from "@/lib/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/shared/ui/components/DataTableColumnHeader";
import DataTableActions from "@/shared/ui/components/DataTableActions";
import { LocaleCategory } from "@/categories/types/Categories";
import { useTranslation } from "react-i18next";

const Columns = (
  onDelete: (category: LocaleCategory) => void,
  onUpdate: (category: LocaleCategory) => void
): ColumnDef<LocaleCategory>[] => {
  const { t } = useTranslation();

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
      accessorKey: "globalName",
      meta: {
        title: "categories:categoryList.columns.category",
        filterable: true,
        filterPlaceholder: "categories:categoryList.filters",
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="categories:categoryList.columns.category"
        />
      ),
    },
    {
      accessorKey: "locale",
      meta: { title: "categories:categoryList.columns.language" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="categories:categoryList.columns.language"
        />
      ),
    },
    {
      accessorKey: "name",
      meta: { title: "categories:categoryList.columns.name" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="categories:categoryList.columns.name"
        />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      meta: { title: "categories:categoryList.columns.actions" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="categories:categoryList.columns.actions"
          className="text-right pr-1"
        />
      ),
      cell: ({ row }) => {
        const category = row.original;

        return (
          <DataTableActions
            items={[
              {
                key: "delete",
                label: t("dataTable.actions.delete"),
                onClick: () => onDelete(category),
              },
              {
                key: "update",
                label: t("dataTable.actions.update"),
                onClick: () => onUpdate(category),
              },
            ]}
          />
        );
      },
    },
  ];
};

export default Columns;
