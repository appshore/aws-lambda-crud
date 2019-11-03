import AWS from 'aws-sdk';

/**
 * @name call
 * @param {*} action
 * @param {*} params
 */
const call = (action, params) => {
  // mandatory since we are not operating in the default region
  AWS.config.update({ region: 'eu-west-2' });

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
};

export default { call };
