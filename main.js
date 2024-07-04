class HashMap {
  constructor(length = 16) {
    this.hashMap = Array(length);
    this.loadFactor = 0.75;
  }
  hash(key, length = this.hashMap.length) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % length;
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

    if (this.hashMap.length * this.loadFactor < this.length()) {
      const entries = this.entries();

      this.clear();
      this.hashMap = Array(Math.floor(this.hashMap.length * 1.25));
      for (const [key, value] of entries) {
        this.set(key, value);
      }
      console.log(this.hashMap);
    }
  }
  get(key) {
    const hash = this.hash(key);
    if (hash < 0 || hash >= this.hashMap.length) {
      throw new Error("Trying to access index out of bound" + hash + key);
    }
    let hashItem = this.#getItem(hash);
    if (hashItem) {
      return hashItem.find(key);
    } else {
      return null;
    }
  }
  has(key) {
    return this.get(key) !== null;
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
    return this.#getEach("length");
  }
  clear() {
    this.hashMap = [];
  }
  keys() {
    return this.#getEach("keys");
  }
  values() {
    return this.#getEach("values");
  }
  entries() {
    return this.#getEach("entries");
  }
  #getEach(type) {
    let size = 0;
    const keys = [];
    const values = [];
    const entries = [];
    const filteredHashMap = this.hashMap.filter((hashItem) => hashItem.value);
    for (const hashItem of filteredHashMap) {
      size++;
      let currentNode = hashItem;
      keys.push(currentNode.key);
      values.push(currentNode.value);
      entries.push([currentNode.key, currentNode.value]);
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
        keys.push(currentNode.key);
        values.push(currentNode.value);
        entries.push([currentNode.key, currentNode.value]);
        size++;
      }
    }
    switch (type) {
      case "length":
        return size;

      case "keys":
        return keys;

      case "values":
        return values;

      case "entries":
        return entries;
    }
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

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("dog", "golden");
test.set("lion", "brown");
console.log(test.hashMap.length);
test.set("moon", "silver");
console.log(test.hashMap);
test.set("moon", "gray");
test.set("kite", "blue");
console.log(test.get("kite"));
console.log(test.get("moon"));
console.log(test.length());
console.log(test.keys(), test.values(), test.entries());
test.clear();
console.log(test.hashMap);
