import { FormLabel, FormMessage } from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { FILES, MAX_IMAGE_MB } from "@/products/constants/files";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
  label: string;
  count: number;
  names: string[];
};

const BaseMultiInputFile = ({ label, count, names }: Props) => {
  const { t } = useTranslation();
  const {
    setValue,
    trigger,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const [countError, setCountError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => previews.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [previews]);

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountError(null);
    const selected = e.target.files ? [...e.target.files] : [];

    if (selected.length > count) {
      setCountError(t("inputs.productImage.validation.maxFiles", { count }));
      setFiles([]);
      e.target.value = "";

      return;
    }

    setFiles(selected);
    names.forEach((fieldName, i) => {
      setValue(fieldName, selected[i] ?? null, { shouldValidate: true });
    });

    trigger(names);
  };

  const zodErrors = names.map(
    (name) => errors[name]?.message as string | undefined
  );

  useEffect(() => {
    console.log("zodErrors", zodErrors);
  }, [zodErrors]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFiles([]);
      setCountError(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <div className="grid gap-1">
        <FormLabel
          className={
            countError || !!zodErrors.filter(Boolean).length
              ? "text-danger"
              : ""
          }
        >
          {label}
        </FormLabel>
        <Input
          ref={inputRef}
          type="file"
          multiple
          onChange={onFilesChange}
          className="file:bg-primary file:text-primary-foreground file:px-4 file:py-1.5 file:h-auto file:rounded-l-md file:mr-2 file:cursor-pointer p-0 h-auto cursor-pointer"
        />
      </div>
      {countError && (
        <FormMessage className="text-danger">{countError}</FormMessage>
      )}

      {(!!previews.length || !!zodErrors.filter(Boolean).length) && (
        <div className="flex flex-col lg:flex-wrap lg:flex-row gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="flex-between-center p-2 rounded-md bg-muted dark:bg-primary/10 grow lg:max-w-1/3"
            >
              {previews[i] ? (
                <>
                  <div>
                    <p className="truncate max-w-32 sm:max-w-full">
                      {previews[i].file.name}
                    </p>
                    {zodErrors[i] && (
                      <FormMessage className="text-danger">
                        {t(zodErrors[i], {
                          size: MAX_IMAGE_MB,
                          extensions:
                            FILES.ACCEPTED_IMAGE_EXTENSIONS.join(
                              ", "
                            ).toUpperCase(),
                        })}
                      </FormMessage>
                    )}
                  </div>
                  <div className="aspect-square w-18 border rounded overflow-hidden">
                    <img
                      src={previews[i].url}
                      alt={previews[i].file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <p className="text-muted-foreground">{t("noFile")}</p>
                    {zodErrors[i] && (
                      <FormMessage className="text-danger">
                        {t(zodErrors[i])}
                      </FormMessage>
                    )}
                  </div>
                  <div className="aspect-square w-18"></div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BaseMultiInputFile;
