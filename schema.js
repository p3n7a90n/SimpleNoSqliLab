const mongoose = require("mongoose");

var adminSchema = mongoose.Schema({
username:String,
password:String
});

const admin = mongoose.model("admin",adminSchema,"adminCollection");
admin.findOne({"username":"uniqueuser"},function(err,user){
if(user===null)
{

const adminUser = new admin({
username:"uniqueuser",
password:"admin"
});
const adminUser1 = new admin({
username:"youfoundit",
password:"admin"
});
adminUser.save();
adminUser1.save();
console.log("Inside null admin user");
}
else{
console.log("Inside  admin user"+user);
}

})

module.exports = admin

