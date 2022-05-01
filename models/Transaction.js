const mongoose = require('mongoose');
const { String,Number ,ObjectId} = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId:{
    type: ObjectId,
    ref: "User"
  }
});

const Transaction= mongoose.model('Transaction', TransactionSchema);
module.exports= Transaction;
