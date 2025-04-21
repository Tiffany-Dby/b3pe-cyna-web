import { Button } from "@/lib/components/ui/button";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";

const NotFoundView = () => {
  const { t } = useTranslation("notFound");
  const navigate = useNavigate();

  return (
    <article>
      <Card className="w-full mx-auto my-10 max-w-100 text-center">
        <CardHeader className="py-6">
          <CardTitle>
            <h1 className="text-size-4xl">{t("title")}</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-size-2xl">{t("description")}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <Button onClick={() => navigate(APP_ROUTES.home)} variant="default">
            {t("cta")}
          </Button>
        </CardContent>
      </Card>
    </article>
  );
};

export default NotFoundView;
