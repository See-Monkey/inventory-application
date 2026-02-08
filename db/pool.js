import { loadEnvFile } from "node:process";
import { Pool } from "pg";

if (process.env.NODE_ENV !== "production") {
	loadEnvFile(); // or dotenv
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl:
		process.env.NODE_ENV === "production"
			? { rejectUnauthorized: false }
			: false,
});

export default pool;
