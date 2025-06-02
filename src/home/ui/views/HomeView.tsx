import { Link } from "react-router";
import imgBanner from "@/shared/assets/images/banner.svg";
import ProductCard from "@/products/ui/components/ProductCard";
import BaseCarousel from "@/shared/ui/components/BaseCarousel";
import { Separator } from "@/lib/components/ui/separator";
import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { Trans, useTranslation } from "react-i18next";
import useFetch from "@/shared/hooks/useFetch";
import { BestSeller, ProductLocale } from "@/products/types/Products";
import { ArrowRightIcon } from "lucide-react";
import { PromotionsText } from "@/home/types/PromotionsCarousel";
import Loader from "@/shared/ui/components/Loader";

const HomeView = () => {
  const { t, i18n } = useTranslation("home");
  const locale = i18n.resolvedLanguage;

  const {
    data: bestSeller,
    isLoading: isBestSellerLoading,
    error: bestSellerError,
  } = useFetch<BestSeller>(
    `${API_ROUTES.PRODUCT_GET_BEST_SELLER}?locale=${locale ?? "en"}`
  );

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
    `${API_ROUTES.PROMOTION_CAROUSEL_TEXT_GET_ALL}/${locale}`,
    false
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
          <div className="flex-between-center flex-col gap-12 md:flex-row">
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
      <>
        <section>
          <div className="container max-w-2xl mx-auto flex flex-col gap-5 py-10 px-4">
            <h2>{t("currentPromotions.title")}</h2>
            {(isLoading || isPromoTextLoading) && <Loader />}
            {error && <p className="text-danger">{error}</p>}
            {!!promos?.length && (
              <div className="flex-center-center mx-auto">
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
            )}
            <div>
              {promosTextError && (
                <p className="text-danger">{promosTextError}</p>
              )}
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
      <section>
        <div className="container max-w-2xl mx-auto flex flex-col gap-5 pt-10 pb-24 px-4 overflow-hidden">
          <h2>{t("topProduct.title")}</h2>
          {isBestSellerLoading && <Loader />}
          {bestSellerError && <p className="text-danger">{bestSellerError}</p>}
          {!bestSellerError && bestSeller && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-8 items-center">
                <article className="relative grid flex-[1_0] max-w-[35.5rem]">
                  <ProductCard bestSeller product={bestSeller.product} />
                </article>
              </div>
              <div>
                <Trans i18nKey={"home:topProduct.description"}>
                  <p />
                  <p>
                    <Link to={APP_ROUTES.PRODUCTS} className="underline" />
                  </p>
                </Trans>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeView;
