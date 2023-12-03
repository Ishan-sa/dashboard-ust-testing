const express = require("express");
const router = express.Router();

const { exists } = require("../lib/helpers");
const CapexReport = require("../database/Capex-Report");

router.get("/", async (req, res) => {
  try {
    const documents = await CapexReport.getAll();
    return res.json(documents);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const document = await CapexReport.create(req.body);
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  if (exists(req?.params?.id)) {
    try {
      const document = await CapexReport.getByID(req.params.id);
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `Capex Report with id=${req.params.id} not found.`,
  });
});

router.patch("/:id", async (req, res) => {
  if (exists(req?.params?.id)) {
    try {
      const document = await CapexReport.updateByID(req.params.id, req.body);
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `Capex Report with id=${req.params.id} not found.`,
  });
});

module.exports = router;
