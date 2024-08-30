import Product from "../../models/productModel";

// Add a new product
export const AddProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      type,
      description,
      price,
      stock,
      sizes,
      colors,
    } = req.body;

    // Validate input
    if (
      !name ||
      !category ||
      !subcategory ||
      !type ||
      !description ||
      !price ||
      !stock ||
      !sizes ||
      !colors
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const imageFiles = req.files; // req.files will contain all uploaded images
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Extract image paths or URLs (depends on upload configuration)
    const imagePaths = imageFiles.map((file) => file.path);

    const product = new Product({
      name,
      category,
      subcategory,
      type,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      sizes,
      colors,
      images: imagePaths,
    });

    const savedProduct = await product.save();
    return res.status(201).send({ product: savedProduct });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Get all products
export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send({ count: products.length, products });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Get a product by ID
export const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    return res.status(200).send(product);
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Update a product
export const UpdateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      type,
      description,
      price,
      stock,
      sizes,
      colors,
    } = req.body;

    // Validate input (allow partial updates)
    if (
      !name ||
      !category ||
      !subcategory ||
      !type ||
      !description ||
      !price ||
      !stock ||
      !sizes ||
      !colors
    ) {
      return res
        .status(400)
        .send({ message: "At least one field is required to update." });
    }

    const imageFiles = req.files; // req.files will contain all uploaded images
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Extract image paths or URLs (depends on upload configuration)
    const imagePaths = imageFiles.map((file) => file.path);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        subcategory,
        type,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        sizes,
        colors,
        images: imagePaths,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found." });
    }

    return res.status(200).send({ message: "Product Updated Successfully." });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};

// Delete a product
export const DeleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Product not found." });
    }
    return res.status(200).send({ message: "Product Deleted Successfully." });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).send({ message: "Server Error." });
  }
};
