import BaseCard from "@/shared/ui/components/BaseCard";
import UpdateProductForm from "@/products/ui/components/UpdateProductForm";
import { Fragment, useState } from "react";
import { useProductsStore } from "@/products/store/productsStore";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { Separator } from "@/lib/components/ui/separator";
import UpdateImageForm from "./UpdateImageForm";
import { Slot } from "@/products/types/Products";

const UpdateProductCard = () => {
  const { selected } = useProductsStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  // const { t } = useTranslation("products");

  return (
    <BaseCard
      title={<h2>{selected?.name}</h2>}
      description={<p>Mettez à jour les informations du produit</p>}
      content={
        <div className="">
          {selected && (
            <div className="@container flex flex-col gap-8">
              <section>
                <h3>Informations</h3>
                {serverError && <p className="text-danger">{serverError}</p>}
                <UpdateProductForm onError={setServerError} />
              </section>
              <section>
                <h3>Images</h3>
                {imageError && <p className="text-danger">{imageError}</p>}
                {selected.slides.map((slide, i) => (
                  <Fragment key={i}>
                    <div className="flex flex-col gap-2">
                      <p className="flex flex-wrap justify-between">
                        Image #{i + 1}{" "}
                        <Link
                          className="flex items-center gap-2 border border-muted-foreground w-fit px-2 py-0.5 rounded-md text-muted-foreground text-size-xs"
                          to={slide}
                          target="_blank"
                        >
                          Voir l'image actuelle{" "}
                          <SquareArrowOutUpRightIcon className="w-4 h-4" />
                        </Link>
                      </p>

                      <UpdateImageForm
                        productId={selected.id}
                        slot={(i + 1) as Slot}
                        onError={setImageError}
                      />
                    </div>
                    {i + 1 < selected.slides.length && (
                      <Separator className="my-6" />
                    )}
                  </Fragment>
                ))}
              </section>
            </div>
          )}
        </div>
      }
    />
  );
};

export default UpdateProductCard;
