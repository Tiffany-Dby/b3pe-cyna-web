import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

type ActionItem = {
  key: string;
  label?: string;
  onClick?: () => void;
  separator?: boolean;
  disabled?: boolean;
};

type Props = {
  items: ActionItem[];
};

const DataTableActions = ({ items }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="grid justify-self-end" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open actions menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid" align="end">
        {items.map((item) =>
          item.separator ? (
            <DropdownMenuSeparator key={item.key} />
          ) : (
            <DropdownMenuItem
              key={item.key}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(category.id))} >

export default DataTableActions;
