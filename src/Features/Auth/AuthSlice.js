import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (currtState, action) => {
      currtState.user = action.payload.user;
      currtState.token = action.payload.token;
    },

    logout: (currState) => {
      currState.user = null;
      currState.token = null;
    },
    setLoading: (currState, action) => {
      currState.loading = action.payload;
    },
  },
});

export const { setUserDetails, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
