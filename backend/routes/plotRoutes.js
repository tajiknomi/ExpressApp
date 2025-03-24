const express = require("express");
const Plot = require("../models/Plot"); // Adjust path if needed
const router = express.Router();


// Route to add a new plot
router.post("/addPlot", async (req, res) => {
  try {
    const { plotPhase, plotBlock, plotStreet, plotNo, plotSize, isCorner, isParkfacing, onMainboulevard } = req.body;

    if (!plotPhase || !plotBlock || !plotStreet || !plotNo || !plotSize || isCorner === undefined || isParkfacing === undefined || onMainboulevard === undefined) {
      return res.status(400).json({ message: "Malformed request body" });
    }

    // Create and save the plot
    const plot = new Plot({ plotPhase, plotBlock, plotStreet, plotNo, plotSize, isCorner, isParkfacing, onMainboulevard });
    await plot.save();

    res.status(201).json({ message: "Plot added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add plot" });
  }
});

module.exports = router;