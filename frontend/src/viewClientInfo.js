import React, { useState } from "react";
import { TextField, Button, Box, Typography, Card, CardContent, Grid, Link } from "@mui/material";
import axios from "axios";

const ViewClientInfo = () => {
  const [cnic, setCnic] = useState("");
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setCnic(value); // Update the CNIC input value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setClientData(null); // Clear previous client data

    // Validate CNIC format
    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
      setError("Please enter a valid CNIC in the format: XXXXX-XXXXXXX-X");
      return;
    }

    try {
      // Send request to retrieve client info based on CNIC
      const response = await axios.post(
        "http://localhost:5000/api/viewClientInfo",
        { cnic },
        { withCredentials: true }
      );
      setClientData(response.data.data); // Set the client data on successful response
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching client data.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        View Client Information
      </Typography>

      {/* CNIC Input Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="CNIC"
          name="cnic"
          value={cnic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{
            maxLength: 15, // CNIC length limitation
          }}
          helperText="Format: XXXXX-XXXXXXX-X"
          error={cnic && !/^\d{5}-\d{7}-\d{1}$/.test(cnic)}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Search Client
        </Button>
      </form>

      {/* Error Message */}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {/* Display client data if found */}
      {clientData && (
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="h6">{clientData.name}</Typography>
                  <Typography color="textSecondary">{clientData.city}</Typography>
                  <Typography variant="body2" color="textSecondary">{clientData.cnic}</Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"><strong>Email:</strong> {clientData.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {clientData.phone}</Typography>
                <Typography variant="body1"><strong>Location:</strong> {clientData.location}</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> {clientData.dob}</Typography>
              </Box>

              {/* Display Attachments */}
              {clientData.images && clientData.images.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1"><strong>Attachments:</strong></Typography>
                  {clientData.images.map((image, index) => (
                    <Link
                      key={index}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{ display: "block", mt: 2 }}
                    >
                      {`${index + 1}`}
                    </Link>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ViewClientInfo;
