type PromotionsText = {
  locale: string;
  text: string;
};

type NewPromotionsText = PromotionsText;
type UpdatedPromotionsText = PromotionsText;

type PromotionsTextState = {
  promotionsTexts: PromotionsText[];
  isLoading: boolean;
  error: string | null;
  getPromotionsText: () => Promise<void>;
  addPromotionsText: (newText: NewPromotionsText) => void;
  updatePromotionsText: (updatedText: UpdatedPromotionsText) => void;
};

export type {
  PromotionsText,
  NewPromotionsText,
  PromotionsTextState,
  UpdatedPromotionsText,
};
