import createHttpError from "http-errors";
import productmodel from "../../models/productModel.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      colors,
      stock,
      brands,
      ratings,
      NumberOfReviews,
      reviews,
    } = req.body;
    // Validate category
    const validCategories = ["hoodies", "shirts", "pants"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid category",
      });
    }

    // Get images
    let images = req.files.photos;

    if (images) {
      for (let index = 0; index < images.length; index++) {
        let result = await uploadOnCloudinary(images[index].path, "products");

        console.log(result);

        imageArray.push({
          id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    }

    //call db

    const product = await productmodel.create({
      name,
      price,
      description,
      category,
      sizes,
      colors,
      stock,
      brands,
      ratings,
      NumberOfReviews,
      reviews,
      images: imageArray,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      product,
      message: "product created successfully",
    });
  } catch (error) {
    return next(createHttpError(400, "error while creating product data"));
  }
};

export { addProduct };
