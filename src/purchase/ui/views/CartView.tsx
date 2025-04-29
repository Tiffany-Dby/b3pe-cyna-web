import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Separator } from "@/lib/components/ui/separator";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import imgBanner from "@/shared/assets/images/banner.svg";
import MasterCard from "@/shared/ui/components/MasterCard";
import PayPal from "@/shared/ui/components/Paypal";
import { formatAmount } from "@/shared/utils/number";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStripe } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

const products = [
  {
    name: "Cyna EDR",
    price: 3000,
    status: 2,
    type: 0,
    quantity: 1,
    discount: 0,
  },
  {
    name: "Cyna XDR",
    price: 3000,
    status: 1,
    type: 0,
    quantity: 1,
    discount: 0.25,
  },
  {
    name: "Cyna SOC",
    price: 3000,
    status: 0,
    type: 0,
    quantity: 1,
    discount: 0,
  },
];

// TODO: discount on CartItem

const CartView = () => {
  const { t, i18n } = useTranslation("cart");
  const [quantities, setQuantities] = useState(products.map(() => 1));
  const totalDiscount = products.reduce(
    (acc, curr) => acc + (curr.price * curr.discount) / 100,
    0
  );
  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0) / 100;
  const totalCart = totalPrice - totalDiscount;

  const updateQuantity = (index: number, newVal: number) => {
    setQuantities((prev) =>
      prev.map((val, i) => (i === index ? Math.max(1, newVal) : val))
    );
  };

  const increase = (index: number) => {
    updateQuantity(index, quantities[index] + 1);
  };

  const decrease = (index: number) => {
    updateQuantity(index, Math.max(1, quantities[index] - 1));
  };

  return (
    <section>
      <div className="container mx-auto py-5 px-4">
        <h1>{t("title")}</h1>

        <div className="flex flex-col md:flex-row w-full gap-6">
          <div className="flex flex-col gap-6 grow">
            {products.map((product, index) => (
              <article className={`md:col-1 md:row-${index + 1}`} key={index}>
                <Card className="py-4">
                  <div className="grid grid-cols-[minmax(0px,120px)_1fr] grid-rows-[auto_auto] gap-3 px-4">
                    <div className="sm:row-span-full sm:col-1">
                      <div className="aspect-square sm:max-w-30 p-1 bg-primary rounded-lg">
                        <img
                          src={imgBanner}
                          alt=""
                          className="w-full max-w-full h-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                    {/* <div className="flex flex-col w-full"> */}
                    <CardHeader className="w-full p-0 sm:col-2 sm:row-1">
                      <CardTitle className="w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <h2>{product.name}</h2>
                          <div className="relative flex flex-col sm:items-end">
                            <p className="text-size-2xl">
                              {formatAmount(
                                (product.price -
                                  product.price * product.discount) /
                                  100,
                                {
                                  locale: i18n.resolvedLanguage,
                                  currency: "EUR",
                                }
                              )}
                            </p>
                            {!!product.discount && (
                              <p className="absolute top-full line-through text-size-s text-muted-foreground">
                                {formatAmount(product.price / 100, {
                                  locale: i18n.resolvedLanguage,
                                  currency: "EUR",
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription className="flex-between-center">
                        <ProductStatusBadge
                          status={product.status}
                          type={product.type}
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="row-2 col-span-full px-0 sm:col-2 sm:flex sm:grow sm:w-full">
                      <div className="flex gap-1 w-full justify-between">
                        <div className="flex flex-col w-1/2 justify-end gap-1">
                          <Label>{t("common:selects.subType.label")}</Label>
                          <Select>
                            <SelectTrigger className="w-full border-primary/40">
                              <SelectValue
                                placeholder={t(
                                  "common:selects.subType.placeholder"
                                )}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">
                                {t("common:selects.subType.monthly")}
                              </SelectItem>
                              <SelectItem value="1">
                                {t("common:selects.subType.yearly")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-1 justify-end">
                          <Label>{t("common:inputs.quantity.label")}</Label>
                          <div className="flex">
                            <Button
                              className="w-8 h-8 p-0 rounded-tr-none rounded-br-none"
                              onClick={() =>
                                quantities[index] > 1
                                  ? decrease(index)
                                  : () => {}
                              }
                            >
                              {quantities[index] > 1 ? (
                                <MinusIcon />
                              ) : (
                                <Trash2Icon />
                              )}
                            </Button>
                            <Input
                              type="number"
                              className="px-0 text-center max-h-8 rounded-none max-w-8 border-primary text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={quantities[index]}
                              onChange={(e) =>
                                updateQuantity(
                                  index,
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                            <Button
                              className="w-8 h-8 p-0 rounded-tl-none rounded-bl-none"
                              onClick={() => increase(index)}
                            >
                              <PlusIcon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  {/* </div> */}
                </Card>
              </article>
            ))}
          </div>
          <article className="md:col-2 md:row-span-full md:max-w-1/3 grow">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex flex-col gap-4">
                  <h3 className="flex-between-center">
                    <span>{t("subTitle")}</span>
                    <span>
                      {formatAmount(totalCart, {
                        locale: i18n.resolvedLanguage,
                        currency: "EUR",
                      })}
                    </span>
                  </h3>
                  <Separator />
                </CardTitle>
                <CardDescription>
                  <ul className="px-1">
                    <li className="flex-between-center">
                      <span>{t("subTotal")}</span>
                      <span>
                        {formatAmount(totalPrice, {
                          locale: i18n.resolvedLanguage,
                          currency: "EUR",
                        })}
                      </span>
                    </li>
                    <li className="flex-between-center">
                      <span>{t("shipping")}</span>
                      <span>
                        {formatAmount(0, {
                          locale: i18n.resolvedLanguage,
                          currency: "EUR",
                        })}
                      </span>
                    </li>
                    <li className="flex-between-center">
                      <span>{t("discount")}</span>
                      <span className="flex-center-center bg-success/18 px-1 border border-success rounded-sm text-success h-5.5">
                        -{" "}
                        {formatAmount(totalDiscount, {
                          locale: i18n.resolvedLanguage,
                          currency: "EUR",
                        })}
                      </span>
                    </li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div>
                  <Button className="w-full">{t("proceedPayments")}</Button>
                </div>
                <div className="px-14">
                  <Separator />
                </div>

                <div className="flex flex-col gap-2">
                  <CardDescription>
                    <p className="text-size-label text-center">
                      {t("securedPayments")}
                    </p>
                  </CardDescription>
                  <div className="flex-center-center gap-3">
                    <div className="flex-center-center min-w-11 bg-white px-1.5 max-h-8 rounded-md border border-input/75">
                      <RiVisaLine className="text-[#1434CB] w-full h-full min-w-full min-h-full object-cover" />
                    </div>
                    <div className="flex-center-center min-w-11 bg-white px-1.5 max-h-8 rounded-md border border-input/75">
                      <MasterCard className="w-full h-full min-w-full min-h-full object-cover" />
                    </div>
                    <div className="flex-center-center min-w-11 bg-white px-1.5 max-h-8 rounded-md border border-input/75">
                      <FaStripe className="text-[#635BFF] w-full h-full min-w-full min-h-full object-cover" />
                    </div>
                    <div className="flex-center-center min-w-11 bg-yellow-300 px-1.5 max-h-8 rounded-md border border-input/75">
                      <PayPal className="w-full h-full min-w-full min-h-full object-cover" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CartView;
