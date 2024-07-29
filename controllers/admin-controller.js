const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js'); 

const adminRegister = async (req, res) => {
    try {
        const { name, email, password, campusName } = req.body;

        const existingAdminByEmail = await Admin.findOne({ email: email.toLowerCase() });
        const existingCampus = await Admin.findOne({ campusName: campusName.toLowerCase() });

        if (existingAdminByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (existingCampus) {
            return res.status(400).json({ message: 'Campus name already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            campusName: campusName.toLowerCase() 
        });

        let result = await admin.save();
        result.password = undefined;
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            if (await bcrypt.compare(req.body.password, admin.password)) { // Using bcrypt to compare hashed passwords
                admin.password = undefined;
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getAdminDetail = async (req, res) => {
    try {
        const adminId = req.params.id;

        // Log the ID to verify it's being passed correctly
        // console.log('Requested Admin ID:', adminId);

        let admin = await Admin.findById(adminId);

        if (admin) {
            admin.password = undefined; // Hide the password field
            res.status(200).json(admin); // Return the admin data
        } else {
            res.status(404).json({ message: "No admin found" }); // Admin not found
        }
    } catch (err) {
        // Log the error for further investigation
        console.error('Error fetching admin details:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};
module.exports = { adminRegister, adminLogIn, getAdminDetail };

