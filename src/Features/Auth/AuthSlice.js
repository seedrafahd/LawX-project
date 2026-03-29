import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (currtState, action) => {
      currtState.user = action.payload.user;
      currtState.token = action.payload.token;
      console.log(currtState.token);
    },

    logout: (currState) => {
      currState.user = null;
      currState.token = null;
    },
  },
});

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;
