class HashMap {
  constructor() {
    this.buckets = Array(16);
  }
  set(key, value) {
    const index = this.#hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    if (bucket instanceof LinkedList) {
      if (bucket.key !== key) {
        // TODO: deal with collisions (linked lists)
        throw new Error(
          `There's already an item at that position with key ${bucket.key} and value ${bucket.value}`
        );
      }
      bucket.value = value;
    } else {
      this.buckets[index] = new LinkedList(key, value);
    }
  }
  get(key) {
    const index = this.#hash(key);
    // TODO: deal with linked lists (collisions)
    const bucket = this.buckets[index];
    return bucket.value;
  }
  has(key) {
    const index = this.#hash(key);
    const bucket = this.buckets[index];
    // TODO: deal with linked lists (collisions)
    return bucket instanceof LinkedList && bucket.key === key;
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
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
console.log(test.buckets);
console.log(test.get("apple"));
console.log(test.get("banana"));
console.log(test.get("dog"));
console.log(test.get("ice cream"));
console.log(test.get("apple"));
console.log(test.has("apple"));
console.log(test.has("frog"));
console.log(test.has("kite"));
console.log(test.has("jacket"));
console.log(test.has("kite"));
console.log(test.has("ice cream"));
console.log(test.has("doesn't exist"));
console.log(test.has("doesn't exist either"));
