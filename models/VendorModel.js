import mongoose from "mongoose";


const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required:  [true, "Please add a E-mail"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Please add phone no."],
      trim: true,
    },
    Address: {
      type: String,
      required: [true, "Please add a Address"],
      trim: true,
    },
    paymentterm: {
      type: String,
      required: [true, "Please add a paymentTerm"],
      trim: true,
    },
    bankname: {
      type: String,
      trim: true,
    },
    bankaccount: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchema);