import { expect, test, describe } from "bun:test";
import CircularArray from "./CircularArray";

describe('creates new circular array', () => {
  test('creates new circular array with default capacity', () => {
    const circArr = new CircularArray();
    expect(circArr).toEqual(new CircularArray());
    expect(circArr.capacity).toBe(1);
    expect(circArr.array.length).toBe(1);
    expect(circArr.size).toBe(0);
    expect(circArr.front).toBe(-1);
    expect(circArr.end).toBe(-1);
  });

  test('create new circular array with custom capacity', () => {
    const circArr = new CircularArray(10);
    expect(circArr).toEqual(new CircularArray(10));
    expect(circArr.capacity).toBe(10);
    expect(circArr.array.length).toBe(10);
    expect(circArr.size).toBe(0);
    expect(circArr.front).toBe(-1);
    expect(circArr.end).toBe(-1);
  });
});

describe("accesses element in circular array", () => {

  test('attempt acccess in empty circular array', () => {
    const circArr = new CircularArray(10);
    expect(() => circArr.get(0)).toThrow();
    expect(() => circArr.get(7)).toThrow();
  });

  test('attempt access out of bounds index in non-empty circular array', () => {
    const circArr = new CircularArray(10);
    circArr.prepend(4);
    circArr.prepend(3)
    circArr.prepend(2);
    circArr.prepend(1);
    expect(() => circArr.get(4)).toThrow();
    expect(() => circArr.get(7)).toThrow();
    expect(() => circArr.get(10)).toThrow();
    expect(() => circArr.get(11)).toThrow();
  });

  test('attempt access of in bounds index in non-empty circular array', () => {
    const circArr = new CircularArray(10);
    circArr.prepend(4);
    circArr.prepend(3)
    circArr.prepend(2);
    circArr.prepend(1);
    expect(circArr.get(0)).toBe(1);
    expect(circArr.get(1)).toBe(2);
    expect(circArr.get(2)).toBe(3);
    expect(circArr.get(3)).toBe(4);
  });
});

describe('resizes array', () => {

  test('resizes array with 0 capacity', () => {
    const circArr = new CircularArray(0);
    circArr.resize(1);
    expect(circArr.capacity).toBe(1);
    expect(circArr.size).toBe(0);
    expect(circArr.front).toBe(-1);
    expect(circArr.end).toBe(-1);
  });

  test('attempts resize of array with new capacity <= current capacity', () => {
    const circArr = new CircularArray(10);
    expect(() => circArr.resize(9)).toThrow();
    expect(() => circArr.resize(10)).toThrow();
  });

  test('resizes empty array with to valid new capacity', () => {
    const circArr = new CircularArray(10);
    circArr.resize(20);
    expect(circArr.capacity).toBe(20);
    expect(circArr.size).toBe(0);
    expect(circArr.front).toBe(-1);
    expect(circArr.end).toBe(-1);
  });

  test('resizes non-empty array with to valid new capacity', () => {
    const circArr = new CircularArray(10);
    for (let i = 10; i >= 1; i--) {
      circArr.prepend(i);
    }
    expect(circArr.size).toBe(10);
    expect(circArr.get(0)).toBe(1);
    expect(circArr.get(9)).toBe(10);
    circArr.resize(20);
    expect(circArr.capacity).toBe(20);
    expect(circArr.size).toBe(10);
    expect(circArr.front).toBe(0);
    expect(circArr.end).toBe(9);
    expect(circArr.get(0)).toBe(1);
    expect(circArr.get(9)).toBe(10);
  });
})

describe('prepends onto circular array', () => {

  test('prepends onto circular array with 0 capacity', () => {
    const circArr = new CircularArray(0);
    circArr.prepend(1);
    expect(circArr.capacity).toBe(2);
    expect(circArr.size).toBe(1);
    expect(circArr.front).toBe(0);
    expect(circArr.end).toBe(0);
    expect(circArr.get(0)).toBe(1);
  });

  test('prepends onto empty circular array', () => {
    const circArr = new CircularArray(10);
    circArr.prepend(1);
    expect(circArr.capacity).toBe(10);
    expect(circArr.size).toBe(1);
    expect(circArr.front).toBe(0);
    expect(circArr.end).toBe(0);
    expect(circArr.get(0)).toBe(1);
  });

  test('prepends onto non-empty circular array (with size < capacity)', () => {
    const circArr = new CircularArray(10);
    circArr.prepend(4);
    circArr.prepend(3);
    circArr.prepend(2);
    circArr.prepend(1);
    expect(circArr.capacity).toBe(10);
    expect(circArr.size).toBe(4);
    expect(circArr.front).toBe(7);
    expect(circArr.end).toBe(0);
    expect(circArr.get(0)).toBe(1);
    expect(circArr.get(1)).toBe(2);
    expect(circArr.get(2)).toBe(3);
    expect(circArr.get(3)).toBe(4);
  });

  test('prepends onto non-empty circular array (with size === capacity)', () => {
    const circArr = new CircularArray(4);
    circArr.prepend(4);
    circArr.prepend(3);
    circArr.prepend(2);
    circArr.prepend(1);
    circArr.prepend(0);
    expect(circArr.capacity).toBe(10);
    expect(circArr.size).toBe(5);
    expect(circArr.front).toBe(9);
    expect(circArr.end).toBe(3);
    expect(circArr.get(0)).toBe(0);
    expect(circArr.get(1)).toBe(1);
    expect(circArr.get(2)).toBe(2);
    expect(circArr.get(3)).toBe(3);
    expect(circArr.get(4)).toBe(4);
  });

});