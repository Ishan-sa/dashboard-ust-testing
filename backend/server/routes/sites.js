const express = require("express");
const router = express.Router();

const { exists } = require("../lib/helpers");
const Schedule = require("../database/Schedule");
const { makeRandomSchedule } = require("../lib/models/Schedule");

router.get("/random", async (req, res) => {
  try {
    const document = await Schedule.create(makeRandomSchedule());
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const documents = await Schedule.getAll();
    return res.json(documents);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const document = await Schedule.create(req.body);
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:siteNumber", async (req, res) => {
  if (exists(req?.params?.siteNumber)) {
    try {
      const document = await Schedule.getBySiteNumber(req.params.siteNumber);
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `Schedule with siteNumber=${req.params.siteNumber} not found.`,
  });
});

router.patch("/:siteNumber", async (req, res) => {
  if (exists(req?.params?.siteNumber)) {
    try {
      const document = await Schedule.updateBySiteNumber(
        req.params.siteNumber,
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
    message: `Schedule with siteNumber=${req.params.siteNumber} not found.`,
  });
});

router.delete("/:siteNumber", async (req, res) => {
  if (exists(req?.params?.siteNumber)) {
    try {
      const document = await Schedule.deleteBySiteNumber(req.params.siteNumber);
      if (document !== null) {
        return res.json({
          message: `Schedule with siteNumber=${req.params.siteNumber} successfully deleted.`,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `Schedule with siteNumber=${req.params.siteNumber} not found.`,
  });
});

module.exports = router;
