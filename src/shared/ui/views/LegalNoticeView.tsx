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

const LegalNoticeView = () => {
  const { t } = useTranslation("layout");
  return (
    <article>
      <div className="container mx-auto py-8 px-4 flex flex-col gap-12">
        <div>
          <h1>{t("legal.legalNotice.title")}</h1>
          <Breadcrumb className="pt-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={APP_ROUTES.HOME}>{t("header.navigation.home")}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("footer.legalNotice")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <p>{t("legal.legalNotice.disclaimer")}</p>

        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.companyLabel")}:
            </dt>
            <dd>{t("legal.legalNotice.company")}</dd>
          </div>
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.addressLabel")}:
            </dt>
            <dd>{t("legal.legalNotice.address")}</dd>
          </div>
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.siretLabel")}:
            </dt>
            <dd>{t("legal.legalNotice.siret")}</dd>
          </div>
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.publisherLabel")}:
            </dt>
            <dd>{t("legal.legalNotice.publisher")}</dd>
          </div>
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.hostingLabel")}:
            </dt>
            <dd>{t("legal.legalNotice.hosting")}</dd>
          </div>
          <div>
            <dt className="font-medium">
              {t("legal.legalNotice.contactLabel")}:
            </dt>
            <dd>
              <a href={`mailto:${t("legal.legalNotice.contact")}`}>
                {t("legal.legalNotice.contact")}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default LegalNoticeView;
