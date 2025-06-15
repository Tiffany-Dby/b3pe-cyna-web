import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const TermsOfUseView = () => {
  const { t } = useTranslation("layout");
  const lastUpdated = new Date(2024, 4, 26).toLocaleDateString();

  return (
    <article>
      <div className="container mx-auto pt-10 pb-24 px-4 flex flex-col gap-12">
        <div>
          <h1>{t("legal.terms.title")}</h1>
          <p className="text-sm italic">
            {t("legal.terms.lastUpdated", {
              date: lastUpdated,
            })}
          </p>
          <Breadcrumb className="pt-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={APP_ROUTES.HOME}>{t("header.navigation.home")}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("footer.termsOfUse")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <p>{t("legal.terms.disclaimer")}</p>

        <div className="flex flex-col gap-4">
          <section>
            <p>{t("legal.terms.sections.preamble")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.definitions.heading")}</h2>
            <p>{t("legal.terms.sections.definitions.user")}</p>
            <p>{t("legal.terms.sections.definitions.account")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.access.heading")}</h2>
            <p>{t("legal.terms.sections.access.p1")}</p>
            <p>{t("legal.terms.sections.access.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.account.heading")}</h2>
            <p>{t("legal.terms.sections.account.p1")}</p>
            <p>{t("legal.terms.sections.account.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.obligations.heading")}</h2>
            <p>{t("legal.terms.sections.obligations.p1")}</p>
            <p>{t("legal.terms.sections.obligations.p2")}</p>
            <p>{t("legal.terms.sections.obligations.p3")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.intellectualProperty.heading")}</h2>
            <p>{t("legal.terms.sections.intellectualProperty.p1")}</p>
            <p>{t("legal.terms.sections.intellectualProperty.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.liability.heading")}</h2>
            <p>{t("legal.terms.sections.liability.p1")}</p>
            <p>{t("legal.terms.sections.liability.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.data.heading")}</h2>
            <p>{t("legal.terms.sections.data.p1")}</p>
            <p>{t("legal.terms.sections.data.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.cookies.heading")}</h2>
            <p>{t("legal.terms.sections.cookies.p1")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.modification.heading")}</h2>
            <p>{t("legal.terms.sections.modification.p1")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.duration.heading")}</h2>
            <p>{t("legal.terms.sections.duration.p1")}</p>
            <p>{t("legal.terms.sections.duration.p2")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.jurisdiction.heading")}</h2>
            <p>{t("legal.terms.sections.jurisdiction.p1")}</p>
          </section>

          <section>
            <h2>{t("legal.terms.sections.contact.heading")}</h2>
            <p>{t("legal.terms.sections.contact.p1")}</p>
            <p>{t("legal.terms.sections.contact.p2")}</p>
          </section>
        </div>
      </div>
    </article>
  );
};

export default TermsOfUseView;
