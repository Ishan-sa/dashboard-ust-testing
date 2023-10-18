const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");

const scheduleSchema = new Mongoose.Schema({
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
  dateCompleted: String,
});

const schedule = Mongoose.model("schedule", scheduleSchema);

// Create a new site
router.post("/", async (req, res) => {
  console.log("req.body", req.body);

  const newSite = new schedule(req.body);
  try {
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all sites
router.get("/", async (req, res) => {
  try {
    const sites = await schedule.find();
    console.log("sites", sites);
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update a site
router.patch("/:id", getSite, async (req, res) => {
  Object.assign(res.site, req.body);
  try {
    const updatedSite = await res.site.save();
    res.json(updatedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get a site
async function getSite(req, res, next) {
  let site;
  try {
    site = await schedule.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.site = site;
  next();
}

// delete a site
router.delete("/:id", getSite, async (req, res) => {
  try {
    await res.site.remove();
    res.json({ message: "Deleted site" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// const sitesRouter = require("./sites");
// app.use("/sites", sitesRouter);

module.exports = router;
