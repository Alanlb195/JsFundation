const axios = require('axios');

const httpClient = {
    get: async (url) => {
        const { data } = await axios.get(url);
        return data;

    }
};

module.exports = {
    httpClient
}