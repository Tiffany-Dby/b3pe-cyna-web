import { DATE } from "@/shared/constants/date";
import DataTableColumnHeader from "@/shared/ui/components/DataTableColumnHeader";
import PaymentStatusBadge from "@/shared/ui/components/PaymentStatusBadge";
import { formatAmount } from "@/shared/utils/number";
import { Payment } from "@/users/types/History";
import { ColumnDef } from "@tanstack/react-table";
import { i18n, TFunction } from "i18next";
import { FileCheckIcon } from "lucide-react";

const HistoryColumns = (t: TFunction, i18n: i18n): ColumnDef<Payment>[] => {
  return [
    {
      accessorKey: "orderId",
      meta: { title: "account:history.columns.order" },
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.order"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines">
          <p>{row.original.order.id}</p>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      meta: { title: "account:history.columns.date" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.date"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines">
          <p className="capitalize">
            {new Date(row.original.subscription.createdAt)?.toLocaleDateString(
              i18n.resolvedLanguage,
              DATE.TIME_FORMAT_OPTIONS
            )}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      meta: { title: "account:history.columns.status" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.status"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines [&_p]:flex-row-reverse w-fit">
          <PaymentStatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      id: "products",
      accessorFn: (row) =>
        row.order.items.length > 0
          ? row.order.items.map((item) => item.product.name).join(", ")
          : "",
      meta: {
        title: "account:history.columns.products",
        filterable: true,
        filterPlaceholder: "account:history.filters",
      },
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.products"
        />
      ),
      cell: ({ row }) => (
        <>
          {!!row.original.order.items.length ? (
            <div className="multi-lines flex flex-col gap-2 align-top">
              {row.original.order.items.map((item) => (
                <p key={item.id}>{item.product.name}</p>
              ))}
            </div>
          ) : (
            <div className="multi-lines">
              <p>—</p>
            </div>
          )}
        </>
      ),
      filterFn: "includesString",
    },
    {
      accessorKey: "items",
      meta: { title: "account:history.columns.quantities" },
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.quantities"
        />
      ),
      cell: ({ row }) => (
        <>
          {!!row.original.order.items.length ? (
            <div className="multi-lines flex flex-col gap-2">
              {row.original.order.items.map((item) => (
                <p key={item.id}>x{item.quantity}</p>
              ))}
            </div>
          ) : (
            <div className="multi-lines">
              <p>—</p>
            </div>
          )}
        </>
      ),
    },
    {
      accessorKey: "amount",
      meta: { title: "account:history.columns.total" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.total"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines">
          <p>
            {formatAmount(row.original.amount / 100, {
              locale: i18n.resolvedLanguage,
              currency: "EUR",
            })}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "paymentMethod",
      meta: { title: "account:history.columns.paymentMethod" },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.paymentMethod"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines">
          <p>{t(`common:paymentMethod.${row.original.paymentMethod.name}`)}</p>
        </div>
      ),
    },
    {
      accessorKey: "lastInvoiceUrl",
      meta: { title: "account:history.columns.invoice" },
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="account:history.columns.invoice"
          className="text-center"
        />
      ),
      cell: ({ row }) => (
        <div className="multi-lines flex justify-center">
          {!!row.original.subscription.lastInvoiceUrl ? (
            <a
              className="flex w-fit justify-center"
              title="Voir la facture"
              href={row.original.subscription.lastInvoiceUrl}
              target="_blank"
            >
              <FileCheckIcon className="h-4.5 w-4.5" />
            </a>
          ) : (
            <p>—</p>
          )}
        </div>
      ),
    },
  ];
};

export default HistoryColumns;
