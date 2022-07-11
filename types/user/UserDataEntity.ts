export interface UserDataEntity {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password1?: string;
    ivHex: string;
}

export interface LoginDataEntity {
    email: string;
    password: string;
}

export type LoginDataType = {
    email: string,
    password: string,
}
