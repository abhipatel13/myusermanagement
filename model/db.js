const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/FINAL_CRUD',(err)=>{
    if(!err){
        console.log("MongoDB Connection Succeeded");
    }
    else {
        console.log("Error in DB Connection "+err);
    }
});

require('./employee.model');

