import { ICollectionRequest, ICollectionResponse, ICreateCollectionRequest } from "../models/collection";
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
        createCollection: build.mutation<void, FormData>({
            query: (body) => ({
                url: 'create-collection',
                method: 'POST',
                body: body,
                formData: true
            }),
        }),
        getUserCollections: build.mutation<ICollectionResponse[], ICollectionRequest>({
            query: (credentials) => ({
                url: 'my-collections',
                method: 'POST',
                body: {...credentials}
            }),
        })
    })
})

export const { useGetCollectionsMutation, 
               useCreateCollectionMutation,
               useGetUserCollectionsMutation } = collectionAPI;