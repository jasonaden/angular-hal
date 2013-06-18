/**
 * toBeAPromise: ensures that the expected is a promise ===
 * @param expected
 */
jasmine.Matchers.prototype.toBeAPromise = function() {
  return this.actual && typeof this.actual.then === 'function';
};