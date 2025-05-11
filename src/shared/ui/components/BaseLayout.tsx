import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import { Link } from "react-router";
import NavigationMenu from "@/shared/ui/components/NavigationMenu";
import useScrollTrigger from "@/shared/hooks/useScrollTrigger";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  const { t } = useTranslation("layout");
  const scrolled = useScrollTrigger(50);

  return (
    <>
      <header
        className={`sticky z-20 grid top-0 w-full text-primary-foreground bg-linear-90 from-primary-150 to-primary transition-[box-shadow,colors] duration-500${
          scrolled
            ? " shadow-2xl dark:shadow-primary-foreground/10 bg-none bg-primary-150/90"
            : ""
        }`}
      >
        <div className="area-1/1 -z-10 backdrop-blur-md"></div>
        <div className="area-1/1 container mx-auto flex-between-center gap-2 py-3 px-4">
          <Link to={APP_ROUTES.HOME}>
            <img src={logoCyna} alt={t("header.logoAlt")} />
          </Link>
          <NavigationMenu />
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-primary-150 text-primary-150-foreground">
        <div className="container mx-auto py-3 px-4 flex-center-center">
          <p className="text-center text-size-label">
            &copy;{" "}
            <a href="https://github.com/Tiffany-Dby" target="_blank">
              Tiffany Dby
            </a>
            ,{" "}
            <a href="https://github.com/kant1-18" target="_blank">
              Quentin Str
            </a>
            ,{" "}
            <a href="https://github.com/matheo-dlvt" target="_blank">
              Mathéo Dlt
            </a>{" "}
            {new Date().getFullYear()} - {t("footer.rights")}
          </p>
        </div>
      </footer>
    </>
  );
};

export default BaseLayout;
