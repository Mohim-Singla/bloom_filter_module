# Bloom Filter Module

A lightweight, efficient **Bloom Filter** implementation for Node.js using 32-bit FNV-1a hashing and bit-packed `Uint8Array` memory management.

## Installation

```bash
npm install bloom_filter_module
```

## Usage

```javascript
import { bloomFilter } from 'bloom_filter_module';

// Initialize a bloom filter:
// - allowed_false_positives: 0.01 (1%)
// - estimated_elements: 1000 items
// - max_allowed_bit_array_size: 100000 bits (optional, defaults to 100000)
const filter = bloomFilter.initialize(0.01, 1000);

// Add items
filter.add('apple');
filter.add('banana');

// Query membership
console.log(filter.contains('apple')); // true
console.log(filter.contains('banana')); // true
console.log(filter.contains('cherry')); // false
```

## API Reference

### `bloomFilter.initialize(allowed_false_positives, estimated_elements, max_allowed_bit_array_size)`
Creates and returns a `moduleBloomFilter` instance configured optimal bit size and hash counts based on inputs.

### `filter.add(item)`
Adds an item (string, object, or number) to the Bloom filter.

### `filter.contains(item)`
Returns `true` if the item is probably in the set, and `false` if it is definitely not.

### `filter.info`
Getter returning filter statistics including bit array size, number of hash function rounds, and memory footprint in bytes.

## License

ISC