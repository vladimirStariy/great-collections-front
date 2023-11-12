export interface ICreateCollectionRequest {
    collectionData: ICollectionData;
    fields: ICollectionField[];
}

export interface ICollectionData {
    name: string | null;
    description: string | null;
    theme: string | null;
}

export interface ICollectionField {
    name: string | null;
    data_type: string| null;
    collectionId: number| null;
}

export interface ICollectionRequest {
    page: number;
    recordsCount: number;
}

export interface ICollectionResponse {
    id: number;
    name: string;
    theme: string;
    itemsQuantity: number;
}