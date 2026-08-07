import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  profile: null,
  loading: false,
  error: null,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (currtState, action) => {
      currtState.user = action.payload.user;
      currtState.token = action.payload.token;
    },

    setLawyerProfile: (currtState, action) => {
      currtState.profile = action.payload;
    },

    logout: (currState) => {
      currState.user = null;
      currState.token = null;
      currState.profile = null;
    },
    setInitialized: (currState) => {
      currState.isInitialized = true;
    },
    setLoading: (currState, action) => {
      currState.loading = action.payload;
    },
    setError: (currState, action) => {
      currState.error = action.payload;
    },
  },
});

export const {
  setUserDetails,
  setLawyerProfile,
  logout,
  setLoading,
  setError,
  setInitialized,
} = authSlice.actions;
export default authSlice.reducer;
