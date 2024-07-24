class HashMap {
  constructor() {
    this.#newHashMap();
  }
  set(key, value) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    let node = this.buckets[index];

    if (!node) {
      // node is a reference, we need to change the actual value
      this.buckets[index] = new LinkedList(key, value);
      return;
    }

    while (node) {
      if (node.key === key) {
        node.value = value;
        break;
      }
      if (!node.nextNode) {
        node.nextNode = new LinkedList(key, value);
        break;
      }
      node = node.nextNode;
    }

    this.#checkForGrowth();
  }
  get(key) {
    const index = this.#hash(key);
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.nextNode;
    }
    return null;
  }
  has(key) {
    return this.get(key) !== null;
  }
  remove(key) {
    const has = this.has(key);
    if (has) {
      const index = this.#hash(key);

      let node = this.buckets[index];
      // if the first node needs to be removed
      if (node.key === key) {
        // node is a reference, we need to change a value
        this.buckets[index] = node.nextNode;
      }

      while (node.nextNode) {
        if (node.nextNode.key === key) {
          node.nextNode = node.nextNode.nextNode;
        }
      }
    }
    return has;
  }
  #checkForGrowth() {
    if (this.length() > this.loadFactor * this.buckets.length) {
      this.#grow();
    }
  }
  length() {
    let length = 0;

    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        length++;
        node = node.nextNode;
      }
    }

    return length;
  }
  #grow() {
    const oldBuckets = this.buckets;
    const bucketsAmount = oldBuckets.length;
    this.#newHashMap(bucketsAmount * 2);

    for (const bucket of oldBuckets) {
      let node = bucket;
      while (node) {
        this.set(node.key, node.value);
        node = node.nextNode;
      }
    }
  }
  clear() {
    this.#newHashMap();
  }
  #newHashMap(length = 16) {
    this.buckets = Array(length);
  }
  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }
}

class LinkedList {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

const test = new HashMap();
test.loadFactor = 0.75;
console.assert(test.length() === 0);
test.set("apple", "red");
console.assert(test.length() === 1);
test.set("banana", "yellow");
test.set("carrot", "orange");
console.assert(test.length() === 3);
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.assert(test.loadFactor === 0.75);
console.assert(test.loadFactor === test.length() / test.buckets.length);
console.assert(test.length() === 12);
console.assert(test.buckets);

test.set("apple", "black");
test.set("kite", "blue");
test.set("lion", "yellow");
test.set("apple", "red");
console.assert(test.length() / test.buckets.length === 0.75);
console.assert(test.length() === 12);
console.assert(test.buckets);

console.assert(test.get("apple") === "red");
console.assert(test.get("banana") === "yellow");
console.assert(test.get("dog") === "brown");
console.assert(test.get("ice cream") === "white");
console.assert(test.get("apple") === "red");
console.assert(!test.has("appl"));
console.assert(test.has("frog"));
console.assert(test.has("hat"));
console.assert(test.has("lion"));
console.assert(test.has("kite"));
console.assert(test.has("ice cream"));
console.assert(!test.has("doesn't exist"));
console.assert(!test.has("doesn't exist either"));

test.set("moon", "silver");
console.assert(test.buckets.length === 32);
console.assert(test.buckets);

console.assert(test.remove("apple"));
console.assert(test.length() === 12);
console.assert(!test.get("apple"));
test.set("lion", "nice");
console.assert(test.get("lion") === "nice");
console.assert(!test.remove("appl"));
console.assert(test.length() === 12);
console.assert(test.remove("ice cream"));
console.assert(test.length() === 11);
