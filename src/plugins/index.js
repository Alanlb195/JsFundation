const { getAge } = require('./get-age.pluggin');
const { getUUID } = require('./get-uuid.pluggin');
const { httpClient } = require('./http-client-adapter');
const buildLogger = require('./logger.pluggin');

module.exports = {
    getAge,
    getUUID,
    httpClient,
    buildLogger,
}