import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type IState = {
  searchTerm: string;
  publishedDate: string;
  genre: string;
};
const initialState = {
  searchTerm: "",
  publishedDate: "",
  genre: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state: IState, action: PayloadAction<IState>) => {
      state.searchTerm = action.payload.searchTerm;
      state.genre = action.payload.genre;
      state.publishedDate = action.payload.publishedDate;
    },
  },
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
