const mongoose = require("mongoose");
const TMO_Main = require("../lib/models/TMO-Main");

const TMO_MainSchema = new mongoose.Schema({
  incTicketNumber: String,
  status: String,
  siteID: String,
  xPEX: String,
  gc: String,
  techAffected: Array,
  sector: Array,
  category: String,
  mcpsEng: String,
  workLog: String,
  case: Array,
  incAssignedTo: String,
  assignedGroup: String,
  assignee: String,
  dateAssigned: String,
  dateReassigned: String,
  pierStatus: String,
  resolution: String,
});

const TMO_MainModel = mongoose.model("tmo-main", TMO_MainSchema, "tmo-main");

/**
 * Creates a new TMO Main document.
 *
 * @param {any} data
 * @returns {Promise<mongoose.Document>}
 */

module.exports.create = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Data before: ", data); // TODO: Remove this line
      const document = new TMO_MainModel(TMO_Main.makeTMOTable(data));
      console.log("Data after: ", document); // TODO: Remove this line
      await document.save();
      resolve(document);
    } catch (error) {
      console.log("Error: ", error); // TODO: Remove this line
      reject(error);
    }
  });
};

module.exports.getAll = async function () {
  return await TMO_MainModel.find();
};

module.exports.getTMOByIncTicketNumber = async function (incTicketNumber) {
  return await TMO_MainModel.findOne({ incTicketNumber });
};

module.exports.getTMOBySiteID = async function (siteID) {
  return await TMO_MainModel.findOne({ siteID });
};

module.exports.getAllTMOBySiteID = async function (siteID) {
  return await TMO_MainModel.find({ siteID });
};

module.exports.updateTMOByIncTicketNumber = async function (
  incTicketNumber,
  data
) {
  return await TMO_MainModel.findOneAndUpdate(
    { incTicketNumber },
    TMO_Main.makePartialTMOTable(data)
  );
};

module.exports.deleteTMOByIncTicketNumber = async function (incTicketNumber) {
  return await TMO_MainModel.findOneAndDelete({ incTicketNumber });
};

module.exports.lookup = async function (data) {
  return await TMO_MainModel.find(TMO_Main.makePartialRegexTMOTable(data));
};

module.exports.bulkUpdate = async function (dataArray) {
  return await TMO_MainModel.bulkWrite(
    TMO_Main.makeBulkUpdateTMOTable(dataArray),
    {
      ordered: false,
    }
  );
};
