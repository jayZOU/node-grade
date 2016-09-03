var Grade = require('./src/node-grade');

var grade = new Grade({
	img : './res/inside-out.jpg'
});

var grade1 = new Grade({
	img : './res/drive.jpg'
});
// console.log(1111);
console.log(grade.getColor());
/*
[ { rgba: [ '107', '60', '154', '255' ],
    occurs: 63,
    brightness: 84.769 },
  { rgba: [ '59', '1', '152', '255' ],
    occurs: 98,
    brightness: 35.556 } ]
*/
console.log(grade1.getColor());

/*
[ { rgba: [ '9', '53', '74', '255' ],
    occurs: 108,
    brightness: 42.238 },
  { rgba: [ '3', '16', '21', '255' ],
    occurs: 163,
    brightness: 12.683 } ]
*/