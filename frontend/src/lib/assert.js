/**
 * Assert that property exists and is a 'string' type.
 *
 * @param {*} obj
 * @param {string} prop
 */
function assert_string(obj, prop) {
  if (obj[prop] === undefined) throw `Missing Property: '${prop}'`;
  if (typeof obj[prop] !== "string") throw `Expected String: '${prop}'`;
}

module.exports = {
  assert_string,
};
