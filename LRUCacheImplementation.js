const fs = require('fs');

// LRU Cache Implementation using Map
class LRUCache {
    constructor(limit) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.size >= this.limit) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// Read large text file
const largeTextFile = fs.readFileSync('large_text_file.txt', 'utf-8').split('\n');

// Initialize LRU Cache with a limit of 100,000 items
const lruCache = new LRUCache(100000);

// Insert items into LRU Cache
for (let i = 0; i < 100000; i++) {
    lruCache.put(largeTextFile[i], i);
}

// Function to check if an item exists in LRU Cache
function checkLRU(item) {
    console.time('LRU Cache Lookup');
    const result = lruCache.get(item);
    console.timeEnd('LRU Cache Lookup');
    return result !== -1;
}

// Test with a random item from the file
console.log('LRU Cache result:', checkLRU(largeTextFile[50000]));

