import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLogged: boolean | null;
  token: string | null;
  email: string | null;
  name: string | null;
  error: string | null;
}

const initialState: LoginState = {
  isLogged: false,
  token: null,
  email: null,
  name: null,
  error: null,
};

export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; email: string; name: string }>
    ) => {
      state.isLogged = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("email", state.email);
      sessionStorage.setItem("firstName", state.name);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLogged = null;
      state.token = null;
      state.email = null;
      state.name = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLogged = null;
      state.token = null;
      state.email = null;
      state.name = null;
      state.error = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("firstName");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
