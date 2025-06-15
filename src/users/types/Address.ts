import { ToastMsgs } from "@/shared/types/Toast";

enum AddressType {
  billing = 0,
  shipping = 1,
}

type Address = {
  id: number;
  type: AddressType;
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
export { AddressType };
