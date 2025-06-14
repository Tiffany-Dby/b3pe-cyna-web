import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Label } from "@/lib/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/lib/components/ui/radio-group";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useDialog } from "@/shared/hooks/useDialog";
import BaseCard from "@/shared/ui/components/BaseCard";
import { useAuth } from "@/users/context/AuthContext";
import { useAddressesStore } from "@/users/store/addressesStore";
import { Address, AddressType } from "@/users/types/Address";
import NewAddressDialog from "@/users/ui/components/NewAddressDialog";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

const AddressView = () => {
  const { t } = useTranslation("purchase");
  const navigate = useNavigate();
  const { addresses } = useAddressesStore();
  const {
    cart,
    updateCart,
    isLoading: isCartLoading,
    error: cartError,
  } = usePurchaseStore();
  const { dialog, open, close } = useDialog<Address | null>();
  const { user } = useAuth();

  const billingAddresses = addresses?.filter(
    (address) => address?.type === AddressType.billing
  );
  const shippingAddresses = addresses?.filter(
    (address) => address?.type === AddressType.shipping
  );

  const [useSame, setUseSame] = useState(true);

  const [billingId, setBillingId] = useState("");
  const [shippingId, setShippingId] = useState("");

  useEffect(() => {
    useSame
      ? setShippingId(billingId)
      : setShippingId(String(shippingAddresses[0]?.id ?? ""));
  }, [useSame, billingId]);

  useEffect(() => {
    if (!cart) return;

    if (cart.billingAddress?.id) {
      setBillingId(String(cart.billingAddress.id));
    } else if (billingAddresses[0]) {
      setBillingId(String(billingAddresses[0].id));
    }

    if (cart.shippingAddress?.id) {
      if (cart.shippingAddress.id !== cart.billingAddress?.id)
        setUseSame(false);
      setShippingId(String(cart.shippingAddress.id));
    } else if (shippingAddresses[0]) {
      setShippingId(String(shippingAddresses[0].id));
    }
  }, [cart, addresses]);

  const handleNext = async () => {
    if (!cart) return;

    if (
      cart.billingAddress?.id !== Number(billingId) ||
      cart.shippingAddress?.id !== Number(shippingId)
    )
      updateCart({
        orderId: cart.id,
        status: 0,
        shippingAddressId: Number(shippingId),
        billingAddressId: Number(billingId),
      });

    if (cartError) {
      console.log("error", cartError);
      return;
    }

    navigate(APP_ROUTES.PURCHASE_CHECKOUT);
  };

  return (
    <div className="flex flex-col gap-6 grow">
      <div className="h-20">
        <h1>{t("step")} 2/3</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={APP_ROUTES.PURCHASE_CART}>{t("breadcrumb.cart")}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("breadcrumb.address")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BaseCard
        title={<h2>{t("account:settings.address.caption")}</h2>}
        description={
          <div className="flex-between-center">
            <p>{t("address.description")}</p>
            <div className="flex justify-end">
              <Button onClick={() => open("create", null)}>
                <PlusIcon /> {t("account:settings.address.newAddress")}
              </Button>
            </div>
          </div>
        }
        content={
          <div className="grid gap-8">
            <article>
              <h3>{t("common:selects.addressType.options.billing")}</h3>
              {!!billingAddresses.length ? (
                <div className="grid gap-8">
                  <RadioGroup value={billingId} onValueChange={setBillingId}>
                    {billingAddresses.map((address) => (
                      <Label
                        key={`billing-${address.id}`}
                        htmlFor={`billing-${String(address.id)}`}
                        className="grid-cols-2 gap-4 cursor-pointer border rounded-md p-4"
                      >
                        <RadioGroupItem
                          className="self-start"
                          value={String(address.id)}
                          id={`billing-${String(address.id)}`}
                        />
                        <div>
                          <p>
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p>
                            {address.number} {address.street}
                          </p>
                          {address.complement && <p>{address.complement}</p>}
                          <p>
                            {address.zipCode} {address.city}
                          </p>
                          <p>{address.country}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                  <Label htmlFor="useSame" className="cursor-pointer">
                    <Checkbox
                      id="useSame"
                      checked={useSame}
                      onCheckedChange={(newChecked: boolean) =>
                        setUseSame(newChecked)
                      }
                    />
                    {t("address.useSame")}
                  </Label>
                </div>
              ) : (
                <p>{t("address.billingEmpty")}</p>
              )}
            </article>

            {!useSame && (
              <article>
                <h3>{t("common:selects.addressType.options.shipping")}</h3>
                {shippingAddresses.length ? (
                  <>
                    <RadioGroup
                      value={shippingId}
                      onValueChange={setShippingId}
                    >
                      {shippingAddresses.map((address) => (
                        <Label
                          key={`shipping-${address.id}`}
                          htmlFor={`shipping-${String(address.id)}`}
                          className="grid-cols-2 gap-4 cursor-pointer border rounded-md p-4"
                        >
                          <RadioGroupItem
                            className="self-start"
                            value={String(address.id)}
                            id={`shipping-${String(address.id)}`}
                          />
                          <div>
                            <p>
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p>
                              {address.number} {address.street}
                            </p>
                            {address.complement && <p>{address.complement}</p>}
                            <p>
                              {address.zipCode} {address.city}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </>
                ) : (
                  <p>{t("address.shippingEmpty")}</p>
                )}
              </article>
            )}

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => navigate(APP_ROUTES.PURCHASE_CART)}
              >
                {t("address.backToCart")}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!billingId || !shippingId || isCartLoading}
              >
                {t("address.nextStep")}
              </Button>
            </div>
          </div>
        }
      />

      {dialog.type === "create" && (
        <NewAddressDialog open={true} onOpenChange={close} />
      )}
    </div>
  );
};

export default AddressView;
