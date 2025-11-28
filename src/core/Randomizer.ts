import seedrandom from 'seedrandom';

export class Randomizer {
  private rng: seedrandom.PRNG;

  constructor(seed?: number | string) {
    this.rng = seedrandom(String(seed));
  }

  /**
   * Returns a random number between 0 (inclusive) and 1 (exclusive).
   */
  next(): number {
    return this.rng();
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Returns a random element from an array.
   */
  pick<T>(array: T[]): T {
    const index = this.int(0, array.length - 1);
    return array[index];
  }

  /**
   * Returns multiple random elements from an array.
   */
  picks<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.pick(array));
    }
    return result;
  }
}
