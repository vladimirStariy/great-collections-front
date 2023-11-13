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
        upload: build.mutation<void, ICreateCollectionRequest>({
            query: (body) => ({
                url: 'create-collection',
                method: 'POST',
                body: body,
                formData: true
            }),
        }),
    })
})

export const { useGetCollectionsMutation, useUploadMutation } = collectionAPI;