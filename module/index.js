/**
 * FNV-1a 32-bit hash algorithm implementation.
 * @param {string} str - Input string to hash.
 * @param {number} [seed=0x811c9dc5] - Optional seed for generating multiple hash functions.
 * @returns {number} 32-bit unsigned integer hash.
 */
function fnv1a(str, seed = 0x811c9dc5) {
  let hash = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // 32-bit FNV prime: 0x01000193
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

export class moduleBloomFilter {
  #input;
  #bitArray;
  #hashFunctions = [];
  #max_bit_array_size;
  #hashSeedRounds = 0;

  constructor(input) {
    this.#input = input;
    const { allowed_false_positives, estimated_elements, max_allowed_bit_array_size } = input;

    const preferred_max_array_size = Math.ceil(
      -((estimated_elements * Math.log(allowed_false_positives)) / Math.pow(Math.log(2), 2))
    );
    this.#max_bit_array_size = Math.min(preferred_max_array_size, max_allowed_bit_array_size);

    const k = Math.max(1, Math.ceil((this.#max_bit_array_size / estimated_elements) * Math.log(2)));
    this.#hashSeedRounds = k;

    this.#hashFunctions = this.#createHashFunctions(k);
    this.#bitArray = new Uint8Array(Math.ceil(this.#max_bit_array_size / 8));
  }

  #createHashFunctions(k) {
    const funcs = [];
    for (let i = 0; i < k; i++) {
      // Use different seeds derived for each round
      const seed = (0x811c9dc5 ^ (i * 0x9e3779b9)) >>> 0;
      funcs.push((item) => {
        const str = typeof item === 'string' ? item : JSON.stringify(item);
        return fnv1a(str, seed);
      });
    }
    return funcs;
  }

  /**
   * Add an item to the Bloom filter.
   * @param {string|object|number} item
   */
  add(item) {
    for (const hashFn of this.#hashFunctions) {
      const bitIndex = hashFn(item) % this.#max_bit_array_size;
      const byteIndex = Math.floor(bitIndex / 8);
      const bitOffset = bitIndex % 8;
      this.#bitArray[byteIndex] |= (1 << bitOffset);
    }
  }

  /**
   * Check if an item is possibly in the Bloom filter.
   * @param {string|object|number} item
   * @returns {boolean} False if definitely not in the set, true if probably in the set.
   */
  contains(item) {
    for (const hashFn of this.#hashFunctions) {
      const bitIndex = hashFn(item) % this.#max_bit_array_size;
      const byteIndex = Math.floor(bitIndex / 8);
      const bitOffset = bitIndex % 8;
      if ((this.#bitArray[byteIndex] & (1 << bitOffset)) === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get metadata information about the Bloom filter setup.
   */
  get info() {
    return {
      bitArraySize: this.#max_bit_array_size,
      hashFunctionsCount: this.#hashSeedRounds,
      bytesUsed: this.#bitArray.length,
      input: { ...this.#input },
    };
  }
}
