import { Link } from "react-router";
import { AppRoutes } from "@/shared/types/Routes";
import imgBanner from "@/shared/assets/images/banner.svg";
import ProductCard from "@/products/ui/components/ProductCard";
import BaseCarousel from "@/shared/ui/components/BaseCarousel";
import { Separator } from "@/lib/components/ui/separator";

const HomeView = () => {
  return (
    <>
      <section className="flex flex-col justify-center min-h-[calc(100dvh-54px)] bg-linear-90 from-primary-150 to-primary text-primary-foreground">
        <div className="container mx-auto py-3 px-4 h-full">
          <div className="flex-between-center flex-col gap-8 md:flex-row">
            <div className="flex flex-col gap-6 md:w-1/2">
              <h1 className="leading-11">
                Votre{" "}
                <span className="bg-white px-1">
                  <span className="bg-linear-90 from-primary-150 to-primary bg-clip-text text-transparent font-black">
                    sécurité
                  </span>
                </span>{" "}
                est notre <span className="underline">métier</span>
              </h1>
              <p className="text-size-xl">
                Une{" "}
                <strong className="text-secondary-75">protection 360°</strong>{" "}
                pour vos projets et votre sérénité.
              </p>
              <div className="flex justify-end">
                <div>
                  <Link
                    to={AppRoutes.home}
                    className="block bg-info py-2 px-4 rounded-sm hover:bg-accent transition-colors duration-500"
                  >
                    Je découvre les produits
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={imgBanner}
                alt="Bannière cybersécurité"
                className="w-full max-w-full h-full max-h-full object-cover drop-shadow-2xl shadow-primary-150"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
          <h2>Promotions du moment !</h2>
          <div className="flex-center-center">
            <BaseCarousel
              slides={[imgBanner, imgBanner, imgBanner]}
              renderSlide={(url) => <img src={url} alt="" />}
            />
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            dolores earum dolor ex minus dolorem expedita voluptatum
            voluptatibus sequi praesentium ut, ea esse cupiditate ratione?
            Officia ipsa quae ullam maiores, veritatis error repudiandae, iste
            aliquid facere velit, iusto voluptatem deleniti porro dolorem dicta
            consequatur ipsam culpa in iure explicabo. Non.
          </p>
        </div>
      </section>
      <Separator className="max-w-3/6 m-auto my-4 bg-muted" />
      <section>
        <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
          <h2>Produits</h2>
          <div className="flex flex-col justify-center gap-5 sm:flex-row sm:flex-wrap">
            <article className="flex-1 sm:min-w-68">
              <ProductCard discount={false} status={0} type={0} />
            </article>
            <article className="flex-1 sm:min-w-68">
              <ProductCard discount={true} status={1} type={0} />
            </article>
            <article className="flex-1 sm:min-w-68 sm:max-w-[calc((1/2*100%)-0.625rem)]">
              <ProductCard discount={false} status={2} type={0} />
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
