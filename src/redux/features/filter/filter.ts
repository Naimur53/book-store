import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type IState = {
  searchTerm: string;
  publishedYear: Number | null;
  genre: string;
};
const initialState = {
  searchTerm: "",
  publishedYear: null,
  genre: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state: IState, action: PayloadAction<IState>) => {
      state.searchTerm = action.payload.searchTerm;
      state.genre = action.payload.genre;
      state.publishedYear = action.payload.publishedYear;
    },
  },
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
