import { httpClient } from "../../src/plugins";



describe('02-Bases/plugins/http-client-adapter.ts', () => {


    test('httpClent.get should return a response', async() => {

        const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');

        expect(data).toEqual({
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        })

    });


    test('httpClient.post should return a not implemented error', async() => {


        try {
            await httpClient.post('https://jsonplaceholder.typicode.com/todos/1', {});
        } catch (error) {
            expect(error).toEqual(new Error('Not Implemented'));
        }

    });


    test('httpClient.put should return a not implemented error', async() => {


        try {
            await httpClient.put('https://jsonplaceholder.typicode.com/todos/1', {});
        } catch (error) {
            expect(error).toEqual(new Error('Not Implemented'));
        }

    });



    test('httpClient.delete should return a not implemented error', async() => {


        try {
            await httpClient.delete('https://jsonplaceholder.typicode.com/todos/1', 1,);
        } catch (error) {
            expect(error).toEqual(new Error('Not Implemented'));
        }

    });



});