import { Tag } from "./tag";

export interface ICreateCollectionRequest {
    name: string | null;
    description: string | null;
    theme: string | null;
    fields: ICollectionField[];
}

export interface ICollectionData {
    name: string | null;
    description: string | null;
    theme: string | null;
}

export interface ICollectionField {
    name: string;
    data_type: string;
    collectionId?: number;
}

export interface ICollectionRequest {
    page: number;
    recordsCount: number;
}

export interface ICollectionCardsResponse {
    collections: ICollectionResponse[],
    total: number
}

export interface ICollectionResponse {
    id: number;
    name: string;
    theme: string;
    itemsQuantity: number;
    imagePath?: string;
}

export interface ICollectionDirectories {
    themes: Theme[];
    types: Option[];
}

export interface Theme {
    id: number;
    name: string;
}

export interface Option {
    label: string;
    value: string;
}

export interface CollectionItem {
    id?: number;
    name: string;
    collectionId?: number;
    tags?: any[];
    values: any[]
}

export interface Collection {
    id: number;
    name: string,
    description?: string,
    imagePath?: string,
    themeId: number,
}

export interface GetCollectionResponse {
    collection: Collection,
    collectionItems: CollectionItem[],
    collectionFields: CollectionField[],
    mode: string,
}

export interface CollectionField {
    id: number,
    name: string,
    data_type: string,
    collectionId: number
}

export interface GetCollectionItemResponse {
    id: number;
    name: string;
    collection_id: number;
    collection: {
        name: string;
    }
    collectionFields: CollectionFieldValue[],
    isLiked: boolean | undefined
}

export interface CollectionFieldValue {
    name: string;
    value: string;
    data_type: string;
}

export interface CollectionItemCardResponse {
    itemCards: CollectionItemCard[]
}

export interface CollectionItemCard {
    id: number;
    name: string,
    created: Date,
    tags: Tag[]
}