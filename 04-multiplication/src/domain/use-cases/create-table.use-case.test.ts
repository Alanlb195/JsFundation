import { CreateTable } from './create-table.use-case'



describe('CreateTableUseCase', () => {


    test('should create table with default values', () => {

        const createTable = new CreateTable();
        const table = createTable.execute({base: 2});

        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(10);

    })

    test('should create table with custom values', () => {

        const createTable = new CreateTable();
        let limit = Math.floor(Math.random() * 9) + 1;
        const table = createTable.execute({base: 3, limit: limit});

        const rows = table.split('\n').length;        
        expect(rows).toBe(limit);
    })


});


