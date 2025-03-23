type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type SignInResponse = {
  access: string;
  refresh: string;
  user: UserResponse;
};

type SignInData = {
  email: string;
  password: string;
};

export type { SignInData, SignInResponse, UserResponse };
