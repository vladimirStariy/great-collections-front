export interface Tag {
    id: number;
    name: string;
}

export interface TagResponse {
    tags: Tag[]
}

export interface TagOption {
    label: string;
    value: string;
}