import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
	loadEnvFile(); // or use dotenv
}

import { Pool } from "pg";

export default new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});
