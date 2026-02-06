#! /usr/bin/env node

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item VARCHAR (255) NOT NULL,
  qty INT NOT NULL CHECK (qty >= 0),
  price INT NOT NULL CHECK (price >= 0),
  category_id INT NOT NULL,
  CONSTRAINT fk_category
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
            ON DELETE CASCADE
);

INSERT INTO categories (name) 
VALUES
  ('Weapons'),
  ('Armor'),
  ('Potions'),
  ('Scrolls'),
  ('Tools')
ON CONFLICT (name) DO NOTHING;

INSERT INTO inventory (item, qty, price, category_id)
VALUES
  ('Iron Sword', 10, 150, 1),
  ('Elvish Bow', 2, 650, 1),
  ('Daedric Mace', 1, 2200, 1),
  ('Steel Shield', 5, 300, 2),
  ('Ebony Helmet', 1, 1400, 2),
  ('Health Potion', 25, 50, 3),
  ('Mana Potion', 25, 50, 3),
  ('Fireball Scroll', 8, 200, 4),
  ('Lightning Scroll', 8, 200, 4),
  ('Lockpick', 90, 5, 5);
  `;

async function main() {
	const client = new Client({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	});

	try {
		console.log("seeding...");

		await client.connect();

		// START TRANSACTION
		await client.query("BEGIN");

		await client.query(SQL);

		// ALL GOOD → COMMIT
		await client.query("COMMIT");

		console.log("done");
	} catch (err) {
		// SOMETHING FAILED → ROLLBACK
		console.error("seed failed, rolling back", err.message);

		await client.query("ROLLBACK");
	} finally {
		await client.end();
	}
}

main();
