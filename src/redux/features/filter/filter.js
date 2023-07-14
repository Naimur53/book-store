import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all: true,
    pending: false,
    markSent: false,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action) => {


            state.all = Boolean(action.payload.all)
            state.pending = Boolean(action.payload.pending)
            state.markSent = Boolean(action.payload.markSent)
        }
    },
})
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;