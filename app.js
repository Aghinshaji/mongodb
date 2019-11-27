var express=require('express');
const app=express();
var bodyparser=require('body-parser')
var emprouter =require('./routes/emprouter')

app.use(bodyparser.urlencoded({extended:true}));
app.use('/emp',emprouter);

app.set("view engine","ejs");
//app.set("view","./src/views") vere folderil kidakkunnenkil path kodukkanam



app.get("/",function(req,res){
    res.render("Home");
})

app.listen(5000,()=>{
    console.log("listen to port 5000")
});