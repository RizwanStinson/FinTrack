import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: string[];
}

const initialState: CategoryState = {
  categories: ["Salary"],
};

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategories:(state, action: PayloadAction<string[]>) =>{
            state.categories = action.payload
        },
        addCategory:(state, action: PayloadAction<string>) => {
            if(!state.categories.includes(action.payload)){
                state.categories.push(action.payload)
            }
        }
    }
})

export const { setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;