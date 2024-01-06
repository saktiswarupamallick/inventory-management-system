import express from 'express';
import {
  createpurchase,
  getAllpurchases,
  updatepurchase,
  deletepurchase,
} from '../controllers/purchase.js';

const router = express.Router();

// Create a new purchase
router.post('/purchases', createpurchase);

// Get all purchases
router.get('/purchases', getAllpurchases);

// Update an purchase
router.put('/purchases/:id', updatepurchase);

// Delete an purchase
router.delete('/purchases/:id', deletepurchase);

export default router;
