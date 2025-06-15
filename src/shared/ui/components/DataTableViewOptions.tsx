import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props<TData> = {
  table: Table<TData>;
};

const DataTableViewOptions = <TData,>({ table }: Props<TData>) => {
  const { t } = useTranslation();

  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  return (
    <>
      {!!columns.length && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2Icon />
              <span className="sr-only">{t("dataTable.display")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>{t("dataTable.display")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {t(column.columnDef.meta?.title ?? column.id)}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DataTableViewOptions;
