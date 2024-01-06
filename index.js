import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import companyRoutes from './controllers/companyControllers.js'
import productRoutes from "./routes/productRoutes.js";
import vendorRoutes from "./routes/vendorRoute.js";
import customerRoutes from "./routes/customer.js";
import purchaseRoute from "./routes/purchaseRoute.js"
import router from './routes/OrderRoute.js';
import deliverychallan from './routes/Deliverychallan.js';
import nodemailer from 'nodemailer';
import {URL} from 'url'
import path from"path";
import creditNoteRoutes from './routes/creditNotes.js';

const __dirname = decodeURI(new URL('.', import.meta.url).pathname)




/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




/* ROUTES */

app.use("/api/products", productRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api", customerRoutes);
app.use('/api/purchase', purchaseRoute);
app.use('/api/deliverychallan', deliverychallan);
app.use('/api', router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api', companyRoutes);
app.use('/credit-notes', creditNoteRoutes);



// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'saktiswarupamallick@gmail.com',
    pass: 'saktiswarupamallick@2003',
  },
});

// API endpoint to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'saktiswarupamallick@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});





/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    
  })
  .catch((error) => console.log(`${error} did not connect`));
