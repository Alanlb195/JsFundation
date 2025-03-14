interface User {
    id: number;
    name: string;
}


const users: User[] = [
    {
        id: 1,
        name: 'Jhon doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]



export function getUserById(id: number, callback: (error?: string, user?: User) => {}) {
    const user = users.find(function (user) {
        return user.id === id
    });

    if (!user) {
        return callback(`User not found with id: ${id}`, undefined);
    }

    callback(undefined, user);
}

// module.exports = {
//     getUserById
// }