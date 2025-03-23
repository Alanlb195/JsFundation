import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { PaginatedResponse } from "../entities/paginated.response";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>;


    abstract getAll(): Promise<TodoEntity[]>;
    abstract getAllPaginated(page: number, limit: number): Promise<PaginatedResponse<TodoEntity>>;

    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;

}