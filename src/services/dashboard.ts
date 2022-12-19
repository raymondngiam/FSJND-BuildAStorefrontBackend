import Client from '../database';

export class DashboardQueries {
  // Get all products from the selected user's active order
  async userCurrentOrder(
    userId: number
  ): Promise<{ name: string; quantity: number; price: number }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name, quantity, price FROM order_products \
      JOIN products ON order_products.product_id = products.id \
      JOIN orders ON orders.id = order_id \
      WHERE user_id = $1 AND status = $2';

      const result = await conn.query(sql, [userId, 'active']);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get user's current order items: ${err}`);
    }
  }

  // Get 5 most popular products
  async fiveMostPopular(): Promise<{ name: string; sum: number }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name, sum(quantity) FROM order_products \
        JOIN products ON order_products.product_id = products.id \
        GROUP BY name \
        ORDER BY sum DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get 5 most popular products: ${err}`);
    }
  }
}
