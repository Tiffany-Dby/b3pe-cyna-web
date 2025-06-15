import { Checkbox } from "@/lib/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/shared/ui/components/DataTableColumnHeader";
import DataTableActions from "@/shared/ui/components/DataTableActions";
import { Product } from "@/products/types/Products";
import { i18n, TFunction } from "i18next";
import { formatAmount } from "@/shared/utils/number";

const Columns = (
  onDeleteProduct: (product: Product) => void,
  onUpdateProduct: (product: Product) => void,
  onUpdateTranslation: (product: Product) => void,
  onDeleteTranslation: (product: Product) => void,
  t: TFunction,
  i18n: i18n
): ColumnDef<Product>[] => {
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
      accessorKey: "name",
      meta: {
        title: "products:productList.columns.name",
        filterable: true,
        filterPlaceholder: "products:productList.filters",
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.name"
        />
      ),
    },
    {
      accessorKey: "details",
      meta: { title: "products:productList.columns.languages" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.languages"
        />
      ),
      cell: ({ row }) => {
        return (
          <p>
            {[
              ...new Set(row.original.details?.map((detail) => detail.locale)),
            ].join(", ")}
          </p>
        );
      },
    },
    {
      accessorKey: "category",
      meta: { title: "products:productList.columns.category" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.category"
        />
      ),
      cell: ({ row }) => <p>{row.original.category.globalName}</p>,
    },
    {
      accessorKey: "basePrice",
      meta: { title: "products:productList.columns.basePrice" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.basePrice"
        />
      ),
      cell: ({ row }) =>
        formatAmount(row.original.basePrice / 100, {
          locale: i18n.resolvedLanguage,
          currency: "EUR",
        }),
    },
    /* {
      accessorKey: "slides",
      meta: { title: "Images" },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Images" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-4">
          {row.original.slides.map((slide, i) => (
            // <div key={i} className="aspect-square w-15">
            //   <img
            //     src={slide}
            //     alt={row.original.name}
            //     loading="lazy"
            //     className="w-full h-full object-cover"
            //   />
            // </div>
            // <div key={i} className="button rounded-md !bg-muted">
            //   <a href={slide} target="_blank" className="py-1.5 px-2.5">
            //     Image {i + 1}
            //   </a>
            // </div>
          ))}
        </div>
      ),
      enableSorting: false,
    }, */
    {
      accessorKey: "discountPercentage",
      meta: { title: "products:productList.columns.discountPercentage" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.discountPercentage"
        />
      ),
      cell: ({ row }) =>
        row.original.discountPercentage > 0
          ? `${row.original.discountPercentage}%`
          : "—",
    },
    {
      accessorKey: "discountOrder",
      meta: { title: "products:productList.columns.order" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.order"
        />
      ),
      cell: ({ row }) =>
        row.original.discountOrder > 0 ? row.original.discountOrder : "—",
    },
    {
      id: "actions",
      enableSorting: false,
      meta: { title: "products:productList.columns.actions" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="products:productList.columns.actions"
          className="text-right pr-1"
        />
      ),
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DataTableActions
            items={[
              {
                key: "product",
                label: t("products:productList.columns.product"),
                separator: true,
              },
              {
                key: "updateProduct",
                label: t("common:dataTable.actions.update"),
                onClick: () => onUpdateProduct(product),
              },
              {
                key: "deleteProduct",
                label: t("common:dataTable.actions.delete"),
                onClick: () => onDeleteProduct(product),
              },
              {
                key: "sep1",
                separator: true,
              },
              {
                key: "details",
                label: t("products:productList.columns.details"),
                separator: true,
              },
              {
                key: "updateTranslation",
                label: t("common:dataTable.actions.update"),
                onClick: () => onUpdateTranslation(product),
                disabled: !product.details.length,
              },
              {
                key: "deleteTranslation",
                label: t("common:dataTable.actions.delete"),
                onClick: () => onDeleteTranslation(product),
                disabled: !product.details.length,
              },
            ]}
          />
        );
      },
    },
  ];
};

export default Columns;
