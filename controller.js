var moment = require('moment');
const fs = require('fs');

exports.index = function (req, res) {
	res.render('index')
}
exports.main = function(req,res) {
	 var filename = moment().format('DD-MM-YYYY') + ".json";
		var list = [];
		list = JSON.parse(fs.readFileSync(filename, "utf-8"));
		console.log(list)
		res.render('main', 
  			{ title: 'List ToDo', 
  			list,
  			listname:filename
		});
}
exports.new = function(req, res) {
	res.render('new')
}
exports.save = function (req, res) {
	var done = req.body.done;
	var time = req.body.time;
	var list = []
	var filename = moment().format('DD-MM-YYYY') + ".json";
	var event = (new Date().toLocaleTimeString("ua-UA"));
	if (event < time) {
			res.render("./save", {done, time, date: filename})
			// fs.writeFileSync(filename, JSON.stringify(list), (err) => { 
   //    		   if (err) throw err; })
		list = JSON.parse(fs.readFileSync(filename, "utf-8"));
		list.push({
				done: req.body.done,
				time: req.body.time
				})
		fs.writeFileSync(filename, JSON.stringify(list), (err) => { 
      		   if (err) throw err; })
	}	
	else {
		res.send("It's to late")
	}
}