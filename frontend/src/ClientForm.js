import React, { useState } from "react";
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import axios from "axios";
import { Delete } from "@mui/icons-material"; // For delete icon

const ClientForm = () => {
  const [clientData, setClientData] = useState({
    name: "",
    city: "",
    cnic: "",
    password: "",
    location: "",
    dob: "",
    email: "",
    phone: "",
    images: [], // Store the selected image files
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return; // Restrict to numbers only
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  // Handle the file input for multiple files, appending each selected file to the list
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array
    const newFiles = [...clientData.images, ...files]; // Combine existing files with the new ones
    const MaxUploadFilesAllowed = 10;
    if (newFiles.length > MaxUploadFilesAllowed) {
      alert(`No more attachments are allowed. Maximum ${MaxUploadFilesAllowed} files.`);
      return; // Prevent adding more than 10 files
    }

    setClientData({
      ...clientData,
      images: newFiles, // Append selected files to the existing list
    });
  };

  // Remove file from the images array
  const handleRemoveFile = (index) => {
    const newImages = clientData.images.filter((_, i) => i !== index);
    setClientData({
      ...clientData,
      images: newImages, // Update the images array after removal
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data and multiple image attachments [if present]
    const formData = new FormData();
    for (const key in clientData) {
      if (clientData.hasOwnProperty(key)) {
        // If the key is images, we append all files individually
        if (key === "images" && clientData[key].length > 0) {
          clientData[key].forEach((file) => {
            formData.append("images", file); // Append each image file
          });
        } else {
          formData.append(key, clientData[key]);
        }
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/clients/submitForm",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
      console.log("Client added:", response.data);
      alert("Client added successfully!");
      setClientData({
        name: "",
        city: "",
        cnic: "",
        password: "",
        location: "",
        dob: "",
        email: "",
        phone: "",
        images: [], // Clear the selected images
      });
    } catch (error) {
      console.error("There was an error adding the client:", error);
      alert("Error adding client.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>Add Client</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={clientData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CNIC"
          name="cnic"
          value={clientData.cnic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{
            pattern: "^\\d{5}-\\d{7}-\\d{1}$", // CNIC format
            maxLength: 15,
          }}
          helperText="format: XXXXX-XXXXXXX-X"
          error={clientData.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(clientData.cnic)}
        />
        <TextField
          label="Password"
          name="password"
          value={clientData.password}
          onChange={handleChange}
          fullWidth
          type="password"
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={clientData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="dob"
          value={clientData.dob}
          onChange={handleChange}
          fullWidth
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          name="email"
          value={clientData.email}
          onChange={handleChange}
          fullWidth
          type="email"
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={clientData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="tel"
          inputProps={{
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
          helperText="Only numbers are allowed"
          error={clientData.phone && isNaN(clientData.phone)}
        />

        {/* File input to select multiple images, allows users to upload one at a time */}
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "10px" }}
        />

        {/* Show the attached files dynamically */}
        {clientData.images.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Attached Files:</Typography>
            <List>
              {clientData.images.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  {/* Remove button next to each file */}
                  <IconButton onClick={() => handleRemoveFile(index)} color="error">
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ClientForm;
