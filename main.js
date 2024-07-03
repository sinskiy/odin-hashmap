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
    let hashItem = this.#getItem(hash);
    const nextHashNode = new HashNode(key, value);
    if (hashItem) {
      if (hashItem.find(key)) {
        hashItem.value = value;
      } else {
        hashItem.getTail().nextNode = nextHashNode;
      }
    } else {
      this.hashMap[hash] = nextHashNode;
    }
  }
  get(key) {
    const hash = this.hash(key);
    let hashItem = this.#getItem(hash);
    if (hashItem) {
      return hashItem.find(key);
    } else {
      return null;
    }
  }
  remove(key) {}
  #getItem(hash) {
    return this.hashMap[hash];
  }
}

class HashNode {
  constructor(key, value, nextNode) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
  getTail() {
    let currentNode = this;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }
  find(key) {
    let currentNode = this;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.key === key) return currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }
}

const a = new HashMap();
a.set("sinskiy", 15);
console.log(a.get("sinskiy"));
a.set("sinskiy", 20);
console.log(a.get("sinskiy"));
a.set("hello", 0);
console.log(a.get("hello"));
a.remove("hello");
console.log(a.get("hello"));
