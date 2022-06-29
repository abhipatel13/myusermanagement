const mongoose = require("mongoose");

var employeeschema = new mongoose.Schema({
   fullName : {
       type : String,
       required : 'This Field is Required'
   },
   email : {
    type : String
},
 mobile : {
    type : String
},
 city : {
    type : String
},
});


employeeschema.path('email').validate((val)=>{
  
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
     
},'Invalid Email');

mongoose.model('Employee',employeeschema);