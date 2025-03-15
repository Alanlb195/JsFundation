import { PokemonResponse } from "../interfaces/pokemon.interface";

// const { httpClient } = require('../plugins')

import { httpClient } from "../plugins/http-client-adapter";

export const getPokemonById = async (id: number | string): Promise<PokemonResponse> => {

    // !modo callback
    // fetch(url)
    //     .then((resp) => resp.json())
    //     .then((pokemon) => {
    //         callback(pokemon.name)
    //     })


    // !modo .then anidado
    // return fetch(url)
    //     .then((resp) => resp.json())
    //     // .then(() => { throw new Error('pokemon no existe') })
    //     .then(pokemon => pokemon.name)



    // !modo sin adapter:
    // const resp = await fetch(url);
    // throw new Error('Pokemon no existe');
    // const pokemon = await resp.json();

    // !modo async / await

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        // !modo con adapter
        const pokemon = await httpClient.get(url);

        return pokemon.name;

    } catch (error) {
        throw (`Pokemon not found with id ${id}`);
    }

}

// module.exports = {
//     getPokemonById
// }