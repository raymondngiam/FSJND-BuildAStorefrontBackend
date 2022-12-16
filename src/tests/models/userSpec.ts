import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('Model testing', () => {
  let added_id = 0;
  describe('User Model', () => {
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

    it('create method should add a user', async () => {
      const user: User = {
        username: 'BridgetoTerabithia',
        first_name: 'Katherine',
        last_name: 'Paterson',
        password: 'password'
      };
      const result = await store.create(user);
      expect(result.username).toEqual('BridgetoTerabithia');
      expect(result.first_name).toEqual('Katherine');
      expect(result.last_name).toEqual('Paterson');
      expect(result.password_digest).toBeDefined();

      added_id = result.id as number;
    });

    it('index method should return a list of users', async () => {
      const result = await store.index();
      expect(result).toHaveSize(1);
    });

    it('show method should return the correct user', async () => {
      const result = await store.show(String(added_id));
      expect(result.username).toEqual('BridgetoTerabithia');
      expect(result.first_name).toEqual('Katherine');
      expect(result.last_name).toEqual('Paterson');
      expect(result.password_digest).toBeDefined();
    });

    it('authenticate method should return an user on success', async () => {
      const user: User = {
        username: 'BridgetoTerabithia',
        first_name: 'Katherine',
        last_name: 'Paterson',
        password: 'password'
      };
      const result = await store.authenticate(
        user.username,
        user.password as string
      );
      expect(result).not.toBe(null);
    });

    it('authenticate method should return null on failure', async () => {
      const user: User = {
        username: 'BridgetoTerabithia',
        first_name: 'Katherine',
        last_name: 'Paterson',
        password: 'wrong_password'
      };
      const result = await store.authenticate(
        user.username,
        user.password as string
      );
      expect(result).toBe(null);
    });

    it('delete method should remove the user', async () => {
      await store.delete(String(added_id));
      const result = await store.index();
      expect(result).toEqual([]);
    });
  });
});
