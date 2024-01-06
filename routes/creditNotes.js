// routes/creditNotes.js
import express from 'express';
import {
  createcreditNote, getAllcreditNotes, updatecreditNote, deletecreditNote
} from '../controllers/creditNoteController.js';

const router = express.Router();

router.post('/creditnotes', createcreditNote);
router.put('/creditnotes/:id', updatecreditNote);
router.get('/creditnotes', getAllcreditNotes);
router.delete('/creditnotes/:id', deletecreditNote);

export default router;
