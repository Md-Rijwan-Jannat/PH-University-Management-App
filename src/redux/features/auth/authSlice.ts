import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "../../interface/authTypes";
import { RootState } from "../../store";

const initialState: IInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const userToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
