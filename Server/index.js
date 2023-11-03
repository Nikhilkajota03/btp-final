const express = require('express');
const app = express()
const port = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
// const Userroute = require("./Routes/auth");
const User = require("./models/registration");



app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json())



app.post('/api/auth/signup',async (req,res)=>{

  try {
      const {name,email,Aadhar,phone,walletAddress,maxquantity,pincode,password }= req.body;
      const newUser = new User({
         name:name,email:email,Aadhar:Aadhar,phone:phone,walletaddress:walletAddress,maxquantity:maxquantity,pincode:pincode,password:password
      })
      console.log(newUser + "backend")
      const save = await newUser.save();
      res.status(200).json(save);

  } catch (error) {
      res.status(404).json(error)
  }
})


app.post('/api/auth/login',async (req,res)=>{

  try {

      const {email,password} = req.body;

      const user = await User.findOne({ email: email });
      console.log(user.data)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password === password) {
      res.status(202).json({ message: "Password is correct" });
    } else {
      res.status(401).json({ error: "Password is incorrect" });
    }
      
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});






mongoose
  .connect("mongodb://127.0.0.1:27017/energy-dapp", {
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });




app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})