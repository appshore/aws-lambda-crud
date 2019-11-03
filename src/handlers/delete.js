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
    await dynamo.call('delete', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false, error });
  }
}
