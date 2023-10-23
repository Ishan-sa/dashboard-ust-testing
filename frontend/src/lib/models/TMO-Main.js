const { exists } = require("../helpers");
const { assert_string, assert_array } = require("../assert");

/**
 * @typedef {object} TMO-Main
 * @property {string} incTicketNumber
 * @property {string} status
 * @property {string} siteID
 * @property {string} xPEX
 * @property {string} gc
 * * @type {{label: string; value: string}[]} techAffected
 * @property {Array} techAffected
 * @type {{label: string; value: string}[]} sector
 * @property {Array} sector
 * @property {string} category
 * @property {string} mcpsEng
 * @property {string} workLog
 * @type {{label: string; value: string}[]} case
 * @property {Array} case
 * @property {string} incAssignedTo
 * @property {string} assignedGroup
 * @property {string} assignee
 * @property {string} dateAssigned
 * @property {string} dateReassigned
 * @property {string} pierStatus
 * @property {string} resolution
 *
 */

/**
 * @param {TMO-Main} data
 * @return {TMO-Main}
 */

function makeTMOTable(data) {
  try {
    assert_string(data, "incTicketNumber");
    assert_string(data, "status");
    assert_string(data, "siteID");
    assert_string(data, "xPEX");
    assert_string(data, "gc");
    assert_array(data, "techAffected");
    assert_array(data, "sector");
    assert_string(data, "category");
    assert_string(data, "mcpsEng");
    assert_string(data, "workLog");
    assert_array(data, "case");
    assert_string(data, "incAssignedTo");
    assert_string(data, "assignedGroup");
    assert_string(data, "assignee");
    assert_string(data, "dateAssigned");
    assert_string(data, "dateReassigned");
    assert_string(data, "pierStatus");
    assert_string(data, "resolution");
  } catch (error) {
    throw error;
  }

  // prettier-ignore
  const { incTicketNumber, status, siteID, xPEX, gc, techAffected, sector, category, mcpsEng, workLog, caseNumber, incAssignedTo, assignedGroup, assignee, dateAssigned, dateReassigned, pierStatus, resolution } = data;
  // prettier-ignore
  return { incTicketNumber, status, siteID, xPEX, gc, techAffected, sector, category, mcpsEng, workLog, caseNumber, incAssignedTo, assignedGroup, assignee, dateAssigned, dateReassigned, pierStatus, resolution };
}

/**
 * @return {TMO-Main}
 */

function makeEmptyTMOTable() {
  return {
    incTicketNumber: "",
    status: "",
    siteID: "",
    xPEX: "",
    gc: "",
    techAffected: [],
    sector: [],
    category: "",
    mcpsEng: "",
    workLog: "",
    case: [],
    incAssignedTo: "",
    assignedGroup: "",
    assignee: "",
    dateAssigned: "",
    dateReassigned: "",
    pierStatus: "",
    resolution: "",
  };
}

/**
 * @param {object} data
 * @return {object}
 */

function makePartialTMOTable(data) {
  const partial = makeEmptyTMOTable();
  for (const prop in partial) {
    if (exists(data[prop])) partial[prop] = data[prop];
    else delete partial[prop];
  }
  return partial;
}

/**
 * Creates a TMOTable object with randomly generated values.
 *
 * @return {TMO-Main}
 */
function makeRandomTMOTable() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  function generateString(length = 10) {
    let result = "";
    for (let i = 0; i < length; ++i) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  return {
    incTicketNumber: generateString(6),
    status: generateString(3),
    siteID: generateString(6),
    xPEX: generateString(4),
    gc: generateString(4),
    techAffected: generateString(4),
    sector: generateString(4),
    category: generateString(4),
    mcpsEng: generateString(4),
    workLog: generateString(4),
    case: generateString(4),
    incAssignedTo: generateString(4),
    assignedGroup: generateString(4),
    assignee: generateString(4),
    dateAssigned: generateString(4),
    dateReassigned: generateString(4),
    pierStatus: generateString(4),
    resolution: generateString(4),
  };
}

module.exports = {
  makeTMOTable,
  makeEmptyTMOTable,
  makePartialTMOTable,
  makeRandomTMOTable,
};
