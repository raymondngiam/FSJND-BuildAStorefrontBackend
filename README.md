### FSJND - Build A Storefront Backend

---

#### How to build

```shell
$ git clone https://github.com/raymondngiam/FSJND-BuildAStorefrontBackend.git
$ cd FSJND-BuildAStorefrontBackend
$ npm install
$ npm run build
```

#### Setup database

1. Start a terminal and change user to `postgres`

    ```shell
    $ sudo -iu postgres
    postgres $ 
    ```

1. Start `psql`

    ```shell
    postgres $ psql
    postgres=# 
    ```

1. Create a new user `shopping_user` in the `psql` prompt with the following command:

    ```psql
    postgres=# CREATE USER shopping_user WITH PASSWORD 'password123';
    ```

1. Create two databases

    ```psql
    postgres=# CREATE DATABASE shopping_dev;
    postgres=# CREATE DATABASE shopping_test;
    ```

1. Connect to the database `shopping_dev`

    ```psql
    postgres=# \c shopping_dev
    You are now connected to database "shopping_dev" as user "postgres".
    shopping_dev=#
    ```

1. Grant permission on `SCHEMA` (of the current database) to the user:

    ```psql
    shopping_dev=# GRANT ALL ON SCHEMA public TO shopping_user;
    ```

1. Connect to the database `shopping_test`

    ```psql
    postgres=# \c shopping_test
    You are now connected to database "shopping_test" as user "postgres".
    shopping_test=#
    ```

1. Grant permission on `SCHEMA` (of the current database) to the user:

    ```psql
    shopping_test=# GRANT ALL ON SCHEMA public TO shopping_user;
    ```

1. Quit `psql`

    ```psql
    shopping_test=# \q
    ```

#### Running migrations

1. To setup the migration:

    ```shell
    $ db-migrate --env dev up
    ```

1. To tear down the migration:

    ```shell
    $ db-migrate --env dev reset
    ```

#### How to run test and start up the server

```shell
$ npm run test
$ node dist/server.js
```