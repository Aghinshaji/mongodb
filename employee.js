var mongoose=require('mongoose');


var empschema= new mongoose.Schema({
    Name:String,
    Eid:{type:String,require:true},
    salary:Number
});
var empmodel=mongoose.model("employee",empschema,"emp")
module.exports=empmodel