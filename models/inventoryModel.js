import query from "../db/query.js";

/* === INVENTORY === */

async function getAllItems() {
	const { rows } = await query(`
		SELECT inventory.id,
		       inventory.item,
		       inventory.qty,
		       inventory.price,
		       categories.name AS category
		FROM inventory
		JOIN categories
		  ON inventory.category_id = categories.id
		ORDER BY inventory.item;
	`);

	return rows;
}

async function searchItems(search) {
	const { rows } = await query(
		`
		SELECT inventory.id,
		       inventory.item,
		       inventory.qty,
		       inventory.price,
		       categories.name AS category
		FROM inventory
		JOIN categories
		  ON inventory.category_id = categories.id
		WHERE inventory.item ILIKE $1
		ORDER BY inventory.item;
	`,
		[`%${search}%`],
	);

	return rows;
}

async function getItem(id) {
	const { rows } = await query(
		`
		SELECT inventory.id,
		       inventory.item,
		       inventory.qty,
		       inventory.price,
		       categories.id   AS category_id,
		       categories.name AS category
		FROM inventory
		JOIN categories
		  ON inventory.category_id = categories.id
		WHERE inventory.id = $1;
	`,
		[id],
	);

	return rows[0] ?? null;
}

async function addItem(item, qty, price, category) {
	await query(
		`
		INSERT INTO inventory (item, qty, price, category_id)
		VALUES ($1, $2, $3, $4);
	`,
		[item, qty, price, category],
	);
}

async function editItem(id, item, qty, price, category) {
	await query(
		`
		UPDATE inventory
		SET item = $1,
		    qty = $2,
		    price = $3,
		    category_id = $4
		WHERE id = $5;
	`,
		[item, qty, price, category, id],
	);
}

async function deleteItem(id) {
	await query(
		`
		DELETE FROM inventory
		WHERE id = $1;
	`,
		[id],
	);
}

/* === CATEGORIES === */

async function getAllCategories() {
	const { rows } = await query(`
		SELECT id, name
		FROM categories
		ORDER BY name;
	`);

	return rows;
}

async function addCategory(name) {
	await query(
		`
		INSERT INTO categories (name)
		VALUES ($1)
		ON CONFLICT (name) DO NOTHING;
	`,
		[name],
	);
}

async function deleteCategory(id) {
	await query(
		`
		DELETE FROM categories
		WHERE id = $1;
	`,
		[id],
	);
}

export default {
	getAllItems,
	searchItems,
	getItem,
	addItem,
	editItem,
	deleteItem,
	getAllCategories,
	addCategory,
	deleteCategory,
};
