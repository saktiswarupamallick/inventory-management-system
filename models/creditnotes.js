// models/CreditNote.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  taxRate: Number,
  price: Number,
});

const creditNoteSchema = new mongoose.Schema({
  clientName: String,
  creditNoteNo: String,
  Reference: String,
  creditNoteDate: Date,
  warehouseName: String,
  products: [productSchema],
  status:String,
  discount: Number,
});

const creditNoteModel = mongoose.model('CreditNote', creditNoteSchema);
export default creditNoteModel



