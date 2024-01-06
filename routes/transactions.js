import express from "express";

import { addExpense, getExpense, deleteExpense}  from '../controllers/expense.js';
import { addIncome, getIncomes, deleteIncome} from '../controllers/income.js';

const router = express.Router();


router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes)
router.delete('/delete-income/:id', deleteIncome)
router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);


export default router;