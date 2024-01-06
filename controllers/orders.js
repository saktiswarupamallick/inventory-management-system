import OrderModel from '../models/OrderModel.js';

// Create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

export { createOrder, getAllOrders, updateOrder, deleteOrder };
