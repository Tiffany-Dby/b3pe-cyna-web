import { useTranslation } from "react-i18next";

const PromotionTag = () => {
  const { t } = useTranslation();

  return (
    <div className="w-[150px] h-[150px] overflow-hidden absolute -top-2.5 -right-2.5 before:absolute after:absolute before:-z-[1] after:-z-[1] before:block after:block before:border-[5px] after:border-[5px] before:border-accent after:border-accent before:border-t-transparent after:border-t-transparent before:border-r-transparent after:border-r-transparent before:left-0 before:top-0 after:right-0 after:bottom-0">
      <span className="absolute block w-[225px] py-[15px] bg-accent shadow-lg text-accent-foreground uppercase text-center -left-[25px] top-[30px] rotate-45 font-black text-size-l leading-[18px] pl-3">
        {t("products:promotion")}
      </span>
    </div>
  );
};

export default PromotionTag;
