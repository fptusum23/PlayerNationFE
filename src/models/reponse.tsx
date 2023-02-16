export interface IResponse<T> {
    code: number
    pagination: any
    results: {
        object: T
    }
}
