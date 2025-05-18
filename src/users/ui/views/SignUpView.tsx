import { Separator } from "@/lib/components/ui/separator";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import SignUpForm from "@/users/ui/components/SignUpForm";
import BaseCard from "@/shared/ui/components/BaseCard";

const SignUpView = () => {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <div className="max-w-xl w-full mx-auto py-5 px-4">
      <BaseCard
        title={<h1>{t("signUp:title")}</h1>}
        description={
          <>{serverError && <p className="text-danger">{serverError}</p>}</>
        }
        content={<SignUpForm onError={setServerError} />}
        footer={
          <div className="flex flex-col gap-5 w-full">
            <Separator className="max-w-5/6 mx-auto my-2" />
            <div className="flex flex-col gap-1">
              <p>{t("signUp:signedUp")}</p>
              <div className="text-center">
                <Link
                  to={APP_ROUTES.SIGN_IN}
                  className="flex-center-center w-full h-9 border border-primary text-primary text-size-n font-medium bg-background py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 rounded-md dark:text-primary-foreground dark:border-primary-foreground dark:hover:border-transparent"
                >
                  {t("signUp:signIn")}
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SignUpView;
