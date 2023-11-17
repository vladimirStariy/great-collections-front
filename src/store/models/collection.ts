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