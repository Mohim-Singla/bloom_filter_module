import { moduleBloomFilter } from './module/index.js';

export const bloomFilter = {
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
