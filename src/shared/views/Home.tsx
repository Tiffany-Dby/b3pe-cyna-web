import { Link } from "react-router";
import { AppRoutes } from "@/shared/types/Routes";
import imgBanner from "@/shared/assets/images/banner.svg";
import ProductCard from "@/products/ui/components/ProductCard";
import ProductCarousel from "@/products/ui/components/ProductCarousel";

const Home = () => {
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
            <ProductCarousel />
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
      <section>
        <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
          <h2>Produits</h2>
          <div className="flex flex-col justify-center gap-5 md:flex-row md:flex-wrap">
            <article className="flex-1 md:min-w-68">
              <ProductCard discount={false} />
            </article>
            <article className="flex-1 md:min-w-68">
              <ProductCard discount={true} />
            </article>
            <article className="flex-1 md:min-w-68 md:max-w-[calc((1/2*100%)-0.625rem)]">
              <ProductCard discount={false} />
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
