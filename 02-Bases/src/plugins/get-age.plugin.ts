


const getAgePluggin = require('get-age')


export const getAge = (birthdate: string) => {

    if (!birthdate) return new Error('Age is required');

    // console.log({ currentYear: new Date().getFullYear() })

    // return getAgePluggin(birthdate);

    return new Date().getFullYear() - new Date(birthdate).getFullYear();
}


// module.exports = {
//     getAge
// }