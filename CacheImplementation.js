const fs = require('fs');

// Read large text file
const largeTextFile = fs.readFileSync('large_text_file.txt', 'utf-8').split('\n');

// Simple Cache Implementation using Object
const simpleCache = {};

// Insert items into Simple Cache
for (let i = 0; i < 100000; i++) {
    simpleCache[largeTextFile[i]] = i;
}

// Function to check if an item exists in Simple Cache
function checkSimpleCache(item) {
    console.time('Simple Cache Lookup');
    const result = simpleCache[item];
    console.timeEnd('Simple Cache Lookup');
    return result !== undefined;
}

// Test with a random item from the file
console.log('Simple Cache result:', checkSimpleCache(largeTextFile[50000]));

