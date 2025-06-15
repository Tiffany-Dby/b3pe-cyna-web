import { create } from "zustand";
import { SubscriptionsState, Subscription } from "@/users/types/Subscriptions";
import { getRequest, patchRequest, postRequest } from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";
import { TOAST } from "@/shared/constants/toast";
import { toast } from "sonner";

const useSubscriptionsStore = create<SubscriptionsState>((set) => ({
  subscriptions: [],
  isLoading: false,
  isCancelLoading: false,
  error: null,

  getSubscriptions: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<Subscription[]>(
      API_ROUTES.USER_SUBSCRIPTIONS_GET_ALL
    );

    set({
      isLoading: false,
      error,
      subscriptions: error ? [] : result,
    });
  },

  updateStatus: async (id, status) => {
    set({ isLoading: true });

    const { result, error } = await patchRequest<
      Subscription[],
      { id: number; status: number }
    >(API_ROUTES.USER_SUBSCRIPTIONS_UPDATE_STATUS, { id, status });

    set((state) => ({
      isLoading: false,
      error,
      subscriptions: error ? state.subscriptions : result,
    }));
  },

  cancelSubscription: async (selected, toastMsgs = TOAST.DEFAULT_MSGS) => {
    const { success, loading, error } = toastMsgs;

    set({ isCancelLoading: true });

    const toastId = toast.loading(loading);
    const { result, error: reqError } = await postRequest<
      Subscription[],
      { subscriptionId: number; subscriptionItemStripeId: string }
    >(API_ROUTES.USER_SUBSCRIPTIONS_CANCEL, {
      subscriptionId: selected.subscriptionId,
      subscriptionItemStripeId: selected.stripeItemId,
    });

    set({ isCancelLoading: false });

    if (reqError) toast.error(error, { id: toastId });
    else toast.success(success, { id: toastId });

    set((state) => ({
      error: reqError,
      subscriptions: reqError ? state.subscriptions : result,
    }));
  },
}));

export { useSubscriptionsStore };
