
// !first class, hello world with NodeJs
// console.log('Hola mundo');

// !imports and exports class with destructuring, for a simple template
// const { emailTemplate } = require('./js-foundation/01-template');
// console.log(emailTemplate)

// destructuring class with breakpoint
// require('./js-foundation/02-destructuring');


// !callbacks class:
// que es una funcion callback?
// es una funcion que recibe como parametro otra funcion para ejecutarla dentro de esta.
// ejemplo:
// const { getUserById } = require('./js-foundation/03-callbacks');
// const id = 1;
// getUserById(id, function (error, user) {
//     if (error) {
//         throw new Error(error);
//     }

//     getUserById(2, function (error, user2) {
//         if (error) {
//             throw new Error(error);
//         }
//         console.log({ user, user2 });
//     });
// });

// !arrow function:
// que es una arrow function?
// consta de dos partes y elimina el uso de la palabra function
// parte uno: parametros, son los parametros que recibe la funcion, ejemplo:
// const suma = (number1, number2) => {
//     console.log(number1 + number2)
// }
// suma(1,2);
// en este caso, los parametros son number1 y number2 ya que son los params que recibe la arrow function
// nota: si solo hay un parametro se puede omitir el uso de los parentesis, si hay dos o mas, no, y si no hay; tampoco

// parte dos: expresion
// tomando en cuenta el ejemplo anterior, la parte numero dos de la arrow function es la expression, la cual define el
// comportamiento de lo que se va a hacer con los parametros recibidos.
// en el caso anterior la expression es: console.log(number1 + number2)

// nota adicional, en las arrow functions se puede omitir el uso de los corchetes, por ejemplo:
// const suma = (number1, number2) => console.log(number1 + number2)
// si solo hay una instruccion, se puede dejar sin llaves la expression

// const { getUserById } = require('./js-foundation/04-arrow');
// const id = 1;
// getUserById(id, (error, user) => {

//     if (error) throw new Error(error)

//     getUserById(2, (error, user2) => {
//         if (error) throw new Error(error);
//         console.log({ user, user2 });
//     });

// });

// !Factory functions class
// const { getAge, getUUID } = require('./plugins');
// const { buildMakePerson } = require('./js-foundation/05-factory');

// const makePerson = buildMakePerson({getUUID, getAge})

// const obj = { name: 'Alan Lopez', birthdate: '1998-04-27' }

// const alan = makePerson(obj);

// console.log({alan});



// !promises class
// const { getPokemonById } = require('./js-foundation/06-promises');
import { getPokemonById } from './js-foundation/06-promises';

getPokemonById(1).then((pokeResponse) => {
    console.log(pokeResponse.name)
});

// // const name = getPokemonById(4, (pokemon => {
// //     console.log({pokemon});
// // }));

// ! adapters
// const info = getPokemonById(1)
//     .then(pokemon => console.log({ pokemon }))
//     .catch((err) => console.log(err))
//     .finally(() => console.log('Finalmente'))



// ! logger
// using javascript
// const { buildLogger } = require('./plugins');
// const logger = buildLogger('app.js');


// using typescript
// import { buildLogger } from "./plugins/logger.pluggin";
// const logger = buildLogger('app.ts');

// logger.log("Mensaje de log tradicional, no es bueno ni malo.")
// logger.error("Mensaje de log de error.")



// !testing typescript