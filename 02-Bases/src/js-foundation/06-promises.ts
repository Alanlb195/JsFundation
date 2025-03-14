import { PokemonResponse } from "../interfaces/pokemon.interface";

const { httpClient } = require('../plugins')

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


    // !modo async / await
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    // !modo sin adapter:
    // const resp = await fetch(url);
    // throw new Error('Pokemon no existe');
    // const pokemon = await resp.json();

    // !modo con adapter
    const pokemon = await httpClient.get(url);

    return pokemon;
}

// module.exports = {
//     getPokemonById
// }