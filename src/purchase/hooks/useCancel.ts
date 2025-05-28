import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { postRequest } from "@/shared/tools/api";
import { useState } from "react";
import { useNavigate } from "react-router";

type Cancel = {
  intentId: string;
};

const useCancel = ({ intentId }: Cancel) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = async () => {
    setIsLoading(true);
    const { error } = await postRequest<
      { canceled: boolean },
      { intentId: string }
    >(API_ROUTES.PURCHASE_INTENT_CANCEL, { intentId });
    setIsLoading(false);

    if (error) {
      console.log("Cancel failed :", error);

      return;
    }

    navigate(APP_ROUTES.TO_CART);
  };

  return { onCancel, isLoading };
};

export default useCancel;
