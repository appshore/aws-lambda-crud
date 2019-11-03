import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      orgId: event.pathParameters.orgId
    },
    UpdateExpression: 'SET parentId = :parentId, foundedAt = :foundedAt',
    ExpressionAttributeValues: {
      ':parentId': data.parentId || null,
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
