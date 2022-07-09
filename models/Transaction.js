const mongoose = require('mongoose');
const { String,Number ,ObjectId} = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({
  type:{
    type:String,
    required:true
  },
  note: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  userId:{
    type: ObjectId,
    ref: "User"
  },
  monthId:{
    type: ObjectId,
    ref: "Month"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction= mongoose.model('Transaction', TransactionSchema);
module.exports= Transaction;
