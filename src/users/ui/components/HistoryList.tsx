import BaseCard from "@/shared/ui/components/BaseCard";
import DataTable from "@/shared/ui/components/DataTable";
import { useMemo } from "react";
import HistoryColumns from "./HistoryColumns";
import { useTranslation } from "react-i18next";
import { Payment } from "@/users/types/History";

type Props = {
  payments: Payment[];
  error: string | null;
};

const HistoryList = ({ payments, error }: Props) => {
  const { t, i18n } = useTranslation("account");

  const columns = useMemo(() => HistoryColumns(t, i18n), []);

  return (
    <BaseCard
      className="w-full"
      title={<h2>{t("history.subTitle")}</h2>}
      description={
        <>
          <p>{t("history.description")}</p>
          {error && <p className="text-danger">{error}</p>}
        </>
      }
      content={<DataTable columns={columns} data={payments} />}
    />
  );
};

export default HistoryList;
