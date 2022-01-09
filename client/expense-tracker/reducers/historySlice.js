import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { serverUrl } from "../utils/variables";

const initialState = {};

export const fetchHistory = createAsyncThunk(
   "history/historyFetched",
   async () => {
      try {
         const res = await Axios.get(serverUrl + "/historyArithmetics", {
            timeout: 8000,
         });
         if (res.status === 200) {
            return res.data;
         } else return { error: "An error occurred" };
      } catch (e) {
         console.log("Error while fetching accounts: ", e);
      }
   }
);

const historySlice = createSlice({
   name: "history",
   initialState,
   reducers: {
      historyUpdated(state, action) {
         state.history = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchHistory.fulfilled, (state, action) => {
         state.history = action.payload;
      });
   },
});

export const { historyUpdated } = historySlice.actions;
export default historySlice.reducer;
