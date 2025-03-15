
// ! 02-addOperation.ts
// * Callbacks are a way to handle asynchronous operations in JavaScript.
// * They are functions that are passed as arguments to be executed once the operation is completed.


export const addOperation = ( a: number, b: number, callback: (err?: string, result?: number) => void ) => {

    const response = a + b;


    if (Number.isNaN(response)) {
        return callback('The result is not a number');
    }

    setTimeout(() => {
        return callback(undefined, response);
    }, 3000);


}