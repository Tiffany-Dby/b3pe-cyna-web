import NewPromotionsTextCard from "@/home/ui/components/NewPromotionsTextCard";
import PromotionsTextList from "@/home/ui/components/PromotionsTextList";
import { usePromotionsTextStore } from "@/home/store/promotionsTextsStore";
import { useEffect } from "react";

const AdminPromotionsCarouselView = () => {
  const { getPromotionsText } = usePromotionsTextStore();

  useEffect(() => {
    getPromotionsText();
  }, [getPromotionsText]);

  return (
    <div className="flex flex-wrap gap-4">
      <NewPromotionsTextCard />
      <PromotionsTextList />
    </div>
  );
};

export default AdminPromotionsCarouselView;
