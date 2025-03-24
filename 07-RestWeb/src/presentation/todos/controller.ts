import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { GetTodosPaginated } from "../../domain/use-cases/todo/get-todos-paginated";

export class TodosController {

    //* Dependency injection
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        // todo: save in winston for a log error detail
        res.status(500).json({ error: 'Internal server error - check logs' });
    }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res, error));
    }

    public getTodosPaginated = async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Page and limit must be positive numbers' });
        }

        new GetTodosPaginated(this.todoRepository)
            .execute(page, limit)
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res, error));
    }

    public getTodosById = (req: Request, res: Response) => {

        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.status(200).json(todo))
            .catch(error => this.handleError(res, error));
    }

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if (error) return res.status(400).json({ error: error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDTO!)
            .then(todo => res.status(201).json(todo))
            .catch(error => this.handleError(res, error));
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });
        if (error)
            return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDTO!)
            .then(todo => res.status(200).json(todo))
            .catch(error => this.handleError(res, error));
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.status(200).json(todo))
            .catch(error => this.handleError(res, error));

    }

}
