import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('should get the / endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
