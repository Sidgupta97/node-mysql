var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyparser = require('body-parser');

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'SIDDHARTH2',
  database : 'node_connect'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

app.get("/", function(req,res){
    var q = 'select count(*) as no from users';
    connection.query(q, function(err,results){
        if(err){
            throw err;
        }
        else{
            var c = (results[0].no).toString();
            res.render("home",{data: c});
        }
    });
});

app.post("/register", function(req,res){
  var person = {
    email: req.body.email
  };
  connection.query('insert into users set ?',person, function(err, result){
    if(err) throw err;
    res.redirect("/");
  })
});

app.listen(8080, function(){
    console.log("Web app is listening on port 8080")
});