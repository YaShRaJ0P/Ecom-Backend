import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    subcategory: {
      type: String,
      enum: [
        "Topwear",
        "Bottomwear",
        "Footwear",
        "Accessories",
        "Sportswear",
        "Ethnic Wear",
        "Western Wear",
      ],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      mrp: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      sellingPrice: {
        type: Number,
        required: true,
      },
    },
    images: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    stock: {
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
    },
    ratings: {
      averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      numberOfReviews: {
        type: Number,
        default: 0,
      },
      userReview: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
          },
          review: {
            type: String,
          },
        },
      ],
    },
    // specifications: {
    //   material: String,
    //   fit: String,
    //   pattern: String,
    //   careInstructions: String,
    // },
    delivery: {
      freeDelivery: {
        type: Boolean,
        default: false,
      },
      deliveryTime: {
        type: String,
        default: "5-7 days",
      },
      deliveryPrice: {
        type: Number,
        default: 100,
      },
    },
    returnPolicy: {
      type: String,
      default: "30-day return policy",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
