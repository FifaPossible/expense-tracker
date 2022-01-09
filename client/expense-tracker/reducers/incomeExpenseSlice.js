import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { serverUrl } from "../utils/variables";

const initialState = {};

export const fetchIncomeExpense = createAsyncThunk(
   "incomeExpense/incomeExpenseFetched",
   async () => {
      try {
         const res = await Axios.get(serverUrl + "/accountsArithmetics", {
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

const incomeExpenseSlice = createSlice({
   name: "incomeExpense",
   initialState,
   reducers: {
      incomeExpenseUpdated(state, action) {
         state.incomeExpense = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchIncomeExpense.fulfilled, (state, action) => {
         state.incomeExpense = action.payload;
      });
   },
});

export const { totalReturned, incomeExpenseUpdated } =
   incomeExpenseSlice.actions;
export default incomeExpenseSlice.reducer;
