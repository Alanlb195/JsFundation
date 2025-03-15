import { get } from "http";
import { getUserById, users } from "../../src/js-foundation/03-callbacks"



describe('js-foundation/03-callbacks.ts', () => {



    test('getUserById should return an error if user does not exist, user have to be undefined in this case', (done) => {

        const id = 10;
        getUserById(id, (err, user) => {

            expect(err).toBe(`User not found with id: ${id}`);
            expect(user).toBeUndefined();

            done();

        });

    });


    test('getUserById should return a user if user exists, and error have to be undefined in this case', (done) => {

        const id = 1;

        getUserById(id, (err, user) => {

            expect(err).toBeUndefined();
            expect(user).toEqual(users.find(user => user.id === id));

            done();

        }
        );
    });
})