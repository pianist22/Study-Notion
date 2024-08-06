const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("Database Connection is succesfull"))
    .catch((error)=>{
        console.log("Database Connection me issue aa gaya hain");
        console.error(error);
        process.exit(1);
    });
}

