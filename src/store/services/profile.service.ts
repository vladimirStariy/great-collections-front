import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../models/auth";
import { apiSlice } from "../slices/apiSlice";

export const profileAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMyCollections: build.query<any, void>({
            query: () => ({
                url: 'profile/my-collections',
                method: 'GET',
            })
        })
    })
})

export const {
    useGetMyCollectionsQuery
} = profileAPI;