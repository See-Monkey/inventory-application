import inventoryModel from "../models/inventoryModel.js";

async function getIndex(req, res) {
	const {
		search = "",
		category = "",
		sort = "category",
		order = "asc",
	} = req.query;

	const items = await inventoryModel.getFilteredItems({
		search,
		category,
		sort,
		order,
	});

	const categories = await inventoryModel.getAllCategories();

	res.render("index", {
		items,
		categories,
		filters: { search, category, sort, order },
	});
}

async function getAddItemForm(req, res) {
	const categories = await inventoryModel.getAllCategories();

	res.render("addItem", { categories });
}

async function postAddItem(req, res) {
	const { item, qty, price, category } = req.body;
	await inventoryModel.addItem(item, qty, price, category);

	res.redirect("/");
}

async function getItem(req, res) {
	const { id } = req.params;
	const item = await inventoryModel.getItem(id);

	if (!item) {
		return res.status(404).render("404");
	}

	const categories = await inventoryModel.getAllCategories();

	res.render("item", { item, categories });
}

async function postEditItem(req, res) {
	const { id } = req.params;
	const { item, qty, price, category } = req.body;
	await inventoryModel.editItem(id, item, qty, price, category);

	res.redirect("/");
}

async function postDeleteItem(req, res) {
	const { id } = req.params;
	await inventoryModel.deleteItem(id);

	res.redirect("/");
}

export default {
	getIndex,
	getAddItemForm,
	postAddItem,
	getItem,
	postEditItem,
	postDeleteItem,
};
