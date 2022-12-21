import { DashboardQueries } from '../../services/dashboard';
import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const dashboardQueries = new DashboardQueries();
const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

interface Dictionary<TValue> {
  [Key: number]: TValue;
}
let added_user_id = 0;
let added_order_id = 0;
const added_product_ids: Dictionary<number> = {};

async function StageDatabase(
  added_user_id: number,
  added_product_ids: Dictionary<number>,
  added_order_id: number
) {
  const user: User = {
    username: 'BridgetoTerabithia',
    first_name: 'Katherine',
    last_name: 'Paterson',
    password: 'password'
  };
  const stagedUser = await userStore.create(user);
  added_user_id = stagedUser.id as number;

  const items = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

  await Promise.all(
    items.map(async (x, i) => {
      const p: Product = {
        name: x,
        price: '10'
      };
      const stagedProduct = await productStore.create(p);
      added_product_ids[i] = stagedProduct.id as number;
      console.log(`${stagedProduct.id}`);
    })
  );
  const products = await productStore.index();

  console.log(`Done staging ${products.length} products`);

  const order: Order = {
    status: 'active',
    user_id: String(added_user_id)
  };
  const stagedOrder = await orderStore.create(order);
  added_order_id = stagedOrder.id as number;
  console.log(`Done staging order ${added_order_id}`);

  const quantities = [1, 2, 3, 4, 5, 6];
  const pairs: [number, number][] = [];
  await Promise.all(
    quantities.map((_, i) => {
      pairs.push([added_product_ids[i], quantities[i]]);
    })
  );
  await Promise.all(
    pairs.map(async (pair) => {
      const p_id = pair[0];
      const quantity = pair[1];
      await orderStore.addProduct(
        quantity,
        String(added_order_id),
        String(p_id)
      );
      console.log(
        `OrderId:${added_order_id}, ProductId:${p_id}, Qty:${quantity}`
      );
    })
  );
  console.log(`Done staging order products`);
  return { added_user_id, added_order_id };
}

async function TearDownDatabase(
  added_order_id: number,
  added_product_ids: Dictionary<number>,
  added_user_id: number
) {
  await Promise.all(
    Object.entries(added_product_ids).map(async ([key, value]) => {
      console.log(`${added_order_id}:${key}:${value}`);
      await orderStore.removeProduct(String(added_order_id), String(value));
    })
  );
  console.log('Done removing products from order');

  await Promise.all(
    Object.entries(added_product_ids).map(async ([key, value]) => {
      console.log(`${key}:${value}`);
      await productStore.delete(String(value));
    })
  );
  console.log('Done removing products');

  await orderStore.delete(String(added_order_id));
  console.log('Done removing orders');
  await userStore.delete(String(added_user_id));
  console.log('Done removing users');
}

describe('Service testing', () => {
  describe('DashboardQueries Service', () => {
    beforeAll(async () => {
      console.log('Set Up:');
      ({ added_user_id, added_order_id } = await StageDatabase(
        added_user_id,
        added_product_ids,
        added_order_id
      ));
    });
    afterAll(async () => {
      console.log('Tear Down:');
      await TearDownDatabase(added_order_id, added_product_ids, added_user_id);
    });
    it('fiveMostPopular method should return the top 5 products sorted by sum of quantity purchased, in descending order', async () => {
      const result = await dashboardQueries.fiveMostPopular();
      expect(result).toHaveSize(5);
      expect(result[0].name).toEqual('item6');
      expect(result[1].name).toEqual('item5');
      expect(result[2].name).toEqual('item4');
      expect(result[3].name).toEqual('item3');
      expect(result[4].name).toEqual('item2');
    });
  });
});
