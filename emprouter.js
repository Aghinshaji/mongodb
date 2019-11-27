var express=require('express');
var mongoose=require('mongoose');
var multer = require("multer")
 var url="mongodb+srv://aghinshaji:ashlyaghin@aghincluster-888wq.mongodb.net/test?retryWrites=true&w=majority/aghindb";
 var empmodel=require('../employee.js')
 var storage = multer.diskStorage({
     destination:function(req,file,callback){
         callback(null,'upload')// foldername is upload 
     },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    } 
 })
 var upload = multer({storage:storage});
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
     res.render("delemp")// ejs file name only kodukknam
 });
 emprouter.route("/update")
 .get(function(req,res){
     res.render("updateemp")
 });
 emprouter.get("/view",function(req,res){
     empmodel.find({},function(err,result){
         if(err) throw err
         else{
             //res.send(result)
res.render("viewemp",{data:result})
         }
     })
 })
 emprouter.get("/img",function(req,res){
     res.render("imgupload");
 })
 emprouter.post("/uploadimage",upload.single('aghin'),function(req,res){
     console.log("uploading image");
 })
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
    empmodel.deleteOne({
        Eid:req.body.Eid},function(err){
        if(err) throw err
        else{
            res.send("data deleted....")
        }
    });
  });
  emprouter.post("/update",function(req,res){
 var newdata=({Name:req.body.eName, salary:req.body.esalary});

      empmodel.updateOne({Eid:req.body.Eid},newdata,function(err){
          if(err) throw err
          else{
              res.send("data updated")
          }


      });

  })
module.exports=emprouter;