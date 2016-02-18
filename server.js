var express = require('express');
var app = module.exports = express();
var request = require('request');
var path = require('path');
var Client = require('node-rest-client').Client;
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/static/favicon.ico'));

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
    		res.render('content', { title: obj.contents[0].title, description: obj.contents[0].description, image: obj.contents[0].imageURL, url: obj.contents[0].url });
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

	var uri = "http://humannize.com:8080/humanize-1/api/content/find";


	var args = {
		data: { 
			categories: req.body.categories,
			createdDate: req.body.createdDate
		},
		headers: { 
			"Content-Type": "application/json" 
		}
	};

	client.post("http://humannize.com:8080/humanize-1/api/content/find", args, function (data, response) {
    	res.json(data);
	});

});

app.get('/api/content', function(req, res) {

	var uri = 'http://humannize.com:8080/humanize-1/api/content?urlId=' + req.query.urlId;

	request(uri, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var obj = JSON.parse(body);
    		res.json(obj);
  		} else {
  		}
	});
});

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res) {
	res.sendfile(path.join(__dirname + '/about.html'));
});

app.listen(80);
