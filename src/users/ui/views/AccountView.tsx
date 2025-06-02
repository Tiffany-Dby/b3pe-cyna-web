import { Card } from "@/lib/components/ui/card";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/users/context/AuthContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const AccountView = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <section>
      <div className="container mx-auto pt-10 pb-24 px-4 h-full flex flex-col gap-4">
        <div>
          <h1>{t("layout:header.navigation.account.auth")}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-0 text-center">
            <Link className="p-6" to={APP_ROUTES.ACCOUNT_SETTINGS}>
              {t("layout:header.navigation.account.settings.title")}
            </Link>
          </Card>
          <Card className="p-0 text-center">
            <Link className="p-6" to={APP_ROUTES.ACCOUNT_SUBSCRIPTIONS}>
              {t("layout:header.navigation.account.subscriptions.title")}
            </Link>
          </Card>
          <Card className="p-0 text-center">
            <Link className="p-6" to={APP_ROUTES.ACCOUNT_HISTORY}>
              {t("layout:header.navigation.account.history.title")}
            </Link>
          </Card>
          {isAdmin && (
            <Card className="p-0 text-center">
              <Link className="p-6" to={APP_ROUTES.ADMIN}>
                {t("layout:header.navigation.account.admin.title")}
              </Link>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountView;
