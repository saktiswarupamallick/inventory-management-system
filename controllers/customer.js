import customerModel from '../models/customerModel.js';

// Create a new customer
const createcustomer = async (req, res) => {
  try {
    const newcustomer = new customerModel(req.body);
    const savedcustomer = await newcustomer.save();
    res.status(201).json(savedcustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Get all customers
const getAllcustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

// Update an customer
const updatecustomer = async (req, res) => {
  try {
    const updatedcustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedcustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete an 
const deletecustomer = async (req, res) => {
  try {
    const deletedcustomer = await customerModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedcustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

export { createcustomer, getAllcustomers, updatecustomer, deletecustomer };
