import { IUser, IUsersRange, IUsersRequest } from "../models/user";
import { apiSlice } from "../slices/apiSlice";

export const userAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.mutation<IUser[], IUsersRequest>({
            query: (credentials) => ({
                url: 'users',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        blockUsersRange: build.mutation<string, IUsersRange>({
            query: (credentials) => ({
                url: 'block-users',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        unblockUsersRange: build.mutation<string, IUsersRange>({
            query: (credentials) => ({
                url: 'unblock-users',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        removeUsersRange: build.mutation<string, IUsersRange>({
            query: (credentials) => ({
                url: 'remove-users',
                method: 'POST',
                body: {...credentials}
            }),
        }),
    })
})

export const { useGetUsersMutation, 
               useBlockUsersRangeMutation,
               useUnblockUsersRangeMutation,
               useRemoveUsersRangeMutation
             } = userAPI;