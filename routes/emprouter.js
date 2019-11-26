var express=require('express');
var mongoose=require('mongoose');
 var url="mongodb://127.0.0.1:27017/sampledb";
 var empmodel=require('../employee.js')
 mongoose.connect(url,function(err){
     if(err) throw err;
     else{
         console.log("connection established")
     }
 });
var emprouter=express.Router();
 
emprouter.route("/new")
 .get((req,res)=>{
     res.render("newemp")
 });
 emprouter.route("/del")
 .get((req,res)=>{
     res.render("delemp")
 });
 emprouter.post("/save",function(req,res){
     var newemp=new empmodel();
     newemp.Name=req.body.Name;
     newemp.Eid=req.body.Eid;
     newemp.salary=req.body.salary;
     newemp.save(function(err){
         if(err)throw err;
         else res.send("data added")
     });
     
 });

 emprouter.post("/delsubmit",function(req,res){
    res.send("deleted....")
  })
module.exports=emprouter;