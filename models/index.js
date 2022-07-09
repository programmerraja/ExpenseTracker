const User= require("./User")
const Transaction=require("./Transaction")
const Month=require("./Month")

Transaction.deleteMany({}).then((A)=>console.log(A))
Month.deleteMany({}).then((A)=>console.log(A))

module.exports = {User,Transaction,Month};

