import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      orgId: event.pathParameters.orgId
    },
    ConditionExpression: 'orgId = :orgId',
    UpdateExpression: 'SET parentId = :parentId, foundedAt = :foundedAt, revenue = :revenue',
    ExpressionAttributeValues: {
      ':orgId': event.pathParameters.orgId,
      ':parentId': data.parentId || null,
      ':revenue': data.revenue || null,
      ':foundedAt': data.foundedAt || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dynamo.call('update', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false, error });
  }
}
