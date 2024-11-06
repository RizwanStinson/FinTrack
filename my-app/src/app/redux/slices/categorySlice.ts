import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: string[];
  refresh: boolean;
}

const initialState: CategoryState = {
  categories: [],
  refresh: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<string>) {
      state.categories.push(action.payload);
    },
    toggleRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
});

export const { setCategories, addCategory, toggleRefresh } =
  categorySlice.actions;
export default categorySlice.reducer;
