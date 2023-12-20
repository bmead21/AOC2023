import { Heap } from "heap-js";

// Min Heap by default
const minHeap = new Heap();

// Initialize the heap with an array
minHeap.init([[0, 0, 0, 0, 0, 0]]);
// Push a new value

minHeap.push([1, 1, 1, 1, 1, 1]);
console.log(minHeap);
console.log(minHeap.peek()); //> 1
console.log(minHeap.pop()); //> 1
console.log(minHeap.peek()); //> 2
