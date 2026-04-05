import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
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
    setError: (currState, action) => {
      currState.error = action.payload;
    },
  },
});

export const { setUserDetails, logout, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
