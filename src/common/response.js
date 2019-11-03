/**
 * @name buildResponse Return a formatted object
 * @param {*} statusCode
 * @param {*} body
 */
const buildResponse = ({ statusCode, body }) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: JSON.stringify(body)
});

/**
 * @name failure
 * @param {*} statusCode always 500
 * @param {*} body
 */
const failure = body => buildResponse({ statusCode: 500, body });

/**
 * @name success
 * @param {*} statusCode always 200
 * @param {*} body
 */
const success = body => buildResponse({ statusCode: 200, body });

export { failure, success };
