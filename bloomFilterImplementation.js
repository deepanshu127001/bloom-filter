const fs = require('fs');
const BloomFilter = require('bloom-filter'); // npm install bloom-filter

// Parameters
const expectedItems = 1000000; // Number of items to add
const falsePositiveRate = 0.01; // Desired false positive rate

// Calculate size of Bloom filter
const m = Math.ceil(-expectedItems * Math.log(falsePositiveRate) / (Math.log(2) ** 2));
const k = Math.ceil((m / expectedItems) * Math.log(2));

// Create a Bloom filter with calculated size and hash functions
const bloom = BloomFilter.create(m, k);

// Read large text file line by line and insert into Bloom Filter
const largeTextFile = fs.readFileSync('large_text_file.txt', 'utf-8').split('\n');

// Insert each line into Bloom filter
largeTextFile.forEach(line => {
    if (line) bloom.insert(line);
});

// Function to check if an item exists in Bloom Filter
function checkBloom(item) {
    console.time('Bloom Filter Lookup');
    const result = bloom.contains(item);
    console.timeEnd('Bloom Filter Lookup');
    return result;
}

// Test with a random item from the file
const testItem = largeTextFile[Math.floor(Math.random() * largeTextFile.length)];
console.log('Bloom Filter result:', checkBloom(testItem));

