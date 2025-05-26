import { APP_ROUTES } from "@/shared/constants/routes";
import BaseCard from "@/shared/ui/components/BaseCard";
import { CheckCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const SuccessView = () => {
  const { t } = useTranslation("purchase");

  return (
    <div className="container mx-auto py-3 px-4 flex flex-col flex-1">
      <article className="flex flex-col flex-1 justify-center items-center h-full">
        <BaseCard
          className="w-full max-w-2xl bg-success/5 dark:shadow-success/10 shadow-success/20"
          title={<h1>{t("success.title")}</h1>}
          description={
            <p className="flex gap-4 pt-4 text-foreground">
              <CheckCircleIcon className="text-success" />{" "}
              {t("success.description")}
            </p>
          }
          content={
            <div className="flex flex-col gap-4">
              <div>
                <p>{t("success.orderSummary")}</p>
                <p>(Infos)</p>
              </div>
              <div className="flex-center-center gap-4">
                <div className="button !bg-transparent rounded-md w-fit hover:!bg-success/20 transition-colors duration-500">
                  <Link
                    className="border border-foreground rounded-md py-1 px-2.5"
                    to={APP_ROUTES.HOME}
                  >
                    {t("success.backToHome")}
                  </Link>
                </div>
                <div className="button !bg-success rounded-md w-fit hover:!bg-success/80 transition-colors duration-500">
                  <Link
                    className="border border-transparent rounded-md py-1 px-2.5 text-success-foreground"
                    to={APP_ROUTES.ACCOUNT_SUBSCRIPTIONS}
                  >
                    {t("success.manageSubscriptions")}
                  </Link>
                </div>
              </div>
            </div>
          }
        />
      </article>
    </div>
  );
};

export default SuccessView;
