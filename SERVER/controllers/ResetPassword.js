const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPassword token 
exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from req.body
        const email = req.body.email;

        // check whether there exists a user with this email id, validation on email
        const user  = await User.findOne({email:email});
        console.log("user checking");
        if(!user){
            return res.json({
                success:false,
                message:`User is not registered with us.`,
            });
        }

        // generate token 
        const token = crypto.randomBytes(20).toString("hex");
        console.log("token Genrated");

        // update user by adding token and expiration time 
        const updatedUser = await User.findOneAndUpdate         ({email:email},{
            token:token,
            resetPasswordExpires:Date.now() + 3600000,
        },{new:true}); // {new:true} will return the updated document in the response
        console.log("DETAILS:",updatedUser);

        // create url containing token 
        const url = `http://localhost:3000/update-password/${token}`

        // send mail to the specified email id 
        await mailSender(email,"Password Reset Link",
            			`Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        // return response
        return res.json({
            success:true,
            message:'Email sent Successfully, Please check the email and change the password',
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Something went wrong while sending the mail for reseting your password`,
        });
    }
}

// resetPassword 
exports.resetPassword = async(req,res)=>{
    try{
        // fetch data from req. body
        const {password,confirmPassword,token} = req.body;
    
        // validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:'Password and Confirm Password value are not matching.',
            });
        }

        // get userdetails from the database using token 
        const userDetails = await User.findOne({token:token});

        // if no entry is present in db -> invalid token 
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }

        // check the token expiration time 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success:false,
                message:'Token is expired, Please regenerate your token',
            });
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password,10);

        // password update 
        await User.findOneAndUpdate(
            {token:token},
            {
                password:hashedPassword
            },
            {new:true},
        );

        // return respone 
        return res.status(200).json({
            success:true,
            message:'Password changed Successfully',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while changing the password',
        });
    }
}