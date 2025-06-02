import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import Loader from "@/shared/ui/components/Loader";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import HistoryList from "../components/HistoryList";
import useFetch from "@/shared/hooks/useFetch";
import { API_ROUTES } from "@/shared/constants/routes";
import { Payment } from "@/users/types/History";

const HistoryView = () => {
  const { t } = useTranslation();

  const {
    data: payments,
    isLoading,
    error,
  } = useFetch<Payment[]>(API_ROUTES.USER_HISTORY_GET_ALL);

  return (
    <section className="flex flex-col flex-1">
      <div className="container mx-auto pt-10 pb-24 px-4 h-full flex flex-1 flex-col gap-4">
        <div>
          <h1>{t("account:history.title")}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/account"}>
                  {t("layout:header.navigation.account.auth")}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {t("layout:header.navigation.account.history.title")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <HistoryList payments={payments ?? []} error={error} />
        )}
      </div>
    </section>
  );
};

export default HistoryView;
