import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";

type AppRoutes = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
type ApiRoutes = (typeof API_ROUTES)[keyof typeof API_ROUTES];

export type { AppRoutes, ApiRoutes };
