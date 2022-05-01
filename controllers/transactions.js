const Transaction = require('../models/Transaction');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({userId:req.user._id});

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create({userId:req.user._id,...req.body});
  
    return res.status(201).json({
      success: true,
      data: transaction
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({userId:req.user._id,_id:req.params.id});

    if(!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.Signin=function (req, res, next) {
  return passport.authenticate(
  "user_local",
  { session: false },
  (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        status: "failed",
        msg: info ? info.message : "Login failed",
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(500).json({ status: "failed", msg: err });
      }
      //filtering user id and email for payload and setting exp time as 7 day
      let payload = JSON.stringify({
        id: user._id,
        username: user.name,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 600 * 24 * 7,
      });
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(payload, process.env.JWT_KEY);
      res.json({ status: "success", token });
    });
  }
)(req, res);
}