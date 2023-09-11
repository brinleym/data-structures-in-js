import { expect, test, describe } from "bun:test";
import MyArray from "../array/MyArray";

describe('creates new array', () => {
  test('creates new empty array', () => {
    const myArray = new MyArray();
    expect(myArray).toEqual(new MyArray());
    expect(myArray.array.length).toBe(0);
  });

  test('creates new non-empty array', () => {
    const myArray = new MyArray([1, 2, 3]);
    expect(myArray.array);
    expect(myArray.array.length).toBe(3);
  });
});

describe('insert into array', () => {
  test('prepend integer onto empty array', () => {
    const myArray = new MyArray();
    myArray.prepend(1)
    expect(myArray.array).toEqual([1]);
    expect(myArray.array.length).toBe(1);
  });
  test('prepend integer onto non-empty array', () => {
    const myArray = new MyArray();
    myArray.prepend(2);
    myArray.prepend(1);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('append integer onto empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    expect(myArray.array).toEqual([1]);
    expect(myArray.array.length).toBe(1);
  });

  test('append integer onto non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('attempts insertion of integer at index in empty array', () => {
    const myArray = new MyArray();
    myArray.insertAtIndex(1, 0);
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('inserts integer at first index in non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(2);
    myArray.append(3);
    myArray.insertAtIndex(1, 0);
    expect(myArray.array).toEqual([1, 2, 3]);
    expect(myArray.array.length).toBe(3);
  });

  test('inserts integer at last index in non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(3);
    myArray.insertAtIndex(2, 1);
    expect(myArray.array).toEqual([1, 2, 3]);
    expect(myArray.array.length).toBe(3);
  });

  test('inserts integer at middle index in non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(3);
    myArray.append(4);
    myArray.insertAtIndex(2, 1);
    expect(myArray.array).toEqual([1, 2, 3, 4]);
    expect(myArray.array.length).toBe(4);
  });
});

