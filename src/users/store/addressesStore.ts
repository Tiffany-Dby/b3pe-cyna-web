import { create } from "zustand";
import { Address, AddressesState } from "@/users/types/Address";
import { deleteRequest, getRequest } from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";
import { TOAST } from "@/shared/constants/toast";
import { toast } from "sonner";

const useAddressesStore = create<AddressesState>((set) => ({
  addresses: [],
  isLoading: false,
  error: null,

  getUserAddresses: async () => {
    set({ isLoading: true, error: null });

    const { result, error } = await getRequest<Address[]>(
      API_ROUTES.USER_ADDRESS_GET_ALL
    );

    set({
      isLoading: false,
      error,
      addresses: error ? [] : result,
    });
  },

  addUserAddress: (newAddress) =>
    set((state) => ({ addresses: [...state.addresses, newAddress] })),

  deleteUserAddress: async (selected, toastMsgs = TOAST.DEFAULT_MSGS) => {
    const { success, loading, error } = toastMsgs;

    set({ isLoading: true });

    const toastId = toast.loading(loading);
    const { error: reqError } = await deleteRequest(
      `${API_ROUTES.USER_ADDRESS_DELETE}/${selected.id}`
    );

    set({ isLoading: false });

    if (reqError) toast.error(error, { id: toastId });
    else toast.success(success, { id: toastId });

    set((state) => ({
      error: reqError,
      addresses: reqError
        ? state.addresses
        : state.addresses.filter((address) => address.id !== selected.id),
    }));
  },
}));

export { useAddressesStore };
