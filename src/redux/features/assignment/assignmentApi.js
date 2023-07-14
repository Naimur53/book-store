import { apiSlice } from "../apiSlice/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => `/assignments`
        }),
        getAssignmentWithVideoId: builder.query({
            query: (videoId) => `/assignments?video_id=${videoId}`
        }),
        addAssignment: builder.mutation({
            query: (info) => {
                return {
                    url: '/assignments',
                    method: "POST",
                    body: info
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                const { data } = result || {};

                // update data 
                dispatch(apiSlice.util.updateQueryData(
                    "getAssignments",
                    undefined,
                    (draft) => {
                        draft.push(data);
                    }
                )
                );

            }
        }),
        editAssignment: builder.mutation({
            query: (info) => {

                return {
                    url: `/assignments/${info.id}`,
                    method: "PATCH",
                    body: info
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                const { data } = result || {};

                // update data 
                dispatch(apiSlice.util.updateQueryData(
                    "getAssignments",
                    undefined,
                    (draft) => {

                        const index = draft.findIndex(single => single.id === data.id)
                        draft[index] = {
                            ...draft[index],
                            ...data
                        }
                    }
                ));

                dispatch(apiSlice.util.updateQueryData(
                    'getAssignmentWithVideoId',
                    data.video_id,
                    (draft) => {

                        draft[0] = data
                    }
                ))

            }
        }),
        deleteAssignment: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/assignments/${id}`,
                    method: "DELETE",
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // const result = await queryFulfilled;

                // update data 
                const pathResult1 = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            const index = draft?.findIndex(single => single.id === arg.id)


                            if (index !== -1) draft.splice(index, 1)
                        }
                    )
                );
                const pathResult2 = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignmentWithVideoId",
                        arg.video_id,
                        (draft) => {
                            const index = draft?.findIndex(single => single.video_id === arg.video_id)


                            if (index !== -1) draft.splice(index, 1)
                        }
                    )
                );
                // optimistic cache update end
                try {
                    const result = await queryFulfilled;
                } catch (err) {
                    pathResult1.undo()
                    pathResult2.undo()
                }

            }
        })
    })
})
export const { useGetAssignmentWithVideoIdQuery, useAddAssignmentMutation, useGetAssignmentsQuery, useEditAssignmentMutation, useDeleteAssignmentMutation } = assignmentApi;