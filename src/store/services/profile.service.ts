import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../models/auth";
import { ICollectionResponse } from "../models/collection";
import { apiSlice } from "../slices/apiSlice";

export const profileAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMyCollections: build.query<ICollectionResponse[], void>({
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