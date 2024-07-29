const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();    // Initializing the Express

// Importing routes
const Routes = require("./routes/route.js");
// Setting the port
const PORT = process.env.PORT || 5000;

dotenv.config();   // Load environment variables


// Middleware functions
app.use(express.json({ limit: '10mb' }));   // Parse JSON bodies
app.use(express.urlencoded({ limit: '10mb', extended: true }));   // Parse URL-encoded bodies
app.use(cors());  // Enable CORS


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use('/', Routes); // Use routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
