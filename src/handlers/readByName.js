import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    IndexName: "name-index",
    KeyConditionExpression: "name = :name",
    ExpressionAttributeValues: {
      ":name": event.pathParameters.name
    }
  };

  try {
    const result = await dynamo.call('get', params);
    return result.Item ? success(result.Item) : failure({ status: false, error: 'Organisation unknown' });
  } catch (error) {
    return failure({ status: false, error });
  }
}
