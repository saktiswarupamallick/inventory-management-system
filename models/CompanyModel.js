// models/Company.js
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: String,
  address: String,
  phone: Number,
  email: String,
  gstin: String,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
