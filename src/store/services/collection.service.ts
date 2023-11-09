import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../models/auth";
import { apiSlice } from "../slices/apiSlice";

export const collectionAPI = apiSlice.injectEndpoints({
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
    })
})

export const { useLoginMutation, useRegisterMutation } = collectionAPI;