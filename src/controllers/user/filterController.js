import Product from "../models/productModel";

export const GetFilteredProducts = async (req, res) => {
  try {
    // Get query parameters
    const { category, minPrice, maxPrice, sort } = req.query;

    // Build the filter object
    const filter = {};

    // Filter by category if provided
    if (category) {
      filter.category = category;
    }

    // Filter by price range if provided
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: parseInt(maxPrice) };
    }

    // Define the sort option for price only
    let sortOption = {};
    if (sort === "price-asc") {
      sortOption.price = 1; // Sort by price ascending
    } else if (sort === "price-desc") {
      sortOption.price = -1; // Sort by price descending
    }

    // Fetch filtered and sorted products
    const products = await Product.find(filter).sort(sortOption);

    // Send the response with the filtered products
    return res.status(200).json({ count: products.length, products });
  } catch (err) {
    console.error(`Server error: ${err}`);
    return res.status(500).json({ message: "Server Error." });
  }
};