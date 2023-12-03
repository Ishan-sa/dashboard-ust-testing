const mongoose = require("mongoose");
const Capex_Report = require("../lib/models/CapexReport");

const CapexReportSchema = new mongoose.Schema({
  issueOwner: String,
  goBackDate: String,
  notes: String,
});

const CapexReportModel = mongoose.model(
  "capex-report-editstuff",
  CapexReportSchema,
  "capex-report-editstuff"
);

/** Creates a new Capex Report document
 * @param {any} data
 * @returns {Promise<mongoose.Document>}
 */

module.exports.create = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const document = new CapexReportModel(Capex_Report.makeCapexReport(data));
      await document.save();
      resolve(document);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getAll = async function () {
  return await CapexReportModel.find();
};

module.exports.getByID = async function (id) {
  return await CapexReportModel.findById(id);
};
