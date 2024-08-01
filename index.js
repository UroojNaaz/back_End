const express = require("express");  
const cors = require("cors");        
const mongoose = require("mongoose"); 
const dotenv = require("dotenv");    // Environment variables

const app = express(); 
const Routes = require("./routes/route.js"); // Import routes

const PORT = process.env.PORT || 5000; // Define port

dotenv.config(); // Load environment variables

app.use(express.json({ limit: '10mb' })); // Parse JSON payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Parse URL-encoded payloads
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Root route with a message
app.get('/', (req, res) => {
    const message = 'Welcome to the SMIT Attendance Management Portal , made by "Team-Innovateher"';
    res.send(message);
    console.log(message);
});

// Use routes
app.use('/', Routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
