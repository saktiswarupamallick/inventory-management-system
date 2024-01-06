import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    type:{
      type: String,
      required: [true, "Please add a type"],
      
    },
    unit:{
      type: String,
      
    },
    manufacturer:{
      type: String,
    },
    upc:{
      type: Number,
    },
    mpn:{
      type: Number,
    },
    ean:{
      type: Number,
    },
    isbn:{
      type: Number,
    },
    sp:{
      type: Number,
      required: true,
    },
    cp:{
      type: Number,
      required: true,
    },
    vendor:{
      type: String,
    },
    weight:{
      type: Number,
    },
    brand: {
      type: String,
    
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    
    description: {
      type: String,
     
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Products", productSchema);