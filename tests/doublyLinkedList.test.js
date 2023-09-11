import { expect, test, describe } from "bun:test";
import DoublyLinkedList from "../linkedList/DoublyLinkedList";
import { link } from "fs";

describe('creates new doubly linked list', () => {
  test('creates new empty doubly linked list', () => {
    const linkedList = new DoublyLinkedList();
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('creates new non-empty doubly linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    expect(linkedList.size).toBe(3);
    expect(linkedList.head).not.toBeNull();
    expect(linkedList.tail).not.toBeNull();
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.prev).toBeNull();
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.head.next.prev.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);
    expect(linkedList.tail.prev.value).toBe(2);
    expect(linkedList.tail.next).toBeNull();
  });
});

describe('inserts into linked list', () => {
  test('prepends to empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.prepend(1);
    expect(linkedList.size).toBe(1);
    expect(linkedList.head).not.toBeNull();
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.head.next).toBeNull();
    expect(linkedList.head.prev).toBeNull();
  });

  test('prepends to non-empty singly linked list', () => {
    const linkedList = new DoublyLinkedList([2, 3, 4]);
    linkedList.prepend(1);
    expect(linkedList.size).toBe(4);
    expect(linkedList.head.value).toBe(1);
    let currNode = linkedList.head;
    let currValue = 1;
    while (currNode != null) {
      expect(currNode.value).toBe(currValue);
      currNode = currNode.next;
      currValue += 1;
    }
  });

  test('appends to empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.append(1);
    expect(linkedList.size).toBe(1);
    expect(linkedList.head).not.toBeNull();
    expect(linkedList.tail).not.toBeNull();
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.head.next).toBeNull();
    expect(linkedList.head.prev).toBeNull();
  });

  test('appends to non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    linkedList.append(4);
    expect(linkedList.size).toBe(4);
    expect(linkedList.tail.value).toBe(4);
    let currNode = linkedList.head;
    let currValue = 1;
    while (currNode != null) {
      expect(currNode.value).toBe(currValue);
      currNode = currNode.next;
      currValue += 1;
    }
  });

  test('attempts insertion at index into empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.insertAtIndex(1, 0);
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('attempts insertion at invalid index in non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    linkedList.insertAtIndex(4, 3);
    expect(linkedList.size).toBe(3);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.head.next.next.value).toBe(3);
    expect(linkedList.head.next.next.next).toBeNull();
    expect(linkedList.tail.value).toBe(3);
  });

  test('attempts insertion at valid index in non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 3, 4]);
    linkedList.insertAtIndex(2, 1);
    expect(linkedList.size).toBe(4);
    expect(linkedList.head).not.toBeNull();
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.head.next.next.value).toBe(3);
    expect(linkedList.head.next.next.next.value).toBe(4);
    expect(linkedList.tail.value).toBe(4);
    expect(linkedList.head.next.next.next.next).toBeNull();
  });
});

describe('removes from linked list', () => {
  test('attempts to remove value from empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    const removed = linkedList.remove(1);
    expect(removed).toBeNull();
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('attempts to remove non-existant value from non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    const removed = linkedList.remove(4);
    expect(removed).toBeNull();
    expect(linkedList.size).toBe(3);
    let currNode = linkedList.head;
    let currValue = 1;
    while (currNode != null) {
      expect(currNode.value).toBe(currValue);
      currNode = currNode.next;
      currValue += 1;
    }
  });

  test('attempts to remove existant value from non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    const removed = linkedList.remove(2);
    expect(removed).not.toBeNull();
    expect(removed.value).toBe(2);
    expect(removed.next).toBeNull();
    expect(removed.prev).toBeNull();
    expect(linkedList.size).toBe(2);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(3);
    expect(linkedList.tail.value).toBe(3);
    expect(linkedList.tail.prev.value).toBe(1);
  });

  test('attempts to remove value at head of non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    const removed = linkedList.remove(1);
    expect(removed).not.toBeNull();
    expect(removed.value).toBe(1);
    expect(removed.next).toBeNull();
    expect(removed.prev).toBeNull();
    expect(linkedList.size).toBe(2);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.tail.value).toBe(3);
    expect(linkedList.head.next.value).toBe(3);
    expect(linkedList.tail.prev.value).toBe(2);
  });

  test('attempts to remove head of empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    const removed = linkedList.removeHead();
    expect(removed).toBeNull();
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('attempts to remove head of non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    const prevHead = linkedList.removeHead();
    expect(prevHead).not.toBeNull();
    expect(prevHead.next).toBeNull();
    expect(prevHead.prev).toBeNull();
    expect(prevHead.value).toBe(1);
    expect(linkedList.size).toBe(2);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.head.next.value).toBe(3);
    expect(linkedList.tail.value).toBe(3);
  });

  test('attempts to remove tail from empty linked list', () => {
    const linkedList = new DoublyLinkedList();
    const removed = linkedList.removeTail();
    expect(removed).toBeNull();
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('removes tail from non-empty linked list', () => {
    const linkedList = new DoublyLinkedList([1, 2, 3]);
    const prevTail = linkedList.removeTail();
    expect(prevTail).not.toBeNull();
    expect(prevTail.value).toBe(3);
    expect(prevTail.next).toBeNull();
    expect(prevTail.prev).toBeNull();
    expect(linkedList.size).toBe(2);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(2);
    expect(linkedList.tail.value).toBe(2);
  });
})