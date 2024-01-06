import purchaseModel from '../models/purchaseModel.js';

// Create a new purchase
const createpurchase = async (req, res) => {
  try {
    const newpurchase = new purchaseModel(req.body);
    const savedpurchase = await newpurchase.save();
    res.status(201).json(savedpurchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

// Get all purchases
const getAllpurchases = async (req, res) => {
  try {
    const purchases = await purchaseModel.find();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

// Update an purchase
const updatepurchase = async (req, res) => {
  try {
    const updatedpurchase = await purchaseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedpurchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update purchase' });
  }
};

// Delete an purchase
const deletepurchase = async (req, res) => {
  try {
    const deletedpurchase = await purchaseModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedpurchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
};

export { createpurchase, getAllpurchases, updatepurchase, deletepurchase };
