import { apiSlice } from "../apiSlice/apiSlice";
export const readingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReadingByUserId: builder.query({
      query: (id) => `/reading/${id}`,
      providesTags: ["reading"],
    }),
    addReading: builder.mutation({
      query: (info) => {
        return {
          url: "/reading",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: ["reading"],
    }),
    deleteReading: builder.mutation({
      query: (id) => {
        return {
          url: `/reading/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reading"],
    }),
    updateReading: builder.mutation({
      query: (info) => {
        return {
          url: `/reading/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: ["reading"],
    }),
  }),
});
export const {
  useAddReadingMutation,
  useDeleteReadingMutation,
  useGetAllReadingByUserIdQuery,
  useUpdateReadingMutation,
} = readingApi;
