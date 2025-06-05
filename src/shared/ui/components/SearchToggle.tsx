import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { Button } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import useSearchForm from "@/shared/hooks/useSearchForm";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SearchToggle = () => {
  const { t } = useTranslation("search");
  const { categories, getCategories } = useCategoriesStore();
  const { q, setQ, categoryId, setCategoryId, handleSubmit } = useSearchForm({
    onSuccess: () => {
      setOpen(false);
      setQ("");
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  const [open, setOpen] = useState(false);

  const categoriesToOptions = categories
    .filter((category) => !!category.locales.length)
    .map((category) => ({
      label: category.globalName,
      value: String(category.id),
    }));

  const categoriesOptions = [
    { label: t("all"), value: "null" },
    ...categoriesToOptions,
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <abbr
            title={t("title")}
            className="flex-center-center h-[1.2rem] w-[1.2rem]"
          >
            <SearchIcon />
          </abbr>
          <span className="sr-only">Toggle search</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] !bg-white/15 backdrop-blur-sm p-0 !max-w-4xl top-1/6 border-none"
      >
        <DialogTitle className="sr-only" asChild>
          <h4>{t("srTitle")}</h4>
        </DialogTitle>
        <form
          className="flex shadow-[0px_0px_200px_0px] shadow-white/50"
          onSubmit={handleSubmit}
        >
          <Select onValueChange={setCategoryId} value={categoryId}>
            <SelectTrigger className="rounded-r-none !bg-none !text-primary-150-foreground cursor-pointer py-6 border-input/50 dark:border-white/50">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categoriesOptions.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
            className="rounded-none w-full flex-2 py-6 text-primary-foreground border-x-0 border-input/50 dark:border-white/50"
          />
          <Button
            variant="default"
            className="rounded-l-none py-6 border-input/50 dark:border-white/50"
            type="submit"
          >
            {t("search")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchToggle;
