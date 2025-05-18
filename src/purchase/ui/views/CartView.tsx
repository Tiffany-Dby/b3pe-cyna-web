import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import MasterCard from "@/shared/ui/components/MasterCard";
import PayPal from "@/shared/ui/components/Paypal";
import { formatAmount } from "@/shared/utils/number";
import { useTranslation } from "react-i18next";
import { FaStripe } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import CartItemCard from "@/purchase/ui/components/CartItemCard";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { useEffect } from "react";
import { ProductStatus } from "@/products/types/ProductStatus";

const CartView = () => {
  const { t, i18n } = useTranslation("cart");
  const { cart, getCart } = usePurchaseStore();

  useEffect(() => {
    getCart();
  }, []);

  const totalDiscount =
    cart?.items.reduce(
      (acc, { product, quantity }) =>
        acc + (product.basePrice - product.price) * quantity,
      0
    ) || 0;

  const subTotal =
    cart?.items.reduce(
      (acc, { product, quantity }) => acc + product.basePrice * quantity,
      0
    ) || 0;

  const totalCart = (subTotal - totalDiscount) / 100;

  return (
    <section>
      <div className="container mx-auto py-5 px-4">
        <h1>{t("title")}</h1>
        {!cart?.items?.length ? (
          <Card>
            <p className="px-6 text-center">{t("empty")}</p>
          </Card>
        ) : (
          <div className="flex flex-col md:flex-row w-full gap-6">
            <div className="flex flex-col gap-6 grow">
              {cart.items?.map((item, index) => (
                <CartItemCard index={index} item={item} key={item.id} />
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
                          {formatAmount(subTotal / 100, {
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
                          {formatAmount(totalDiscount / 100, {
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
                    <Button
                      className="w-full"
                      disabled={cart.items
                        .map((item) => item.product)
                        .some(
                          (product) =>
                            product.status === ProductStatus.Unavailable ||
                            product.status === ProductStatus.Maintenance
                        )}
                    >
                      {t("proceedPayments")}
                    </Button>
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
        )}
      </div>
    </section>
  );
};

export default CartView;
