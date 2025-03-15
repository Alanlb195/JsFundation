interface User {
    id: number;
    name: string;
}


export const users: User[] = [
    {
        id: 1,
        name: 'Jhon doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]



export function getUserById(id: number, callback: (err?: string, user?: User) => void) {


    const user = users.find(function (user) {
        return user.id === id
    });

    if (!user) {

        // simulate a delay:
        // setTimeout(() => {
        //     callback(`User not found with id: ${id}`);
        // }, 2500);

        return callback(`User not found with id: ${id}`);
    }

    return callback(undefined, user);
}

// module.exports =     {   
//     getUserById
// }