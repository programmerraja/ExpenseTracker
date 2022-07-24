const {Month,Transaction} = require('../models/');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// @desc    Get all months
// @route   GET /api/v1/months
// @access  Public
exports.getMonths = async (req, res, next) => {
  try {
    const month = await Month.find({userId:req.user._id});

    return res.status(200).json({
      success: true,
      count: month.length,
      data: [...month]
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add month
// @route   POST /api/v1/months
// @access  Public
exports.addMonth = async (req, res, next) => {
  try {
    const { name,income,note } = req.body;

    const month = await Month.create({userId:req.user._id,income,note,name,balance:income });
    if(month){
      const transaction=Transaction.create({userId:req.user._id,monthId:month._id,type:"INCOME",amount:income,note:note})
    }
    return res.status(201).json({
      success: true,
      data: month
    }); 
  } catch (err) {
    console.log(err)
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
        console.log(err)
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Edit month
// @route   POST /api/v1/months
// @access  Public
exports.editMonth = async (req, res, next) => {
    try {
      const { text, income,note } = req.body;
  
      const month = await Month.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{text, income,note});
    
      return res.status(201).json({
        success: true,
        data: month
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

// @desc    Delete month
// @route   DELETE /api/v1/months/:id
// @access  Public
exports.deleteMonth = async (req, res, next) => {
  try {
    const month = await Month.findOne({userId:req.user._id,_id:req.params.id});

    if(!month) {
      return res.status(404).json({
        success: false,
        error: 'No month found'
      });
    }

    await month.remove();

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
