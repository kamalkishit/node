var express = require('express');
var app = module.exports = express();
var request = require('request');
var path = require('path');

app.set('view engine', 'jade');
app.set('views', __dirname);

	app.use(express.static(__dirname));
	app.use(express.static(__dirname + '/static'));
	app.use(express.static('/root'));

app.get('/content/:urlId', function(req, res){

	//console.log(id);
	console.log(req.params.urlId);

	var uri = 'http://humannize.com:8080/humanize-1/api/content?urlId=' + req.params.urlId;

	request(uri, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var obj = JSON.parse(body);
    res.render('index', { title: obj.contents[0].title, description: obj.contents[0].description, image: obj.contents[0].imageURL, url: obj.contents[0].url });
  }
})
});

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/home.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/home.html'));
});

app.listen(80);
