export interface IUser {
    id: number;
    email: string;
    isBanned: boolean;
    isAdmin: boolean;
}

export interface IUsersResponse {
    users: IUser[]
}

export interface IUsersRequest {
    page: number;
    recordsQuantity: number; 
}

export interface IUsersRange {
    Ids: number[]
}