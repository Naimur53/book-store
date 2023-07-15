import { apiSlice } from "../apiSlice/apiSlice";
export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWishlistByUserId: builder.query({
      query: (id) => `/wishlist/${id}`,
      providesTags: ["wishlist"],
    }),
    addWishlist: builder.mutation({
      query: (info) => {
        return {
          url: "/wishlist",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["wishlist"],
    }),
    editBook: builder.mutation({
      query: (info) => {
        return {
          url: `/books/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useDeleteBookMutation,
  useEditBookMutation,
  useGetAllWishlistByUserIdQuery,
  useAddWishlistMutation,
} = wishlistApi;
