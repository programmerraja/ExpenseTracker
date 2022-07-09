const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction,editTransaction } = require('../controllers/transactions');

router
  .route('/')
  .post(addTransaction);

router
  .route('/:id')
  .get(getTransactions)

router
  .route('/delete')
  .post(deleteTransaction);

router
  .route('/edit')
  .post(editTransaction);
module.exports = router;