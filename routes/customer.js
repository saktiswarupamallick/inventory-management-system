import express from 'express';
import {
  createcustomer,
  getAllcustomers,
  updatecustomer,
  deletecustomer,
} from '../controllers/customer.js';

const router = express.Router();

// Create a new customer
router.post('/customers', createcustomer);

// Get all customers
router.get('/customers', getAllcustomers);

// Update an customer
router.put('/customers/:id', updatecustomer);

// Delete an customer
router.delete('/customers/:id', deletecustomer);

export default router;
