const mongoose = require("mongoose");
const PO_Lookup = require("../lib/models/PO-Lookups");

const PO_LookupSchema = new mongoose.Schema({
  year: String,
  month: String,
  activity: String,
  poNumber: String,
  quantity: String,
  actual: String,
});

const PO_LookupModel = mongoose.model("po-lookups", PO_LookupSchema);

/** Creates a new PO_Lookup document.
 *
 * @param {any} data
 * @returns {Promise<mongoose.Document>}
 */

module.exports.create = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const document = new PO_LookupModel(PO_Lookup.makePOTable(data));
      await document.save();
      resolve(document);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getAll = async function () {
  return await PO_LookupModel.find();
};

module.exports.getByPONumber = async function (poNumber) {
  return await PO_LookupModel.findOne({ poNumber });
};

module.exports.updateByPONumber = async function (poNumber, data) {
  return await PO_LookupModel.findOneAndUpdate(
    { poNumber },
    // PO_Lookup.makePartialPO_Lookup(data)
    PO_Lookup.makePOTable(data)
  );
};

module.exports.deleteByPONumber = async function (poNumber) {
  return await PO_LookupModel.findOneAndDelete({ poNumber });
};
