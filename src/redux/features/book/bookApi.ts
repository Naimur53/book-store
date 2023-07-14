import { apiSlice } from "../apiSlice/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/books`,
      providesTags: ["books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (info) => {
        return {
          url: "/books",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["books"],
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
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBookByIdQuery,
} = bookApi;
