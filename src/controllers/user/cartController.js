import Cart from "../models/cartModel";
import Product from "../models/productModel";
import User from "../models/userModel";

// Add product to cart
export const AddToCart = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { id: productId, quantity, size, color } = req.body;

    // Validate input
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability for the specified size
    if (quantity > product.stock[size]) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    // Check if user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        size,
        color,
      });
    }

    await cart.save(); // Pre-save middleware will update totalPrice and totalItems
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Get cart products
export const GetCartProducts = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find cart for the user and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ cart });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};

// Remove product from cart
export const RemoveFromCart = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const cartItemId = req.params.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save(); // Pre-save middleware will update totalPrice and totalItems

    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};

// Update item quantity in cart
export const UpdateQuantity = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item._id.toString() === cartItemId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Check stock availability
    const product = await Product.findById(cartItem.productId);
    if (quantity > product.stock[cartItem.size]) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    cartItem.quantity = quantity;
    await cart.save(); // Pre-save middleware will update totalPrice and totalItems

    return res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};

// Empty the cart
export const EmptyCart = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save(); // Pre-save middleware will reset totalPrice and totalItems to 0

    return res.status(200).json({ message: "Cart emptied successfully", cart });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};
