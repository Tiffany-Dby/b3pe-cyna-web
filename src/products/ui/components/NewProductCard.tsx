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
import NewProductForm from "@/products/ui/components/NewProductForm";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const NewProductCard = () => {
  const { t } = useTranslation("products");
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <Accordion type="single" collapsible className="@4xl:flex-1 w-full">
      <AccordionItem className="group h-full" value="newProductForm">
        <Card className="grid w-full group-data-[state=open]:min-h-[647.42px] grid-rows-[max-content] p-0 gap-0">
          <AccordionTrigger className="self-start items-center cursor-pointer px-6 hover:no-underline">
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

export default NewProductCard;
