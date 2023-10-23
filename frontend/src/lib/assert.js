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

function assert_array(obj, prop) {
  if (obj[prop] === undefined) throw `Missing Property: '${prop}'`;
  if (!Array.isArray(obj[prop])) throw `Expected Array: '${prop}'`;
}

module.exports = {
  assert_string,
  assert_array,
};
