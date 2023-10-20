const { exists } = require("../helpers");
const { assert_string } = require("../assert");

/**
 * @typedef {object} Schedule
 * @property {string} siteNumber
 * @property {string} analysisStatus
 * @property {string} incTicketNumber
 * @property {string} xPEX
 * @property {string} bridgeSupport
 * @property {string} assignedTo
 * @property {string} shift
 * @property {string} hoRequired
 * @property {string} notes
 * @property {string} hoEngineer
 * @property {string} dateComplete
 */

/**
 * @param {Schedule} data
 * @return {Schedule}
 */
function makeSchedule(data) {
  try {
    assert_string(data, "siteNumber");
    assert_string(data, "analysisStatus");
    assert_string(data, "incTicketNumber");
    assert_string(data, "xPEX");
    assert_string(data, "bridgeSupport");
    assert_string(data, "assignedTo");
    assert_string(data, "shift");
    assert_string(data, "hoRequired");
    assert_string(data, "notes");
    assert_string(data, "hoEngineer");
    assert_string(data, "dateComplete");
  } catch (error) {
    throw error;
  }
  const { siteNumber, analysisStatus, incTicketNumber, xPEX, bridgeSupport, assignedTo, shift, hoRequired, notes, hoEngineer, dateComplete } = data;
  return { siteNumber, analysisStatus, incTicketNumber, xPEX, bridgeSupport, assignedTo, shift, hoRequired, notes, hoEngineer, dateComplete };
}

/**
 * @return {Schedule}
 */
function makeEmptySchedule() {
  return {
    siteNumber: "",
    analysisStatus: "",
    incTicketNumber: "",
    xPEX: "",
    bridgeSupport: "",
    assignedTo: "",
    shift: "",
    hoRequired: "",
    notes: "",
    hoEngineer: "",
    dateComplete: "",
  };
}

/**
 * @param {object} data
 * @return {object}
 */
function makePartialSchedule(data) {
  const partial = makeEmptySchedule();
  for (const prop in partial) {
    if (exists(data[prop])) partial[prop] = data[prop];
    else delete partial[prop];
  }
  return partial;
}

/**
 * Creates a Schedule object with randomly generated values.
 *
 * @return {Schedule}
 */
function makeRandomSchedule() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  function generateString(length = 10) {
    let result = "";
    for (let i = 0; i < length; ++i) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  return {
    siteNumber: generateString(20),
    analysisStatus: generateString(5),
    incTicketNumber: generateString(8),
    xPEX: generateString(5),
    bridgeSupport: generateString(12),
    assignedTo: generateString(12),
    shift: generateString(5),
    hoRequired: generateString(4),
    notes: generateString(30),
    hoEngineer: generateString(12),
    dateComplete: generateString(6),
  };
}

module.exports = {
  makeSchedule,
  makeEmptySchedule,
  makePartialSchedule,
  makeRandomSchedule,
};
