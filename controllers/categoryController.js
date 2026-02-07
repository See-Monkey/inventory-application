import inventoryModel from "../models/inventoryModel.js";

async function getCategories(req, res) {
	const categories = await inventoryModel.getAllCategories();

	res.render("categories", { categories });
}

async function postAddCategory(req, res) {
	const { category } = req.body;
	await inventoryModel.addCategory(category);

	res.redirect("/categories");
}

async function postDeleteCategory(req, res) {
	const { id } = req.params;
	await inventoryModel.deleteCategory(id);

	res.redirect("/categories");
}

export { getCategories, postAddCategory, postDeleteCategory };
