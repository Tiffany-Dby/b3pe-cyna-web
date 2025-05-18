import { ToastMsgs } from "@/shared/types/Toast";

type Address = {
  id: number;
  type: number;
  street: string;
  number: string;
  complement: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
};

type AddressesState = {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  getUserAddresses: () => Promise<void>;
  addUserAddress: (newAddress: Address) => void;
  deleteUserAddress: (selected: Address, toastMsgs: ToastMsgs) => Promise<void>;
};

export type { Address, AddressesState };
