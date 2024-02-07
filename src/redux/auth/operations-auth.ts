import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
} from "../../helpers/notiflix";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

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

export const register = createAsyncThunk<
  any,
  CredentialsRegistration,
  {
    rejectValue: string;
  }
>("auth/register", async (credentials, thunkApi) => {
  try {
    const { data }: AxiosResponse<TokenData> = await axios.post(
      "users/signup",
      credentials
    );
    token.set(data.token);
    succesRegistrationMessage();
    return data;
  } catch (error) {
    failedRegistrationMessage();
    return thunkApi.rejectWithValue("Bad Request");
  }
});

export const login = createAsyncThunk<
  any,
  CredentialsLogin,
  {
    rejectValue: string;
  }
>("users/login", async (credentials: CredentialsLogin, { rejectWithValue }) => {
  try {
    const { data }: AxiosResponse<TokenData> = await axios.post(
      "users/login",
      credentials
    );
    token.set(data.token);
    console.log(111);
    return data;
  } catch (error) {
    failedLogin();
    return rejectWithValue("Not correct user");
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "users/logout",
  async (_, thunkApi) => {
    try {
      const { data }: AxiosResponse<void> = await axios.post("users/logout");
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
      const { data }: AxiosResponse<UserData> = await axios.get("users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("error");
    }
  }
);
