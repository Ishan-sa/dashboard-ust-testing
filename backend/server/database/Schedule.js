const mongoose = require("mongoose");
const Schedule = require("../lib/models/Schedule");

const ScheduleSchema = new mongoose.Schema({
  siteNumber: String,
  analysisStatus: String,
  incTicketNumber: String,
  xPEX: String,
  bridgeSupport: String,
  assignedTo: String,
  shift: String,
  hoRequired: String,
  notes: String,
  hoEngineer: String,
  dateComplete: String,
});

const ScheduleModel = mongoose.model("schedule", ScheduleSchema);

/**
 * Creates a new Schedule document.
 *
 * @param {any} data
 * @returns {Promise<mongoose.Document>}
 */
module.exports.create = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const document = new ScheduleModel(Schedule.makeSchedule(data));
      await document.save();
      resolve(document);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getAll = async function () {
  return await ScheduleModel.find();
};

module.exports.getBySiteNumber = async function (siteNumber) {
  return await ScheduleModel.findOne({ siteNumber });
};

module.exports.updateBySiteNumber = async function (siteNumber, data) {
  return await ScheduleModel.findOneAndUpdate(
    { siteNumber },
    Schedule.makePartialSchedule(data)
  );
};

module.exports.deleteBySiteNumber = async function (siteNumber) {
  return await ScheduleModel.findOneAndDelete({ siteNumber });
};
