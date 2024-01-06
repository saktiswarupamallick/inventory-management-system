import creditNoteModel from '../models/creditnotes.js';

// Create a new creditNote
const createcreditNote = async (req, res) => {
  try {
    const newcreditNote = new creditNoteModel(req.body);
    const savedcreditNote = await newcreditNote.save();
    res.status(201).json(savedcreditNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create creditNote' });
  }
};

// Get all creditNotes
const getAllcreditNotes = async (req, res) => {
  try {
    const creditNotes = await creditNoteModel.find();
    res.status(200).json(creditNotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch creditNotes' });
  }
};

// Update an creditNote
const updatecreditNote = async (req, res) => {
  try {
    const updatedcreditNote = await creditNoteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedcreditNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update creditNote' });
  }
};

// Delete an 
const deletecreditNote = async (req, res) => {
  try {
    const deletedcreditNote = await creditNoteModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedcreditNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete creditNote' });
  }
};

export { createcreditNote, getAllcreditNotes, updatecreditNote, deletecreditNote };
