const express=require('express')
const User = require('../models/registration');
const router = express.Router();




router.post('/signup', async (req,res)=>{

    try {
        const {name,email,Aadhar,phone,walletAddress,maxquantity,pincode,password }= req.body;
        const newUser = new User({
           name:name,email:email,Aadhar:Aadhar,phone:phone,walletaddress:walletAddress,maxquantity:maxquantity,pincode:pincode,password:password
        })
        console.log(newUser)
        const save = await newUser.save();
        res.status(200).json(save);

    } catch (error) {
        res.status(404).json(error)
    }
})


router.post('/login',async (req,res)=>{

    try {

        const {email,password} = req.body;

        const user = await User.findOne({ email: email });
    //   console.log(user);
      if(!user){
        res.status(404).json("you are not authenticated");
      }

         if(user.password == password){
            res.status(202).json("password is correct");
         }else if(user.password != password){
            res.status(404).json("password is incorrect");
         }
        
    } catch (error) {
        res.status(404).json(error); 
    }
      


})

module.exports = router;





