var express = require('express');
var app = module.exports = express();
var request = require('request');
var path = require('path');
var Client = require('node-rest-client').Client;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var client = new Client();

app.set('view engine', 'jade');
app.set('views', __dirname);

	app.use(express.static(__dirname));
	app.use(express.static(__dirname + '/static'));
	app.use(express.static('/root'));

app.get('/content/:urlId', function(req, res){

	var uri = 'http://humannize.com:8080/humanize-1/api/content?urlId=' + req.params.urlId;

	request(uri, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var obj = JSON.parse(body);
    		res.render('index', { title: obj.contents[0].title, description: obj.contents[0].description, image: obj.contents[0].imageURL, url: obj.contents[0].url });
  		}
	});
	//res.sendfile(path.join(__dirname + '/content.html'));
});

app.get('/api/content/trends', function(req, res) {



	var uri = 'http://humannize.com:8080/humanize-1/api/content/trends'

	request(uri, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var obj = JSON.parse(body);
    		res.json(obj);
  		} else {
  		}
	});
});

app.post('/api/content/find', function(req, res) {

		console.log(req.body.categories);

	var uri = "http://humannize.com:8080/humanize-1/api/content/find";

	var params = {
		"categories": ["Achievers"]
	}

	var args = {
		data: { categories: req.body.categories },
		headers: { "Content-Type": "application/json" }
	};

	client.post("http://humannize.com:8080/humanize-1/api/content/find", args, function (data, response) {
    	res.json(data);
	});

});

app.get('/api/content', function(req, res) {

	var uri = 'http://humannize.com:8080/humanize-1/api/content?urlId=' + req.query.urlId;

	console.log(req.query.urlId);

	request(uri, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var obj = JSON.parse(body);
    		res.json(obj);
  		} else {
  			console.log(error);
  			console.log('error');
  		}
	});
});

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/temp.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/temp.html'));
});

app.get('/home.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/home.html'));
});

app.listen(80);
