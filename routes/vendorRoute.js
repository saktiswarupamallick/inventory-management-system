import express from "express";

import {
  
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/vendorController.js";

import { upload } from "../utils/fileUpload.js";

const router = express.Router();

router.post("/",  upload.single("image"), createProduct);
router.patch("/:id",  upload.single("image"), updateProduct);
router.get("/",  getProducts);
router.get("/:id", getProduct);
router.delete("/:id",  deleteProduct);

export default router;