import BaseCarousel from "@/shared/ui/components/BaseCarousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { ProductStatus } from "@/products/types/ProductStatus";
import { EuroIcon, SquareCheckBigIcon } from "lucide-react";
import { Separator } from "@/lib/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { formatAmount } from "@/shared/utils/number";
import { cn } from "@/lib/utils";
import PromotionTag from "@/shared/ui/components/PromotionTag";
import useFetch from "@/shared/hooks/useFetch";
import { API_ROUTES } from "@/shared/constants/routes";
import { ProductLocale } from "@/products/types/Products";

const ProductView = () => {
  const { t, i18n } = useTranslation("products");

  const { id } = useParams();
  const locale = i18n.resolvedLanguage;

  const {
    data: productLocale,
    isLoading,
    error,
  } = useFetch<ProductLocale>(
    `${API_ROUTES.PRODUCT_GET}/${id}/${locale ?? "en"}`,
    false
  );

  const disabled = productLocale?.status !== ProductStatus.Available;

  return (
    <>
      <article>
        <div className="container mx-auto flex flex-col gap-16 pt-4 pb-8">
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <p>Loading...</p>}
          {!error && productLocale && (
            <>
              <div>
                <div className="flex flex-col gap-16 w-full max-w-3xl mx-auto px-4">
                  <div>
                    <div className="flex-between-center">
                      <h1>{productLocale.name}</h1>
                      <ProductStatusBadge
                        status={productLocale.status}
                        type={productLocale.type}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Link
                        to={disabled ? "#" : "#pricing"}
                        aria-disabled={disabled}
                        className={cn(
                          "py-1.5 px-2.5 rounded-md transition shadow-xs",
                          disabled
                            ? "text-muted-foreground bg-muted cursor-not-allowed hover:bg-muted opacity-50"
                            : "bg-accent hover:bg-accent/80"
                        )}
                      >
                        {t("tryNow")}
                      </Link>
                    </div>
                  </div>
                  <div className="flex-center-center">
                    <BaseCarousel
                      slides={productLocale.slides}
                      renderSlide={(slide) => (
                        <img
                          src={slide}
                          alt=""
                          className="aspect-video w-full max-w-full h-full max-h-full object-center object-cover rounded-xl"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <section>
                <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-2">
                  <h2>{productLocale?.details.descriptionTitle}</h2>
                  <p>{productLocale?.details.descriptionText}</p>
                </div>
              </section>
              <section>
                <div className="w-full max-w-3xl mx-auto px-4">
                  <Tabs defaultValue="one" className="flex flex-col gap-6">
                    <TabsList className="w-full">
                      <TabsTrigger value="one">
                        {t("tabs.benefits.name")}
                      </TabsTrigger>
                      <TabsTrigger value="two">
                        {t("tabs.functionnalities.name")}
                      </TabsTrigger>
                      <TabsTrigger value="three">
                        {t("tabs.specifications.name")}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="one" className="flex flex-col gap-6">
                      <h2>
                        {t("tabs.benefits.title")} {productLocale?.name} ?
                      </h2>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {productLocale?.details.benefits.map((elt, index) => (
                          <li key={index} className="w-full">
                            <Accordion
                              type="single"
                              collapsible
                              className="bg-primary text-primary-foreground border rounded-xl"
                            >
                              <AccordionItem value={`${index}`}>
                                <AccordionTrigger className="text-size-n items-center cursor-pointer px-4">
                                  {elt.title}
                                </AccordionTrigger>
                                <AccordionContent className="px-4">
                                  {elt.description}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="two" className="flex flex-col gap-6">
                      <h2>{t("tabs.functionnalities.title")}</h2>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {productLocale?.details.functionalities.map(
                          (elt, index) => (
                            <li
                              key={index}
                              className="flex items-center w-full p-4 bg-primary text-primary-foreground rounded-xl shadow-sm shadow-primary/15 dark:shadow-lg border"
                            >
                              <p>{elt.value}</p>
                            </li>
                          )
                        )}
                      </ul>
                    </TabsContent>
                    <TabsContent value="three" className="flex flex-col gap-6">
                      <h2>{t("tabs.specifications.title")}</h2>
                      <div className="rounded-xl border dark:border-white/20">
                        <Table>
                          <TableCaption className="sr-only">
                            {t("tabs.specifications.srOnly")}
                          </TableCaption>
                          <TableHeader className="bg-muted">
                            <TableRow className="dark:border-white/20">
                              <TableHead className="border-r dark:border-white/20 px-6 rounded-tl-xl">
                                {t("tabs.specifications.table.criteria")}
                              </TableHead>
                              <TableHead className="px-6 rounded-tr-xl">
                                {t("tabs.specifications.table.detail")}
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {productLocale?.details.specifications.map(
                              (elt, index) => (
                                <TableRow
                                  key={index}
                                  className="border-b dark:border-white/20"
                                >
                                  <TableCell className="border-r dark:border-white/20 px-6">
                                    {elt.criteria}
                                  </TableCell>
                                  <TableCell className="px-6">
                                    {elt.description}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </section>
              <div className="w-full max-w-3xl mx-auto">
                <Separator className="w-full max-w-1/2 mx-auto bg-muted" />
              </div>
              <section id="pricing">
                <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-6">
                  <h2>{t("pricing.title")}</h2>
                  <div className="flex-center-center flex-col gap-4 w-full sm:gap-0 sm:grid sm:grid-cols-3">
                    <article className="w-full max-w-sm text-size-label sm:col-1 sm:row-1">
                      <Card className="bg-transparent w-full justify-between sm:min-h-80 sm:pr-2">
                        <CardHeader>
                          <CardTitle className="flex-center-center flex-col">
                            <h3>{t("pricing.monthly.title")}</h3>
                            <p className="w-fit relative">
                              <span className="text-size-4xl">
                                {formatAmount(productLocale.price / 100, {
                                  locale: locale,
                                })}
                              </span>{" "}
                              <EuroIcon
                                size={18}
                                className="absolute top-0 left-full text-accent"
                              />
                              <span className="absolute bottom-0 left-full text-muted-foreground">
                                /{t("pricing.month")}
                              </span>
                            </p>
                          </CardTitle>
                          <CardDescription className="text-center text-size-label">
                            {t("pricing.monthly.bill")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.availability")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.commitment")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Button
                            className="w-full max-w-50 sm:max-w-none"
                            variant="outline"
                            disabled={disabled}
                          >
                            {t("pricing.monthly.cta")}
                          </Button>
                        </CardFooter>
                      </Card>
                    </article>
                    <article className="w-full max-w-sm sm:max-w-3xs sm:z-10 sm:col-[1/-1] sm:row-1 sm:justify-self-center md:max-w-2xs">
                      <Card className="relative bg-background w-full border-success/50 justify-between sm:min-h-96 sm:py-10">
                        <CardHeader>
                          <CardTitle className="flex-center-center flex-col">
                            <h3>{t("pricing.yearly.title")}</h3>
                            <p className="w-fit relative">
                              <span className="text-size-4xl">
                                {formatAmount(productLocale.price / 100, {
                                  locale: locale,
                                })}
                              </span>{" "}
                              <EuroIcon
                                size={18}
                                className="absolute top-0 left-full text-accent"
                              />
                              <span className="absolute bottom-0 left-full text-muted-foreground">
                                /{t("pricing.month")}
                              </span>
                            </p>
                          </CardTitle>
                          <CardDescription className="relative flex-center-center w-fit mx-auto">
                            <span>
                              {t("pricing.yearly.bill")}{" "}
                              {formatAmount((productLocale.price * 12) / 100, {
                                locale: locale,
                              })}{" "}
                            </span>
                            <EuroIcon
                              size={12}
                              className="absolute top-0.5 left-full"
                            />
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.availability")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.commitment")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Button
                            className="w-full max-w-50 sm:max-w-none"
                            variant="success"
                            disabled={disabled}
                          >
                            {t("pricing.yearly.cta")}
                          </Button>
                        </CardFooter>
                        {!!productLocale.discountPercentage && <PromotionTag />}
                      </Card>
                    </article>
                    <article className="w-full max-w-sm text-size-label sm:col-3 sm:row-1">
                      <Card className="bg-transparent w-full justify-between sm:min-h-80 sm:pl-2">
                        <CardHeader>
                          <CardTitle className="flex-center-center flex-col">
                            <h3>{t("pricing.trial.title")}</h3>
                            <p className="w-fit relative">
                              <span className="text-size-4xl">0</span>{" "}
                              <EuroIcon
                                size={18}
                                className="absolute top-0 left-full text-accent"
                              />
                            </p>
                          </CardTitle>
                          <CardDescription className="text-center text-size-label">
                            {t("pricing.trial.bill")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="flex flex-col gap-2 justify-center w-full max-w-50 sm:max-w-none mx-auto sm:mx-0">
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.availability")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                            <li>
                              <SquareCheckBigIcon
                                size={16}
                                className="text-success float-left mr-2"
                              />{" "}
                              <p className="leading-4.5">
                                {t("pricing.keys.commitment")}
                              </p>
                              <span className="clear-left"></span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Button
                            className="w-full max-w-50 sm:max-w-none"
                            variant="outline"
                            disabled={disabled}
                          >
                            {t("pricing.trial.cta")}
                          </Button>
                        </CardFooter>
                      </Card>
                    </article>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default ProductView;
