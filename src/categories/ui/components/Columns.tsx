import { Checkbox } from "@/lib/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "../../../shared/ui/components/DataTableColumnHeader";
import DataTableActions from "../../../shared/ui/components/DataTableActions";
import { LocaleCategory } from "@/categories/types/Categories";

const columns: ColumnDef<LocaleCategory>[] = [
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
              key: "copy",
              label: "Copy ID",
              onClick: () => navigator.clipboard.writeText(String(category)),
            },
            { key: "sep1", separator: true },
            { key: "view", label: "View details", onClick: () => {} },
          ]}
        />
      );
    },
  },
];

export { columns };
