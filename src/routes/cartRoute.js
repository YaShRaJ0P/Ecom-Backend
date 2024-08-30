import express from "express";
import { AddToCart, GetCartProducts, RemoveFromCart, UpdateQuantity, emptyCart } from '../controllers/user/cartController';

const router = express.Router();

// Route for saving a new product
router.post("/", (req, res) => AddToCart(req, res));

// Route to get all products
router.get("/", (req, res) => GetCartProducts(req, res));

// Route to delete a product
router.delete("/:id", (req, res) => RemoveFromCart(req, res));

//Route to update quantity
router.patch("/:id", (req, res) => UpdateQuantity(req, res));

//Route to empty cart
router.post("/empty", (req, res) => emptyCart(req, res));

export default router;
