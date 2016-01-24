var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

app.get('/content/*', function(req, res) {
	res.sendfile(path.join(__dirname + '/content.html'));
});


app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname + '/index.html'));
});

app.listen(808);
