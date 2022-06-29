const express = require("express");
const { redirect } = require("express/lib/response");
const mongoose = require("mongoose");
const Employee = mongoose.model('Employee');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('layouts/mainLayout',{
        titleHere : "INSERT EMPLOYEE DATA"
    });
})

router.post('/',(req,res)=>{
   if(req.body._id == '')
    insertRecord(req,res);
    else 
    updateRecord(req,res);
})

function insertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err){
           res.redirect('/employee');
        }
        else {
            console.log("Error in Insert Data "+ err);

        }
    })
}



router.get('/list',(req,res)=>{
    
    Employee.find((err,docs)=>{
        if(!err){
           res.render("employee/list",{
               list : docs,
               addListTitle : 'LIST OF EMPLOYEE'
           })
        }
        else{
            console.log("Error in Printing of DATA"+err);
        }
    })
})

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,docs)=>{
        if(!err){
   res.render('employee/addOrEdit',{
    titleHere : 'UPDATE EMPLOYEE DATA',
    employee : docs
   });
}
    })
})


router.get('/delete/:id',(req,res)=>{
  Employee.findByIdAndDelete(req.params.id,(err,docs)=>{
      if(!err)
      {
        res.redirect('/employee/list');
      }
      else{
          console.log("Error in DELETE DATA "+err);
      }
  })
})

function updateRecord(req,res){
    // const { fullName, email, mobile, city } = req.body;

    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                // handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
    
}
module.exports = router ; 