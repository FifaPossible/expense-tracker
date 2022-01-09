import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userReducer = createSlice({
   name: "user",
   initialState,
   reducers: {
      userLoggedIn(state, action) {
         state.user = action.payload;
      },
      userLoggedOut(state, action) {
         state.user = {};
      },
      userUpdated(state, action) {
         state.user = action.payload;
      },
   },
});

export const { userLoggedOut, userLoggedIn, userUpdated } = userReducer.actions;
export default userReducer.reducer;
