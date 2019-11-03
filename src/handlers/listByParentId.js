import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    FilterExpression: 'parentId = :orgId',
    ExpressionAttributeValues: {
      ':orgId': event.pathParameters.orgId
    }
  };

  try {
    const result = await dynamo.call('scan', params);
    return result.Items
      ? success(result.Items)
      : failure({ status: false, error: 'Organisation unknown' });
  } catch (error) {
    return failure({ status: false, error });
  }
}
