import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add a E-mail"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Please add phone no."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please add a Address"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a paymentTerm"],
    trim: true,
  },
  customertype: {
    type: String,
    required: [true, "Please add a paymentTerm"],
    trim: true,
  },
  
},
{
    timestamps: true,
  }
);

const customer = mongoose.model('Customer', customerSchema);

export default customer;