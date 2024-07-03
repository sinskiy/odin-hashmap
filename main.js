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

    return hashCode % 16;
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
  remove(key) {
    const hash = this.hash(key);
    let hashItem = this.#getItem(hash);
    if (hashItem) {
      let currentNode = hashItem;
      if (currentNode.key === key) {
        if (!currentNode.nextNode) delete this.hashMap[hash];
        else this.hashMap[hash] = currentNode.nextNode;
        return;
      }
      while (currentNode.nextNode) {
        if (currentNode.nextNode.key === key) {
          currentNode.nextNode = currentNode.nextNode.nextNode;
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
  length() {
    let size = 0;
    const filteredHashMap = this.hashMap.filter((hashItem) => hashItem.value);
    for (const hashItem of filteredHashMap) {
      size++;
      let currentNode = hashItem;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
        size++;
      }
    }
    return size;
  }
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
console.log(a.length());
