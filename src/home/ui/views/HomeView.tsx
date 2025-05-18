import { Link } from "react-router";
import imgBanner from "@/shared/assets/images/banner.svg";
import ProductCard from "@/products/ui/components/ProductCard";
import BaseCarousel from "@/shared/ui/components/BaseCarousel";
import { Separator } from "@/lib/components/ui/separator";
import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { Trans, useTranslation } from "react-i18next";
import useFetch from "@/shared/hooks/useFetch";
import { ProductLocale } from "@/products/types/Products";
import { ArrowRightIcon } from "lucide-react";
import { PromotionsText } from "@/home/types/PromotionsCarousel";

const HomeView = () => {
  const { t, i18n } = useTranslation("home");
  const locale = i18n.resolvedLanguage;

  const {
    data: productsLocale,
    isLoading,
    error,
  } = useFetch<ProductLocale[]>(
    `${API_ROUTES.PRODUCT_GET_ALL}/${locale ?? "en"}`,
    false
  );

  const {
    data: promosText,
    isLoading: isPromoTextLoading,
    error: promosTextError,
  } = useFetch<PromotionsText>(
    `${API_ROUTES.PROMOTION_CAROUSEL_TEXT_GET_ALL}/${locale}`
    // false TODO: update when correction is made backend
  );

  const promos = productsLocale
    ?.filter((product) => product.discountPercentage)
    .sort(
      (productA, productB) => productA.discountOrder - productB.discountOrder
    );

  return (
    <>
      <section className="flex flex-col justify-center min-h-[calc(100dvh-54px)] bg-linear-90 from-primary-150 to-primary text-primary-foreground">
        <div className="container mx-auto py-3 px-4 h-full">
          <div className="flex-between-center flex-col gap-8 md:flex-row">
            <div className="flex flex-col gap-6 md:w-1/2">
              <Trans i18nKey={"home:banner.title"}>
                <h1 className="leading-11">
                  <span className="bg-white px-1">
                    <span className="bg-linear-90 from-primary-150 to-primary bg-clip-text text-transparent font-black" />
                  </span>
                  <span className="underline"></span>
                </h1>
              </Trans>
              <Trans i18nKey={"home:banner.description"}>
                <p className="text-size-xl">
                  <strong className="text-secondary-75" />
                </p>
              </Trans>
              <div className="flex justify-end">
                <div>
                  <Link
                    to={APP_ROUTES.PRODUCTS}
                    className="block bg-info py-2 px-4 rounded-sm hover:bg-accent transition-colors duration-500"
                  >
                    {t("banner.cta")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={imgBanner}
                alt={t("banner.imgAlt")}
                className="w-full max-w-full h-full max-h-full object-cover drop-shadow-2xl shadow-primary-150"
              />
            </div>
          </div>
        </div>
      </section>
      {!!promos?.length && (
        <>
          <section>
            <div className="container max-w-3xl mx-auto flex flex-col gap-5 py-10 px-4">
              <h2>{t("currentPromotions.title")}</h2>
              <div className="flex-center-center max-w-2xl mx-auto">
                <BaseCarousel
                  slides={promos}
                  renderSlide={(product) => (
                    <Link
                      to={`${APP_ROUTES.PRODUCTS}/${product.id}`}
                      className="grid rounded-md transition-shadow duration-500 hover:ring-primary hover:ring-2"
                    >
                      <img
                        src={product.slides[0]}
                        alt={product.name}
                        className="rounded-md area-1/1"
                      />
                      <p className="flex-center-center gap-2 font-semibold area-1/1 place-self-end pb-5 pr-5 text-primary-150-foreground underline">
                        <ArrowRightIcon className="w-4 h-4" />
                        {t("common:learnMore")} : {product.name}
                      </p>
                    </Link>
                  )}
                />
              </div>
              <div>
                {isPromoTextLoading && <p>{t("loading")}</p>}
                {promosTextError && <p>{promosTextError}</p>}
                {promosText?.text?.split("\n").map((line, index) => (
                  <p key={index} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>
          <Separator className="max-w-3/6 m-auto my-4 bg-muted" />
        </>
      )}
      <section>
        <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
          {isLoading && <p>{t("loading")}</p>}
          {error && <p>{error}</p>}
          {!error && productsLocale && (
            <>
              <h2>{t("topProduct.title")}</h2>
              <div className="flex flex-col justify-center gap-5 sm:flex-row sm:flex-wrap">
                {productsLocale.map((product) => (
                  <article
                    key={product.id}
                    className="flex-[1_0] sm:min-w-68 sm:max-w-[calc((1/2*100%)-0.625rem)]"
                  >
                    <ProductCard product={product} />
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeView;
