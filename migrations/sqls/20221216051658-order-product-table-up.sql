CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer DEFAULT 1,
    
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);