import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { useState } from "react";
import { setFormData } from "@/shared/utils/form";
import { RequestFn } from "@/shared/types/Api";
import { toast } from "sonner";
import { ToastMsgs } from "@/shared/types/Toast";
import { TOAST } from "@/shared/constants/toast";

type Props<T extends FieldValues, R> = UseFormProps<T> & {
  schema: ZodSchema<T>;
  apiUrl: string;
  withAuth?: boolean;
  requestFn: RequestFn;
  onSuccess?: (data: R) => void;
  asFormData?: boolean;
  toastMsgs?: ToastMsgs;
};

const useCustomForm = <T extends FieldValues, R>({
  schema,
  apiUrl,
  withAuth,
  onSuccess,
  defaultValues,
  requestFn,
  asFormData = false,
  toastMsgs = TOAST.DEFAULT_MSGS,
  ...formOptions
}: Props<T, R>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    ...formOptions,
  });

  const { loading, success, error } = toastMsgs;

  const handleSubmit = form.handleSubmit(async (data) => {
    setServerError(null);

    setIsLoading(true);
    const toastId = toast.loading(loading);
    const payload = asFormData ? setFormData(data) : data;
    const { result, error: reqError } = await requestFn<R, T>(
      apiUrl,
      payload,
      withAuth
    );
    setIsLoading(false);

    if (reqError) {
      setServerError(reqError);
      toast.error(error, { id: toastId });

      return;
    }

    toast.success(success, { id: toastId });
    form.reset();

    if (onSuccess && result) onSuccess(result);
  });

  return { form, handleSubmit, isLoading, serverError };
};

export default useCustomForm;
