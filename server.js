var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/static'));
app.use(express.static('/root'));

app.get('/content/*', function(req, res) {
	res.sendfile(path.join(__dirname + '/content.html'));
});


app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.get('/home.html', function(req, res) {
	res.sendfile(path.join(__dirname + '/home.html'));
});

app.listen(80);
