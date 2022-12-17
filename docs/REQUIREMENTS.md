# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

---

## API Endpoints
#### Products
- Index: `[GET] '/products' `
- Show: `[GET] '/products/:id'`
- Create: `[POST] '/products'` **[token required]**
- Delete: `[DELETE] '/products'` **[token required]**
- Top 5 most popular products: `[GET] '/five-most-popular'`

#### Users
- Index: `[GET] '/users'` **[token required]**
- Show: `[GET] '/users/:id'` **[token required]**
- Create: `[POST] '/users'` **[token required]**
- Delete: `[DELETE] '/users'` **[token required]**
- Authenticate: `[POST] '/users/authenticate'`

#### Orders
- Index: `[GET] '/orders'` **[token required]**
- Show: `[GET] '/orders/:id'` **[token required]**
- Create: `[POST] '/orders'` **[token required]**
- Delete: `[DELETE] '/orders'` **[token required]**
- Current Order by user `[GET] '/orders/current/:user_id'` **[token required]**

---

## Data Shapes
#### Product
-  id
- name
- price

```sql
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL
);
```

#### User
- id
- username
- first_name
- last_name
- password_digest

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_digest VARCHAR(100) NOT NULL
);
```

#### Orders
- id
- user_id
- status of order (active or complete)

```sql
CREATE TYPE orderStatusType AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status orderStatusType NOT NULL
);
```

#### OrderProducts
- id
- order_id
- product_id
- quantity

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer DEFAULT 1
);
```