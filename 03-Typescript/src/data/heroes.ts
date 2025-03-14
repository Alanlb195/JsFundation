interface Hero {
    id: number;
    name: string;
    owner: string;
}


export const heroes: Hero[] = [
    {
        id: 1,
        name: 'Black widow',
        owner: 'Marvel'
    },
    {
        id: 2,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 3,
        name: 'aquaman',
        owner: 'DC'
    }
]