import { Card } from "@/lib/components/ui/card";
import { useTranslation } from "react-i18next";
import CartItemCard from "@/purchase/ui/components/CartItemCard";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";

const CartView = () => {
  const { t } = useTranslation("purchase");
  const { getDisplayedCart } = usePurchaseStore();

  const displayedCart = getDisplayedCart();

  return (
    <div className="flex flex-col gap-6 grow">
      <div className="h-20">
        <h1>{t("cart.title")}</h1>
      </div>
      {!displayedCart?.length ? (
        <Card>
          <p className="px-6 text-center">{t("cart.empty")}</p>
        </Card>
      ) : (
        <>
          {displayedCart.map((item, index) => (
            <CartItemCard index={index} item={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default CartView;
