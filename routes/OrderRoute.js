import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.js';

const router = express.Router();

// Create a new order
router.post('/orders', createOrder);

// Get all orders
router.get('/orders', getAllOrders);

// Update an order
router.put('/orders/:id', updateOrder);

// Delete an order
router.delete('/orders/:id', deleteOrder);

export default router;
