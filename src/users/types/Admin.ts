import { UserResponse } from "./SignIn";

type AdminState = {
  admins: UserResponse[];
  clients: UserResponse[];
  isLoading: boolean;
  error: string | null;
  getUsersByRole: (role?: number) => Promise<void>;
};

export type { AdminState };
