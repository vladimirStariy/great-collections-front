import { ICollectionFormData } from "../../components/collection/collection-editor/collection.create.screen";
import { CollectionItem, GetCollectionResponse, ICollectionDirectories, ICollectionRequest, ICollectionResponse, ICreateCollectionRequest } from "../models/collection";
import { apiSlice } from "../slices/apiSlice";

export const collectionAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCollections: build.mutation<ICollectionResponse[], ICollectionRequest>({
            query: (credentials) => ({
                url: 'collection/collections',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        createCollection: build.mutation<number, FormData>({
            query: (body) => ({
                url: 'collection/create-collection',
                method: 'POST',
                body: body,
                formData: true
            }),
        }),
        getUserCollections: build.mutation<ICollectionResponse[], ICollectionRequest>({
            query: (credentials) => ({
                url: 'collection/my-collections',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        getCollectionDirectories: build.query<ICollectionDirectories, void>({
            query: () => ({
                url: 'collection/collection-directories',
                method: 'GET',
            }),
        }),
        getCollectionById: build.query<GetCollectionResponse, number>({
            query: (parameter) => ({
                url: `collection/getCollectionData/${parameter}`,
                method: 'GET',
            }),
        }),
        createCollectionItem: build.mutation<void, CollectionItem>({
            query: (body) => ({
                url: 'collection/create-collection-item',
                method: 'POST',
                body: body,
                formData: true
            }),
        }),
    })
})

export const { useGetCollectionsMutation, 
               useCreateCollectionMutation,
               useGetUserCollectionsMutation,
               useGetCollectionDirectoriesQuery,
               useGetCollectionByIdQuery,
               useCreateCollectionItemMutation } = collectionAPI;