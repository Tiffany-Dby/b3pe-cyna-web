import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { useState } from "react";
import { setFormData } from "@/shared/utils/form";
import { RequestFn } from "../types/Api";

type Props<T extends FieldValues, R> = UseFormProps<T> & {
  schema: ZodSchema<T>;
  apiUrl: string;
  withAuth?: boolean;
  requestFn: RequestFn;
  onSuccess?: (data: R) => void;
  asFormData?: boolean;
};

const useCustomForm = <T extends FieldValues, R>({
  schema,
  apiUrl,
  withAuth,
  onSuccess,
  defaultValues,
  requestFn,
  asFormData = false,
  ...formOptions
}: Props<T, R>) => {
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
    const payload = asFormData ? setFormData(data) : data;
    const { result, error } = await requestFn<R, T>(apiUrl, payload, withAuth);
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
