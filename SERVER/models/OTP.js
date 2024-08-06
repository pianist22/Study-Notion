const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 60*60, // otp will expire after 10 mins
    }
});

// a function to send email 
async function sendVerficationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from Study Notion",emailTemplate(otp));
        console.log("Email sent successfully",mailResponse.response);
    }
    catch(error){
        console.log("Error occured while sending mail",error);
        throw error;
    }
}

// pre middleware 
otpSchema.pre("save",async function(next){
	console.log("New document saved to database");
    
    //Only send an email when a new document is created
    if(this.isNew){
        await sendVerficationEmail(this.email,this.otp);
    } 
    next();
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;