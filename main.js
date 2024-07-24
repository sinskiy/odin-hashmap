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
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        keys.push(node.key);
        node = node.nextNode;
      }
    }
    return keys;
  }
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        values.push(node.value);
        node = node.nextNode;
      }
    }
    return values;
  }
  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      let node = bucket;
      while (node) {
        entries.push([node.key, node.value]);
        node = node.nextNode;
      }
    }
    return entries;
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
