import { apiSlice } from "../apiSlice/apiSlice";
type IQuery = {
  [key: string]: number | string | undefined;
  limit?: number;
  searchTerm?: string;
  title?: string;
  genre?: string;
};
export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookReviewByBookId: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (info) => {
        return {
          url: "/reviews",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["review"],
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
  useGetBookReviewByBookIdQuery,
  useEditBookMutation,
  useAddReviewMutation,
} = reviewApi;
