const express = require('express');
const cookieParser = require('cookie-parser');
var request = require('request');
var bodyParser = require('body-parser');


const app = express();
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Subtask1
app.get('/',(req,res)=>{
  res.send("Hello World - Anupam");
});

//Subtask2
app.get('/authors', (req, res) => {
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
  	if(!error && response.statusCode === 200) {
				var dataJSON1 = JSON.parse(body);
		  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
		  	if(!error && response.statusCode === 200) {
					var dataJSON2 = JSON.parse(body);
					var s = new String();
					for(var i = 0; i < dataJSON1.length; i++) {
						var count = 0;
						for(var j = 0; j < dataJSON2.length; j++) {
							if(dataJSON2[j].userId === dataJSON1[i].id) {
								count++;
							}
						}
						s = s + "<li>" + dataJSON1[i].name + "has " + count + " posts.</li><br><br>";
					}
					res.render('authors', {s});
		  	}
		  });
  	}
  });
});

//Subtask 3
app.get('/setcookie',(req, res)=>{
   res.cookie('name', 'Anupam');//Sets name = Anupam
   res.cookie('age', '18').send('cookie set'); //Sets age = 18
});

//Subtask 4
app.get('/getcookies', (req, res) => {
	res.send("Name: " + req.cookies.name + "<br>Age: " + req.cookies.age);
});

//Subtask 5
app.get('/robots.txt', (req, res) => {
  res.statusCode = 403;
	res.render('deny.ejs');
});

//Subtask 6
app.get('/image', (req, res) => {
	res.sendFile(__dirname + '/realwork.png');
});

//Subtask 7
app.get('/input', (req, res) => {
	var value="";
	res.render('input', {value});
});

app.post('/input', urlencodedParser, (req, res) => {
	console.log("The entered value is " + req.body.value);
	res.render('input', {value: req.body.value});
});

app.listen(8080,()=>{
  console.log('listening on port 8080');
});
