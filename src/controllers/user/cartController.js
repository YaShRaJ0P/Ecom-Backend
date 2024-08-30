import Product from "../models/productModel";
import User from "../models/userModel";

// Add product to cart
export const AddToCart = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { id: productId, quantity, size, color } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate input
    if (!userId || !productId || !quantity || !size || !color) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate quantity
    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    // Check if the item is already in the cart
    const existingCartItem = user.cartList.find(
      (cartItem) =>
        cartItem.productId.toString() === productId &&
        cartItem.size === size &&
        cartItem.color === color
    );

    if (existingCartItem) {
      // Update the quantity if item already in cart
      existingCartItem.quantity = quantity;
    } else {
      // Add new item to cart
      const newCartItem = {
        productId,
        quantity,
        size,
        color,
      };
      user.cartList.push(newCartItem);
    }

    await user.save();
    return res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Get products in cart
export const GetCartProducts = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user and populate cartList with product details
    const user = await User.findById(userId).populate("cartList.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract cartList from user
    const cartProducts = user.cartList.map((cartItem) => ({
      product: cartItem.productId,
      quantity: cartItem.quantity,
      size: cartItem.size,
      color: cartItem.color,
    }));

    return res.status(200).json({ count: cartProducts.length, cartProducts });
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

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).populate("cartList.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cartList.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    user.cartList.splice(cartItemIndex, 1);
    await user.save();

    return res.status(200).json({ message: "Removed from Cart." });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};

// Update quantity in cart
export const UpdateQuantity = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const user = await User.findById(userId).populate("cartList.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cartList.find(
      (item) => item._id.toString() === cartItemId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = cartItem.productId;

    // Check stock availability
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    cartItem.quantity = quantity;
    await user.save();

    return res.status(200).json({ message: "Quantity Updated" });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};

// Empty the cart
export const emptyCart = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    const user = await User.findById(userId).populate("cartList.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartList = [];
    await user.save();

    return res.status(200).json({ message: "Cart emptied successfully." });
  } catch (error) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};
