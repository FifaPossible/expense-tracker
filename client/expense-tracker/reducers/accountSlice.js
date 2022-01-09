import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { serverUrl } from "../utils/variables";

const initialState = {};

export const fetchAccounts = createAsyncThunk(
   "accounts/accountsFetched",
   async (credentials) => {
      try {
         const res = await Axios.post(
            serverUrl + "/findAllAccount",
            credentials
         );
         if (res.data.status === "success") {
            return res.data.accounts;
         } else return { error: "An error occurred" };
      } catch (e) {
         console.log("Error while fetching accounts: ", e);
      }
   }
);

const accountSlice = createSlice({
   name: "accounts",
   initialState,
   reducers: {
      pushedToAccounts(state, action) {
         state.accounts.push(action.payload);
      },
      accountsUpdated(state, action) {
         state.accounts = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchAccounts.fulfilled, (state, action) => {
         state.accounts = action.payload;
      });
   },
});

export const { pushedToAccounts, accountsUpdated } = accountSlice.actions;
export default accountSlice.reducer;
