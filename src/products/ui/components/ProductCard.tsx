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
import { CrownIcon } from "lucide-react";

type Props = {
  product: ProductLocale;
  bestSeller?: boolean;
};

const ProductCard = ({ product, bestSeller }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`${APP_ROUTES.PRODUCTS}/${product.id}`}
      className="grid hover:scale-105 transition-[scale] duration-500 h-full"
    >
      <Card className="pt-0 gap-4 relative h-full area-1/1">
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
      {bestSeller && (
        <span className="w-[60px] py-2.5 absolute -top-1.5 left-10 rounded-tl-[3px] bg-warning before:absolute after:absolute before:border-8 after:border-30 before:h-0 before:w-0 before:-z-1 before:-right-[8px] before:-top-[8px] before:border-b-[#8d5a20] before:border-t-transparent before:border-l-transparent before:border-r-transparent after:h-0 after:w-0 after:-bottom-[29.5px] after:left-0 after:border-l-warning after:border-r-warning after:border-b-transparent after:border-t-transparent shadow-black/50 shadow-xl">
          <span className="flex flex-col items-center gap-0.5 py-2 text-primary-150 font-bold">
            <CrownIcon className="h-5 w-5" /> # 1
          </span>
        </span>
      )}
    </Link>
  );
};
export default ProductCard;
