// Jan 1st 1970 00:00:00 am

const moment = require('moment');


// let date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));


new Date().getTime();
let someTimestamp = moment().valueOf();
console.log(someTimestamp);
console.log(moment(1545437422332).fromNow());


let createdAt = 12341;
let date = moment(createdAt);
console.log(date.format('h:mm a'));