import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.status, o.user_id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const orderProduct = result.rows[0];

      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async removeProduct(
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const sql =
        'DELETE FROM order_products WHERE order_id = $1 AND product_id = $2';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId]);

      const orderProduct = result.rows[0];

      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not remove product ${productId} from order ${orderId}: ${err}`
      );
    }
  }

  async listProductsInOrder(orderId: string): Promise<OrderProduct[]> {
    try {
      const sql = 'SELECT * FROM order_products WHERE order_id = $1';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId]);

      const orderProduct = result.rows;

      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(`Could not list products from order ${orderId}: ${err}`);
    }
  }
}
