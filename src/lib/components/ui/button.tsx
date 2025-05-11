import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-size-xs font-medium transition-all  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger cursor-pointer disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:bg-muted",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-danger text-danger-foreground shadow-xs hover:bg-danger/80 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40 ",
        outline:
          "border bg-background shadow-xs text-foreground hover:bg-secondary hover:text-secondary-foreground dark:bg-input/30 dark:border-gray-400 dark:hover:bg-secondary/50 dark:text-foreground dark:disabled:hover:bg-input/30",
        secondary:
          "border bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        success:
          "border bg-success text-success-foreground shadow-xs hover:bg-success/80",
        muted:
          "border bg-muted text-muted-foreground shadow-xs opacity-70 hover:opacity-100 dark:border-gray-600",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-secondary/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
