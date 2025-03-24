const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const Client = require("../models/Client");
const { verifyToken } = require("../middleware/auth");
const { allowedFields, upload } = require("../config/multerConfig.js");
const validator = require('validator'); // Import validator library
const clientFormValidationSchema = require("../validation/clientValidationSchema.js");
const router = express.Router();

// POST route to submit client data
router.post("/submitForm", upload.array("attachments", process.env.MAX_FILE_UPLOAD_LIMIT), async (req, res) => {
  try {
    // Validate the request body using the Joi schema
    const { error, value } = await clientFormValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const attachmentPaths = req.files ? req.files.map(file => `/uploads/${req.body.cnic}/${file.filename}`) : [];   
    const { attachments, ...clientData } = { ...req.body, attachments: attachmentPaths };

    // Convert all string fields in clientData to lowercase
    for (let key in clientData) {
      if (typeof clientData[key] === 'string') {
        clientData[key] = clientData[key].toLowerCase();
      }
    }
    // Check if CNIC already exists in the database
    const existingClient = await Client.findOne({ cnic: clientData.cnic });
    if (existingClient) {
      return res.status(400).json({ message: "CNIC already exists" });
    }
    // Save the client data
    const client = new Client({ ...clientData, attachments: attachmentPaths });
    await client.save();  
    res.status(201).json({ message: "Form submission successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error submitting the form" });
  }
});

// POST route to view client data based on CNIC
router.post("/viewClientInfo", async (req, res) => {

  try {
    const { error, value } = await clientFormValidationSchema.extract('cnic').validate(req.body.cnic);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { cnic } = req.body;
    const client = await Client.findOne({ cnic });
    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }
    const clientData = {
      ...client.toObject(),
      images: client.images ? client.images.map(imagePath => `${process.env.SERVER_URI}${imagePath}`) : [],
    };
    res.status(200).json({ message: "Client found.", data: clientData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error fetching the client data." });
  }
});

module.exports = router;