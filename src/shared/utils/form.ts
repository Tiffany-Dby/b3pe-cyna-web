const handleInputChange =
  <T>(setForm: React.Dispatch<React.SetStateAction<T>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const areFormFieldsEmpty = <T>(
  form: T,
  setError: (field: keyof T, error: string | null) => void,
  errorMessage: string
): boolean => {
  for (const key in form) {
    if (typeof form[key] === "string" && !form[key].trim()) {
      setError(key as keyof T, errorMessage);

      return false;
    }
  }

  return true;
};

export { handleInputChange, areFormFieldsEmpty };
