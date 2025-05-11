import { API_ROUTES } from "@/shared/constants/routes";
import { FetchMethod } from "@/shared/types/Api";

let access: string | null = null;

const getAccessToken = (): string | null => access;

const setAccessToken = (token: string) => (access = token);

const clearAccessToken = () => (access = null);

const refresh = async (): Promise<string | null> => {
  const response = await fetch(API_ROUTES.URL + API_ROUTES.REFRESH, {
    method: FetchMethod.POST,
    credentials: "include",
  });

  if (!response.ok) return null;
  const { access } = await response.json();

  setAccessToken(access);

  return access;
};

const signOut = async (): Promise<void> => {
  try {
    await fetch(API_ROUTES.URL + API_ROUTES.SIGN_OUT, {
      method: FetchMethod.POST,
      credentials: "include",
    });
  } catch (err) {
    console.log(err);
  }
};

export { getAccessToken, setAccessToken, clearAccessToken, refresh, signOut };
