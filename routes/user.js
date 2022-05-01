const express = require('express');
const router = express.Router();
const { Signin } = require('../controllers/transactions');

router
  .route('/')
  .post(Signin);


module.exports = router;