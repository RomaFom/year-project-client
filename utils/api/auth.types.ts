export enum Roles {
    USER,
    ADMIN,
    SUPERUSER,
}

export interface BaseResponse {
    status: number;
    error?: {
        message: string;
    };
    data?: any;
}

export interface IUserResponse extends BaseResponse {
    data?: {
        token: string;
    };
}

export interface IUserDataResponse extends BaseResponse {
    data?: {
        id: string;
        username: string;
        role: Roles;
    };
}
