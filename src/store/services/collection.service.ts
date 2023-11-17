import { ICollectionFormData } from "../../components/collection/collection-editor/collection.create.screen";
import { ICollectionDirectories, ICollectionRequest, ICollectionResponse, ICreateCollectionRequest } from "../models/collection";
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
        }),
        getCollectionDirectories: build.query<ICollectionDirectories, void>({
            query: () => ({
                url: 'collection-directories',
                method: 'GET',
            }),
        })
    })
})

export const { useGetCollectionsMutation, 
               useCreateCollectionMutation,
               useGetUserCollectionsMutation,
               useGetCollectionDirectoriesQuery } = collectionAPI;