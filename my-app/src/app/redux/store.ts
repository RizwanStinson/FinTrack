import { configureStore } from "@reduxjs/toolkit";
import  categoryReducer  from "./slices/categorySlice";
import expenseReducer from "./slices/expenseSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    expense: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;