let moment = require('moment');

// // JAN 1st 1970 00:00:00 am
// let date = new Date();
// let months = ['Jan', 'Feb'];
// console.log(date.getMonth());
let createdAt = 12341235342512;
let date = moment(createdAt);
console.log(date.format('MMM Do, YYYY hh:mm:ss A'));
