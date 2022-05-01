var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { String,Number,ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
    password: {
      type: String,
      required:true
    },
    isEmailVerified:{
      type:Boolean,
      default:false
    }, 
    passwordResetToken:{
      type:String
    },
    passwordResetExpires:{
      type:Date
    }
  },
  { timestamps: true }
);

UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
UserSchema.pre("save", function (next) {
  if (!this.password) {
    // console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    // console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;

// User.create({name:"selvam",email:"sraj@gmail.com",password:"sraj@gmail.com"}).then(a=>console.log(a))