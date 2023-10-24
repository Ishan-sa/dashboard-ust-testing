const { exists } = require("../helpers");
const { assert_string } = require("../assert");

/**
 * @typedef {object} PO_Lookup
 * @property {string} year
 * @property {string} month
 * @property {string} activity
 * @property {string} poNumber
 * @property {string} quantity
 * @property {string} actual
 */

/**
 * @param {PO_Lookup} data
 * @return {PO_Lookup}
 */

function makePOTable(data) {
  try {
    assert_string(data, "year");
    assert_string(data, "month");
    assert_string(data, "activity");
    assert_string(data, "poNumber");
    assert_string(data, "quantity");
    assert_string(data, "actual");
  } catch (error) {
    throw error;
  }
  const { year, month, activity, poNumber, quantity, actual } = data;
  return { year, month, activity, poNumber, quantity, actual };
}

/**
 * @return {PO_Lookup}
 */

function makeEmptyPOTable() {
  return {
    year: "",
    month: "",
    activity: "",
    poNumber: "",
    quantity: "",
    actual: "",
  };
}

/**
 * @param {PO_Lookup} data
 * @return {PO_Lookup}
 */

function makePartialPOTable(data) {
  const partial = makeEmptyPOTable();
  for (const prop in partial) {
    if (exists(data[prop])) partial[prop] = data[prop];
    else delete partial[prop];
  }
  return partial;
}

/**
 * Creates a PO_Lookup object with random values.
 *
 * @return {PO_Lookup}
 */

function randomPOTable() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  function makeRandomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  return makePOTable({
    year: makeRandomString(4),
    month: makeRandomString(6),
    activity: makeRandomString(6),
    poNumber: makeRandomString(5),
    quantity: makeRandomString(2),
    actual: makeRandomString(2),
  });
}

module.exports = {
  makePOTable,
  makeEmptyPOTable,
  makePartialPOTable,
  randomPOTable,
};
