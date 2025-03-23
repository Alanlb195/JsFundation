import { PaginatedResponse } from "../../entities/paginated.response";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodosPaginatedUseCase {
    execute(page: number, limit: number): Promise<PaginatedResponse<TodoEntity>>
}

export class GetTodosPaginated implements GetTodosPaginatedUseCase {

    constructor(
        private repository: TodoRepository,
    ) { }

    execute(page: number, limit: number): Promise<PaginatedResponse<TodoEntity>> {
        return this.repository.getAllPaginated(page, limit);
    }
}