import { PromotionsText } from "@/home/types/PromotionsCarousel";
import { Checkbox } from "@/lib/components/ui/checkbox";
import DataTableActions from "@/shared/ui/components/DataTableActions";
import DataTableColumnHeader from "@/shared/ui/components/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";

const Columns = (
  onUpdate: (promotionText: PromotionsText) => void,
  t: TFunction
): ColumnDef<PromotionsText>[] => {
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
      accessorKey: "locale",
      meta: { title: "contents:promotionsTextList.columns.language" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Langue" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "text",
      meta: {
        title: "contents:promotionsTextList.columns.text",
        filterable: true,
        filterPlaceholder: "contents:promotionsTextList.filters",
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="contents:promotionsTextList.columns.text"
        />
      ),
      cell: ({ row }) => (
        <>
          {row.original.text.split("\n").map((line, index) => (
            <p key={index} className="whitespace-pre-wrap w-fit">
              {line}
            </p>
          ))}
        </>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      enableSorting: false,
      meta: { title: "contents:promotionsTextList.columns.actions" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="contents:promotionsTextList.columns.actions"
          className="text-right pr-1"
        />
      ),
      cell: ({ row }) => {
        const promotionText = row.original;

        return (
          <DataTableActions
            items={[
              {
                key: "update",
                label: t("dataTable.actions.update"),
                onClick: () => onUpdate(promotionText),
              },
            ]}
          />
        );
      },
    },
  ];
};

export default Columns;
