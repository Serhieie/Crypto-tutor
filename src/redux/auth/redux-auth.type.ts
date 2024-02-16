//main interface
export interface ServerUserData {
  name: string;
  email: string;
}
export interface AuthState {
  user: { name: string; email: string };
  token: string | null;
  isLoggedIn: boolean;
  isLoadingUser: boolean;
  avatar: string;
  error: boolean;
  isVerifyModalOpen: boolean;
  changingPass: boolean;
  resended: boolean;
}

//operations-auth
export interface AuthStateForOptions {
  auth: AuthState;
}
type UserData = {
  email: string;
  subscription: string;
};

export type TokenData = {
  user?: UserData;
  token?: string;
  message?: string;
};

export type TokenDataReject = {
  message: string;
  token: string;
};

export interface Credentials {
  username: string;
  password: string;
}

export interface CredentialsLogin {
  email: string;
  password: string;
}

export interface CredentialsRegistration {
  name: string;
  email: string;
  password: string;
}

export interface CredentialsResentVerify {
  email: string;
}
