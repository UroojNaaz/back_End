const mongoose = require("mongoose");     

// Define the schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    campusName: {    
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
    }
}, {
    timestamps: true, 
});

// Create and export the model
module.exports = mongoose.model("Admin", adminSchema);
