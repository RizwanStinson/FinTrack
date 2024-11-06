import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITran } from "../../interfaces/interfaces";

interface ExpenseState {
  filteredExpenses: ITran[];
}

const initialState: ExpenseState = {
  filteredExpenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setFilteredExpenses: (state, action: PayloadAction<ITran[]>) => {
      state.filteredExpenses = action.payload;
    },
  },
});

export const { setFilteredExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
