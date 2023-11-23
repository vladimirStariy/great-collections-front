import { ICollectionResponse } from "../models/collection";
import { apiSlice } from "../slices/apiSlice";

export const profileAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMyCollections: build.query<ICollectionResponse[], void>({
            query: () => ({
                url: 'profile/my-collections',
                method: 'GET',
            })
        }),
        likeCollectionItem: build.mutation<void, number>({
            query: (body) => ({
                url: 'profile/like-item',
                method: 'POST',
                body: body
            })
        }) 
    })
})

export const {
    useGetMyCollectionsQuery,
    useLikeCollectionItemMutation
} = profileAPI;