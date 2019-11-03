import health from '../src/handlers/health';

test('health', async () => {
  const event = 'event';
  const context = 'context';
  const callback = (error, response) => {
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toEqual(200);
    expect(response).toHaveProperty('body');
    expect(typeof response.body).toBe('string');
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Health check passed');
  };

  await health(event, context, callback);
});
