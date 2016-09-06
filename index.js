var Grade = require('./src/node-grade');
var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.static('res'));

var htmlTpl = fs.readFileSync('./src/index.html', 'utf8');

var grade = [
    new Grade({img : './res/inside-out.jpg'}).getColor(),
    new Grade({img : './res/up.jpg'}).getColor(),
    new Grade({img : './res/finding-dory.jpg'}).getColor(),
    new Grade({img : './res/wall-e.jpg'}).getColor(),
    new Grade({img : './res/stanger-things.jpg'}).getColor(),
    new Grade({img : './res/true-detective.jpg'}).getColor(),
    new Grade({img : './res/drive.jpg'}).getColor(),
    new Grade({img : './res/only-god-forgives.jpg'}).getColor(),
];

for(var i = 0, len = grade.length; i < len; i++){
    var htmlTpl = htmlTpl.replace(/style=""/, 'style="' + grade[i] + '"');
}

fs.writeFileSync('./index.html', htmlTpl, 'utf8');

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
