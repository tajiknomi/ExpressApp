const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const plotRoutes = require("./routes/plotRoutes");
const { verifyToken } = require("./middleware/auth");


require("dotenv").config();

const app = express();
app.set('etag', false);

// Middleware [apply these middleware to all incoming requests]
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
//app.use(bodyParser.json());   // Parses incoming requests with JSON payloads and makes the parsed data available in the req.body
app.use(cookieParser());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.disable('x-powered-by');

// Connect to the database
connectToDB();

// Use routes
app.use("/api/plots", verifyToken, plotRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", verifyToken, clientRoutes);

// Start the server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at ${process.env.SERVER_URI}`);
});