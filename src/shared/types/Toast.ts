import { toast } from "sonner";

type ToastMessage = Parameters<typeof toast.success>[0];
type ToastMsgs = {
  loading?: ToastMessage;
  success?: ToastMessage;
  error?: ToastMessage;
};

export type { ToastMessage, ToastMsgs };
