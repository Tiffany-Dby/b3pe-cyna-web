import { APP_ROUTES } from "@/shared/constants/routes";
import { CornerUpLeftIcon } from "lucide-react";
import { Link } from "react-router";
import UpdateProductTranslationCard from "../components/UpdateProductTranslationCard";
import { useTranslation } from "react-i18next";

const AdminUpdateProductTranslationView = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 max-w-xl w-full mx-auto">
      <div className="w-fit hover:underline">
        <Link
          to={APP_ROUTES.ADMIN + "/" + APP_ROUTES.ADMIN_PRODUCTS}
          className="flex-center-center gap-2"
        >
          <CornerUpLeftIcon className="w-4 h-4" /> {t("backToProducts")}
        </Link>
      </div>
      <UpdateProductTranslationCard />
    </div>
  );
};

export default AdminUpdateProductTranslationView;
