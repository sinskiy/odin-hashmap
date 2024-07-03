// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

class HashMap {
  constructor() {
    this.hashMap = [];
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  set(key, value) {
    const hash = this.hash(key);
    const hashItem = getItem(hash);
    const nextHashNode = new HashNode(value);
    if (hashItem) {
      hashItem.getTail().nextNode = nextHashNode;
    } else {
      hashItem = nextHashNode;
    }
  }
  get(key) {
    const hash = this.hash(key);
    return this.#getItem(hash);
  }
  #getItem(hash) {
    return this.hashMap[hash];
  }
}

class HashNode {
  constructor(value, nextNode) {
    this.value = value;
    this.nextNode = nextNode;
  }
  getTail() {
    let currentNode = this;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }
}
