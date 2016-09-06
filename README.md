##node-grade
serve端的模块可以预处理图片背景，代替图片未加载之前的空白背景

##demo
[node-grade][1]

##install
npm install node-grade

##user
```javascript
var Grade = require('./src/node-grade');
var grade = new Grade({
     img : './res/inside-out.jpg'
 });
/*
[ { rgba: [ '107', '60', '154', '255' ],
    occurs: 63,
    brightness: 84.769 },
  { rgba: [ '59', '1', '152', '255' ],
    occurs: 98,
    brightness: 35.556 } ]
*/
```

##dev

    git clone https://github.com/jayZOU/node-grade.git
    npm install
    node index.js

  [1]: http://jayzou.github.io/demo/node-grade/index.html