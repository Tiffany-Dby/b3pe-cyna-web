import { Input } from "@/lib/components/ui/input";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
  columnKey: string;
  placeholder: string;
  className?: string;
};

const DataTableFilter = <TData,>({
  table,
  columnKey,
  placeholder,
  className,
}: Props<TData>) => {
  const column = table.getColumn(columnKey);

  if (!column || !column.getCanFilter()) return null;

  const value = (column.getFilterValue() as string) ?? "";

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className={cn("w-full sm:max-w-sm", className)}
      name="q"
      type="search"
    />
  );
};

export default DataTableFilter;
