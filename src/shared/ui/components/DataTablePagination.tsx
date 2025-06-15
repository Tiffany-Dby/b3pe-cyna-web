import { Button } from "@/lib/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

type Props<TData> = {
  table: Table<TData>;
};

const DataTablePagination = <TData,>({ table }: Props<TData>) => {
  const { t } = useTranslation();

  const currectSelected = table.getFilteredSelectedRowModel().rows.length;
  const totalSelected = table.getFilteredRowModel().rows.length;

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPage = table.getPageCount();

  return (
    <div className="flex-between-center gap-4 flex-wrap">
      <div className="text-sm text-muted-foreground">
        <Trans
          i18nKey={"dataTable.pagination.selected"}
          count={currectSelected}
          values={{ currectSelected, totalSelected }}
        />
      </div>
      <div className="flex-between-center flex-wrap gap-4 md:gap-6 w-full lg:w-fit">
        <div className="flex-center-center gap-2">
          <p className="text-sm font-medium">
            {t("dataTable.pagination.rows")}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] cursor-pointer">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="cursor-pointer"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-center-center gap-2">
          <div className="flex-center-center text-sm font-medium">
            <Trans
              i18nKey={"dataTable.pagination.page"}
              count={currentPage}
              values={{ currentPage, totalPage }}
            />
          </div>
          <div className="flex-center-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
