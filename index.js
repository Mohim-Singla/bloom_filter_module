import { moduleBloomFilter } from './module/index.js';

/**
 * Main factory module for creating and managing Bloom Filter instances.
 * @module bloomFilter
 */
export const bloomFilter = {
  /**
   * Initializes a new Bloom filter with parameters calculating optimal array size and hash function count.
   *
   * @param {number} allowed_false_positives - Desired false positive probability rate (e.g. 0.01 for 1%).
   * @param {number} estimated_elements - Estimated total elements to store.
   * @param {number} [max_allowed_bit_array_size=100000] - Cap limit for the bit array length.
   * @returns {moduleBloomFilter} Configured Bloom filter instance.
   * @throws {Error} If parameters are invalid or non-positive.
   */
  initialize: (allowed_false_positives, estimated_elements, max_allowed_bit_array_size = 100000) => {
    if (typeof allowed_false_positives !== 'number' || allowed_false_positives <= 0) {
      throw new Error('allowed_false_positives must be a positive number');
    }
    if (typeof estimated_elements !== 'number' || estimated_elements <= 0) {
      throw new Error('estimated_elements must be a positive number');
    }
    if (typeof max_allowed_bit_array_size !== 'number' || max_allowed_bit_array_size <= 0) {
      throw new Error('max_allowed_bit_array_size must be a positive number');
    }

    return new moduleBloomFilter({ allowed_false_positives, estimated_elements, max_allowed_bit_array_size });
  },
};
