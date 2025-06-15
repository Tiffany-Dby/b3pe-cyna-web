import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/lib/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Link } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import BaseCard from "@/shared/ui/components/BaseCard";
import { LoaderIcon } from "lucide-react";
import useCheckout from "@/purchase/hooks/useCheckout";
import useCancel from "@/purchase/hooks/useCancel";

type Props = {
  orderId: number;
  intentId: string;
};

const CheckoutForm = ({ orderId, intentId }: Props) => {
  const { t } = useTranslation("purchase");
  const { handleSubmit, setPaymentMethodType, isLoading } =
    useCheckout(orderId);
  const { onCancel, isLoading: isCancelLoading } = useCancel({ intentId });

  return (
    <div className="flex flex-col gap-6 grow">
      <div className="h-20">
        <h1>{t("step")} 3/3</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={APP_ROUTES.PURCHASE_CART}>{t("breadcrumb.cart")}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={APP_ROUTES.PURCHASE_ADDRESS}>
                {t("breadcrumb.address")}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("breadcrumb.payment")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BaseCard
        title={<h2>{t("checkout.title")}</h2>}
        description={<p>{t("checkout.description")}</p>}
        content={
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <PaymentElement
                onChange={(event) => setPaymentMethodType(event.value.type)}
                options={{ layout: { type: "tabs" } }}
              />
            </div>
            <div className="flex gap-4">
              <Button
                className="flex-1"
                variant="outline"
                disabled={isLoading || isCancelLoading}
                onClick={onCancel}
              >
                {isCancelLoading ? (
                  <>
                    <LoaderIcon className="animate-[spin_3s_linear_infinite]" />{" "}
                    {t("checkout.canceling")}
                  </>
                ) : (
                  t("checkout.cancel")
                )}
              </Button>
              <Button
                className="flex-2"
                type="submit"
                disabled={isLoading || isCancelLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="animate-[spin_3s_linear_infinite]" />{" "}
                    {t("checkout.loading")}
                  </>
                ) : (
                  t("checkout.pay")
                )}
              </Button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default CheckoutForm;
