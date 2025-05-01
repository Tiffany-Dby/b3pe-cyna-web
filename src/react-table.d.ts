import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData, TValue> {
    title: string;
    filterable?: boolean;
    filterPlaceholder?: string;
  }
}
