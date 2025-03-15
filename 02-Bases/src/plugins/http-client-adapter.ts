// const axios = require('axios');
import axios from 'axios'

export const httpClient = {
    get: async (url: string) => {
        const { data } = await axios.get(url);
        return data;

    },

    post: async(url: string, body: any) => {
        throw new Error('Not Implemented');
    },
    put: async(url: string, body: any) => {
        throw new Error('Not Implemented');
    },
    delete: async(url: string, id: number) => {
        throw new Error('Not Implemented');
    },

};

// module.exports = {
//     httpClient
// }