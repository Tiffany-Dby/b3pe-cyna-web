import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import imgBanner from "@/shared/assets/images/banner.svg";
import { Link } from "react-router";
import ProductStatusBadge from "@/products/ui/components/ProductStatusBadge";
import { ProductStatus } from "@/products/types/ProductStatus";
import { ProductType } from "@/products/types/ProductType";

type ProductCardProps = {
  discount: boolean;
  status: ProductStatus;
  type: ProductType;
};

const ProductCard = ({ discount, status, type }: ProductCardProps) => {
  return (
    <Link
      to={"/product"}
      className="block hover:scale-105 transition-[scale] duration-500"
    >
      <Card className="pt-0 gap-4 relative">
        <div className="bg-primary p-4 rounded-t-xl">
          <img
            src={imgBanner}
            alt=""
            className="w-full min-w-full h-full min-h-full object-contain max-h-56"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex-between-center">
            <div>
              <h3>XDR</h3>
            </div>
            <ProductStatusBadge status={status} type={type} />
          </CardTitle>
          <CardDescription>
            <p>Catégorie: XDR</p>
          </CardDescription>
          <div className="justify-self-end"></div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aliquam libero voluptatum nostrum sunt veniam laborum soluta?
            Impedit sunt officia corrupti omnis eos dolorem ullam? Consequatur
            adipisci odit culpa laborum, quidem nesciunt nostrum doloribus
            excepturi, dolores quos soluta distinctio aliquam tempore enim
            dolore ea quod iure consectetur minus ab placeat!
          </p>
        </CardContent>
        <CardFooter className="justify-end">
          <p className="text-secondary">En savoir plus</p>
        </CardFooter>
        {discount && (
          <div className="w-[150px] h-[150px] overflow-hidden absolute -top-2.5 -right-2.5 before:absolute after:absolute before:-z-[1] after:-z-[1] before:block after:block before:border-[5px] after:border-[5px] before:border-accent after:border-accent before:border-t-transparent after:border-t-transparent before:border-r-transparent after:border-r-transparent before:left-0 before:top-0 after:right-0 after:bottom-0">
            <span className="absolute block w-[225px] py-[15px] bg-accent shadow-lg text-accent-foreground uppercase text-center -left-[25px] top-[30px] rotate-45 font-bold leading-[18px] pl-3">
              promotion
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
};
export default ProductCard;
