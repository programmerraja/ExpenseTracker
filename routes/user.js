const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/user');

router
  .route('/')
  .post(signin);

module.exports = router;