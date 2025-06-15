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

type Props = {
  accordionValue: string;
  title: string;
  description?: React.ReactNode | string;
  children: React.ReactNode;
  serverError?: string | null;
};

const BaseAccordionCard = ({
  accordionValue,
  title,
  description,
  children,
  serverError,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Accordion type="single" collapsible className="@4xl:flex-1 w-full">
      <AccordionItem className="@container group h-full" value={accordionValue}>
        <Card className="w-full group-data-[state=open]:h-full p-0 gap-0">
          <AccordionTrigger className="items-center cursor-pointer px-6 hover:no-underline">
            <h2>{t(title)}</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 h-full pb-6">
            <CardHeader>
              <CardDescription>
                {description &&
                  (typeof description === "string" ? (
                    <p>{t(description)}</p>
                  ) : (
                    description
                  ))}
                {serverError && <p className="text-danger">{serverError}</p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">{children}</CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default BaseAccordionCard;
