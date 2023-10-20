var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WARRENTY', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var Name = req.body.name;
    var Complaint = req.body.com;
    var Products = req.body.pro;
    var Email =req.body.email;
    var Quantity = req.body.qua;
    var WarrentyCode =req.body.coed;
    var data = {
        "name": Name,
        "email":Email,
        "code":Code,
        "product":Product,
        "qua":Quantity,
        "com":Complaint
       

    }
db.collection('complaints').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect('success4.html');
})
app.listen(8000);
console.log("server listening at port 3000");
