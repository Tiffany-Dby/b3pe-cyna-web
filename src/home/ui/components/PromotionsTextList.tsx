import BaseCard from "@/shared/ui/components/BaseCard";
import { useMemo } from "react";
import Columns from "@/home/ui/components/Columns";
import { useTranslation } from "react-i18next";
import DataTable from "@/shared/ui/components/DataTable";
import { usePromotionsTextStore } from "@/home/store/promotionsTextsStore";
import { useDialog } from "@/shared/hooks/useDialog";
import { PromotionsText } from "@/home/types/PromotionsCarousel";
import UpdatePromotionsTextDialog from "@/home/ui/components/UpdatePromotionsTextDialog";

const PromotionsTextList = () => {
  const { t } = useTranslation();
  const { promotionsTexts } = usePromotionsTextStore();

  const { dialog, open, close } = useDialog<PromotionsText>();

  const columns = useMemo(
    () => Columns((item) => open("update", item), t),
    [t]
  );

  return (
    <>
      <BaseCard
        className="w-full"
        title={<h2>{t("contents:promotionsTextList.title")}</h2>}
        description={<p>{t("contents:promotionsTextList.description")}</p>}
        content={<DataTable columns={columns} data={promotionsTexts} />}
      />

      {dialog.type === "update" && dialog.item && (
        <UpdatePromotionsTextDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}
    </>
  );
};

export default PromotionsTextList;
