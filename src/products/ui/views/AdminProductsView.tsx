import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/lib/components/ui/card";
import { useTranslation } from "react-i18next";
import NewProductForm from "@/products/ui/components/NewProductForm";
import { useState } from "react";

const AdminProductsView = () => {
  const { t } = useTranslation("products");
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <Accordion
      type="single"
      collapsible
      className="flex-1 sm:min-w-64 w-full sm:w-auto"
    >
      <AccordionItem className="group h-full" value="newProductForm">
        <Card className="grow sm:min-w-80 w-full group-data-[state=open]:h-full p-0 gap-0">
          <AccordionTrigger className="items-center cursor-pointer px-6 hover:no-underline">
            <h2>{t("newBase.title")}</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 h-full pb-6">
            <CardHeader>
              <CardDescription>
                <p>{t("newBase.description")}</p>
                {serverError && <p className="text-danger">{serverError}</p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <NewProductForm onError={setServerError} />
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default AdminProductsView;
