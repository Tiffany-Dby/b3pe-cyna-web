import { create } from "zustand";
import { AdminState } from "../types/Admin";
import { getRequest } from "@/shared/tools/api";
import { UserResponse } from "../types/SignIn";
import { API_ROUTES } from "@/shared/constants/routes";
import { UserRole } from "../types/UserRole";

const useAdminStore = create<AdminState>((set) => ({
  admins: [],
  clients: [],
  isLoading: false,
  error: null,

  getUsersByRole: async (role = UserRole.user) => {
    set({ isLoading: true });

    const { result, error } = await getRequest<UserResponse[]>(
      `${API_ROUTES.ADMIN_USERS}?role=${role}`
    );

    set({
      isLoading: false,
      error,
      [role === UserRole.user ? "clients" : "admins"]: result,
    });
  },
}));

export { useAdminStore };
