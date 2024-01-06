import deliverychallanModel from '../models/Deliverychalan.js';

// Create a new deliverychallan
const createdeliverychallan = async (req, res) => {
  try {
    const newdeliverychallan = new deliverychallanModel(req.body);
    const saveddeliverychallan = await newdeliverychallan.save();
    res.status(201).json(saveddeliverychallan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create deliverychallan' });
  }
};

// Get all deliverychallans
const getAlldeliverychallans = async (req, res) => {
  try {
    const deliverychallans = await deliverychallanModel.find();
    res.status(200).json(deliverychallans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliverychallans' });
  }
};

// Update an deliverychallan
const updatedeliverychallan = async (req, res) => {
  try {
    const updateddeliverychallan = await deliverychallanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateddeliverychallan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deliverychallan' });
  }
};

// Delete an deliverychallan
const deletedeliverychallan = async (req, res) => {
  try {
    const deleteddeliverychallan = await deliverychallanModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteddeliverychallan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deliverychallan' });
  }
};

export { createdeliverychallan, getAlldeliverychallans, updatedeliverychallan, deletedeliverychallan };
