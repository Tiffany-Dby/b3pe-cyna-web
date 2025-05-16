import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Link } from "react-router";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { useTranslation } from "react-i18next";
import { ProductLocale } from "@/products/types/Products";
import { APP_ROUTES } from "@/shared/constants/routes";
import PromotionTag from "@/shared/ui/components/PromotionTag";

type Props = {
  product: ProductLocale;
};

const ProductCard = ({ product }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`${APP_ROUTES.PRODUCTS}/${product.id}`}
      className="block hover:scale-105 transition-[scale] duration-500 h-full"
    >
      <Card className="pt-0 gap-4 relative h-full">
        <div className="bg-primary rounded-t-xl">
          <img
            src={product.slides[0]}
            alt=""
            className="w-full min-w-full h-full min-h-full object-cover max-h-56 rounded-t-xl"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex-between-center">
            <div>
              <h3>{product.name}</h3>
            </div>
            <ProductStatusBadge status={product.status} type={product.type} />
          </CardTitle>
          <CardDescription>
            <p>
              {t("category")}: {product.category.localeName}
            </p>
          </CardDescription>
          <div className="justify-self-end"></div>
        </CardHeader>
        <CardContent className="grow">
          <div className="flex flex-col gap-2">
            <p className="line-clamp-3 font-bold">
              {product.details.descriptionTitle}
            </p>
            <p className="line-clamp-2">{product.details.descriptionText}</p>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <p className="text-secondary">{t("learnMore")}</p>
        </CardFooter>
        {!!product.discountPercentage && <PromotionTag />}
      </Card>
    </Link>
  );
};
export default ProductCard;
