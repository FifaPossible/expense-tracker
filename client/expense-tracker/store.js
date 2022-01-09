import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import accountSlice from "./reducers/accountSlice";
import incomeExpenseSlice from "./reducers/incomeExpenseSlice";
import historySlice from "./reducers/historySlice";

const store = configureStore({
   reducer: {
      user: userReducer,
      accounts: accountSlice,
      incomeExpense: incomeExpenseSlice,
      history: historySlice,
   },
});

export default store;
