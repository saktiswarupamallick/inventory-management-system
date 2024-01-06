import mongoose from 'mongoose';

const deliverychallanSchema = new mongoose.Schema({
  
  clientName: { type: String, required: true },
  Deliverno:{ type: String, required: true},
  deliverychallandate: {
    type: Date,
    required: true,
    trim: true
  },
  challantype: {
    type: String,
    required: true,
    trim: true
  },
  Reference: { type: String, required: true },
  status: { type: String, required: true },
  
  products: [{
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    taxRate: { type: Number },
    discount:{ type: Number},
  }],
});

const deliverychallanModel = mongoose.model('Deliverychallan', deliverychallanSchema);

export default deliverychallanModel;

