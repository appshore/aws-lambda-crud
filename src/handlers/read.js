import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      orgId: event.pathParameters.orgId
    }
  };

  try {
    const result = await dynamo.call('get', params);
    return result.Item ? success(result.Item) : failure({ status: false, error: 'Organisation unknown' });
  } catch (error) {
    return failure({ status: false, error });
  }
}
