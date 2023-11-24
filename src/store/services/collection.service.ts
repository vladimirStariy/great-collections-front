import { CollectionItem, CollectionItemCardResponse, GetCollectionItemResponse, GetCollectionResponse, ICollectionCardsResponse, ICollectionDirectories, ICollectionRequest, ICollectionResponse, ICreateCollectionRequest } from "../models/collection";
import { apiSlice } from "../slices/apiSlice";

export const collectionAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCollections: build.query<ICollectionCardsResponse, void>({
            query: () => ({
                url: 'collection/collections',
                method: 'GET',
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
        getCollectionItem: build.query<GetCollectionItemResponse, number>({
            query: (parameter) => ({
                url: `collection/getCollectionItem/${parameter}`,
                method: 'GET',
            }),
        }),
        getBiggestCollections: build.query<ICollectionResponse[], number>({
            query: (parameter) => ({
                url: `collection/biggestCollections/${parameter}`,
                method: 'GET',
            }),
        }),
        getLastCollectionItems: build.query<CollectionItemCardResponse, number>({
            query: (parameter) => ({
                url: `collection/newCollectionItems/${parameter}`,
                method: 'GET',
            }),
        })
    })
})

export const { useGetCollectionsQuery, 
               useCreateCollectionMutation,
               useGetUserCollectionsMutation,
               useGetCollectionDirectoriesQuery,
               useGetCollectionByIdQuery,
               useCreateCollectionItemMutation,
               useGetCollectionItemQuery,
               useGetBiggestCollectionsQuery,
               useGetLastCollectionItemsQuery
            } = collectionAPI;