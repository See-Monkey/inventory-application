import express from "express";
const router = express.Router();

import inventoryController from "../controllers/inventoryController.js";
import categoryController from "../controllers/categoryController.js";

router.get("/", inventoryController.getIndex);

router.get("/new", inventoryController.getAddItemForm);
router.post("/new", inventoryController.postAddItem);

router.get("/item/:id", inventoryController.getItem);
router.post("/item/:id", inventoryController.postEditItem);

router.post("/item/:id/delete", inventoryController.postDeleteItem);

router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.postAddCategory);

router.post("/categories/:id/delete", categoryController.postDeleteCategory);

export default router;
