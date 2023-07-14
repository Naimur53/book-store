import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice/apiSlice";
import authSlice from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import filter from "../features/filter/filter";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: authSlice,
    filter: filter,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
