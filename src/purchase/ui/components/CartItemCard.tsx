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
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { usePurchaseStore } from "@/purchase/store/purchaseStore";
import { CartItem } from "@/purchase/types/Purchase";
import { formatAmount } from "@/shared/utils/number";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  item: CartItem;
  index: number;
};

const CartItemCard = ({ item, index }: Props) => {
  const { t, i18n } = useTranslation("cart");
  const { updateCartItem, removeCartItem } = usePurchaseStore();

  const product = item.product;
  const quantity = item.quantity;

  const increment = () => updateCartItem(product.id, quantity + 1);
  const decrement = () =>
    quantity > 1
      ? updateCartItem(product.id, quantity - 1)
      : removeCartItem(item.id);

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    value <= 0 ? () => {} : updateCartItem(product.id, value);
  };

  return (
    <article className={`md:col-1 md:row-${index + 1}`}>
      <Card className="py-4">
        <div className="grid grid-cols-[minmax(0px,120px)_1fr] grid-rows-[auto_auto] gap-3 px-4">
          <div className="sm:row-span-full sm:col-1">
            <div className="aspect-square sm:max-w-30 bg-primary rounded-lg">
              <img
                src={product.slides[0]}
                alt=""
                className="w-full max-w-full h-full max-h-full object-center object-cover rounded-lg"
              />
            </div>
          </div>
          <CardHeader className="w-full p-0 sm:col-2 sm:row-1">
            <CardTitle className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <h2>{product.name}</h2>
                <div className="relative flex flex-col sm:items-end">
                  <p className="text-size-2xl">
                    {formatAmount((product.price / 100) * quantity, {
                      locale: i18n.resolvedLanguage,
                      currency: "EUR",
                    })}
                  </p>
                  {!!product.discountPercentage && (
                    <p className="absolute top-full line-through text-size-s text-muted-foreground">
                      {formatAmount((product.basePrice / 100) * quantity, {
                        locale: i18n.resolvedLanguage,
                        currency: "EUR",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </CardTitle>
            <CardDescription className="flex-between-center">
              <ProductStatusBadge status={product.status} type={product.type} />
            </CardDescription>
          </CardHeader>
          <CardContent className="row-2 col-span-full px-0 sm:col-2 sm:flex sm:grow sm:w-full">
            <div className="flex gap-1 w-full justify-between">
              <div className="flex flex-col w-1/2 justify-end gap-1">
                <Label>{t("common:selects.subType.label")}</Label>
                <Select>
                  <SelectTrigger className="w-full border-primary/40">
                    <SelectValue
                      placeholder={t("common:selects.subType.placeholder")}
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
                    onClick={decrement}
                  >
                    {quantity > 1 ? <MinusIcon /> : <Trash2Icon />}
                  </Button>
                  <Input
                    type="number"
                    className="px-0 text-center max-h-8 rounded-none max-w-8 border-primary text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={quantity}
                    onChange={onQuantityChange}
                  />
                  <Button
                    className="w-8 h-8 p-0 rounded-tl-none rounded-bl-none"
                    onClick={increment}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </article>
  );
};

export default CartItemCard;
