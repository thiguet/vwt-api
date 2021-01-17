export interface User {
    id: string;
    name: string;
    email: string;
    pass: string;
}

export enum Measures {
    KG = 'KG',
    G = 'G',
    L = 'L',
    UN = 'UN',
}

export interface Product {
    id: string;
    name: string;
    qtd: number;
    minQtd: number;
    measure: Measures;
    image?: string;
}
export interface LoginResponse {
    auth: boolean;
    token?: string;
    error?: string;
}

export interface MeasuresReportItem {
    measureName: string;
    measureQuantity: number;
}

export interface QuantityReportItem {
    productName: string;
    productQuantity: number;
}

export type MeasuresReport = MeasuresReportItem[];

export type QuantityReport = QuantityReportItem[];
