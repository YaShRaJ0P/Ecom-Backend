import express from "express";
import {
  AddProduct,
  GetProducts,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/admin/productController";
import { upload } from "../middlewares/Multer";

const router = express.Router();

// Route for saving a new product
router.post("/", upload.single("image"), (req, res) => AddProduct(req, res));

// Route to get all products
router.get("/", (req, res) => GetProducts(req, res));

// Route to get a product by id
router.get("/:id", (req, res) => GetProductById(req, res));

// Route to update a product
router.put("/:id", (req, res) => UpdateProduct(req, res));

// Route to delete a product
router.delete("/:id", (req, res) => DeleteProduct(req, res));

export default router;
