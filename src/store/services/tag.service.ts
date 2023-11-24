import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../models/auth";
import { TagResponse } from "../models/tag";
import { apiSlice } from "../slices/apiSlice";

export const tagAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTags: build.query<TagResponse, void>({
            query: () => ({
                url: 'tags',
                method: 'GET'
            }),
        })
    })
})

export const { 
                useGetTagsQuery 
            } = tagAPI;