describe('removes from array', () => {
  test('pops from empty array', () => {
    const myArray = new MyArray();
    const popped = myArray.removeLast();
    expect(popped).toBeNull();
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('pops from non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    const popped = myArray.removeLast();
    expect(popped).toBe(1);
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('removes from front of empty array', () => {
    const myArray = new MyArray();
    const popped = myArray.removeFirst();
    expect(popped).toBeNull();
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('removes from front of non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    const popped = myArray.removeFirst();
    expect(popped).toBe(1);
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('attempts to remove element at given index of empty array', () => {
    const myArray = new MyArray();
    const removed = myArray.removeAtIndex(0);
    expect(removed).toBeNull();
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('removes element at given first index of non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const removed = myArray.removeAtIndex(0);
    expect(removed).toBe(1);
    expect(myArray.array).toEqual([2]);
    expect(myArray.array.length).toBe(1);
  });

  test('removes element at last index of non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const removed = myArray.removeAtIndex(1);
    expect(removed).toBe(2);
    expect(myArray.array).toEqual([1]);
    expect(myArray.array.length).toBe(1);
  });

  test('removes element at middle index of non-empty array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    myArray.append(3);
    const removed = myArray.removeAtIndex(1);
    expect(removed).toBe(2);
    expect(myArray.array).toEqual([1, 3]);
    expect(myArray.array.length).toBe(2);
  });
});

describe('gets element in array', () => {

  test('attempts to get element at given index in empty array', () => {
    const myArray = new MyArray();
    const elem = myArray.valueAt(0);
    expect(elem).toBeNull();
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('attempts to get element at invalid index in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const elem = myArray.valueAt(3);
    expect(elem).toBeNull();
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('attempts to get element at valid index in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const elem = myArray.valueAt(1);
    expect(elem).toBe(2);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('searches for element in empty array', () => {
    const myArray = new MyArray();
    const found = myArray.search(1);
    expect(found).toBe(false);
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('searches for element not in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const found = myArray.search(3);
    expect(found).toBe(false);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('searches for element in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const found = myArray.search(2);
    expect(found).toBe(true);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('attempts search for index of element in empty array', () => {
    const myArray = new MyArray();
    const index = myArray.indexOf(1);
    expect(index).toBe(-1);
    expect(myArray.array).toEqual([]);
    expect(myArray.array.length).toBe(0);
  });

  test('attempts search for index of non-existant element in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const index = myArray.indexOf(3);
    expect(index).toBe(-1);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });

  test('attempts search for index of element in array', () => {
    const myArray = new MyArray();
    myArray.append(1);
    myArray.append(2);
    const index = myArray.indexOf(2);
    expect(index).toBe(1);
    expect(myArray.array).toEqual([1, 2]);
    expect(myArray.array.length).toBe(2);
  });
});

describe('copies array', () => {
  test('performs shallow copy of empty array', () => {
    const myArray = new MyArray();
    const shallowCopy = myArray.shallowCopy();
    expect(myArray.array).toEqual([]);
    expect(shallowCopy).toEqual([]);
    expect(myArray.array.length).toBe(0);
    expect(shallowCopy.length).toBe(0);
  });

  test('performs shallow copy of non-empty array', () => {
    const myArray = new MyArray([1, 2, 3]);
    const shallowCopy = myArray.shallowCopy();
    expect(myArray.array).toEqual([1, 2, 3]);
    expect(shallowCopy).toEqual([1, 2, 3]);
    expect(myArray.array.length).toBe(3);
    expect(shallowCopy.length).toBe(3);
  });

  test('performs deep copy of empty array', () => {
    const myArray = new MyArray();
    const deepCopy = myArray.deepCopy();
    expect(myArray.array).toEqual([]);
    expect(deepCopy).toEqual([]);
    expect(myArray.array.length).toBe(0);
    expect(deepCopy.length).toBe(0);
  });

  test('performs deep copy of non-empty array', () => {
    const myArray = new MyArray([
      {name: "Brinley", color: "red"},
      {name: "Alex", color: "blue"}
    ]);
    const deepCopy = myArray.deepCopy();
    expect(myArray.array).toEqual([
      {name: "Brinley", color: "red"},
      {name: "Alex", color: "blue"}
    ]);
    expect(deepCopy).toEqual([
      {name: "Brinley", color: "red"},
      {name: "Alex", color: "blue"}
    ]);
    expect(myArray.array.length).toBe(2);
    expect(deepCopy.length).toBe(2);
  });
});

describe('merge arrays', () => {
  test('merge two arrays', () => {
    const arr1 = new MyArray([1, 2, 3]);
    const arr2 = new MyArray([4, 5, 6]);
    arr1.merge(arr2.array);
    expect(arr1.array).toEqual([1, 2, 3, 4, 5, 6]);
    expect(arr2.array).toEqual([4, 5, 6]);
  });
});

describe('advanced transformations', () => {
  test('maps over empty array', () => {
    const myArray = new MyArray();
    const mapped = myArray.map((value, index, arr) => value + index + arr[0]);
    expect(myArray.array).toEqual([]);
    expect(mapped).toEqual([]);
  });

  test('maps over non-empty array', () => {
    const myArray = new MyArray([1, 2, 3]);
    const mapped = myArray.map((value, index, arr) => value + index + arr[0]);
    expect(myArray.array).toEqual([1, 2, 3]);
    expect(mapped).toEqual([2, 4, 6]);
  });

  test('maps over empty array', () => {
    const myArray = new MyArray();
    const mapped = myArray.map((value, index, arr) => value + index + arr[0]);
    expect(myArray.array).toEqual([]);
    expect(mapped).toEqual([]);
  });

  test('filters empty array', () => {
    const myArray = new MyArray();
    const filterd = myArray.filter((value, index, arr) => value + index + arr[0] >= 4);
    expect(myArray.array).toEqual([]);
    expect(filterd).toEqual([]);
  });

  test('filters non-empty array', () => {
    const myArray = new MyArray([1, 2, 3]);
    const filterd = myArray.filter((value, index, arr) => value + index + arr[0] >= 4);
    expect(myArray.array).toEqual([1, 2, 3]);
    expect(filterd).toEqual([2, 3]);
  });

  test('reduces empty array - no start value', () => {
    const myArray = new MyArray();
    const answer = myArray.reduce((total, value, index, arr) => total + value + index + arr[0]);
    expect(answer).toBeNull();
    expect(myArray.array).toEqual([]);
  });

  test('reduces empty array - start value provided', () => {
    const myArray = new MyArray();
    const answer = myArray.reduce(
      (total, value, index, arr) => total + value + index + arr[0],
      0
    );
    expect(answer).toBe(0);
    expect(myArray.array).toEqual([]);
  });

  test('reduces non-empty array - no start value', () => {
    const myArray = new MyArray([1, 2, 3]);
    const answer = myArray.reduce((total, value, index, arr) => total + value + index + arr[0]);
    expect(answer).toBe(11);
    expect(myArray.array).toEqual([1, 2, 3]);
  });

  test('reduces non-empty array - start value', () => {
    const myArray = new MyArray([1, 2, 3]);
    const answer = myArray.reduce(
      (total, value, index, arr) => total + value + index + arr[0],
      0
    );
    expect(answer).toBe(12);
    expect(myArray.array).toEqual([1, 2, 3]);
  });
});

describe('sorts array in ascending order', () => {
  test('sorts empty array', () => {
    const myArray = new MyArray();
    myArray.sort();
    expect(myArray.array).toEqual([]);
  });

  test('sorts array of numbers in ascending order', () => {
    const myArray = new MyArray([1, 9, 2, 0.4, -100, 99]);
    myArray.sort();
    expect(myArray.array).toEqual([-100, 0.4, 1, 2, 9, 99]);
  });

  test('sorts array of strings in ascending order', () => {
    const myArray = ['abc', 'aaa', 'aa', 'ayz'];
    myArray.sort();
    expect(myArray).toEqual(['aa', 'aaa', 'abc', 'ayz']);
  });
});

describe('converts iterable to array', () => {
  
  test('converts string to array', () => {
    const myArray = new MyArray();
    myArray.convertIterableToArray("hello");
    expect(myArray.array).toEqual(["h", "e", "l", "l", "o"]);
  });

  test('converts set to array', () => {
    const myArray = new MyArray([1, 1, 2, 3]);
    const mySet = new Set([1, 1, 2, 3]);
    myArray.convertIterableToArray(mySet);
    expect(mySet).toEqual(new Set([1, 2, 3]));
    expect(myArray.array).toEqual([1, 2, 3]);
  });

  test('converts map to array', () => {
    const myArray = new MyArray([1, 2, 3]);
    const myMap = new Map();
    myMap.set(1, "a");
    myMap.set(2, "b");
    myMap.set(3, "c");
    myArray.convertIterableToArray(myMap);
    expect(myArray.array).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"]
    ]);
  });
})