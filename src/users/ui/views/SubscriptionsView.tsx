import { useSubscriptionsStore } from "@/users/store/subscriptionsStore";
import { Fragment, useEffect } from "react";
import SubscriptionCard from "@/users/ui/components/SubscriptionCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Loader from "@/shared/ui/components/Loader";

const SubscriptionsView = () => {
  const { t } = useTranslation();
  const { subscriptions, getSubscriptions, isLoading } =
    useSubscriptionsStore();

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  return (
    <section className="flex flex-col flex-1">
      <div className="container mx-auto pt-10 pb-24 px-4 h-full flex flex-1 flex-col gap-4">
        <div>
          <h1>{t("account:subscriptions.title")}</h1>
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
                  {t("layout:header.navigation.account.subscriptions.title")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {isLoading && <Loader />}
        {!isLoading && !!subscriptions.length && (
          <div className="grid md:grid-cols-2 gap-4">
            {subscriptions.map((subscription) => (
              <Fragment key={subscription.id}>
                {subscription.items.map((item) => (
                  <SubscriptionCard
                    key={item.id}
                    subscriptionItem={item}
                    status={subscription.status}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        )}
        {!subscriptions.some((subscription) => subscription.items.length) && (
          <p>{t("account:subscriptions.noSubscription")}</p>
        )}
      </div>
    </section>
  );
};

export default SubscriptionsView;
