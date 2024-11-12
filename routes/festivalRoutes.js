// routes/festivalRoutes.js
const express = require("express");
const router = express.Router();
const Festival = require("../models/Festival");
const Puro = require("../models/purohit");

// Route to get today's festival
// router.get('/today', festivalController.getTodayFestival);

// Route to add a new festival
router.post("/add", async (req, res) => {
  const { date, name, shortdescription, description } = req.body;
  console.log("Received data:", req.body); // Log incoming data
  try {
    // Validate input data
    if (!date || !name || !shortdescription || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newFestival = new Festival({
      date,
      name,
      shortdescription,
      description,
    });
    await newFestival.save();
    res
      .status(201)
      .json({ message: "Festival added successfully", festival: newFestival });
  } catch (error) {
    console.error("Error adding festival:", error);
    res
      .status(500)
      .json({ error: "Error adding festival data", details: error.message });
  }
});

// Route to update an existing festival
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { date, name, shortdescription, description } = req.body;
  console.log("Received data for update:", req.body); // Log incoming data

  try {
    // Validate input data
    if (!date || !name || !shortdescription || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the festival by ID and update it
    const updatedFestival = await Festival.findByIdAndUpdate(
      id,
      { date, name, shortdescription, description },
      { new: true } // Return the updated document
    );

    if (!updatedFestival) {
      return res.status(404).json({ error: "Festival not found" });
    }

    res
      .status(200)
      .json({
        message: "Festival updated successfully",
        festival: updatedFestival,
      });
  } catch (error) {
    console.error("Error updating festival:", error);
    res
      .status(500)
      .json({ error: "Error updating festival data", details: error.message });
  }
});

// Route to get festivals by date
router.get("/date/:date", async (req, res) => {
  const { date } = req.params; // Extract date from request parameters
  try {
    const festivals = await Festival.find({ date }); // Query the database
    if (festivals.length === 0) {
      return res
        .status(404)
        .json({ message: "No festivals found for this date." });
    }
    res.status(200).json(festivals); // Return the found festivals
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res
      .status(500)
      .json({ error: "Error fetching festival data", details: error.message });
  }
});

// Route to get all festivals
router.get("/purohit", async (req, res) => {
  try {
    const festivals = await Puro.find(); // Query the database for all festivals
    if (festivals.length === 0) {
      return res.status(404).json({ message: "No festivals found." });
    }
    res.status(200).json(festivals); // Return all festivals
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res
      .status(500)
      .json({ error: "Error fetching festival data", details: error.message });
  }
});

// Create a new Purohit
router.post("/purohits", async (req, res) => {
  try {
    const newPurohit = new Purohit(req.body);
    await newPurohit.save();
    res
      .status(201)
      .json({ message: "Purohit created successfully", data: newPurohit });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating Purohit", details: error.message });
  }
});

// Read all Purohits
router.get("/purohits", async (req, res) => {
  try {
    const purohits = await Purohit.find();
    res.status(200).json(purohits);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching Purohits", details: error.message });
  }
});

// Read a single Purohit by ID
router.get("/purohits/:id", async (req, res) => {
  try {
    const purohit = await Purohit.findById(req.params.id);
    if (!purohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res.status(200).json(purohit);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching Purohit", details: error.message });
  }
});

// Update a Purohit by ID
router.put("/purohits/:id", async (req, res) => {
  try {
    const updatedPurohit = await Purohit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPurohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res
      .status(200)
      .json({ message: "Purohit updated successfully", data: updatedPurohit });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating Purohit", details: error.message });
  }
});

// Delete a Purohit by ID
router.delete("/purohits/:id", async (req, res) => {
  try {
    const deletedPurohit = await Purohit.findByIdAndDelete(req.params.id);
    if (!deletedPurohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res.status(200).json({ message: "Purohit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting Purohit", details: error.message });
  }
});

module.exports = router;
