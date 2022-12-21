import app from '../server';
import supertest from 'supertest';
import { ProductStore } from '../models/product';
import { UserStore } from '../models/user';
import { OrderStore } from '../models/order';

const request = supertest(app);
const token = process.env.JWT_TOKEN_TEST as string;

describe('Test product endpoint responses', () => {
  beforeAll(() => {
    const spyIndex = spyOn(ProductStore.prototype, 'index');
    spyIndex.and.returnValue(Promise.resolve([]));
    const spyShow = spyOn(ProductStore.prototype, 'show');
    spyShow.and.returnValue(
      Promise.resolve({
        name: 'test_name',
        price: 'test_price'
      })
    );
    const spyCreate = spyOn(ProductStore.prototype, 'create');
    spyCreate.and.returnValue(
      Promise.resolve({
        name: 'test_name',
        price: 'test_price'
      })
    );
    const spyDelete = spyOn(ProductStore.prototype, 'delete');
    spyDelete.and.returnValue(
      Promise.resolve({
        name: 'test_name',
        price: 'test_price'
      })
    );
  });
  it("should get the '/products' endpoint", async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it("should get the '/products/:id' endpoint", async () => {
    const response = await request
      .get('/products/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should post to the '/products' endpoint", async () => {
    const response = await request
      .post('/products')
      .send({
        name: 'Book',
        price: 100
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('test_name');
  });
  it("should delete from the '/products' endpoint", async () => {
    const response = await request
      .delete('/products/')
      .send({
        id: 1
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('test_name');
  });
  it("should get the '/products/dashboard/five-most-popular' endpoint", async () => {
    const response = await request
      .get('/products/dashboard/five-most-popular')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
});

describe('Test users endpoint responses', () => {
  beforeAll(() => {
    const spyIndex = spyOn(UserStore.prototype, 'index');
    spyIndex.and.returnValue(Promise.resolve([]));
    const spyShow = spyOn(UserStore.prototype, 'show');
    spyShow.and.returnValue(
      Promise.resolve({
        username: 'test_user',
        first_name: 'test_user',
        last_name: 'test_user',
        password: 'test_password'
      })
    );
    const spyCreate = spyOn(UserStore.prototype, 'create');
    spyCreate.and.returnValue(
      Promise.resolve({
        username: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        password_digest: process.env.ADMIN_HASH_TEST as string
      })
    );
    const spyDelete = spyOn(UserStore.prototype, 'delete');
    spyDelete.and.returnValue(
      Promise.resolve({
        username: 'test_user',
        first_name: 'test_user',
        last_name: 'test_user',
        password: 'test_password'
      })
    );
  });
  it("should get the '/users' endpoint", async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should get the '/users/:id' endpoint", async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should post to the '/users/authenticate' endpoint", async () => {
    const response = await request
      .post('/users/authenticate')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should post to the '/users' endpoint", async () => {
    const response = await request
      .post('/users')
      .send({
        username: 'test_user',
        first_name: 'test_user',
        last_name: 'test_user',
        password: 'test_password'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    console.log(`${response.body}`);
  });
  it("should delete from the '/users' endpoint", async () => {
    const response = await request
      .delete('/users/')
      .send({
        id: 1
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    console.log(`${response.body.username}`);
    expect(response.body.username).toBe('test_user');
  });
});

describe('Test orders endpoint responses', () => {
  beforeAll(() => {
    const spyIndex = spyOn(OrderStore.prototype, 'index');
    spyIndex.and.returnValue(Promise.resolve([]));
    const spyShow = spyOn(OrderStore.prototype, 'show');
    spyShow.and.returnValue(
      Promise.resolve({
        status: 'active',
        user_id: '1'
      })
    );
    const spyCreate = spyOn(OrderStore.prototype, 'create');
    spyCreate.and.returnValue(
      Promise.resolve({
        status: 'active',
        user_id: '1'
      })
    );
    const spyDelete = spyOn(OrderStore.prototype, 'delete');
    spyDelete.and.returnValue(
      Promise.resolve({
        status: 'active',
        user_id: '1'
      })
    );
    const spyAddProduct = spyOn(OrderStore.prototype, 'addProduct');
    spyAddProduct.and.returnValue(
      Promise.resolve({
        quantity: 1,
        order_id: '1',
        product_id: '1'
      })
    );
  });
  it("should get the '/orders' endpoint", async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should get the '/orders/:id' endpoint", async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
  it("should post (create) to the '/orders' endpoint", async () => {
    const response = await request
      .post('/orders')
      .send({
        status: 'active',
        user_id: '1'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe('1');
  });
  it("should delete from the '/orders' endpoint", async () => {
    const response = await request
      .delete('/orders/')
      .send({
        id: 1
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe('1');
  });
  it("should post (add product) to the '/orders/:id/products' endpoint", async () => {
    const response = await request
      .post('/orders/1/products')
      .send({
        quantity: 1,
        order_id: '1',
        product_id: '1'
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(1);
  });
  it("should get the '/orders/dashboard/user-current/:user_id' endpoint", async () => {
    const response = await request
      .get('/orders/dashboard/user-current/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
});
