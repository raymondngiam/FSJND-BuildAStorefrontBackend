CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_digest VARCHAR(100) NOT NULL
);

INSERT INTO users(
    username, 
    first_name, 
    last_name, 
    password_digest) 
VALUES(
    'admin',
    'admin',
    'admin',
    '$2b$10$9J/g1ERNGnxvqIvo6q6louyROYveY6wGtFP93WAf2o3IocoIOnTGq');