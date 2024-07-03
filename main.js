class HashMap {
  constructor() {
    this.hashMap = Array(16);
    this.loadFactor = 0.75;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.hashMap.length;
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
      const newHashMap = Array(this.hashMap.length + 16);
      for (const bucket of this.hashMap) {
        if (!bucket) continue;
        let currentNode = bucket;
        while (currentNode) {
          const newHash = this.hash(currentNode.key);
          if (newHashMap[hash]) {
            hashItem.getTail().nextNode = nextHashNode;
          } else {
            this.hashMap[hash] = nextHashNode;
          }
          newHashMap[newHash] = currentNode;
          currentNode = currentNode.nextNode;
        }
      }
      this.hashMap = newHashMap;
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
