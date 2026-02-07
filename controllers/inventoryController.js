import inventoryModel from "../models/inventoryModel.js";

async function getIndex(req, res) {
	const { search } = req.query;

	let items;
	if (search) {
		items = await inventoryModel.searchItems(search);
	} else {
		items = await inventoryModel.getAllItems();
	}

	res.render("index", { items });
}

async function getAddItemForm(req, res) {
	res.render("addItem");
}

async function postAddItem(req, res) {
	const { item } = req.body;
	await inventoryModel.addItem(item);

	res.redirect("/");
}

async function getItem(req, res) {
	const { id } = req.params;
	const item = await inventoryModel.getItem(id);

	if (!item) {
		return res.status(404).render("404");
	}

	res.render("item", { item });
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

export {
	getIndex,
	getAddItemForm,
	postAddItem,
	getItem,
	postEditItem,
	postDeleteItem,
};
