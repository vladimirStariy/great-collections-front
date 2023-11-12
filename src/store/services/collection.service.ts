import { ICollectionRequest, ICollectionResponse } from "../models/collection";
import { apiSlice } from "../slices/apiSlice";

export const collectionAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCollections: build.mutation<ICollectionResponse[], ICollectionRequest>({
            query: (credentials) => ({
                url: 'collections',
                method: 'POST',
                body: {...credentials}
            }),
        }),
    })
})

export const { useGetCollectionsMutation } = collectionAPI;