import { apiSlice } from "../apiSlice/apiSlice";
type IQuery = {
  [key: string]: number | string | undefined | null;
  limit?: number;
  searchTerm?: string;
  title?: string;
  genre?: string;
};
export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queryInfo: IQuery) => {
        const myquery = Object.keys(queryInfo).reduce((pre, current) => {
          if (
            queryInfo[current] !== undefined &&
            queryInfo[current] !== "" &&
            queryInfo[current] !== null
          ) {
            return `${pre}&${current}=${queryInfo[current]}`;
          }
          return pre;
        }, "?");

        return {
          url: `/books${myquery}`,
        };
      },
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
          url: `/books/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["books"],
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
