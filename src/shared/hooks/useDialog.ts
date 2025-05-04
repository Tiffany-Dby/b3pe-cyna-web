import { useState, useCallback } from "react";
import { DialogType } from "@/shared/types/Dialog";

export function useDialog<T>() {
  const [dialog, setDialog] = useState<{
    type: DialogType;
    item: T | null;
  }>({ type: null, item: null });

  const open = useCallback((type: Exclude<DialogType, null>, item: T) => {
    setDialog({ type, item });
  }, []);

  const close = useCallback(() => {
    setDialog({ type: null, item: null });
  }, []);

  return { dialog, open, close };
}
