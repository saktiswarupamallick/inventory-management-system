// routes/companyRoutes.js
import express from 'express';
import Company from "../models/CompanyModel.js";

const router = express.Router();

// Create a new company
router.post('/company', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get company details
router.get('/company', async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update company details
router.put('/company', async (req, res) => {
  try {
    const updatedCompany = await Company.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
