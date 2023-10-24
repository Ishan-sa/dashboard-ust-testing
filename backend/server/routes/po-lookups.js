const express = require("express");
const router = express.Router();

const { exists } = require("../lib/helpers");
const PO_Lookup = require("../database/PO-Lookups");
const { randomPOTable } = require("../lib/models/PO-Lookups");

router.get("/randomPO", async (req, res) => {
  try {
    const document = await PO_Lookup.create(randomPOTable());
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const documents = await PO_Lookup.getAll();
    return res.json(documents);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const document = await PO_Lookup.create(req.body);
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:poNumber", async (req, res) => {
  if (exists(req?.params?.poNumber)) {
    try {
      const document = await PO_Lookup.getByPONumber(req.params.poNumber);
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `PO_Lookup with poNumber=${req.params.poNumber} not found.`,
  });
});

router.patch("/:poNumber", async (req, res) => {
  if (exists(req?.params?.poNumber)) {
    try {
      const document = await PO_Lookup.updateByPONumber(
        req.params.poNumber,
        req.body
      );
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `PO_Lookup with poNumber=${req.params.poNumber} not found.`,
  });
});

router.delete("/:poNumber", async (req, res) => {
  if (exists(req?.params?.poNumber)) {
    try {
      const document = await PO_Lookup.deleteByPONumber(req.params.poNumber);
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `PO_Lookup with poNumber=${req.params.poNumber} not found.`,
  });
});

module.exports = router;
