import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { Prisma } from "@prisma/client";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

// This is a template for TodoController. using a repository pattern without use cases.
// Implements DDD, Repository pattern
export class TodosControllerRepository {

    //* Dependency injection
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();

        return res.status(200).json(todos);
    }

    public getTodosPaginated = async (req: Request, res: Response) => {

        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            if (isNaN(page) || isNaN(limit)) return res.status(400).json({ error: 'Page and Limit have to be valid numbers' });

            if (page < 1 || limit < 1) {
                return res.status(400).json({ error: 'Page and limit must be positive numbers' });
            }

            const totalTodos = await prisma.todo.count();

            const todos = await this.todoRepository.getAllPaginated(page, limit);

            return res.json({
                page,
                limit,
                totalTodos,
                totalPages: Math.ceil(totalTodos / limit),
                data: todos
            });

        } catch (error) {
            return res.status(500).json("Internal pointer variable");
        }
    }

    public getTodosById = async (req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

            const todo = await this.todoRepository.findById(id);

            return res.status(200).json(todo);

        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        try {
            const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
            if (error) return res.status(400).json({ error: error });

            const newTodo = await this.todoRepository.create(createTodoDTO!);

            return res.json(newTodo);

        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    public updateTodo = async (req: Request, res: Response) => {

        try {

            const id = +req.params.id;

            const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });
            if (error)
                return res.status(400).json({ error });

            const updatedTodo = await this.todoRepository.updateById(updateTodoDTO!);

            return res.json(updatedTodo);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {

        try {

            const id = +req.params.id;

            if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

            const deletedTodo = await this.todoRepository.deleteById(id);

            return res.json({ message: 'Todo deleted successfully', deletedTodo })

        } catch (error) {

            // si prisma lanza un error por que el id no existe:

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025')
                    return res.status(404).json({ error: `Todo with id ${req.params.id} not found` })
            }

            return res.status(500).json({ error: 'Internal pointer variable' });

        }
    }
}
