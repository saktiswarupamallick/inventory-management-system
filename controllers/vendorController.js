import Vendor from "../models/VendorModel.js";
import { fileSizeFormatter } from "../utils/fileUpload.js";
import { v2 as cloudinary } from 'cloudinary'
import asyncHandler from "express-async-handler";



cloudinary.config({ 
  cloud_name: 'dnlzeoqtb', 
  api_key: '186687278764481', 
  api_secret: 't0hNu9RAft_k6OT4pPS2Rlc_qx0' 
});
// Create Prouct
export const createProduct = asyncHandler (async (req, res) => {
  const { name,email,phone,Address,paymentterm,bankname,bankaccount,description } = req.body;

  //   Validation
  if (!name || !email || !phone ||
     !Address ||!paymentterm ||!bankname 
     ||!bankaccount  || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "inventory",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Vendor.create({
    
    name,email,phone,Address,paymentterm,bankname,bankaccount,description,
    image: fileData,
  });

  res.status(201).json(product);
});





//get all products
export const getProducts = asyncHandler( async (req, res) => {
  const products = await Vendor.find({}).sort({ createdAt: -1 });;
  res.status(200).json(products);
});



// Get single product
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Vendor.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  
  res.status(200).json(product);
});

 

//delete controller
export const deleteProduct = asyncHandler( async (req, res) => {
  const product = await Vendor.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});




//upate product
export const updateProduct =asyncHandler( async (req, res) => {
  const { name,email,phone,Address,paymentterm,bankname,bankaccount,description } = req.body;
  const { id } = req.params;

  const product = await Vendor.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
 

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Vendor.findByIdAndUpdate(
    { _id: id },
    {
      name,email,phone,Address,paymentterm,bankname,bankaccount,description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});


