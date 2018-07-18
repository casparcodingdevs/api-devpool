
const { includes, some } = require('lodash');

module.exports = (arrA, arrB) =>
  some(arrA, value => includes(arrB, value));
