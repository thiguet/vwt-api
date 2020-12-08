// export enum UserRoute {
//     login = 'login',
// }

// type Diff<T, U> = T extends U ? never : T;

export interface User {
    id: string;
    name: string;
    email: string;
    pass: string;
}

export interface Product {
    id: string;
    name: string;
    qtd: number;
    minQtd: number;
    image?: string;
}

// export type UserResponse = Diff<User, 'id' | 'pass'>;

export interface LoginResponse {
    auth: boolean;
    token?: string;
    error?: string;
}
