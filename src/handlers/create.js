import uuid from 'uuid';

import dynamo from '../common/dynamo';
import { failure, success } from '../common/response';

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const foundedAt = new Date(Date.parse(data.foundedAt));

  const params = {
    TableName: process.env.tableName,
    Item: {
      orgId: uuid.v1(), // unique identifier
      parentId: data.parentId, // optional Id of the parent organisation
      nameOrg: data.nameOrg, // organisation name
      revenue: data.revenue, // revenue
      foundedAt: foundedAt.toISOString().slice(0, 10), // date as a string YYYY-MM-DD
      createdAt: Date.now() // timestamp
    }
  };

  try {
    await dynamo.call('put', params);
    return success(params.Item);
  } catch (error) {
    return failure({ status: false, error });
  }
}
