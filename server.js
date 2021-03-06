var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'u202mehulpatil',
    database:'u202mehulpatil',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
'article-one':{                                                  
    title:'Article One',
    heading:'Article One',
    date:'Apr 18,2017',
    content:` <div>
         <p>
             India is my country.All Indians are my brpthers and sisters.I love my country and i am proud of it heritage.
         </p>
         <p>
             This is the second paragraph.
         </p>
     </div>
     <hr/>
     
     <div>
         <a href="https://imad.hasura.io">Home</a>
     </div>`
},
'article-two':{
    title:'Article Two',
    heading:'Article Two',
    date:'Apr 19,2017',
    content:` <div>
         <p>
             India is my country.All Indians are my brpthers and sisters.I love my country and i am proud of it heritage.
         </p>
         <p>
             This is the second paragraph.
         </p>
     </div>
     <hr/>
     
     <div>
         <a href="https://imad.hasura.io">Home</a>
     </div>`
},
'article-three':{
    title:'Article Three',
    heading:'Article Three',
    date:'Apr 20,2017',
    content:`<div>
         <p>
             India is my country.All Indians are my brpthers and sisters.I love my country and i am proud of it heritage.
         </p>
         <p>
             This is the second paragraph.
         </p>
     </div>
     <hr/>
     
     <div>
         <a href="https://imad.hasura.io">Home</a>
     </div>`
 }
};

function createTemplate(data){                                   
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;    //no need of this after connecting to database as request is made dynamically from database

var htmlTemplate=`                                                 
    <!DOCTYPE html>
<html>
 <head>
     <title>
         ${title}
     </title>
     <meta name="viewport" content="width=device-width , initial-scale=1"/>
     <link href="/ui/style.css" rel="stylesheet" />
 </head>
 
 <body>
     <div class="container">
     <h1>${heading}</h1>
     
     <div>
         ${date.toDateString()}
     </div>
     
     ${content}
     </div>
 </body>
</html>
`;                                                          
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//this code is for connecting database
var pool=new Pool(config);        //created outside server request so that it is created as soon as app is started and not when new connection happens
app.get('/test-db',function (req,res) {
    
    //return a response with a request
    pool.query('select * from test', function(err,result) {
       if(err) {
           res.status(500).send(err.toString());
       } 
       else {
           res.send(JSON.stringify(result.rows));
       }
    });
});
 
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {                         
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];    
//app.get('/submit-name/:name', function(req, res){                      //  /:name is passed as URL object
app.get('/submit-name', function(req, res){                        // to send name as query parameter eg:URL/submit-name?name=..... 
    //get the name from request
    var name=req.query.name;
    //JSON-JavaScript object Notation is way of converting objects to string in this case arrar to string
    names.push(JSON.stringify(name));
    res.send(names);
});

var counter=0;                                    //This is code for counter it should be written above /:articleName to be read first
app.get('/counter',function(req, res) {
    counter=counter + 1;
    res.send(counter.toString());
});

app.get('/articles/:articleName',function(req,res) {
    //articleName==article-one
    //articles[articleName]==content object for article one
    //var articleName=req.params.articleName;
    
    pool.query("select * from article where title= $1" , [req.params.articleName], function(err,result){
       if(err) {
           res.status(500).send(err.toString());
       } 
       else {
           if(result.rows.length === 0) {
               res.status(404).send('Aritcle not found'); 
           } else {
               var articleData =res.rows[0];
               res.send(createTemplate(articleData));              //articleData is database variable containing value from database
           }
       }
    });
});

/*
app.get('/article-two',function(req,res) {
    res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/article-three',function(req,res) {
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});
*/

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
