/*!
 * heap.js - example.js
 * Author: dead_horse <dead_horse@qq.com>
 */


/**
 * Module dependencies.
 */
var heaps = require('./');

var bHeap = heaps.binaryHeap(function (a, b) {
  return a.value - b.value;
});

for (var i = 0; i < 10; i++) {
  bHeap.push({
    value: Math.random()
  });
}

var result = [];
while(!bHeap.empty()) {
  result.push(bHeap.pop());
}

console.log('%j', result);
