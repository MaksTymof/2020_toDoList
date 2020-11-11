const fs = require('fs');
const express= require('express')
var app = express();
const bodyParser = require('body-parser');
var controller = require('./controller')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));



app.set('view engine', 'pug');
app.get('/index', controller.index);
app.get("/main", controller.main);
app.get ("/new", controller.new)

app.post("/save", controller.save)

app.post('/remove/:list/:index', function(req,res){

	var list = JSON.parse(fs.readFileSync(req.params.list,"utf-8"))
	
	list.splice(req.params.index, 1)
		fs.writeFileSync(req.params.list, JSON.stringify(list), (err) => { 
      		   if (err) throw err; 
	})
	res.redirect('/main')
})
app.get('/edit/:list/:index', function (req, res) {
	var list = JSON.parse(fs.readFileSync(req.params.list,"utf-8"))
	var record = list[req.params.index]
	res.render('new', {
		"done": record.done,
		"time": record.time
	})
	
	
	fs.writeFileSync(req.params.list, JSON.stringify(list), (err) => { 
      		   if (err) throw err; 
	})
	
})


app.listen(7000)