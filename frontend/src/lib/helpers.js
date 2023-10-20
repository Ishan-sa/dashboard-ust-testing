/**
 * Check if object is not 'undefined' or 'null'.
 *
 * @export
 * @param {*} obj
 * @return {boolean}
 */
function exists(obj) {
  return (obj ?? null) !== null;
}

module.exports = {
  exists,
};
