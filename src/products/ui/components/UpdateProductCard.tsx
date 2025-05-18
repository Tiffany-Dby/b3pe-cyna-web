import BaseCard from "@/shared/ui/components/BaseCard";
import UpdateProductForm from "@/products/ui/components/UpdateProductForm";
import { Fragment, useState } from "react";
import { useProductsStore } from "@/products/store/productsStore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { Separator } from "@/lib/components/ui/separator";
import UpdateImageForm from "@/products/ui/components/UpdateImageForm";
import { Slot } from "@/products/types/Products";

const UpdateProductCard = () => {
  const { selected } = useProductsStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { t } = useTranslation("products");

  return (
    <BaseCard
      title={<h2>{selected?.name}</h2>}
      description={<p>{t("updateProduct.description")}</p>}
      content={
        <div className="">
          {selected && (
            <div className="@container flex flex-col gap-8">
              <section>
                <h3>{t("updateProduct.formBaseInfos.title")}</h3>
                {serverError && <p className="text-danger">{serverError}</p>}
                <UpdateProductForm onError={setServerError} />
              </section>
              <Separator className="my-6" />
              <section>
                <h3>{t("updateProduct.formImage.title")}</h3>
                {imageError && <p className="text-danger">{imageError}</p>}
                <div className="flex flex-col gap-24">
                  {selected.slides.map((slide, i) => (
                    <Fragment key={i}>
                      <div className="flex flex-col gap-2">
                        <p className="flex flex-wrap justify-between">
                          {t("updateProduct.formImage.subTitle")}
                          {i + 1}{" "}
                          <Link
                            className="flex items-center gap-2 border border-muted-foreground w-fit px-2 py-0.5 rounded-md text-muted-foreground text-size-xs"
                            to={slide}
                            target="_blank"
                          >
                            {t("updateProduct.formImage.seeCurrentImage")}{" "}
                            <SquareArrowOutUpRightIcon className="w-4 h-4" />
                          </Link>
                        </p>

                        <UpdateImageForm
                          productId={selected.id}
                          slot={(i + 1) as Slot}
                          onError={setImageError}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      }
    />
  );
};

export default UpdateProductCard;
