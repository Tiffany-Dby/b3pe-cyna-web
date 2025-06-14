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
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useAddressesStore } from "@/users/store/addressesStore";
import { useAuth } from "@/users/context/AuthContext";

const PurchaseLayout = () => {
  const { t } = useTranslation("purchase");
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { getDisplayedCart, isLoading } = usePurchaseStore();
  const { getUserAddresses } = useAddressesStore();

  useEffect(() => {
    if (isAuthenticated) getUserAddresses();
  }, [isAuthenticated]);

  const displayedCart = getDisplayedCart();

  const totalDiscount =
    displayedCart.reduce(
      (acc, { product, quantity, recurring }) =>
        acc +
        (product.basePrice - product.price) *
          (recurring === 2 ? 12 : 1) *
          quantity,
      0
    ) || 0;

  const subTotal =
    displayedCart.reduce(
      (acc, { product, quantity, recurring }) =>
        acc + product.basePrice * (recurring === 2 ? 12 : 1) * quantity,
      0
    ) || 0;

  const totalCart = (subTotal - totalDiscount) / 100;

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container mx-auto pt-10 pb-24 px-4">
          {!isLoading && (
            <div className="flex flex-col md:flex-row w-full gap-6">
              <Outlet />
              {!!displayedCart.length && (
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
                      {location.pathname === APP_ROUTES.PURCHASE_CART && (
                        <div>
                          {isAuthenticated ? (
                            <Button
                              className="w-full"
                              disabled={displayedCart
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
                          ) : (
                            <Link
                              to={APP_ROUTES.SIGN_IN}
                              className="flex-center-center w-full h-9 border border-primary text-primary text-size-n font-medium bg-background py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 rounded-md dark:text-primary-foreground dark:border-primary-foreground dark:hover:border-transparent"
                            >
                              {t("cart.signInToPay")}
                            </Link>
                          )}
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
