import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { useState } from "react";
import { RequestFn } from "@/shared/types/Api";

type UseCustomFormProps<T extends FieldValues, R> = UseFormProps<T> & {
  schema: ZodSchema<T>;
  apiUrl: string;
  requestFn: RequestFn;
  onSuccess?: (data: R) => void;
  token?: string;
};

const useCustomForm = <T extends FieldValues, R>({
  schema,
  apiUrl,
  onSuccess,
  defaultValues,
  requestFn,
  token,
  ...formOptions
}: UseCustomFormProps<T, R>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    ...formOptions,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setServerError(null);

    setIsLoading(true);
    const { result, error } = await requestFn<R, T>(apiUrl, data, token);
    setIsLoading(false);

    if (error) {
      setServerError(error);

      return;
    }

    form.reset();

    if (onSuccess && result) onSuccess(result);
  });

  return { form, handleSubmit, isLoading, serverError };
};

export default useCustomForm;
