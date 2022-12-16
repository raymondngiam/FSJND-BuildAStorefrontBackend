CREATE TYPE orderStatusType AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status orderStatusType NOT NULL,

    user_id bigint  REFERENCES users(id)
);