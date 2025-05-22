import { create } from "zustand";
import {
  PromotionsText,
  PromotionsTextState,
} from "@/home/types/PromotionsCarousel";
import { getRequest } from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";

const usePromotionsTextStore = create<PromotionsTextState>((set) => ({
  promotionsTexts: [],
  isLoading: false,
  error: null,

  getPromotionsText: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<PromotionsText[]>(
      API_ROUTES.PROMOTION_CAROUSEL_TEXT_GET_ALL,
      false
    );

    set({ isLoading: false, error, promotionsTexts: error ? [] : result });
  },

  addPromotionsText: (newText) =>
    set((state) => ({
      promotionsTexts: [...state.promotionsTexts, newText],
    })),

  updatePromotionsText: (updatedText) =>
    set((state) => ({
      promotionsTexts: state.promotionsTexts.map((promotionText) =>
        promotionText.locale === updatedText.locale
          ? updatedText
          : promotionText
      ),
    })),
}));

export { usePromotionsTextStore };
