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
    deleteWishlist: builder.mutation({
      query: (id) => {
        return {
          url: `/wishlist/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["wishlist"],
    }),
  }),
});
export const {
  useGetAllWishlistByUserIdQuery,
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
