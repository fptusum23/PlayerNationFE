export interface IResponsePaging<T> {
    code: number
    pagination: any
    results: {
        objects: {
            count: number,
            rows: T[]
        }
    }
}
