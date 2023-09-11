/**
 * Linked List Node
 */
class LinkedListNode {
 /**
  * Constructs new LinkedListNode
  * @param {Number} value An integer to store in the node
  */
  constructor(value) {
		/**
     * Value stored in node
     * @type {Number}
     */
    this.value = value;
		/**
     * Pointer to next node
     * @type {LinkedListNode|null}
     */
    this.next = null;
  }
}

/**
 * Singly Linked List
 */
export default class SinglyLinkedList {
 /**
  * Constructs new SinglyLinkedList
  * @param {Array} items Optional array of values to add to the initial
  * linked list. If not provided, the initial linked list will be empty
  */
  constructor(items = []) {
		/**
     * Pointer to head of linked list
     * @type {LinkedListNode|null}
     */
    this.head = null;
		/**
     * Size of linked list
     * @type {Number}
     */
    this.size = 0;

    if (items.length > 0) {
      this.build(items);
    }
  }

 /**
  * Builds linked list from array of values
  * @param {Array} items An array of integer values
  */
  build(items) {
    for (let i = 0; i < items.length; i++) {
      const currValue = items[i];
      this.append(currValue);
    }
  }

 /**
  * Prepends a new node with value if the value doesn't alreay exist
  * in the list
  * @param {Number} value An integer value to store in the new node
  */
  prepend(value) {
    if (this.exists(value)) {
      return; // value already exists
    }
    const newNode = new LinkedListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size += 1;
  }

 /**
  * Appends a new node with value if the value doesn't alreay exist
  * in the list
  * @param {Number} value An integer value to store in the new node
  */
  append(value) {
    if (this.exists(value)) {
      return; // value already exists
    }
    const newNode = new LinkedListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
    }
    else {
      let currNode = this.head;
      while (currNode.next != null) {
        currNode = currNode.next;
      }
      // currNode is last node
      currNode.next = newNode;
    }
    this.size += 1;
  }

 /**
  * Inserts a new node with value at given index
  * @param {Number} value An integer value to store in the new node
  * @param {Number} index The index where the new node should be inserted
  */
  insertAtIndex(value, index) {
    if (this.exists(value)) {
      return; // value already exists
    }
    else if (this.outOfBounds(index)) {
      return; // invalid index
    }
    else {
      // can insert
      if (index === 0) {
        this.prepend(value);
      }
      else {
        const newNode = new LinkedListNode(value);
        // find node just before node at index
        let i = 0;
        let currNode = this.head;
        while (i < index - 1) {
          i += 1;
          currNode = currNode.next;
        }
        const nextNode = currNode.next;
        newNode.next = nextNode;
        currNode.next = newNode;
        this.size += 1;
      }
    }
  }

 /**
  * Removes the node with the given value, if it exists
  * @param {Number} value An integer value of the node to remove
  * @returns {LinkedListNode|null} The removed node if it existed. Otherwise,
  * null
  */
  remove(value) {
    if (!this.exists(value)) {
      return null;
    }
    else {
      // find node that precedes value
      let precedingNode = null;
      let currNode = this.head;
      while (currNode.value !== value) {
        precedingNode = currNode;
        currNode = currNode.next;
      }
      if (precedingNode == null) {
        return this.removeHead();
      }
      else {
        const nextNode = currNode.next;
        precedingNode.next = nextNode;
        currNode.next = null;
        this.size -= 1;
        return currNode;
      }
    }
  }

 /**
  * Removes the first node in the linked list
  * @returns {LinkedListNode|null} The removed head node if it existed. 
  * Otherwise, null
  */
  removeHead() {
    if (this.isEmpty()) {
      return null;
    }
    const headNode = this.head;
    const nextNode = headNode.next;
    this.head = nextNode;
    headNode.next = null;
    this.size -= 1;
    return headNode;
  }

 /**
  * Removes the last node in the linked list
  * @returns {LinkedListNode|null} The removed node if it existed. 
  * Otherwise, null
  */
  removeTail() {
    if (this.isEmpty()) {
      return null;
    }
    let prevNode = null;
    let currNode = this.head;
    while (currNode.next != null) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (prevNode == null) {
      // removing head
      this.head = null;
    }
    else {
      prevNode.next = null;
    }
    this.size -= 1;
    return currNode;
  }

 /**
  * Checks if a value exists in the linked list
  * @param {Number} value The target value
  * @returns {Boolean} True if the value exists. Otherwise, false
  */
  exists(value) {
    const nodeWithValue = this.findNodeWith(value);
    return nodeWithValue == null ? false : true;
  }

 /**
  * Finds the node with given value
  * @param {Number} value The target value
  * @returns {LinkedListNode|null} The node with the target value if it exists.
  * Otherwise, null
  */
  findNodeWith(value) {
    let currNode = this.head;
    while (currNode != null) {
      if (currNode.value === value) {
        return currNode;
      }
      currNode = currNode.next;
    }
    return null;
  }

 /**
  * Checks if list is empty
  * @returns {Boolean} True if empty. Otherwise, false.
  */
  isEmpty() {
    return this.head == null;
  }

 /**
  * Checks if index is out of bounds
  * @param {Number} index Index to check
  * @returns {Boolean} True if index is out of bounds. Otherwise, false.
  */
  outOfBounds(index) {
    if (this.isEmpty()) {
      return true;
    }
    return index < 0 || index >= this.size;
  }

}