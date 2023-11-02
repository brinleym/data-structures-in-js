/**
 * A Circular Array
 */
export default class CircularArray {
	constructor(capacity=1) {
    /**
     * Capacity of the array
     * @type {number}
     */
    this.capacity = capacity;
		/**
     * Pointer to the underlying array
     * @type {Array}
     */
		this.array = new Array(this.capacity);
    /**
     * Pointer to front of the array
     * @type {number}
     */
    this.front = -1;
    /**
     * Pointer to end of the array
     * @type {number}
     */
    this.end = -1;
    /**
     * Current number of elements in the array
     * @type {number}
     */
    this.size = 0;
	}

  get(index) {
    if (this.outOfBounds(index)) {
      throw new Error(`Circular Array Error: index ${index} out of bounds`);
    }
    return this.array[(this.front + index) % this.capacity];
  }

  outOfBounds(index) {
    if (this.size === 0) return true;
    if (index < 0 || index >= this.size) return true;
  }

  /**
   * Prepends element onto the front of the array
   * @param {*} elem 
   */
  prepend(elem) {
    if (this.size === this.capacity) {
      // resize array before prepending
      this.resize((this.capacity + 1) * 2);
    }
    if (this.size === 0) {
      // adding first element
      this.array[0] = elem;
      this.front = 0;
      this.end = 0;
    }
    else {
      if (this.front === 0) {
        // wrap around
        this.array[this.capacity - 1] = elem;
        this.front = this.capacity - 1;
      }
      else {
        this.array[this.front - 1] = elem;
        this.front -= 1;
      }
    }
    this.size += 1;
  }

  /**
   * Resizes the circular array when it has reached capacity to new
   * capacity
   * @param {number} newCapacity
   */
  resize(newCapacity) {
    if (newCapacity <= this.capacity) {
      throw new Error(`Circular Array Error: Cannot resize to size ${newCapacity} <= current capacity`);
    }
    const copy = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      copy[i] = this.array[(this.front + i) % this.capacity];
    }
    if (!this.isEmpty()) {
      this.front = 0;
      this.end = this.size - 1;
    }
    this.capacity = newCapacity;
    this.array = copy;
  }

 /**
  * Checks if the circular array is empty
  * @returns {boolean} True if the array is empty. Otherwise, false
  */
  isEmpty() {
    return this.size === 0;
  }
}