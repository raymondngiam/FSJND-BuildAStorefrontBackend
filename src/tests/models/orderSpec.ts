import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe('Model testing', () => {
  let added_user_id = 0;
  let added_product_id = 0;
  let added_order_id = 0;
  describe('Order Model', () => {
    beforeAll(async () => {
      console.log('Set Up:');
      const user: User = {
        username: 'BridgetoTerabithia',
        first_name: 'Katherine',
        last_name: 'Paterson',
        password: 'password'
      };
      const stagedUser = await userStore.create(user);
      added_user_id = stagedUser.id as number;

      const p: Product = {
        name: 'sneaker',
        price: '200'
      };
      const stagedProduct = await productStore.create(p);
      added_product_id = stagedProduct.id as number;
    });
    afterAll(async () => {
      console.log('Tear Down:');
      await userStore.delete('1');
      await productStore.delete('1');
    });
    it('should have an index method', () => {
      expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderStore.delete).toBeDefined();
    });

    it('create method should add a order', async () => {
      const o: Order = {
        user_id: String(added_user_id),
        status: 'active'
      };
      const result = await orderStore.create(o);
      expect(result.user_id).toEqual(String(added_user_id));
      expect(result.status).toEqual('active');
      added_order_id = result.id as number;
    });

    it('index method should return a list of orders', async () => {
      const result = await orderStore.index();
      expect(result).toHaveSize(1);
    });

    it('show method should return the correct order', async () => {
      const result = await orderStore.show(String(added_order_id));
      expect(result.user_id).toEqual(String(added_user_id));
      expect(result.status).toEqual('active');
    });

    it('addProduct method should add the product into the order', async () => {
      const quantity = 1;
      const order_id = String(added_order_id);
      const product_id = String(added_product_id);
      const result = await orderStore.addProduct(
        quantity,
        order_id,
        product_id
      );

      expect(result.quantity).toEqual(quantity);
      expect(result.order_id).toEqual(order_id);
      expect(result.product_id).toEqual(String(product_id));
    });

    it('listProductsInOrder method should return a list of products in an order', async () => {
      const result = await orderStore.listProductsInOrder(
        String(added_order_id)
      );
      expect(result).toHaveSize(1);
    });

    it('removeProduct method should remove the product from the order', async () => {
      await orderStore.removeProduct(
        String(added_order_id),
        String(added_product_id)
      );
      const result = await orderStore.listProductsInOrder(
        String(added_order_id)
      );
      expect(result).toHaveSize(0);
    });

    it('delete method should remove the order', async () => {
      await orderStore.delete(String(added_order_id));
      const result = await orderStore.index();
      expect(result).toEqual([]);
    });
  });
});
