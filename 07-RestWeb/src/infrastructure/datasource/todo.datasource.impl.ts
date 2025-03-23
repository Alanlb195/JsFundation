import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";
import { PaginatedResponse } from "../../domain/entities/paginated.response";

export class TodoDatasourceImpl implements TodoDatasource {

    async getAllPaginated(page: number, limit: number): Promise<PaginatedResponse<TodoEntity>> {

        const totalTodos = await prisma.todo.count();

        const skip = (page - 1) * limit;

        const todos = await prisma.todo.findMany({
            skip,
            take: limit
        });

        return new PaginatedResponse<TodoEntity>(
            page,
            limit,
            totalTodos,
            Math.ceil(totalTodos / limit),
            todos.map(todo => TodoEntity.fromObject(todo))
        )
    }

    async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(newTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {

        await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updatedTodo);

    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        // try to delete the todo by id
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        })

        return TodoEntity.fromObject(deletedTodo);

    }

}