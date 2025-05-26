import logoCyna from "@/shared/assets/images/logo-cyna.svg";
import { Link } from "react-router";
import NavigationMenu from "@/shared/ui/components/NavigationMenu";
import useScrollTrigger from "@/shared/hooks/useScrollTrigger";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";

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
      <footer className="bg-primary-150 text-primary-150-foreground py-8">
        <div className="md:flex flex-col gap-12">
          <div className="container mx-auto px-4 flex justify-center gap-8">
            <div className="md:flex flex-wrap justify-center gap-8 hidden">
              <div className="flex flex-col gap-4">
                <Link to={APP_ROUTES.HOME} className="col-start-1 row-start-1">
                  <img src={logoCyna} alt={t("header.logoAlt")} />
                </Link>
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Linkedin link"
                      >
                        <FaLinkedinIn className="h-8 w-8 bg-white text-primary-150 p-0.5 rounded-sm" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook link"
                      >
                        <FaFacebookF className="h-8 w-8 bg-white text-primary-150 p-0.5 rounded-sm" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter link"
                      >
                        <FaXTwitter className="h-8 w-8 bg-white text-primary-150 p-0.5 rounded-sm" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <nav>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link to={"#"}>Contact</Link>
                  </li>
                  <li>
                    <Link to={APP_ROUTES.LEGAL_NOTICE}>
                      {t("footer.legalNotice")}
                    </Link>
                  </li>
                  <li>
                    <Link to={APP_ROUTES.LEGAL_TERMS_OF_USE}>
                      {t("footer.termsOfUse")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="container mx-auto px-4 flex-center-center">
            <p className="text-center text-muted-foreground text-size-label">
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
        </div>
      </footer>
    </>
  );
};

export default BaseLayout;
