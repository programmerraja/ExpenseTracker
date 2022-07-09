const express = require('express');
const router = express.Router();
const { getMonths,editMonth, addMonth, deleteMonth } = require('../controllers/month');

router
  .route('/')
  .get(getMonths)
  .post(addMonth);

router
  .route('/:id')
  .post(editMonth)

router
  .route('/:id')
  .delete(deleteMonth);

module.exports = router;