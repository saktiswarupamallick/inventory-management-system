import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Deliverto:{ type: String, required: true},
  purchasedate: {
    type: Date,
    required: true,
    trim: true
  },
  expectedshipmentdate: {
    type: Date,
    required: true,
    trim: true
  },
  Paymentterms: { type: String, required: true },
  deliverymethod: { type: String, required: true },
  discount:{ type: Number},
  products: [{
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    taxRate: { type: Number },
    
  }],
});

const purchaseModel = mongoose.model('Purchase', purchaseSchema);

export default purchaseModel;