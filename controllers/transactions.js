const {Transaction,Month} = require('../models/');

const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({monthId:req.params.id,userId:req.user._id});
    const month=await Month.findOne({_id:req.params.id,userId:req.user._id})
  
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: {transactions,month}
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
    const {  amount ,note,type,income,expense,balance} = req.body;
    const transaction = await Transaction.create({userId:req.user._id,monthId:req.body.monthId,amount,note,type});
    console.log(req.body,"Add transaction")
    Month.findOneAndUpdate({userId:req.user._id,_id:req.body.monthId},{balance,expense,income}).then((a)=>{
      console.log(a)
    })
  
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
exports.editTransaction = async (req, res, next) => {
  try {
    const {  amount ,note,type,income,expense,balance} = req.body;
    const transaction = await Transaction.findOneAndUpdate({_id:req.body.id,userId:req.user._id,monthId:req.body.monthId},{amount,note,type});
    console.log(req.body,"edit transaction")
    Month.findOneAndUpdate({userId:req.user._id,_id:req.body.monthId},{balance,expense,income}).then((a)=>{
      console.log(a)
    })
  
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
    console.log(req.body,"dd")
    let {income,expense,balance}=req.body;
    const transaction = await Transaction.findOne({userId:req.user._id,_id:req.body.id});
    const month=await Month.findOneAndUpdate({_id:req.body.monthId,userId:req.user._id},{income,expense,balance})
    console.log(month,"dd")
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
    console.log(err)
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
