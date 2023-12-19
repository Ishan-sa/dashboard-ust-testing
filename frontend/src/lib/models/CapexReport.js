const { exists } = require("../helpers");
const { assert_string, assert_array } = require("../assert");

/**
 * @typedef {object} CapexReport
 * @property {string} issueOwner
 * @property {string} goBackDate
 * @property {array} notes
 */

/**
 * @param {CapexReport} data
 * @return {CapexReport}
 */

function makeCapexReport(data) {
  try {
    assert_string(data, "issueOwner");
    assert_string(data, "goBackDate");
    assert_array(data, "notes");
  } catch (error) {
    throw error;
  }

  const { issueOwner, goBackDate, notes } = data;
  return { issueOwner, goBackDate, notes };
}

/**
 * @return {CapexReport}
 */

function makeEmptyCapexReport() {
  return {
    issueOwner: "",
    goBackDate: "",
    notes: [],
  };
}

/**
 * @param {object} data
 * @return {object}
 */

module.exports = {
  makeCapexReport,
  makeEmptyCapexReport,
};
