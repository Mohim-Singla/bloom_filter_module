import assert from 'node:assert';
import { bloomFilter } from './index.js';

console.log('--- Starting Performance Benchmark ---');

const filter = bloomFilter.initialize(0.01, 100000);
const itemCount = 50000;

console.time(`Add ${itemCount} items`);
for (let i = 0; i < itemCount; i++) {
  filter.add(`user_session_id_${i}`);
}
console.timeEnd(`Add ${itemCount} items`);

console.time(`Check ${itemCount} items (all present)`);
for (let i = 0; i < itemCount; i++) {
  assert.strictEqual(filter.contains(`user_session_id_${i}`), true);
}
console.timeEnd(`Check ${itemCount} items (all present)`);

console.time(`Check ${itemCount} items (not present)`);
let falsePositives = 0;
for (let i = 0; i < itemCount; i++) {
  if (filter.contains(`non_existent_item_${i}`)) {
    falsePositives++;
  }
}
console.timeEnd(`Check ${itemCount} items (not present)`);

const actualRate = ((falsePositives / itemCount) * 100).toFixed(2);
console.log(`Measured False Positive Rate: ${actualRate}% (${falsePositives}/${itemCount})`);
console.log('Filter Stats:', filter.info);
console.log('--- Benchmark Complete ---');
