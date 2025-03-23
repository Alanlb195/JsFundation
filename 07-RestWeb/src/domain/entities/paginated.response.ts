

export class PaginatedResponse<T> {
    constructor(
        public page: number,
        public limit: number,
        public totalTodos: number,
        public totalPages: number,
        public data: T[]
    ) { }

    public static fromObject<T>(object: { [key: string]: any }, data: T[]): PaginatedResponse<T> {
        const { page, limit, totalTodos, totalPages } = object;

        if (!page || isNaN(page)) throw 'Page is required and must be a number';
        if (!limit || isNaN(limit)) throw 'Limit is required and must be a number';
        if (!totalTodos || isNaN(totalTodos)) throw 'TotalTodos must be a number';
        if (!totalPages || isNaN(totalPages)) throw 'TotalPages must be a number';

        return new PaginatedResponse<T>(page, limit, totalTodos, totalPages, data);
    }
}
