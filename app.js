
var { faker } = require('@faker-js/faker');
const express=require('express');
const app=express();
const mysql=require('mysql2');
const bodyparser=require("body-parser");
const PORT=3000


app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(__dirname+ '/public')); 


var connection=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'jayanth9738',
    database: 'join_us'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
    });

app.get('/',(req,res)=>{

     connection.query("SELECT count(*) as total FROM users", (err,results)=> {
        if(err) throw err;
        var count = results[0].total;
        // res.send('The total users in join_us is '+ count); 
        res.render('home',{count: count});
    });
     
});

app.post( '/register', ( req, res )=>{
    var person={email:req.body.email};
    var sql="INSERT INTO users SET ?";
    connection.query(sql,person,(error,results)=>{
        if (error) throw error;
        res.redirect("/");
    });
    

});



app.listen(PORT,(err)=>{
    if (err) console.log(err);
    console.log(`Server is running on PORT ${PORT}`)

});