const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const adminSchema = require("./schema.js");
const dbConfig = require("./dbconfig.js");

const mongoUrl = dbConfig.mongodbUrl;
const options ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
var db = mongoose.connect(mongoUrl,options)
    .then((err) => {
    console.log("Connected to the database!");
    })
    .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
res.set('Content-Type', 'text/html')

  res.send("<center><h1>Simple Nosql Lab</h1></br><h2>Find all the admin Username</h2></center>")
 //res.json({ message: "Simple Nosql Lab..Find all the admin username" });
});

app.get("/admin/login",(req,res)=>{
res.set('Content-Type', 'text/html')
res.send("<h2>Admin Login Page</h2><p>Send a Post request on this endpoint with username and password field</p><br/>");
})

app.post("/admin/login",(req,res)=>{
adminSchema.findOne({"username":req.body.username},function(err,user){
console.log("username:",req.body.username);
if(err)
{
    console.log(err);
    res.status(400).json({message:"User doesn't exists with the given username."});
    return;
}

 if(user === undefined || user === null){
            res.status(400).json({message: 'A user with that email does not exist.'});
        }
else
{   if(user.password===req.body.password)
       {
        res.status(200).json({message:"Login Successful."})
       }
       else
       {
        res.status(400).json({message:"Access Denied.Please try again."})
       }
}
});

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});