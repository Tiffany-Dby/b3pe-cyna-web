import { clsx, type ClassValue } from "clsx";
import { twMerge, extendTailwindMerge } from "tailwind-merge";

const extendTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-size-xs",
        "text-size-label",
        "text-size-s",
        "text-size-n",
        "text-size-m",
        "text-size-l",
        "text-size-xl",
        "text-size-2xl",
        "text-size-3xl",
        "text-size-4xl",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return extendTwMerge(clsx(inputs));
}
