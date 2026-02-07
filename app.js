import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
	loadEnvFile();
}

import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", inventoryRoutes);

app.use((req, res) => {
	res.status(404).render("404");
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
