export interface IBaseResponse<T> {
    status_code: number | string;
    data: T;
    message: string;
}
export interface IBaseResponseWithCount<T> {
    data: T;
    page_number: number;
    total_pages: number;
    total_elements: number;
    status_code: number | string;
    message: string;
}
export type ConditionItem = {
    property: string;
    operate: string;
    value: any;
};
export type Sort = {
    field: string;
    direction: 'ASC' | 'DESC';
}
export interface ISearchParams {
    page: number;
    size: number;
    filters?: ConditionItem[] | [];
    sorts?: Sort[] | [];
}