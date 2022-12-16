import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Model testing', () => {
  let added_id = 0;
  describe('Product Model', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
      const p: Product = {
        name: 'sneaker',
        price: '200'
      };
      const result = await store.create(p);
      expect(result.name).toEqual('sneaker');
      expect(result.price).toEqual('200');

      added_id = result.id as number;
    });

    it('index method should return a list of products', async () => {
      const result = await store.index();
      expect(result).toHaveSize(1);
    });

    it('show method should return the correct product', async () => {
      const result = await store.show(String(added_id));
      expect(result.name).toEqual('sneaker');
      expect(result.price).toEqual('200');
    });

    it('delete method should remove the product', async () => {
      await store.delete(String(added_id));
      const result = await store.index();

      expect(result).toEqual([]);
    });
  });
});
