const users = [
    {
        id: 1,
        name: 'Jhon doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
]


const getUserById = (id, callback) => {

    const user = users.find(user => user.id === id);

    if (!user) return callback(`User not found with id: ${id}`, null);

    callback(null, user);
}

module.exports = {
    getUserById
}