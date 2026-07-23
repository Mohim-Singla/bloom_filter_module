import assert from 'node:assert';
import { bloomFilter } from './index.js';

console.log('Running tests for Bloom Filter Module...');

// Test 1: Initialize
const filter = bloomFilter.initialize(0.01, 1000, 100000);
assert.ok(filter, 'Bloom filter instance created successfully');

// Test 2: Add and check containment
filter.add('apple');
filter.add('banana');
filter.add('cherry');

assert.strictEqual(filter.contains('apple'), true, 'Should contain apple');
assert.strictEqual(filter.contains('banana'), true, 'Should contain banana');
assert.strictEqual(filter.contains('cherry'), true, 'Should contain cherry');

// Test 3: Elements not added
assert.strictEqual(filter.contains('dragonfruit'), false, 'Should not contain dragonfruit');
assert.strictEqual(filter.contains('elderberry'), false, 'Should not contain elderberry');

// Test 4: Validation errors
assert.throws(() => {
  bloomFilter.initialize(-0.1, 100);
}, /allowed_false_positives must be a positive number/);

assert.throws(() => {
  bloomFilter.initialize(0.01, 0);
}, /estimated_elements must be a positive number/);

assert.throws(() => {
  bloomFilter.initialize(0.01, 100, -5);
}, /max_allowed_bit_array_size must be a positive number/);

console.log('All tests passed successfully! ✅');
