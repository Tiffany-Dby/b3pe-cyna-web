import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { useState } from "react";
import { postRequest } from "@/shared/tools/api";

type UseCustomFormProps<T extends FieldValues, R> = UseFormProps<T> & {
  schema: ZodSchema<T>;
  apiUrl: string;
  onSuccess?: (data: R) => void;
};

const useCustomForm = <T extends FieldValues, R>({
  schema,
  apiUrl,
  onSuccess,
  defaultValues,
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
    const { result, error } = await postRequest<R, T>(apiUrl, data);
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
