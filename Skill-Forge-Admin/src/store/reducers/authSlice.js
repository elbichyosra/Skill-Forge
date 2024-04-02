import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    token: null,
    userName: null,
    userId:null,

  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
   
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setLogin, setToken, setUserName,  setUserId} = authSlice.actions;

export default authSlice.reducer;
