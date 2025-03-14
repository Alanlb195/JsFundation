
// Forma acoplamiento: 
// const { v4: uuidv4 } = require('uuid');
// const getAge = require('get-age')

// Forma en desacoplamiento:
// const { getAge, getUUID } = require('../plugins');
// const { getUUID } = require('../plugins/get-uuid.pluggin');


interface BuildMakePersonOptions {
    getUUID: () => string;
    getAge: (birthdate: string) => number;
}

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakePersonOptions) => {

    return ({ name, birthdate }: PersonOptions) => {
        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
}



// const obj = { name: 'Jhon doe', birthdate: '1985-10-21' };
// const obj = { name: 'Alan Lopez', birthdate: '1998-04-27' }

// const jhon = buildPerson(obj);

// console.log(jhon);



// module.exports = {
//     buildMakePerson,
// }
