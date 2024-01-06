import express from 'express';
import {
  createdeliverychallan,
  getAlldeliverychallans,
  updatedeliverychallan,
  deletedeliverychallan,
} from '../controllers/Deliverychallan.js';

const router = express.Router();

// Create a new deliverychallan
router.post('/deliverychallans', createdeliverychallan);

// Get all deliverychallans
router.get('/deliverychallans', getAlldeliverychallans);

// Update an deliverychallan
router.put('/deliverychallans/:id', updatedeliverychallan);

// Delete an deliverychallan
router.delete('/deliverychallans/:id', deletedeliverychallan);

export default router;
