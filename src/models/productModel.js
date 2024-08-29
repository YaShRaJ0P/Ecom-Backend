import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide product name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please provide price"],
    },
    description: {
      type: String,
      required: [true, "please provide product desccription"],
    },
    photos: [
      {
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "please select category"],
      enum: {
        values: ["hoodies", "shirts", "pants"],
        message: "please select categores from enums",
      },
    },
    sizes: {
      type: [String], // Example: ['S', 'M', 'L', 'XL']
      required: true,
    },
    colors: {
      type: [String], // Example: ['Red', 'Blue', 'Green']
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: String,
      required: [true, "please provide a brand"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    NumberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },

        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const productmodel = mongoose.model("Product", productSchema);

export default productmodel;
