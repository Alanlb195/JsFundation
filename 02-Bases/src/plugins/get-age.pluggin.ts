


const getAgePluggin = require('get-age')


export const getAge = (birthdate: string) => {

    if (!birthdate) return new Error('Age is required');

    return getAgePluggin(birthdate);
}


// module.exports = {
//     getAge
// }