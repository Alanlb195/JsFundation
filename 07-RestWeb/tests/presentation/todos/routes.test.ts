import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo routes test', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    const todo1 = { text: "Hello test 1", completedAt: null }
    const todo2 = { text: "Hello test 2", completedAt: null }

    test('should retorn TODOs', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        expect(body[0].completedAt).toBe(null);
        expect(body[1].completedAt).toBe(null);

    });

    test('should return a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt
        });
    });

    test('should return a 404 not found api/todos/:id', async () => {
        const todoId = 1
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${todoId} not found` })
    });

    test('should return a new TODO api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        });
    });

    test('should return an error if text is not present api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ text: '' })
            .expect(400);

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('should return an error if text is not valid api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send()
            .expect(400);

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('should return an updated TODO api/', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Hello test UPDATE', completedAt: '2025-03-21' })
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: body.text,
            completedAt: body.completedAt
        })
    });

    test('should return 404 if TODO not found api/todos/:id', async () => {
        const { body } = await request(testServer.app)
            .put('/api/todos/999')
            .send({ text: 'Hello test UPDATE a not found element' })
            .expect(404);
    });

    test('should return 400 if is a DTO error api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt: 'NaN' })
            .expect(400);
    });

    test('should return an updated TODO - only the text api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Hello test UPDATE only text' })
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: body.text,
            completedAt: todo.completedAt
        })
    });

    test('should return an updated TODO - only the date api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo2 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt: '2025-03-23' })
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: body.completedAt
        });
    });

    test('should return a 400 if Id is NaN api/todos/:id', async () => {
        const { body } = await request(testServer.app)
            .delete(`/api/todos/testingNaN`)
            .expect(400);

        expect(body).toEqual({ error: 'ID argument is not a number' });
    });

    test('should return a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: todo.completedAt
        });
    });

    test('should return a TODO Paginated response api/todos/paginated', async () => {
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const page = 1;
        const limit = 2;

        const { body } = await request(testServer.app)
            .get(`/api/todos/paginated?page=${page}&limit=${limit}`)
            .expect(200);

        expect(body).toEqual({
            page: page,
            limit: limit,
            totalTodos: expect.any(Number),
            totalPages: expect.any(Number),
            data: [
                { id: expect.any(Number), text: todo1.text, completedAt: todo1.completedAt },
                { id: expect.any(Number), text: todo2.text, completedAt: todo2.completedAt }
            ]
        })
    });

    test('should return an error if params are not valid numbers api/todos/paginated', async () => {
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const page = -1;
        const limit = 0;

        const { body } = await request(testServer.app)
            .get(`/api/todos/paginated?page=${page}&limit=${limit}`)
            .expect(400);

        expect(body).toEqual({ error: 'Page and limit must be positive numbers' })
    });

});