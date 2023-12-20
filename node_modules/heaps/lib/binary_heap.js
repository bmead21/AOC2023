/*!
 * heap.js - binary_heap.js
 * Author: dead_horse <dead_horse@qq.com>
 */


/**
 * Module dependencies.
 */
var floor = Math.floor;

function compareDefault(a, b) {
  return a - b;
}

function BinaryHeap(compare) {
  if (!(this instanceof BinaryHeap)) {
    return new BinaryHeap(compare);
  }

  this.list = [];
  this.compare = compare || compareDefault;
}

BinaryHeap.prototype.swap = function(i, j) {
  var t = this.list[i];
  this.list[i] = this.list[j];
  this.list[j] = t;
};

BinaryHeap.prototype.shiftDown = function (pos) {
  pos = pos || this.list.length - 1;
  if (pos >= this.list.length || pos === 0) {
    return;
  }
  var parentPos;
  do {
    parentPos = floor((pos - 1) / 2);
    var compareResult = this.compare(this.list[pos], this.list[parentPos]);
    if (compareResult > 0) {
      this.swap(pos, parentPos);
    }
    pos = parentPos;
  } while (pos);
};

BinaryHeap.prototype.shiftUp = function (pos) {
  pos = pos || 0;
  if (pos >= this.list.length) {
    return;
  }
  var leftPos;
  var rightPos;
  while (pos < this.list.length / 2) {
    leftPos = pos * 2 + 1;
    rightPos = pos * 2 + 2;
    if (leftPos >= this.list.length) {
      return;
    }

    var swapPos = leftPos;
    if (rightPos < this.list.length) {
      var compareChildren = this.compare(this.list[leftPos],
        this.list[rightPos]);
      if (compareChildren < 0) {
        swapPos = rightPos;
      }
    }

    var compareSwap = this.compare(this.list[pos], this.list[swapPos]);
    if (compareSwap < 0) {
      this.swap(pos, swapPos);
      pos = swapPos;
      continue;
    }
    return;
  }
};

BinaryHeap.prototype.push = function (item) {
  this.list.push(item);
  this.shiftDown();
};

BinaryHeap.prototype.pop = function () {
  this.swap(0, this.list.length - 1);
  var popResult = this.list.pop();
  this.shiftUp();
  return popResult;
};

BinaryHeap.prototype.empty = function () {
  return this.list.length === 0;
};

BinaryHeap.prototype.top = function () {
  return this.list[0];
};

BinaryHeap.prototype.init = function (list) {
  if (!Array.isArray(list)) {
    return;
  }
  this.list = Array.prototype.slice.call(list);
  this.heapify();
  return this;
};

BinaryHeap.prototype.heapify = function () {
  for (var i = this.list.length; i--;) {
    this.shiftDown(i);
  }
  return this;
};

module.exports = BinaryHeap;
