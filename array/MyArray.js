/**
 * An Array
 */
export default class MyArray {
	constructor(array = []) {
		/**
     * Pointer to the array
     * @type {Array}
     */
		this.array = array; /* array is dynamic by default */
	}

 /**
  * Prepends an integer onto the array
  * @param {Number} elem An integer to prepend onto the array
  */
	prepend(elem) {
		this.array.unshift(elem);
	}

 /**
  * Appends an integer onto the array
  * @param {Number} elem An integer to be appended onto the array
  */
	append(elem) {
		this.array.push(elem);
	}

 /**
  * Inserts an integer into the array
  * @param {Number} elem An integer to be inserted into the array
  * @param {Number} index An index denoting where the element should be
  * inserted
  */
	insertAtIndex(elem, index) {
		if (this.outOfBounds(index)) {
			return;
		}
		this.array.splice(index, 0, elem); 
	}

 /**
  * Removes an integer from the back of the array
  * @returns {Number|null} The removed integer or null if the array 
  * is empty
  */
	removeLast() {
		if (this.isEmpty()) {
			return null;
		}
		const removedElem = this.array.pop();
		return removedElem;
	}

 /**
  * Removes an integer from the front of the array
  * @returns {Number|null} The removed integer or null if the array 
  * is empty
  */
	removeFirst() {
		if (this.isEmpty()) {
			return null;
		}
		const removedElem = this.array.shift();
		return removedElem;
	}

 /**
  * Removes an integer at a particular index in the array
  * @param {Number} Index of element to remove
  * @returns {(Number|null} The removed integer or null if the array 
  * is empty or the index was out of bounds
  */
	removeAtIndex(index) {
		if (this.isEmpty()) {
			return null;
		}
		if (this.outOfBounds(index)) {
			return null;
		}
		const [removedElem] = this.array.splice(index, 1);
		return removedElem;
	}

 /**
  * Returns the integer at a particular index of the array
  * @param {Number} Index of element to access
  * @returns {Number|null} The target integer or null if the array 
  * is empty or the index was out of bounds
  */
	valueAt(index) {
		if (this.isEmpty()) {
			return null;
		}
		if (this.outOfBounds(index)) {
			return null;
		}
		const targetElem = this.array[index];
		return targetElem;
	}

 /**
  * In Javascript, Arrays are passed by reference. 
  * This means that, if an array is passed to a function, 
  * any modifications made to that array inside the function are 
  * made directly on the original array. Therefore, a shallow or 
  * deep copy of an array must be made in order to prevent modifications 
  * from affecting the original array.
  */

 /**
  * Returns a shallow copy of the array
  * @returns {Array} The shallow copy of the array
  */
	shallowCopy() {
		const arrShallowCopy = [...this.array];
		return arrShallowCopy;
	}

 /**
  * Returns a deep copy of the array
  * @returns {Array} The deep copy of the array
  */
	deepCopy() {
		const arrDeepCopy = JSON.parse(JSON.stringify(this.array));
		return arrDeepCopy;
	}

 /**
  * Merges given array into existing array by
  * contating given array onto the end of the
  * existing array
  * @param {Array} arrayTwo The array to merge with the 
  * existing array
  */
	merge(arrayTwo) {
		this.array = [...this.array.concat(arrayTwo)];
	}

 /**
  * Determines if an index is out of bounds
  * @param {Number} index The index of the array
  * @returns {Boolean} true if the given index is out of bounds
  * and false if it is in-bounds
  */
	outOfBounds(index) {
		return index < 0 || index > this.array.length - 1;
	}

 /**
  * Maps a function onto the array
  * @param {Function} func A function that takes the current element, 
  * current index, and array and performs some operation on the
  * current element and returns the result
  * @returns {Array} A new array where each element has gone through
  * the mapping function
  */
	map(func) {
		const mappedArr = this.array.map(func);
		return mappedArr;
	}

 /**
  * Filters the array based on some criteria
  * @param {Function} func A function that takes the current element, 
  * current index, and array and returns a boolean indicating whether
  * the current element should be included in the filtered array
  * @returns {Array} A new array containing only the elements
  * allowed by the filter function
  */
	filter(func) {
		const filtered = this.array.filter(func);
    return filtered;
	}

 /**
  * "Reduces" the array by executing a function on all the array
  * elements that "accumulates" their values, thereby
  * reducing the array into a single value
  * @param {Function} func A function that takes the "total"/"accumulated"
  * value, the current element, current index, and array, and returns
  * the a new "total" value that has incorporated the value of the current
  * element
  * @param {Number|null} startValue An optional start value for the
  * reducer function. If startValue isn't provided, the reducer function
  * will run with the first element of the array as the start value.
  * However, if startValue isn't provided and the array is empty, reduce
  * will throw an error, so we check for this case and return null.
  * @returns {Number} The final result of the reducer
  */
	reduce(func, startValue = null) {
    if (startValue == null && this.isEmpty()) {
      return null;
    }
    else if (startValue == null) {
      return this.array.reduce(func);
    }
		return this.array.reduce(func, startValue);
	}

 /**
  * Determines if the given value is in the array
  * @param {Number} target The target integer
  * @returns {Boolean} true if the given integer is found and 
  * false if it isn't found
  * Note: If the array is sorted, use Binary Search
  */
	search(target) {
		const targetElem = this.array.find(
	      (currentElem, index, array) => currentElem === target
    )
		return targetElem === undefined ? false : true;
	}

 /**
  * Finds the index of a given value in the array
  * @param {Number} target The target integer
  * @returns {Number} The index of the target integer if its
  * been found or -1 if it isn't found
  * Note: If the array is sorted, use Binary Search
  */
	indexOf(target) {
		const targetIndex = this.array.findIndex(
			(currentElem, index, array) => currentElem === target
		)
		return targetIndex;
	}

 /**
  * Sorts array in-place in ascending order
  */
  sort() {
		this.array.sort();
	}

 /**
  * Converts an iterable to an array
  * @param {Iterable} someIterable The interable to convert
  */
	convertIterableToArray(someIterable) {
		this.array = Array.from(someIterable);
	}

 /**
  * Determines if the array is empty
  * @returns {Boolean} true if the array is empty and false
  * if it isn't empty
  */
	isEmpty() {
		return this.array.length === 0;
	}

}