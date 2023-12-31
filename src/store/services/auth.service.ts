import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../models/auth";
import { apiSlice } from "../slices/apiSlice";

export const authAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        register: build.mutation<IRegisterResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        refresh: build.query<ILoginResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'GET',
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, 
               useRegisterMutation,
               useRefreshQuery,
               useLogoutMutation
            } = authAPI;