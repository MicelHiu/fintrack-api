CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    role varchar(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name varchar(255) NOT NULL,
    type varchar(20) NOT NULL,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE accounts_type AS ENUM ('cash', 'bank', 'e-wallet');

ALTER TABLE accounts
ALTER COLUMN type TYPE accounts_type
USING type::accounts_type;

CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer');

CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name varchar(255) NOT NULL,
type varchar(20) NOT NULL,

	CONSTRAINT chk_category_type
		CHECK(type IN ('income', 'expense'))
);

CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES accounts(id),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    type transaction_type NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    description varchar(255) NOT NULL,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    month DATE NOT NULL,
    limit_amount NUMERIC(12, 2) NOT NULL
);