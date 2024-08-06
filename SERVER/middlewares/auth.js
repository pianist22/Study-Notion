
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// is Auth
exports.auth = async(req,res,next)=>{
    try{
        // extract Token
        console.log("authorization is taking place");
        console.log("error");
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        
        // check if token is missing or not 
        if(!token){
            console.log("Token is missing");
            return res.status(401).json({
                success:false,
                message:`Token is missing`,
            });
        }

        // Verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode; 
        }
        catch(error){
            // verification me issue hain
            console.log(error);
            return res.status(401).json({
                success:false,
                message:`Token is invalid`,
            });
        }
        next(); // calling the next middleware after verifying the token 
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:`Something went wrong while verifying the token`,
        });
    }
};

// is Student 
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:`This is a protected route for student only`,
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`User role cannot be verified,Please try again`,
        });
    }
}

// is instructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:`This is a protected route for Instructor only`,
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`User role cannot be verified,Please try again`,
        });
    }
}


// is Admin

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:`This is a protected route for Admin only`,
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`User role cannot be verified,Please try again`,
        });
    }
};