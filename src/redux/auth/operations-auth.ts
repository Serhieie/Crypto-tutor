import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsVerifyModalOpen } from "./slice-auth";
import { Dispatch } from "redux";
import {
  TokenData,
  AuthStateForOptions,
  CredentialsLogin,
  CredentialsRegistration,
} from "./redux-auth.type";
import {
  succesRegistrationMessage,
  failedRegistrationMessage,
  failedLogin,
  failedLoginVerification,
  failedChangePasswordEmail,
  failedChangePassword,
} from "../../helpers/notiflix";

axios.defaults.baseURL = "https://crypto-helper.onrender.com/api/";

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

interface UserData {
  id: number;
  name: string;
  // Інші поля про користувача
}

export interface email {
  email: string;
}

export const register = createAsyncThunk<
  any,
  CredentialsRegistration,
  {
    rejectValue: string;
    dispatch: Dispatch;
  }
>("auth/register", async (credentials, thunkApi) => {
  try {
    const { data }: AxiosResponse<TokenData> = await axios.post(
      "auth/register",
      credentials
    );
    succesRegistrationMessage();
    return data;
  } catch (error) {
    failedRegistrationMessage();
    return thunkApi.rejectWithValue("Bad Request");
  }
});

export const login = createAsyncThunk<
  TokenData,
  CredentialsLogin,
  {
    rejectValue: string;
    dispatch: Dispatch;
  }
>("users/login", async (credentials: CredentialsLogin, { rejectWithValue, dispatch }) => {
  try {
    const { data }: AxiosResponse<TokenData> = await axios.post(
      "auth/login",
      credentials
    );

    if (data.token) token.set(data?.token);

    return data;
  } catch (error: any) {
    if (error.response.data.message === "Email is not verifyed") {
      dispatch(setIsVerifyModalOpen(true));
      failedLoginVerification();
    } else {
      failedLogin();
    }

    return rejectWithValue("Not correct user");
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "users/logout",
  async (_, thunkApi) => {
    try {
      const { data }: AxiosResponse<void> = await axios.post("auth/logout");
      token.unset();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("No Token");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<UserData, void, { rejectValue: string }>(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as AuthStateForOptions;
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkApi.rejectWithValue("No valid token");
    }
    token.set(persistedToken);
    try {
      const { data }: AxiosResponse<UserData> = await axios.get("auth/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("error");
    }
  }
);

export const resentEmailVerify = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/resent", async (credentials: { email: string }, thunkApi) => {
  try {
    await axios.post("auth/verify", credentials);
  } catch (error) {
    return thunkApi.rejectWithValue("error");
  }
});

export const changePasswordRequest = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/changeRequest", async (credentials: { email: string }, thunkApi) => {
  try {
    await axios.post("auth/verify/changePassword", credentials);
  } catch (error) {
    failedChangePasswordEmail();
    return thunkApi.rejectWithValue("error");
  }
});
export const changePassword = createAsyncThunk<
  void,
  { password: string; changePasswordCode: string }, // Додайте changePasswordCode до типів аргументів
  { rejectValue: string }
>(
  "auth/changePassword",
  async (credentials: { password: string; changePasswordCode: string }, thunkApi) => {
    try {
      await axios.post(`auth/verify/changePassword/${credentials.changePasswordCode}`, {
        password: credentials.password,
      });
    } catch (error) {
      failedChangePassword();
      return thunkApi.rejectWithValue("error");
    }
  }
);
