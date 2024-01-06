import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  orderdate: {
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
  products: [{
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    taxRate: { type: Number },
  }],
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;