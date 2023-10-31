const express = require("express");
const router = express.Router();

const { exists } = require("../lib/helpers");
const TMO_Main = require("../database/TMO-Main");
const { makeRandomTMOTable } = require("../lib/models/TMO-Main");
const { makePartialTMOTable } = require("../lib/models/TMO-Main");

router.get("/randomTMO", async (req, res) => {
  try {
    const document = await TMO_Main.create(makeRandomTMOTable());
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const documents = await TMO_Main.getAll();
    return res.json(documents);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("Request Body: ", req.body);
  try {
    const document = await TMO_Main.create(req.body);
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/lookup", async (req, res) => {
  try {
    const document = await TMO_Main.lookup(req.body);
    return res.status(201).json(document);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:incTicketNumber", async (req, res) => {
  if (exists(req?.params?.incTicketNumber)) {
    try {
      const document = await TMO_Main.getTMOByIncTicketNumber(
        req.params.incTicketNumber
      );
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `TMO Main with incTicketNumber=${req.params.incTicketNumber} not found.`,
  });
});

router.patch("/:incTicketNumber", async (req, res) => {
  if (exists(req?.params?.incTicketNumber)) {
    try {
      const document = await TMO_Main.updateTMOByIncTicketNumber(
        req.params.incTicketNumber,
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
    message: `TMO Main with incTicketNumber=${req.params.incTicketNumber} not found.`,
  });
});

router.delete("/:incTicketNumber", async (req, res) => {
  if (exists(req?.params?.incTicketNumber)) {
    try {
      const document = await TMO_Main.deleteTMOByIncTicketNumber(
        req.params.incTicketNumber
      );
      if (document !== null) {
        return res.json(document);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  return res.status(404).json({
    message: `TMO Main with incTicketNumber=${req.params.incTicketNumber} not found.`,
  });
});

module.exports = router;
