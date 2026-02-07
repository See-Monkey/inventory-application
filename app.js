import { loadEnvFile } from "node:process";

if (process.env.NODE_ENV !== "production") {
	loadEnvFile();
}

const express = require("express");
const path = require("path");

const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", inventoryRoutes);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
