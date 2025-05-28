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
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { useEffect } from "react";
import { ProductStatus } from "@/products/types/ProductStatus";
import Loader from "@/shared/ui/components/Loader";
import { Outlet, useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useAddressesStore } from "@/users/store/addressesStore";

const PurchaseLayout = () => {
  const { t } = useTranslation("purchase");
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, getCart, isLoading } = usePurchaseStore();
  const { getUserAddresses } = useAddressesStore();

  useEffect(() => {
    getCart();
    getUserAddresses();
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
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container mx-auto py-5 px-4">
          {!isLoading && cart && (
            <div className="flex flex-col md:flex-row w-full gap-6">
              <Outlet />
              {!!cart.items.length && (
                <article className="md:col-2 md:row-span-full md:max-w-1/3 md:mt-[104px] grow">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle className="flex flex-col gap-4">
                        <h3 className="flex-between-center">
                          <span>{t("cart.subTitle")}</span>
                          <span>
                            {formatAmount(totalCart, {
                              currency: "EUR",
                            })}
                          </span>
                        </h3>
                        <Separator />
                      </CardTitle>
                      <CardDescription>
                        <ul className="px-1">
                          <li className="flex-between-center">
                            <span>{t("cart.subTotal")}</span>
                            <span>
                              {formatAmount(subTotal / 100, {
                                currency: "EUR",
                              })}
                            </span>
                          </li>
                          <li className="flex-between-center">
                            <span>{t("cart.shipping")}</span>
                            <span>
                              {formatAmount(0, {
                                currency: "EUR",
                              })}
                            </span>
                          </li>
                          <li className="flex-between-center">
                            <span>{t("cart.discount")}</span>
                            {totalDiscount ? (
                              <span className="flex-center-center bg-success/18 px-1 border border-success rounded-sm text-success h-5.5">
                                -{" "}
                                {formatAmount(totalDiscount / 100, {
                                  currency: "EUR",
                                })}
                              </span>
                            ) : (
                              formatAmount(0, {
                                currency: "EUR",
                              })
                            )}
                          </li>
                        </ul>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                      {location.pathname === APP_ROUTES.TO_CART && (
                        <div>
                          <Button
                            className="w-full"
                            disabled={cart.items
                              .map((item) => item.product)
                              .some(
                                (p) =>
                                  p.status === ProductStatus.Unavailable ||
                                  p.status === ProductStatus.Maintenance
                              )}
                            onClick={() =>
                              navigate(APP_ROUTES.PURCHASE_ADDRESS)
                            }
                          >
                            {t("cart.proceedPayments")}
                          </Button>
                        </div>
                      )}
                      <div className="px-14">
                        <Separator />
                      </div>

                      <div className="flex flex-col gap-2">
                        <CardDescription>
                          <p className="text-size-label text-center">
                            {t("cart.securedPayments")}
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
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PurchaseLayout;
